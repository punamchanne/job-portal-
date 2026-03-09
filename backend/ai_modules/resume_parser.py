import pdfplumber
import re
import spacy

# Load English tokenizer, tagger, parser, NER and word vectors
# Warning: Ensure the model is downloaded `python -m spacy download en_core_web_sm`
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "spacy", "download", "en_core_web_sm"])
    nlp = spacy.load("en_core_web_sm")

SKILLS_DB = {
    "python", "java", "c++", "c#", "javascript", "typescript", "react", "angular", "vue",
    "node.js", "express", "django", "flask", "fastapi", "spring boot", "sql", "mysql",
    "postgresql", "mongodb", "aws", "azure", "gcp", "docker", "kubernetes", "machine learning",
    "deep learning", "nlp", "computer vision", "data science", "pandas", "numpy", "scikit-learn",
    "tensorflow", "pytorch", "power bi", "tableau", "excel", "git", "linux", "html", "css"
}

def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text

def extract_skills(text):
    text_lower = text.lower()
    doc = nlp(text_lower)
    skills = []
    
    # Simple extraction using predefined skill list
    for token in doc:
        if token.text in SKILLS_DB:
            skills.append(token.text)
            
    # To capture multi-word skills
    for skill in SKILLS_DB:
        if len(skill.split()) > 1 and skill in text_lower:
            skills.append(skill)
            
    return list(set(skills))

def extract_education(text):
    # Simplified mock implementation
    education_keywords = ["bachelor", "master", "phd", "b.sc", "b.tech", "m.tech", "university", "college", "degree"]
    education = []
    lines = text.split("\n")
    for line in lines:
        if any(keyword in line.lower() for keyword in education_keywords):
            education.append(line.strip())
    return education[:2] # Return top 2 matching lines

def extract_experience(text):
    # Simplified mock implementation
    experience = []
    experience_keywords = ["experience", "work history", "employment", "internship", "developer", "engineer", "manager"]
    lines = text.split("\n")
    for line in lines:
        if any(keyword in line.lower() for keyword in experience_keywords) and len(line) > 10:
            experience.append(line.strip())
    return experience[:3]

def extract_certifications(text):
    cert_keywords = ["certification", "certificate", "certified", "coursera", "udemy", "cisco", "aws", "microsoft"]
    certifications = []
    lines = text.split("\n")
    for line in lines:
        if any(keyword in line.lower() for keyword in cert_keywords) and len(line) > 10 and len(line) < 100:
            certifications.append(line.strip())
    return certifications[:3]

def parse_resume(pdf_path):
    text = extract_text_from_pdf(pdf_path)
    if not text:
        return {"skills": [], "education": [], "experience": [], "certifications": []}
        
    skills = extract_skills(text)
    education = extract_education(text)
    experience = extract_experience(text)
    certifications = extract_certifications(text)
    
    return {
        "skills": skills,
        "education": education,
        "experience": experience,
        "certifications": certifications
    }
