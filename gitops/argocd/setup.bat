kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

#kubectl port-forward svc/argocd-server -n argocd 8080:443
#kubectl get secret argocd-initial-admin-secret -n argocd -o go-template="{{.data.password | base64decode}}"
#kubectl port-forward svc/mern-frontend-service -n mern 80:80