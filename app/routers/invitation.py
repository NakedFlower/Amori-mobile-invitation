from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status, Header
from sqlalchemy.orm import Session
from datetime import datetime
from typing import Optional

from app.database import get_db
from app.models import Invitation, InvitationDetails
from app.schemas import ImageUploadResponse, InvitationCreateRequest, InvitationCreateResponse
from app.routers.user import get_current_user
from app.gcs_utils import upload_image_to_gcs

router = APIRouter(prefix="/api/invitations", tags=["Invitations"])


@router.post("/upload-cover", response_model=ImageUploadResponse)
async def upload_cover_image(
    image: UploadFile = File(...),
):
    try:
        file_bytes = await image.read()
        url, key = upload_image_to_gcs(file_bytes, image.filename, image.content_type or "image/jpeg")
        return ImageUploadResponse(url=url, key=key)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.post("", response_model=InvitationCreateResponse)
async def create_invitation(
    payload: InvitationCreateRequest,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    try:
        inv = Invitation(
            user_id=current_user.id,
            template_id=payload.template_id,
            groom_name=payload.groom_name,
            bride_name=payload.bride_name,
            wedding_date=payload.wedding_date,
            wedding_time=payload.wedding_time,
            venue_address=payload.venue_address,
        )
        db.add(inv)
        db.flush()

        details = InvitationDetails(
            invitation_id=inv.invitation_id,
            cover_photo_key=payload.cover_photo_key,
            section_content={
                "venue_name": payload.venue_name,
            },
        )
        db.add(details)
        db.commit()

        return InvitationCreateResponse(invitation_id=inv.invitation_id, status=str(inv.status))
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
