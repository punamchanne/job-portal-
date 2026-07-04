import os
import re
import shutil
from fastapi import UploadFile

UPLOAD_DIR = "uploads/resumes"

os.makedirs(UPLOAD_DIR, exist_ok=True)

def sanitize_filename(filename: str) -> str:
    """Replace spaces and special chars to make URL-safe filenames."""
    name, ext = os.path.splitext(filename)
    name = re.sub(r'[^\w\-]', '_', name)  # replace non-alphanumeric/dash/underscore with _
    name = re.sub(r'_+', '_', name).strip('_')  # collapse multiple underscores
    return f"{name}{ext}"

def save_upload_file(upload_file: UploadFile) -> str:
    safe_filename = sanitize_filename(upload_file.filename)
    file_location = os.path.join(UPLOAD_DIR, safe_filename)
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(upload_file.file, file_object)
    return file_location
