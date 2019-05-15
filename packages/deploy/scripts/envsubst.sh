#!/bin/sh

for file in $(find ${1} -regex '.*\.\(yml\|json\)')
do
envsubst < $file > "${file}.tmp"
mv "${file}.tmp" $file
echo $file
done
