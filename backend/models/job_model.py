from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class JobCreate(BaseModel):
    title: str = Field(..., max_length=150)
    description: str
    required_skills: List[str]
    location: str
    salary: str
    job_type: str = Field(default="Full Time")

class JobResponse(JobCreate):
    id: str
    company_id: str
    created_at: datetime
    company_name: Optional[str] = None

class ApplicationCreate(BaseModel):
    job_id: str
    candidate_id: str

class ApplicationResponse(BaseModel):
    id: str
    job_id: str
    candidate_id: str
    match_score: float
    status: str
    created_at: datetime
