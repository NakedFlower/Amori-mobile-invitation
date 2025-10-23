"""
Google Cloud Storage utilities for image upload.
Optimized for GKE deployment.
(임시 비활성화)
"""
# from google.cloud import storage
# import os
# import uuid
# from datetime import timedelta

# GCS_BUCKET_NAME = os.getenv("GCS_BUCKET_NAME", "amori-photos")


# def upload_image_to_gcs(file_bytes: bytes, filename: str, content_type: str) -> str:
#     """
#     Upload image to GCS bucket and return public URL.
#     
#     Args:
#         file_bytes: Image file bytes
#         filename: Original filename
#         content_type: MIME type (e.g., 'image/jpeg')
#     
#     Returns:
#         Public URL of uploaded image
#     """
#     try:
#         # GCS 클라이언트 초기화 (GKE에서 자동으로 서비스 계정 인증)
#         client = storage.Client()
#         bucket = client.bucket(GCS_BUCKET_NAME)
#         
#         # 고유한 파일명 생성 (UUID + 원본 확장자)
#         ext = filename.split('.')[-1] if '.' in filename else 'jpg'
#         unique_filename = f"profiles/{uuid.uuid4()}.{ext}"
#         
#         # Blob 생성 및 업로드
#         blob = bucket.blob(unique_filename)
#         blob.upload_from_string(file_bytes, content_type=content_type)
#         
#         # Public URL 생성
#         blob.make_public()
#         
#         return blob.public_url
#     
#     except Exception as e:
#         raise Exception(f"Failed to upload image to GCS: {str(e)}")


# def delete_image_from_gcs(image_url: str) -> bool:
#     """
#     Delete image from GCS bucket.
#     
#     Args:
#         image_url: Full GCS public URL
#     
#     Returns:
#         True if successful, False otherwise
#     """
#     try:
#         client = storage.Client()
#         bucket = client.bucket(GCS_BUCKET_NAME)
#         
#         # URL에서 blob 이름 추출
#         blob_name = image_url.split(f"{GCS_BUCKET_NAME}/")[-1]
#         blob = bucket.blob(blob_name)
#         blob.delete()
#         
#         return True
#     except Exception:
#         return False
