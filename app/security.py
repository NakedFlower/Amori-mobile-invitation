"""
Security utilities: password hashing and JWT handling.
"""
from datetime import datetime, timedelta
from typing import Optional
from jose import jwt
import hashlib
from passlib.context import CryptContext
import os


# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-secret-change-me")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("JWT_ACCESS_TOKEN_EXPIRE_MINUTES", "1440"))


def hash_password(password: str) -> str:
    # 1. UTF-8 인코딩 후 SHA-256 해싱
    sha256_bytes = hashlib.sha256(password.encode('utf-8')).digest()  # digest() → 32 bytes
    # 2. bcrypt 해싱 (bytes 그대로 사용하면 72바이트 제한 내)
    return pwd_context.hash(sha256_bytes)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    sha256_bytes = hashlib.sha256(plain_assword.encode('utf-8')).digest()
    return pwd_context.verify(sha256_bytes, hashed_password)


def create_access_token(subject: str, expires_delta: Optional[timedelta] = None) -> str:
    if expires_delta is None:
        expires_delta = timedelta(minutes=JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
    expire = datetime.utcnow() + expires_delta
    to_encode = {"sub": subject, "exp": expire}
    return jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
