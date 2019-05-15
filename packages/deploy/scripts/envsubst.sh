#!/bin/sh

for file in $(find ${1} -regex '.*\.\(yml\|json\)')
do
envsubst < $file > "${file}.subst.yml"
echo $file
done
