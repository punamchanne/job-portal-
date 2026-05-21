from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def calculate_match_percentage(candidate_skills, required_skills):
    candidate_set = set([skill.lower() for skill in candidate_skills])
    required_set = set([skill.lower() for skill in required_skills])
    
    if not required_set:
        return 100.0
    
    matched = candidate_set.intersection(required_set)
    match_score = (len(matched) / len(required_set)) * 100
    return round(match_score, 2)

def recommend_jobs_tfidf(candidate_skills, jobs):
    """
    jobs: list of dictionaries representing jobs: [{'id': str, 'title': str, 'required_skills': list}]
    """
    if not candidate_skills or not jobs:
        return []

    # Prepare document list
    candidate_doc = " ".join(candidate_skills)
    job_docs = [" ".join(job.get('required_skills', [])) for job in jobs]
    
    docs = [candidate_doc] + job_docs
    
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(docs)
    
    # Calculate cosine similarity
    cosine_sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:])
    
    similarities = cosine_sim.flatten()
    
    # Sort indices by similarity
    sorted_indices = similarities.argsort()[::-1]
    
    recommended_jobs = []
    for idx in sorted_indices:
        job_copy = jobs[idx].copy()
        job_copy['ai_match_score'] = round(float(similarities[idx]) * 100, 2)
        # Re-calculate literal match percentage
        job_copy['match_percentage'] = calculate_match_percentage(
            candidate_skills, job_copy.get('required_skills', [])
        )
        recommended_jobs.append(job_copy)
            
    # Return all jobs sorted by match score (no hard limit)
    return recommended_jobs
