import os
import requests
from fastapi import APIRouter, HTTPException, Query

router = APIRouter(prefix="/api/places", tags=["Places"])

KAKAO_REST_API_KEY = os.getenv("KAKAO_REST_API_KEY")
KAKAO_SEARCH_URL = "https://dapi.kakao.com/v2/local/search/keyword.json"


@router.get("/search")
async def search_places(query: str = Query(..., min_length=1, max_length=100), size: int = 10):
    if not KAKAO_REST_API_KEY:
        raise HTTPException(status_code=500, detail="Kakao API key not configured")
    try:
        headers = {"Authorization": f"KakaoAK {KAKAO_REST_API_KEY}"}
        params = {"query": query, "size": size}
        resp = requests.get(KAKAO_SEARCH_URL, headers=headers, params=params, timeout=5)
        if resp.status_code != 200:
            raise HTTPException(status_code=resp.status_code, detail="Kakao search failed")
        data = resp.json()
        results = []
        for doc in data.get("documents", []):
            results.append({
                "name": doc.get("place_name"),
                "address": doc.get("road_address_name") or doc.get("address_name"),
            })
        return {"items": results}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
