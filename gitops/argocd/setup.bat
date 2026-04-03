kubectl create namespace argocd
kubectl apply -f argocd-deployment.yaml
kubectl apply -f argocd-service.yaml

kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 --decode