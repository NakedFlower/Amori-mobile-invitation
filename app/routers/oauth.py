import os
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
    - JWT 발급
    """
    # 토큰 요청
    token_params = {
        "grant_type": "authorization_code",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "code": code,
        "state": state,
    }
    token_response = requests.get(NAVER_TOKEN_URL, params=token_params)
    token_data = token_response.json()
    access_token = token_data.get("access_token")

    if not access_token:
        raise HTTPException(status_code=400, detail="네이버 토큰 발급 실패")

    # 사용자 정보 요청
    headers = {"Authorization": f"Bearer {access_token}"}
    user_response = requests.get(NAVER_USER_URL, headers=headers)
    user_info = user_response.json().get("response")

    if not user_info:
        raise HTTPException(status_code=400, detail="네이버 사용자 정보 조회 실패")

    email = user_info.get("email")
    name = user_info.get("name")
    profile_image = user_info.get("profile_image")

    # 기존 유저 확인
    user = db.query(User).filter(User.email == email).first()

    # 신규 회원이면 자동 가입
    if not user:
        user = User(
            email=email,
            name=name,
            status="ACTIVE",
            # profile_image_url=profile_image,  # 선택
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        # 소셜 로그인은 비밀번호 없음 → UserCredential 생성 안 해도 됨
        print(f"신규 네이버 유저 생성: {email}")

    # JWT 토큰 발급
    access_token = create_access_token(subject=str(user.id))

    return LoginResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse.from_orm(user)
    )
