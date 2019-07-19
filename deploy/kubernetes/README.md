# Kubernetes

K8s deployments, services, ingresses.

## Install kubectl

https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl-on-macos

## Authenticate kubectl

```
doctl kubernetes cluster kubeconfig save tql-k8s-staging
kubectl get nodes -o wide
```

## Install helm

```
brew install kubernetes-helm
```

## Install tiller

```
helm init --history-max 200
kubectl create serviceaccount --namespace kube-system tiller
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
kubectl patch deploy --namespace kube-system tiller-deploy -p '{"spec":{"template":{"spec":{"serviceAccount":"tiller"}}}}'
helm init --service-account tiller --upgrade
```

## Install nginx-ingress

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/nginx-0.24.1/deploy/mandatory.yaml
kubectl apply -f ingress/default.yml
```

## Install cert-manager

```
kubectl apply -f https://raw.githubusercontent.com/jetstack/cert-manager/release-0.8/deploy/manifests/00-crds.yaml
kubectl label namespace kube-system certmanager.k8s.io/disable-validation="true"
helm repo add jetstack https://charts.jetstack.io
helm install --name cert-manager --namespace kube-system jetstack/cert-manager --version v0.8.1
```

## Install registry-creds

https://github.com/upmc-enterprises/registry-creds#how-to-setup-running-in-aws

```
kubectl apply -f registry/secret.yml
kubectl apply -f registry/replicationController.yml
```
