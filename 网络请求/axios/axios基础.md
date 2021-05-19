## axios发送get请求

![image-20210519111701977](C:\Users\Administrator\Desktop\项目笔记\网络请求\axios\axios基础.assets\image-20210519111701977.png)

### 案例(并发请求)

#### 做一个功能需要同时发两个接口，并且要两个请求同时返回数据之后才能进一步实现相关功能

##### 解决方案一

```javascript
let isResult1 = false
let isResult2 = false
$ajax({
  url: '',
  success: function () {
   console.log('结果1');
   isResult1 = true
   handleResult()
  }
 })
 // 请求二:
 $ajax({
  url: '',
  success: function () {
   console.log('结果2');
   isResult2 = true
   handleResult()
  }
 })

 function handleResult() {
  if (isResult1 && isResult2) {
   //
  }
 }
```

##### 解决方案二

 

```javascript
Promise.all([
   // new Promise((resolve, reject) => {
   //  $.ajax({
   //   url: 'url1',
   //   success: function (data) {
   //    resolve(data)
   //   }
   //  })
   // }),
   // new Promise((resolve, reject) => {
   //  $.ajax({
   //   url: 'url2',
   //   success: function (data) {
   //    resolve(data)
   //   }
   //  })
   // })

  new Promise((resolve, reject) => {
   setTimeout(() => {
    resolve({name: 'why', age: 18})
   }, 2000)
  }),
  new Promise((resolve, reject) => {
   setTimeout(() => {
     resolve({name: 'kobe', age: 19})
   }, 1000)
  })
 ]).then(results => {
  console.log(results);
 })
```

解决方案三（推荐）

```
axios.all([axios(),axios()]).then(axios.spread((res1, res2)=>{
	
}))
```

## axios常见的配置选项

![image-20210519133507617](C:\Users\Administrator\Desktop\项目笔记\网络请求\axios\axios基础.assets\image-20210519133507617.png)

## axios基础封装及使用

request.js

```javascript
import axios from 'axios'
export function coderwhy(config) {
 // 1.创建axios实例
 const instance = axios.create({
  baseURL: 'http://152.136.185.210:7878/api/m5',
  timeout: 12000,
  withCredentials: true
 })
 return instance(config)
}
```

main.js(入口文件)

```javascript
import  { coderwhy } from './network/request/request.js'
```

组件内使用

```javascript
coderwhy({
  url: '/xxx/xxx',
  method: 'get' //默认为get
}).then(res=>{
  console.log(res)
}).catch(err=>{
  console.log(err)
})
```

## axios使用拦截器

![image-20210519144635913](C:\Users\Administrator\Desktop\项目笔记\网络请求\axios\axios基础.assets\image-20210519144635913.png)