"""
Database models matching the MySQL DDL schema.
"""
from sqlalchemy import Column, BigInteger, Integer, String, DateTime, Enum, Boolean, Text, ForeignKey
from sqlalchemy.sql import func
from app.database import Base
import enum

class UserStatus(str, enum.Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
    LOCKED = "LOCKED"
    DELETED = "DELETED"

class TwoFAType(str, enum.Enum):
    TOTP = "TOTP"
    SMS = "SMS"
    EMAIL = "EMAIL"
    APP = "APP"

class AuthProviderName(str, enum.Enum):
    LOCAL = "LOCAL"
    GOOGLE = "GOOGLE"
    NAVER = "NAVER"
    KAKAO = "KAKAO"
    APPLE = "APPLE"
    GITHUB = "GITHUB"

class User(Base):
    """사용자 기본 정보"""
    __tablename__ = "user"
    
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(20))
    profile_image_url = Column(String(500))
    status = Column(Enum(UserStatus), default=UserStatus.ACTIVE)
    created_at = Column(DateTime, server_default=func.current_timestamp())
    updated_at = Column(DateTime, server_default=func.current_timestamp(), onupdate=func.current_timestamp())

class UserCredential(Base):
    """비밀번호 기반 인증 정보"""
    __tablename__ = "user_credential"
    
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    user_id = Column(BigInteger, ForeignKey("user.id"), nullable=False, index=True)
    password_hash = Column(String(255))
    salt = Column(String(255))
    last_password_change = Column(DateTime)
    login_attempts = Column(Integer, default=0)
    locked_until = Column(DateTime)

class User2FA(Base):
    """2단계 인증 정보"""
    __tablename__ = "user_2fa"
    
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    user_id = Column(BigInteger, ForeignKey("user.id"), nullable=False, index=True)
    type = Column(Enum(TwoFAType), nullable=False)
    secret_key = Column(String(255))
    phone_number = Column(String(20))
    email = Column(String(255))
    enabled = Column(Boolean, default=False)
    last_verified_at = Column(DateTime)

class AuthProvider(Base):
    """인증 제공자 정보"""
    __tablename__ = "auth_provider"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(Enum(AuthProviderName), unique=True, nullable=False)
    authorization_endpoint = Column(String(500))
    token_endpoint = Column(String(500))
    userinfo_endpoint = Column(String(500))
    client_id = Column(String(255))
    client_secret = Column(String(255))

class AuthInfo(Base):
    """소셜/외부 로그인 정보"""
    __tablename__ = "auth_info"
    
    id = Column(BigInteger, primary_key=True, autoincrement=True)
    user_id = Column(BigInteger, ForeignKey("user.id"), nullable=False, index=True)
    provider_id = Column(Integer, ForeignKey("auth_provider.id"), nullable=False)
    external_user_id = Column(String(255), nullable=False)
    access_token = Column(Text)
    refresh_token = Column(Text)
    scope = Column(String(255))
    expires_at = Column(DateTime)
    linked_at = Column(DateTime, server_default=func.current_timestamp())
