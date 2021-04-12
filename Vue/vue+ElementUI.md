### 创建一个ElementUI后台管理系统项目

#### 1.创建项目:vue create demo(项目名) 

#### 2.安装element ui: npm i element-ui -S

#### 3.配置按需引入: npm install babel-plugin-component -D         

#### 4.配置babel.config.js:

```vue.js
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ],
}
```

#### 5.main.js按需引入组件，并注册

##### 5.1引入axios

```
npm install axios --save
```

#### 6.配置跨域以及sass全局引入(vue.config.js)

6.1配置跨域

```javascript
module.exports = {
  //跨域服务配置
  devServer: {
    open: true,
    proxy: {
      '/api ': {
        //代理地址
        target: 'http: //api.chenmychou.cn',
        changeorigin: true,
        //重写  若接口出现api/api这种情况就是没有下面的代码
        pathRewite: {
          '/api': ''
        }
        //ws: false //游戏项目社交项目
      }
    }
  },
  //全局共用css引入
  css: {
    loaderOption: {
      sass: {
        prependData: '@import "./src/common/css/global.scss";'
      }
    }
  }
}
```



#### 7.配置接口请求(request)

7.1  service.js

```javascript
import axios from 'axios'
import vue from '../main.js'  //在main.js中要将vue导出
//令牌 token
function getTokenByLocal(){
  let token = sessionStorage.getItem('token');
  return token;
}

const service = axios.create({
  baseURL:'/api',
  timeout: 5000
})

//请求拦截
service.interceptors.request.use(
	config => {
    //判断本地是否有token
    if(getTokenByLocal()){
      //让所有的接口都带上token
      config.headers['token'] = getTokenByLocal();
    }else{
      //do something
    }
    return config
  }
  error => {
  	return Promise.reject(error)
  }
)

//相应拦截
service.interceptors.response.use(
	response => {
    let res = response.data;
    // 假设101表示未登录
    if(res.code == '101'){
      //跳转到登录页
      vue.$router.push('/login');
    }
    return Promise.resolve(res);
  },
  error => {
  	return Promise.reject(error)
  }
)

export default service;
```



#### 8.写页面=>配置路由文件(router)

8.1 写页面

8.2配置路由文件



#### 9.路由拦截

#### 10.login页面逻辑以及登录

#### 11.登录成功跳转到指定页面

#### 12.列表请求=>分页处理

全局封装js

![image-20210412103940500](C:\Users\Administrator\Desktop\项目笔记\Vue\遮罩层.png)