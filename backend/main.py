from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from routes import auth_routes, candidate_routes, employer_routes, admin_routes, chatbot_routes
from database import users_collection
from config import settings
from utils.auth_utils import hash_password
import uuid
import datetime

app = FastAPI(title="Jobify API", description="Production-ready AI-based Job and Internship Recommendation System", version="1.0.0")

# Create uploads directory and mount static files
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.on_event("startup")
async def create_admin():
    # Check if admin user exists in DB
    admin = users_collection.find_one({"role": "admin"})
    if not admin:
        # Create default admin from .env
        admin_data = {
            "id": str(uuid.uuid4()),
            "name": "System Administrator",
            "email": settings.ADMIN_EMAIL,
            "password": hash_password(settings.ADMIN_PASSWORD),
            "role": "admin",
            "created_at": datetime.datetime.utcnow()
        }
        users_collection.insert_one(admin_data)
        print(f"Created Default Admin: {settings.ADMIN_EMAIL}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (Vercel, localhost, etc.)
    allow_credentials=False,  # Must be False when allow_origins=["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router)
app.include_router(candidate_routes.router)
app.include_router(employer_routes.router)
app.include_router(admin_routes.router)
app.include_router(chatbot_routes.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Jobify API. System is up and running."}

# to run: uvicorn main:app --reload

