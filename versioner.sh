#!/bin/sh

git pull
git pull origin master

version=`git log --author="autoversioner" -n 1`
echo $version > version.txt

folderName=`tail -c 6 version.txt`
mkdir $folderName
cp -r files/* $folderName/

ls
rm -r version.txt

