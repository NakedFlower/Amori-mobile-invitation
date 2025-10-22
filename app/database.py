"""
Database configuration and connection management for GKE deployment.
Uses connection pooling for optimal performance.
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import QueuePool
import os
from dotenv import load_dotenv

load_dotenv()

# Database configuration
DB_HOST = os.getenv("DB_HOST", "34.84.144.252")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_USER = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME", "amori")

# Connection string for MySQL
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Engine with connection pooling for GKE performance
engine = create_engine(
    DATABASE_URL,
    poolclass=QueuePool,
    pool_size=5,          # 기본 커넥션 풀 크기
    max_overflow=10,      # 최대 초과 커넥션
    pool_timeout=30,      # 커넥션 대기 타임아웃
    pool_recycle=3600,    # 1시간마다 커넥션 재생성 (CloudSQL 8시간 타임아웃 방지)
    pool_pre_ping=True,   # 커넥션 유효성 사전 체크
    echo=False            # SQL 로깅 비활성화 (프로덕션)
)

# Session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Dependency for FastAPI
def get_db():
    """Database session dependency for FastAPI endpoints."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
