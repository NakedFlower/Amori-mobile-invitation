from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

from app.routers import auth, user, oauth
from app.database import engine, Base

load_dotenv()

# FastAPI 앱 생성
app = FastAPI(
    title="Amori API",
    description="Wedding invitation platform API",
    version="1.0.0"
)

# CORS 설정 (프론트엔드와 통신)
FRONTEND_URL = os.getenv("FRONTEND_URLS")

# 허용할 origin 목록
allowed_origins = [
    "http://localhost:3000",
    "http://amori.co.kr",
    "https://amori.co.kr",
    "http://www.amori.co.kr",
    "https://www.amori.co.kr",
]

# 환경변수로 추가 origin이 설정되어 있으면 추가
if FRONTEND_URL and FRONTEND_URL not in allowed_origins:
    allowed_origins.append(FRONTEND_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# 라우터 등록
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(oauth.router)

# Health Check 엔드포인트 (GKE Liveness/Readiness Probe용)
@app.get("/")
@app.get("/health")
def health_check():
    """헬스 체크를 위한 엔드포인트"""
    return {
        "status": "healthy",
        "service": "amori-api",
        "version": "1.0.0"
    }

# 앱 시작 시 DB 테이블 생성 (개발용, 프로덕션에서는 마이그레이션 도구 사용 권장)
@app.on_event("startup")
async def startup_event():
    # Base.metadata.create_all(bind=engine)
    # 주석 처리: DDL이 이미 존재하므로 테이블 자동 생성 비활성화
    pass
