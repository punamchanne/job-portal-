from utils.youtube_helper import get_youtube_links

def analyze_skill_gap(candidate_skills, required_skills):
    candidate_set = set([s.lower() for s in candidate_skills])
    required_set = set([s.lower() for s in required_skills])
    
    missing_skills = list(required_set - candidate_set)
    matched_skills = list(required_set.intersection(candidate_set))
    
    # Improved learning resource suggestions using YouTube API
    resources = {}
    for skill in missing_skills:
        videos = get_youtube_links(f"{skill} tutorial for beginners")
        if videos:
            resources[skill] = videos
        else:
            # Fallback to direct search link
            resources[skill] = [
                {"title": f"Search for {skill} tutorials", "url": f"https://www.youtube.com/results?search_query={skill.replace(' ', '+')}+tutorial"}
            ]
        
    return {
        "required_skills": required_skills,
        "candidate_skills": candidate_skills,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "suggestions": resources
    }
