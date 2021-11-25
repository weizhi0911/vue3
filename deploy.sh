# 自动化打包、发布，在执行脚本命令中传递 develop 或 master 区分测试和正式环境
#!/bin/bash

# 开发环境-项目文件夹名
dir_source="../${PWD##*/}"
dir_source_build="./dist/*"
# 部署环境-项目文件夹名，默认与开发环境-项目文件夹名项目，补一个 _build 后缀，意味着是部署项目环境目录
dir_deploy="../${PWD##*/}_build"

default_commit_msg="deploy"

set -e

yarn $1

cd $dir_deploy

git checkout $1

git pull

rm -rf  `ls | grep -v "^.git$"`

cd $dir_source

cp -r $dir_source_build $dir_deploy

cd $dir_deploy

git pull

git add .

if [ "$2" ];then
  git commit -m $2
else
  git commit -m $default_commit_msg
fi

git push

cd $dir_source