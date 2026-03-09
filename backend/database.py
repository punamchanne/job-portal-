from pymongo import MongoClient
from config import settings

client = MongoClient(settings.MONGO_URI)
db = client[settings.DATABASE_NAME]

users_collection = db["users"]
candidates_collection = db["candidates"]
companies_collection = db["companies"]
jobs_collection = db["jobs"]
applications_collection = db["applications"]
