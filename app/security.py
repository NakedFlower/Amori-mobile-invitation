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
    # return pwd_context.hash(password)
    # 1. SHA-256으로 먼저 해시
    sha256_bytes = hashlib.sha256(password.encode("utf-8")).digest()
    # 2. bcrypt는 문자열만 받으므로 hex 문자열로 변환
    hex_string = sha256_bytes.hex()
    # 3. bcrypt 해싱
    return pwd_context.hash(hex_string)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    sha256_bytes = hashlib.sha256(plain_password.encode("utf-8")).digest()
    hex_string = sha256_bytes.hex()
    return pwd_context.verify(hex_string, hashed_password)


def create_access_token(subject: str, expires_delta: Optional[timedelta] = None) -> str:
    if expires_delta is None:
        expires_delta = timedelta(minutes=JWT_ACCESS_TOKEN_EXPIRE_MINUTES)
    expire = datetime.utcnow() + expires_delta
    to_encode = {"sub": subject, "exp": expire}
    return jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
