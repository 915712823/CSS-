# 如何将本地Vue项目部署到服务器



在本地项目已经搭建完成的情况下，如何将项目发布到服务器？并做适当优化

## 一、 通过node创建web服务器

核心思路

创建node项目，并安装 express，通过 express 快速创建web服务器，将vue打包生成的dist文件夹 托管为静态资源即可，关键代码如下：

```js
//创建web服务器
const app = require('express')();

//托管静态资源
app.use(express.static('./dist'))

//启动web服务器
app.listen(8080, () => {
  console.log("server StartUp: http:127.0.0.1:8080");
})   
```



### 1.1 新建一个文件夹,这里我命名为:`vue_shop_server`,以后该目录即是我们的根目录。

![文件夹](data:image/png;base64,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)

进入该目录,打开终端 使用 `npm init -y` 初始化项目

## 二、打包项目

找到需要部署到服务器的项目，输入 `npm run build`,打包项目 打包好之后,把生成的 `dist`文件夹,复制一份放到我们刚刚新建的`vue_shop_server`目录下。

首先使用 `npm i express -S` 安装一个第三方的包 然后在我们的根目录下新建一个`app.js`文件 ,该文件是我们的项目入口文件。 在该文件中输入下例代码：

```js
//创建web服务器
const app = express()

//托管静态资源
app.use(express.static('./dist'))

//启动web服务器
app.listen(8080, () => {
  console.log("server StartUp: http:127.0.0.1:8080");
})
```

接下来我们可以`node .\app.js` 运行一下看，能否打印出 server StartUp... 当终端中正常打印的话，则说明我们的服务启动成功,可以前往`http:127.0.0.1:8080`访问。

## 三、开启gzip文件压缩

gzip概述

HTTP协议上的GZIP编码是一种用来改进WEB应用程序性能的技术。大流量的WEB站点常常使用GZIP压缩技术来让用户感受更快的速度。这一般是指WWW服务器中安装的一个功能，当有人来访问这个服务器中的网站时，服务器中的这个功能就将网页内容压缩后传输到来访的电脑浏览器中显示出来.一般对纯文本内容可压缩到原大小的40%.这样传输就快了，效果就是你点击网址后会很快的显示出来

### 3.1 首先安装和导入扩展包

安装：

```
npm i compression -S
```

安装完成后,我们需要导入这个包： 在我们的 `app.js`文件头部加入如下一句代码：

```js
const compression  = require("compression") 
```

1

接下来在托管静态资源之前，注册中间件

```js
app.use(compression())
```

在浏览器当中，打开我们的项目,打开开发者选项，找到`Network`对比一下没有使用 gzip 和 使用gzip的效果，可以发现我们的数据大小确实有被压缩。