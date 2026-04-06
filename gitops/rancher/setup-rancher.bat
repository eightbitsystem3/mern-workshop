kubectl apply -f https://github.com/cert-manager/cert-manager/releases/latest/download/cert-manager.yaml
helm repo add rancher-latest https://releases.rancher.com/server-charts/latest
helm repo update
kubectl create namespace cattle-system
helm install rancher rancher-latest/rancher --namespace cattle-system --set hostname=rancher.localhost --set bootstrapPassword=admin --set replicas=1
kubectl -n cattle-system port-forward svc/rancher 8443:443
REM Root@1234567890