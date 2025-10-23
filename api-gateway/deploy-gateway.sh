#!/bin/bash

# API Gateway 배포 스크립트
# 실행 전에 INGRESS_IP를 확인하고 openapi-spec.yaml에 입력해야 합니다.

PROJECT_ID="amori-475204"
REGION="asia-northeast1"
API_ID="amori-api"
GATEWAY_ID="amori-gateway"

echo "🚀 API Gateway 배포 시작..."

# 1. API 생성
echo "📝 Step 1: API 생성 중..."
gcloud api-gateway apis create $API_ID \
  --project=$PROJECT_ID \
  --display-name="Amori API"

# 2. API Config 생성 (OpenAPI spec 업로드)
echo "📝 Step 2: API Config 생성 중..."
gcloud api-gateway api-configs create amori-config-v1 \
  --api=$API_ID \
  --project=$PROJECT_ID \
  --openapi-spec=openapi-spec.yaml \
  --backend-auth-service-account=amori-api-gateway@${PROJECT_ID}.iam.gserviceaccount.com

# 3. Gateway 생성
echo "📝 Step 3: Gateway 생성 중..."
gcloud api-gateway gateways create $GATEWAY_ID \
  --api=$API_ID \
  --api-config=amori-config-v1 \
  --location=$REGION \
  --project=$PROJECT_ID

echo "✅ API Gateway 배포 완료!"
echo ""
echo "📌 Gateway 정보 확인:"
gcloud api-gateway gateways describe $GATEWAY_ID \
  --location=$REGION \
  --project=$PROJECT_ID

echo ""
echo "🌐 Gateway URL을 프론트엔드 .env에 설정하세요:"
echo "REACT_APP_API_URL=<Gateway URL>"
