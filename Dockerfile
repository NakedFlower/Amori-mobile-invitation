# 1. 기본 이미지 설정 (Python 3.10)
FROM python:3.10-slim

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 의존성 파일 복사 및 설치
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# 4. 앱 소스코드 복사
COPY . .

# 5. 앱 실행 (GKE는 기본적으로 8080 포트를 선호합니다)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]