# Ansible

Ansible playbooks for creating, updating, adding nodes to baremetal k8s clusters with kubeadm.

## Install ansible

```
brew install python3
sudo pip3 install ansible
```

## Create hosts inventory file

```
[deluge]
gra001 ansible_host=master_ip ansible_user=root

[all:vars]
ansible_python_interpreter=/usr/bin/python3
```

## Run ansible playbook

```
ansible-playbook -i hosts site.yml
```
