import os
from dotenv import load_dotenv

load_dotenv()

import uuid
import requests
from urllib.parse import urlencode
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.schemas import LoginResponse, UserResponse
from app.security import create_access_token

router = APIRouter(prefix="/api/oauth", tags=["Authentication"])

NAVER_AUTH_URL = "https://nid.naver.com/oauth2.0/authorize"
NAVER_TOKEN_URL = "https://nid.naver.com/oauth2.0/token"
NAVER_USER_URL = "https://openapi.naver.com/v1/nid/me"

CLIENT_ID = os.getenv("NAVER_CLIENT_ID")
CLIENT_SECRET = os.getenv("NAVER_CLIENT_SECRET")
REDIRECT_URI = os.getenv("NAVER_REDIRECT_URI")

@router.get("/nid/login")
async def naver_login():
    """
    네이버 로그인 URL로 리디렉트
    """
    state = uuid.uuid4().hex
    params = {
        "response_type": "code",
        "client_id": CLIENT_ID,
        "redirect_uri": REDIRECT_URI,
        "state": state,
    }
    url = f"{NAVER_AUTH_URL}?{urlencode(params)}"
    return RedirectResponse(url)


@router.get("/nid/callback")
async def naver_callback(code: str, state: str, db: Session = Depends(get_db)):
    """
    네이버 OAuth 콜백
    - 액세스 토큰 발급
    - 사용자 정보 조회
    - 회원 자동 생성 or 기존 계정 로그인
    - JWT 발급 후 프론트엔드로 리다이렉트
    """
    try:
        # 토큰 요청
        token_params = {
            "grant_type": "authorization_code",
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
            "code": code,
            "state": state,
            "redirect_uri": REDIRECT_URI
        }
        print(f"[DEBUG] 네이버 토큰 요청 파라미터: {token_params}")
        
        token_response = requests.post(NAVER_TOKEN_URL, data=token_params, verify=False)
        token_data = token_response.json()
        access_token = token_data.get("access_token")

        if not access_token:
            print(f"네이버 토큰 발급 실패: {token_data}")
            raise HTTPException(status_code=400, detail="네이버 토큰 발급 실패")

        # 사용자 정보 요청
        headers = {"Authorization": f"Bearer {access_token}"}
        user_response = requests.get(NAVER_USER_URL, headers=headers)
        user_data = user_response.json()
        user_info = user_data.get("response")

        if not user_info:
            print(f"네이버 사용자 정보 조회 실패: {user_data}")
            raise HTTPException(status_code=400, detail="네이버 사용자 정보 조회 실패")

        email = user_info.get("email")
        name = user_info.get("name")
        profile_image = user_info.get("profile_image")

        if not email:
            raise HTTPException(status_code=400, detail="이메일 정보를 가져올 수 없습니다")

        # 기존 유저 확인
        user = db.query(User).filter(User.email == email).first()

        # 신규 회원이면 자동 가입
        if not user:
            user = User(
                email=email,
                name=name or "네이버 사용자",
                status="ACTIVE",
                # profile_image_url=profile_image,  # 필요시 활성화
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            print(f"신규 네이버 유저 생성: {email}")

        # JWT 토큰 발급
        jwt_token = create_access_token(subject=str(user.id))

        # 프론트엔드로 리다이렉트하면서 토큰 전달
        frontend_url = f"https://amori.co.kr/dashboard?token={jwt_token}"
        return RedirectResponse(url=frontend_url)

    except HTTPException:
        raise
    except Exception as e:
        print(f"네이버 로그인 오류: {str(e)}")
        # 에러 발생 시 프론트엔드로 리다이렉트
        error_url = "https://amori.co.kr/login?error=oauth_failed"
        return RedirectResponse(url=error_url)