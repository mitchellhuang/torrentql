#!/bin/sh

envsubst < $1 > "${1}.tmp"
mv "${1}.tmp" $1
echo $1
