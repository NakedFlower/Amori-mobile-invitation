kubectl create secret generic amori-secrets \
  --from-literal=db-host='10.208.112.6' \
  --from-literal=db-user='dev' \
  --from-literal=db-password='Dev1010!!' \
  --from-literal=db-name='amori' \
  --from-literal=jwt-secret-key='amori-secret-key-change-this-in-production-2024' \
  --dry-run=client -o yaml | kubectl apply -f -

echo "✅ Kubernetes Secret 'amori-secrets' 생성 완료"
