"""
Google Cloud Storage utilities for image upload.
Optimized for GKE deployment.
"""
from google.cloud import storage
import os
import uuid

GCS_BUCKET_NAME = os.getenv("GCS_BUCKET_NAME", "amori-photos")


def upload_image_to_gcs(file_bytes: bytes, filename: str, content_type: str) -> tuple[str, str]:
    """
    Upload image to GCS bucket and return (public URL, object key).
    """
    try:
        client = storage.Client()
        bucket = client.bucket(GCS_BUCKET_NAME)

        ext = filename.split('.')[-1] if '.' in filename else 'jpg'
        unique_key = f"covers/{uuid.uuid4()}.{ext}"

        blob = bucket.blob(unique_key)
        blob.upload_from_string(file_bytes, content_type=content_type)
        blob.make_public()

        return blob.public_url, unique_key
    except Exception as e:
        raise Exception(f"Failed to upload image to GCS: {str(e)}")


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
