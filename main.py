from fastapi import FastAPI

app = FastAPI()

# 1. Health Check 엔드포인트
@app.get("/")
def read_root():
    """헬스 체크를 위한 루트 엔드포인트"""
    return {"status": "ok"}

# 2. /hello 엔드포인트
@app.get("/hello")
def read_hello():
    """요청하신 Hello World 출력"""
    return {"message": "Hello world"}