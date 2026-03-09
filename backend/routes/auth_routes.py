from fastapi import APIRouter, HTTPException, Depends
from passlib.context import CryptContext
from datetime import timedelta
import uuid

from models.user_model import UserCreate, UserLogin, UserResponse
from database import users_collection, candidates_collection, companies_collection
from utils.auth_utils import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/signup", response_model=UserResponse)
def signup(user: UserCreate):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
        
    user_dict = user.model_dump()
    user_dict["password"] = hash_password(user.password)
    user_dict["id"] = str(uuid.uuid4())
    user_dict["created_at"] = __import__("datetime").datetime.utcnow()
    
    # Verification for employers
    if user.role == "employer":
        user_dict["is_verified"] = False
    else:
        user_dict["is_verified"] = True
    
    users_collection.insert_one(user_dict)
    
    # Initialize appropriate profile
    if user.role == "candidate":
        candidates_collection.insert_one({"user_id": user_dict["id"], "skills": [], "education": [], "experience": []})
    elif user.role == "employer":
        companies_collection.insert_one({
            "user_id": user_dict["id"], 
            "company_name": user.organization_name or f"{user.name}'s Company", 
            "address": user.address or "",
            "contact_number": user.contact_number or "",
            "industry": "", 
            "description": ""
        })
        
    return user_dict

@router.post("/login")
def login(user: UserLogin):
    db_user = users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
        
    if db_user.get("role") == "employer" and not db_user.get("is_verified", True):
        raise HTTPException(status_code=403, detail="Profile is under verification by Admin. Please wait for approval.")

        
    access_token = create_access_token(data={"sub": db_user["id"], "role": db_user["role"]})
    return {"access_token": access_token, "token_type": "bearer", "role": db_user["role"], "id": db_user["id"], "name": db_user["name"]}
