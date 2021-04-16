## 利用 Github Actions 部署Vue项目

以下文章来源于政采云前端团队 ，作者明昼

[![政采云前端团队](C:\Users\Administrator\Desktop\项目笔记\部署上线\利用github-action部署vue项目\0)**政采云前端团队**ZooTeam 带你一起探索前端开发的乐趣！前端相关技术沉淀、工程化建设、团队及职业成长分享，你想要的，我都有～](https://mp.weixin.qq.com/s?__biz=MzIyMDkwODczNw==&mid=2247497453&idx=2&sn=ca49443490e32e80c19469bddf7d784e&chksm=97c66b43a0b1e255a7646e8599348e71af09c347af52e403400b8bb8c95fc50f028c8d87f524&scene=126&sessionid=1618447992&key=ab23737e5360fd6d8c831279cbc2b1e51d12778a2969b305c598e3fc47eda48cd79513e2dde5bb1ae73f802cf2cb0f4d4dfbc7732cde6f3e3ca2fdc7d95a825b3f0c1aea9166698a7618ce72be2e0d3be21991ce262ec8add85456c5600498e54026a7496b16337c57fb03999723d74f7abba7e45a08ebb4d3fb7fdb3c6df2b7&ascene=1&uin=MTQ0NTA2NTI2Mg%3D%3D&devicetype=Windows+10+x64&version=63010043&lang=zh_CN&exportkey=A9fy%2FGPvn%2BtMjY0qlPVv90Q%3D&pass_ticket=MQX0ONn6P9wc%2FV5R8%2FTqDrSZNVUXBloHR1fc0UEd65WOwTwR5HN%2BmQ7FhFoI4yjo&wx_header=0&fontgear=2#)

**Github Actions 是什么？**

众所周知，前端部署无非就是把打包之后的代码丢到 nginx html 目录下就完事了，但是每逢产品频繁改需求，甚至只是让你改线上一个字的时候，你总要重复一遍以下动作：修改，打包，登录服务器，上传代码，重启服务器。久而久之，别说是你受不了了，搁我旁边看着都受不了。这个时候，有没有想过有个机器人，能帮我们完成以上这些重复又没技术含量的活。没错，你猜对了，Github Actions 就是我们需要的那个机器人。

# Github Actions 是什么？

大家知道，持续集成 (https://www.ruanyifeng.com/blog/2015/09/continuous-integration.html?fileGuid=1PWJAvQBtLA5IGh3) 由很多操作组成，比如拉取最新代码、运行测试、登录服务器、部署服务器等，GitHub 把这些操作统一称为 Actions。

![图片](C:\Users\Administrator\Desktop\项目笔记\部署上线\利用github-action部署vue项目\640)

我们再梳理下正常需求的开发流程（如上图），以上操作是可重复利用的，利用这一概念，Github 集成了 Actions 市场，允许开发者把操作写成独立的脚本，发布到 Actions 市场，允许所有开发者使用，这里有点像 Npm 和 VSCode 中的插件。

![图片](C:\Users\Administrator\Desktop\项目笔记\部署上线\利用github-action部署vue项目\640)

Github 给我们提供了一个以下配置的服务器来运行我们配置对应的 Actions：

- 2-core CPU
- 7 GB of RAM memory
- 14 GB of SSD disk space

这个配置足够我们使用了，当然，如果你有网络时延的需求，（比如推送及拉取镜像时产生的网络时延），你也可以自建服务器 (https://docs.github.com/cn/actions/hosting-your-own-runners?fileGuid=1PWJAvQBtLA5IGh3)。

# 部署自己的前端项目

## 1、选择 Github 项目仓库

这里我选择了很久以前刚开始学习 Vue 时模仿 bilibili 做的项目 bilibili-vue (https://github.com/zlyyyy/bilibili-vue?fileGuid=1PWJAvQBtLA5IGh3)，进入项目仓库，可以看到对应的 Actions 标签，点击进入。

![图片](C:\Users\Administrator\Desktop\项目笔记\部署上线\利用github-action部署vue项目\640)

## 2、新建工作流，配置 Actions

进入 Actions 后可以看到很多推荐的工作流模版，这里可以根据需要自行选择的模版，或者跳过模版，自行设置。

![图片](C:\Users\Administrator\Desktop\项目笔记\部署上线\利用github-action部署vue项目\640)

这里因为我是纯前端项目，所以我选择 Node.js 模版。

![图片](C:\Users\Administrator\Desktop\项目笔记\\利用github-action部署vue项目\640)

点击 Node.js 模版，会自动在项目 `.github/workflows 目录下生成 node.js.yml` 文件，我们可以把文件名字改成我们工作流的名称。当然，这里可以设置并存在很多工作流 `yml` 文件，例如 deploy.yml、test.yml、gh-page.yml 等。

```
# workflow名称。省略的话，默认为当前workflow文件名
name: Node.js CI
# 触发workflow的条件，
on:
push:
# 只有master分支发生push事件时，才会触发workflow
branches: [ master ]
pull_request:
branches: [ master ]
# jobs表示执行的一项或多项任务
jobs:
# 任务的job_id，具体名称自定义，这里build代表打包
build:

# runs-on字段指定运行所需要的虚拟机环境。注意：这个是必填字段
runs-on: ubuntu-latest
# 用于配置当前workflow的参数
strategy:
matrix:
node-version: [10.x, 12.x, 14.x, 15.x]
# See supported Node.js release schedule at https://nodejs.org/en/about/releases/
# steps字段指定每个job的运行步骤，可以包含一个或多个步骤，每个步骤都可以配置指定字段
steps:
# 切代码到 runner
- uses: actions/checkout@v2
# 在当前操作系统安装node
- name: Use Node.js ${{ matrix.node-version }}
uses: actions/setup-node@v1
with:
node-version: ${{ matrix.node-version }}
# 该运行的命令或者action
# 安装依赖、运行测试、打包
    - run: npm install
    - run: npm test
    - run: npm run build
```

## 3、常见的 Actions 配置

### 打版本标签 Create Tag Release

> 这里使用 Actions 市场中的 Create Tag Release (https://github.com/marketplace/actions/create-tag-release?fileGuid=1PWJAvQBtLA5IGh3) 插件

```
on:
  push:
    # Sequence of patterns matched against refs/tags
    tags:
      - 'v*' # Push events to matching v*, i.e. v1.0, v20.15.10
name: Create Release
jobs:
  build:
    name: Create Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@master
      - name: Create Release
        id: create_release
        uses: actions/create-release@latest
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # This token is provided by Actions, you do not need to create your own token
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          body: |
            Changes in this Release
            - First Change
            - Second Change
          draft: false
          prerelease: false
```

### 创建 Github Pages 站点

> 这里使用 Actions 市场中的 GitHub Pages v3 (https://github.com/marketplace/actions/github-pages-v3?fileGuid=1PWJAvQBtLA5IGh3) 插件

```
name: github pages
 on:
   push:
     branches:
       - master # default branch
 jobs:
   deploy:
     runs-on: ubuntu-18.04
     steps:
       - uses: actions/checkout@v2
       - run: npm install
       - run: npm run docs:build
       - name: Deploy
         uses: peaceiris/actions-gh-pages@v3
         with:
           github_token: ${{ secrets.GITHUB_TOKEN }}
           publish_dir: ./docs-dist
```

### 多人协作开发，云端代码检测

```
name: Test
 
 on: [push, pull_request]
 
 jobs:
   lint:
     runs-on: ubuntu-latest
     steps:
     - uses: actions/checkout@v2
     - uses: actions/setup-node@v1
       with:
         node-version: '12.x'
 
     - name: Install dependencies
       uses: bahmutov/npm-install@v1
 
     - name: Run linter
       run: npm run lint
 
   test:
     runs-on: ubuntu-latest
     steps:
     - uses: actions/checkout@v2
     - uses: actions/setup-node@v1
       with:
         node-version: '12.x'
 
     - name: Install dependencies
       uses: bahmutov/npm-install@v1
 
     - name: Run test
       run: npm test
 
   build:
     runs-on: ubuntu-latest
     steps:
     - uses: actions/checkout@v2
     - uses: actions/setup-node@v1
       with:
         node-version: '12.x'
 
     - name: Install dependencies
       uses: bahmutov/npm-install@v1
 
     - name: Build
       run: npm run build
```

以上是 Github 中常见的一些配置，更多 Actions 配置(https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions?fileGuid=1PWJAvQBtLA5IGh3) 可以参考官网。

## 4、搭配 Docker

> 为什么要使用 Docker ？

没有 Docker 之前，我是使用 Webhook 实现自动部署，但后面遇到了服务器到期更换服务器的时候，就只能一个个重复操作来做迁移，而且文件目录管理混乱，项目变多时，维护成本也会越来越高。再看 Docker 五大优势：持续集成、版本控制、可移植性、隔离性和安全性，是不是就是用来解决我们上述遇到的问题的。举例：bilibili-vue (https://github.com/zlyyyy/bilibili-vue?fileGuid=1PWJAvQBtLA5IGh3)，不明白的同学可以参考我的配置。

### 4.1 项目根目录新建 Nginx 配置

项目根目录新建 Nginx 配置文件命名 vhost.nginx.conf（名字随便定，跟后面 **Dockerfile** 中引用一致即可）供后续使用，例：

```
server {
listen 80;
server_name localhost;
location / {
  root /usr/share/nginx/html;
  index index.html index.htm;
  proxy_set_header Host $host;
  if (!-f $request_filename) {
    rewrite ^.*$ /index.html break;
  }
}
error_page 500 502 503 504 /50x.html;
location = /50x.html {
    root /usr/share/nginx/html;
  }
}
```

### 4.2 项目根目录新建 **Dockerfile** 文件

项目根目录新建 **Dockerfile** 文件，构建镜像包使用，例：

```
FROM nginx
COPY ./dist/ /usr/share/nginx/html/
# 第一步nginx配置文件名称
  COPY ./vhost.nginx.conf /etc/nginx/conf.d/bilibili-vue.conf
EXPOSE 80
```

### 4.3 配置容器镜像服务

这里我选择了阿里云的容器镜像服务 (https://www.aliyun.com/product/acr?fileGuid=1PWJAvQBtLA5IGh3)，为什么不使用国外的 dockhub (https://hub.docker.com/?fileGuid=1PWJAvQBtLA5IGh3) 呢，因为这样使用起来速度快一点，而且有免费的个人版足够我们使用。

#### 4.3.1 第一步

初次打开需要开通服务，配置登录密码（记下来，后面要用）。

#### 4.3.2 第二步

然后创建命名空间，再创建我们的镜像仓库，这里如果不想别人下载你的镜像的话就可以选择私有。然后点击下一步配置代码源，这里我选择了本地仓库，一方面是为了日志统一，可以在 Github Actions 看到所有日志，一方面是可以通过命令行直接推送镜像到镜像仓库，自由度比较高。![图片](C:\Users\Administrator\Desktop\项目笔记\部署上线\利用github-action部署vue项目\640)

#### 4.3.3 第三步

之后就可以在页面看到我们创建的仓库，点击仓库名称进入，可以看到仓库的基本信息和操作指南，这个时候一个镜像仓库就完全创建成功了。![图片](C:\Users\Administrator\Desktop\项目笔记\部署上线\利用github-action部署vue项目\640)

![图片](C:\Users\Administrator\Desktop\项目笔记\部署上线\利用github-action部署vue项目\640)

### 4.4 如何跟 Actions 联动

我们只用在 Actions 中 build 镜像后登录阿里云 Registry 实例就好了，但是这个时候如果明文直接写在 yml 中肯定是不行的，Github 早就帮我们考虑到了这点，回到 Github 项目中，依次点击 Settings => Secrets => New repository secret ，设置 secret，配置上述容器镜像账号的用户名（阿里云用户名）和密码（上述配置容器镜像服务时设置的登录密码）。

![图片](C:\Users\Administrator\Desktop\项目笔记\部署上线\利用github-action部署vue项目\640)

## 5、完整的 Actions

```
name: Docker Image CI # Actions名称
on: [push] # 执行时机
jobs:

# 这里我使用的是yarn，想用npm的同学将yarn命令修改为npm命令即可
build:
runs-on: ubuntu-latest
steps:
- name: checkout
uses: actions/checkout@master
# 安装依赖
- name: install
run: yarn
# 打包
- name: build project
run: yarn run build

# 打包镜像推送到阿里云容器镜像服务
- name: Build the Docker image
run: |
docker login --username=${{ secrets.DOCKER_USERNAME }} registry.cn-hangzhou.aliyuncs.com --password=${{ secrets.DOCKER_PASSWORD }}
docker build -t bilibili-vue:latest .
docker tag bilibili-vue registry.cn-hangzhou.aliyuncs.com/zlyyyy/bilibili-vue:latest
docker push registry.cn-hangzhou.aliyuncs.com/zlyyyy/bilibili-vue:latest # 推送
- name: ssh docker login # 使用appleboy/ssh-action@master登录服务器执行拉取镜像脚本，服务器ip、用户名、密码配置方式同容器镜像服务配置方式一样
uses: appleboy/ssh-action@master
with:
        host: ${{ secrets.SSH_HOST }} 
username: ${{ secrets.SSH_USERNAME }}
password: ${{ secrets.SSH_PASSWORD }}
script: cd ~ && sh bilibili-vue-deploy.sh ${{ secrets.DOCKER_USERNAME }} ${{ secrets.DOCKER_PASSWORD }}
```

最后一步登录服务器后，我执行了一个脚本来拉取云端最新镜像，并删除旧镜像，启动新镜像。脚本内容如下。

```
echo -e "---------docker Login--------"
docker login --username=$1 registry.cn-hangzhou.aliyuncs.com --password=$2
echo -e "---------docker Stop--------"
docker stop bilibili-vue
echo -e "---------docker Rm--------"
docker rm bilibili-vue
docker rmi registry.cn-hangzhou.aliyuncs.com/zlyyyy/bilibili-vue:latest
echo -e "---------docker Pull--------"
docker pull registry.cn-hangzhou.aliyuncs.com/zlyyyy/bilibili-vue:latest
echo -e "---------docker Create and Start--------"
docker run --rm -d -p 8081:80 --name bilibili-vue registry.cn-hangzhou.aliyuncs.com/zlyyyy/bilibili-vue:latest
echo -e "---------deploy Success--------"
```

## 6、测试流程，查看日志

我们推送一次代码测试，打开 Actions 后可以看到自动运行的实时 workflow 结果，以及每步的日志信息。

![图片](C:\Users\Administrator\Desktop\项目笔记\部署上线\利用github-action部署vue项目\640)

![图片](C:\Users\Administrator\Desktop\项目笔记\部署上线\利用github-action部署vue项目\640)**
**

**总结**

# 

到此我们自动化部署成功，再也不要每次修改代码，手动更新线上了，后面迁移也会更方便，当然还有更多的自动化部署方式，比如直接使用 Github + 阿里云镜像仓库的触发器一样可以做到，容器服务也不仅限于阿里云，腾讯云等其他云服务厂商同样也是一样的使用方式。以上是我个人使用 Actions 的一些总结，如有错误，劳烦指正修改。当然对更多 Actions 玩法感兴趣的同学欢迎一起交流学习。当然这个仅限于个人的项目玩法，公司内部的项目有更加成熟完善的自动化方案，比如我们内部所使用的云长系统，就是解决此类问题的，具体云长做了些什么，后续会有详细文章输出，敬请期待。

# 参考文献 

GitHub Actions 入门教程 (http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html?fileGuid=1PWJAvQBtLA5IGh3)

持续集成是什么？(https://www.ruanyifeng.com/blog/2015/09/continuous-integration.html?fileGuid=1PWJAvQBtLA5IGh3)