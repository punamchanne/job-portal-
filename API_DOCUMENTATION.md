# Jobify API Documentation

This FastAPI backend serves as the engine for the Jobify Recommendation System.

## Endpoints

### 1. Authentication
- `POST /api/auth/signup` - Register a new user (`candidate` or `employer`).
- `POST /api/auth/login` - Authenticate and receive a JWT token.

### 2. Candidate Panel
- `POST /api/candidate/upload-resume/{user_id}` - Upload PDF/DOC resume, parser extracts skills/education/exp.
- `GET /api/candidate/recommendations/{user_id}` - AI-based job recommendations using TF-IDF and Cosine Similarity.
- `GET /api/candidate/skill-gap/{user_id}/{job_id}` - Analyzes target job requirements and compares to candidate skills.
- `POST /api/candidate/apply` - Submit job application.
- `GET /api/candidate/applications/{user_id}` - List applied jobs.

### 3. Employer Panel
- `POST /api/employer/jobs` - Post a new job (includes required skills).
- `GET /api/employer/jobs/{user_id}` - Fetch jobs posted by the company.
- `GET /api/employer/dashboard/{user_id}` - Employer stats.
- `GET /api/employer/applicants/{job_id}` - View candidates who applied to a job.
- `PUT /api/employer/applications/{application_id}/status` - Update application status (e.g. `Shortlisted`).

### 4. Admin Panel
- `GET /api/admin/dashboard` - Platform statistics.
- `GET /api/admin/users` - View all users.
- `DELETE /api/admin/users/{user_id}` - Delete a user.
- `GET /api/admin/jobs` - View all active jobs.
- `DELETE /api/admin/jobs/{job_id}` - Remove spam job posts.

## Swagger Documentation
Once the local server is running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
