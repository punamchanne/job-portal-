from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks
from typing import List
from database import jobs_collection, companies_collection, applications_collection, users_collection, candidates_collection
from models.job_model import JobCreate, JobResponse
import uuid
from datetime import datetime

router = APIRouter(prefix="/api/employer", tags=["employer"])

@router.post("/jobs")
def post_job(job: JobCreate, current_user_id: str):
    # Retrieve user's company info, auto-create if not found
    company = companies_collection.find_one({"user_id": current_user_id})
    if not company:
        user = users_collection.find_one({"id": current_user_id})
        user_name = user.get("name", "Employer") if user else "Employer"
        companies_collection.insert_one({
            "user_id": current_user_id,
            "company_name": f"{user_name}'s Company",
            "industry": "",
            "description": ""
        })
        company = companies_collection.find_one({"user_id": current_user_id})

    # Generate unique Job ID and set initial fields
    job_dict = job.dict()
    job_dict["job_id"] = str(uuid.uuid4())
    job_dict["company_id"] = current_user_id
    job_dict["company_name"] = company.get("company_name", "Employer")
    job_dict["created_at"] = datetime.utcnow().isoformat()

    # Save to MongoDB
    jobs_collection.insert_one(job_dict)

    # Remove non-serializable MongoDB _id before returning
    job_dict.pop("_id", None)

    return {"message": "Job posted successfully", "job_id": job_dict["job_id"]}

@router.get("/jobs/{user_id}")
def get_employer_jobs(user_id: str):
    jobs = list(jobs_collection.find({"company_id": user_id}, {"_id": 0}))
    return jobs

@router.get("/dashboard/{user_id}")
def get_employer_dashboard(user_id: str):
    jobs_count = jobs_collection.count_documents({"company_id": user_id})
    
    # Get all job IDs for this employer
    employer_jobs = list(jobs_collection.find({"company_id": user_id}, {"_id": 0}))
    job_ids = [job["job_id"] for job in employer_jobs]
    
    applicants_count = applications_collection.count_documents({"job_id": {"$in": job_ids}})
    shortlisted_count = applications_collection.count_documents({"job_id": {"$in": job_ids}, "status": "Shortlisted"})
    
    # Recent jobs (last 3 posted)
    recent_jobs = sorted(employer_jobs, key=lambda x: x.get("created_at", ""), reverse=True)[:3]
    for job in recent_jobs:
        if "created_at" in job and hasattr(job["created_at"], "isoformat"):
            job["created_at"] = job["created_at"].isoformat()
    
    # Recent applicants (last 5 across all jobs)
    recent_applications = list(applications_collection.find(
        {"job_id": {"$in": job_ids}},
        {"_id": 0}
    ).sort("applied_at", -1).limit(5))
    
    # Enrich applicants with user and job info
    for app in recent_applications:
        user = users_collection.find_one({"id": app.get("candidate_id")}, {"_id": 0, "password": 0})
        if not user:
            user = users_collection.find_one({"user_id": app.get("candidate_id")}, {"_id": 0, "password": 0})
        app["user"] = user or {}
        
        # Get job title
        job_doc = jobs_collection.find_one({"job_id": app.get("job_id")}, {"_id": 0, "title": 1, "company_name": 1})
        app["job_title"] = job_doc.get("title", "Unknown Job") if job_doc else "Unknown Job"
        
        if "applied_at" in app and hasattr(app["applied_at"], "isoformat"):
            app["applied_at"] = app["applied_at"].isoformat()
    
    return {
        "jobs_posted": jobs_count,
        "applicants_count": applicants_count,
        "shortlisted_count": shortlisted_count,
        "recent_jobs": recent_jobs,
        "recent_applicants": recent_applications
    }

@router.get("/applicants/{job_id}")
def get_applicants(job_id: str, role: str = None):
    query = {"job_id": job_id}
    if role == "admin":
        query["status"] = {"$ne": "Shortlisted"}
    applications = list(applications_collection.find(query, {"_id": 0}))
    for app in applications:
        # get user info
        user = users_collection.find_one({"id": app["candidate_id"]}, {"_id": 0, "password": 0})
        if not user:
            user = users_collection.find_one({"user_id": app["candidate_id"]}, {"_id": 0, "password": 0})
        app["user"] = user
        
        # get candidate profile info
        candidate = candidates_collection.find_one({"user_id": app["candidate_id"]}, {"_id": 0})
        app["candidate"] = candidate if candidate else {}
    return applications

@router.put("/applications/{application_id}/status")
def update_application_status(application_id: str, payload: dict, background_tasks: BackgroundTasks):
    # payload: {"status": "Shortlisted"}
    status = payload.get("status")

    # Fetch application first to get candidate_id and job_id
    app = applications_collection.find_one({"application_id": application_id})
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")

    res = applications_collection.update_one(
        {"application_id": application_id},
        {"$set": {"status": status}}
    )
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Application not found")

    if status == "Shortlisted":
        candidate_id = app.get("candidate_id")
        job_id = app.get("job_id")

        user = users_collection.find_one({"id": candidate_id})
        if user:
            candidate_name = user.get("name", "Candidate")
            candidate_email = user.get("email")

            job = jobs_collection.find_one({"job_id": job_id})
            if job:
                job_title = job.get("title", "Position")
                company_name = job.get("company_name", "the Company")

                if candidate_email:
                    from utils.email_utils import send_shortlist_email
                    background_tasks.add_task(send_shortlist_email, candidate_email, candidate_name, job_title, company_name)

    return {"message": "Status updated successfully"}

@router.put("/profile/{user_id}")
def update_company_profile(user_id: str, payload: dict):
    res = companies_collection.update_one(
        {"user_id": user_id},
        {"$set": {
            "company_name": payload.get("company_name", ""),
            "industry": payload.get("industry", ""),
            "description": payload.get("description", "")
        }},
        upsert=True
    )
    return {"message": "Profile updated successfully"}
