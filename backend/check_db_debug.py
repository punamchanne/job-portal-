from pymongo import MongoClient
import pprint

MONGO_URI = "mongodb://localhost:27017"
client = MongoClient(MONGO_URI)
db = client["jobify"]

email = "punamchanne51@gmail.com"
user = db.users.find_one({"email": email})

if not user:
    print(f"User with email {email} not found")
else:
    user_id = user.get("id") or user.get("user_id")
    print(f"User ID: {user_id}")
    
    candidate = db.candidates.find_one({"user_id": user_id})
    print("Candidate Data:")
    pprint.pprint(candidate)
