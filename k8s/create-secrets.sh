kubectl create secret generic amori-secrets \
  --from-literal=db-host='34.84.144.252' \
  --from-literal=db-user='root' \
  --from-literal=db-password='Amori1010!!' \
  --from-literal=db-name='amori' \
  --from-literal=jwt-secret-key='amori-secret-key-change-this-in-production-2024' \
  --dry-run=client -o yaml | kubectl apply -f -

echo "✅ Kubernetes Secret 'amori-secrets' 생성 완료"
