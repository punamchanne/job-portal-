from googleapiclient.discovery import build
from config import settings

def get_youtube_links(query, max_results=2):
    if not settings.YOUTUBE_API_KEY:
        return []
    
    try:
        youtube = build("youtube", "v3", developerKey=settings.YOUTUBE_API_KEY)
        request = youtube.search().list(
            q=query,
            part="snippet",
            type="video",
            maxResults=max_results
        )
        response = request.execute()
        
        links = []
        for item in response.get("items", []):
            video_id = item["id"]["videoId"]
            title = item["snippet"]["title"]
            links.append({
                "title": title,
                "url": f"https://www.youtube.com/watch?v={video_id}"
            })
        return links
    except Exception as e:
        print(f"YouTube API Error: {e}")
        return []
