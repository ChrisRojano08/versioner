#!/bin/sh

version=`git log --author="autoversioner" -n 1`
echo $version > version.txt

folderName=`tail -c 6 version.txt`
mkdir $folderName
cp -r files/* $folderName/

rm -r version.txt
git push origin master