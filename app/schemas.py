"""
Pydantic schemas for request/response validation.
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime, date, time

# ===== 회원가입 =====
class SignupRequest(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=1, max_length=100)
    phone: Optional[str] = Field(None, max_length=20)
    password: str = Field(..., min_length=8, max_length=100)
    # profile_image_url: Optional[str] = None

class SignupResponse(BaseModel):
    id: int
    email: str
    name: str
    message: str = "회원가입 성공"

# ===== 로그인 =====
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserResponse"

# ===== 사용자 정보 =====
class UserResponse(BaseModel):
    id: int
    email: str
    name: str
    phone: Optional[str]
    # profile_image_url: Optional[str]
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# ===== 초대장 생성/저장 =====
class InvitationCreateRequest(BaseModel):
    template_id: int
    wedding_date: Optional[date]
    wedding_time: Optional[time]
    venue_address: Optional[str]
    venue_name: Optional[str]
    groom_name: Optional[str]
    bride_name: Optional[str]
    cover_photo_key: Optional[str]

class InvitationCreateResponse(BaseModel):
    invitation_id: int
    status: str
    message: str = "초대장 저장 성공"

# ===== 이미지 업로드 =====
class ImageUploadResponse(BaseModel):
    url: str
    key: str
    message: str = "이미지 업로드 성공"

# ===== 에러 응답 =====
class ErrorResponse(BaseModel):
    detail: str
