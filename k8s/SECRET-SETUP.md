# Kubernetes Secret 설정 가이드

k3s 클러스터에 애플리케이션을 배포하기 위해 필요한 Secret을 생성합니다.

## 1. 애플리케이션 환경변수 Secret (amori-secrets)

DB 연결 정보와 JWT 설정을 포함합니다.

**마스터 노드 웹터미널에서 실행:**

```bash
kubectl create secret generic amori-secrets \
  --from-literal=db-host='34.41.85.255' \
  --from-literal=db-user='dev' \
  --from-literal=db-password='Dev1010!!' \
  --from-literal=db-name='amori' \
  --from-literal=jwt-secret-key='amori-secret-key-change-this-in-production-2024'
```

**확인:**
```bash
kubectl get secret amori-secrets
kubectl describe secret amori-secrets
```

---

## 2. Artifact Registry 인증 Secret (gcr-key)

Docker 이미지를 Artifact Registry에서 pull하기 위한 인증 정보입니다.

### 2-1. GCP 서비스 계정 키 준비

1. GCP Console에서 서비스 계정 키 다운로드 (JSON)
2. 키 파일을 마스터 노드에 업로드 (예: `key.json`)

### 2-2. Secret 생성

**마스터 노드 웹터미널에서 실행:**

```bash
kubectl create secret docker-registry gcr-key \
  --docker-server=us-central1-docker.pkg.dev \
  --docker-username=_json_key \
  --docker-password="$(cat /path/to/key.json)" \
  --docker-email=your-email@example.com
```

**⚠️ 주의:** `/path/to/key.json`을 실제 키 파일 경로로 변경하세요.

**확인:**
```bash
kubectl get secret gcr-key
kubectl describe secret gcr-key
```

**보안:** Secret 생성 후 키 파일은 삭제하는 것을 권장합니다.
```bash
rm /path/to/key.json
```

---

## 3. 배포 확인

Secret이 모두 생성되었는지 확인:

```bash
kubectl get secrets
```

출력 예시:
```
NAME            TYPE                             DATA   AGE
amori-secrets   Opaque                           5      1m
gcr-key         kubernetes.io/dockerconfigjson   1      1m
```

---

## 4. 배포 실행

Secret 생성 후 deployment 적용:

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml
```

**Pod 상태 확인:**
```bash
kubectl get pods
kubectl logs <pod-name>
```
