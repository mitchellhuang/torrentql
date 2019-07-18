# Kubernetes

K8s deployments, services, ingresses.

## Install kubectl

https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl-on-macos

## Authenticate kubectl

```
mkdir ~/.kube
cp ~/admin.conf ~/.kube/config
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

## Install metallb

```
kubectl apply -f https://raw.githubusercontent.com/google/metallb/v0.7.3/manifests/metallb.yaml
kubectl apply -f metallb/layer2-config.yml
```

## Install nginx-ingress

```
helm install -f nginx-ingress/values.yml stable/nginx-ingress
kubectl apply -f ingress/default.yml
```

## Install registry-creds

https://github.com/upmc-enterprises/registry-creds#how-to-setup-running-in-aws

```
kubectl apply -f registry/secret.yml
kubectl apply -f registry/replicationController.yml
```
