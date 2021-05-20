### 组件之间的传值？

1. 父组件与子组件传值

```html
//父组件通过标签上面定义传值
<template>
    <Main :obj="data"></Main>
</template>
<script>
    //引入子组件
    import Main form "./main"

    exprot default{
        name:"parent",
        data(){
            return {
                data:"我要向子组件传递数据"
            }
        },
        //初始化组件
        components:{
            Main
        }
    }
</script>


//子组件通过props方法接受数据
<template>
    <div>{{data}}</div>
</template>
<script>
    exprot default{
        name:"son",
        //接受父组件传值
        props:{
          data: String
        }
    }
</script>
```

2. 子组件向父组件传递数据

```html
<!--父组件模板-->
<div id="app">
  <cpn @item-click="cpnClick"></cpn>
</div>

<!--子组件模板-->
<template id="cpn">
  <div>
    <button v-for="item in categories"
            @click="btnClick(item)">
      {{item.name}}
    </button>
  </div>
</template>

<script src="../js/vue.js"></script>
<script>

  // 1.子组件
  const cpn = {
    template: '#cpn',
    data() {
      return {
        categories: [
          {id: 'aaa', name: '热门推荐'},
          {id: 'bbb', name: '手机数码'},
          {id: 'ccc', name: '家用家电'},
          {id: 'ddd', name: '电脑办公'},
        ]
      }
    },
    methods: {
      btnClick(item) {
        // 发射事件: 自定义事件
        this.$emit('item-click', item)
      }
    }
  }

  // 2.父组件
  const app = new Vue({
    el: '#app',
    data: {
      message: '你好啊'
    },
    components: {
      cpn
    },
    methods: {
      cpnClick(item) {
        console.log('cpnClick', item);
      }
    }
  })
</script>
```

### active-class 是哪个组件的属性？

vue-router 模块的 router-link 组件。

### 嵌套路由怎么定义？

在实际项目中我们会碰到多层嵌套的组件组合而成，但是我们如何实现嵌套路由呢？因此我们需要在 VueRouter 的参数中使用 children 配置，这样就可以很好的实现路由嵌套。
index.html，只有一个路由出口

```html
<div id="app">
    <!-- router-view 路由出口, 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
</div>
```

main.js，路由的重定向，就会在页面一加载的时候，就会将 home 组件显示出来，因为重定向指向了 home 组件，redirect 的指向与 path 的必须一致。children 里面是子路由，当然子路由里面还可以继续嵌套子路由。

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//引入两个组件

import home from "./home.vue"
import game from "./game.vue"
//定义路由
const routes = [
    { path: "/", redirect: "/home" },//重定向,指向了home组件
    {
        path: "/home", component: home,
        children: [
            { path: "/home/game", component: game }
        ]
    }
]
//创建路由实例
const router = new VueRouter({routes})

new Vue({
    el: '#app',
    data: {
    },
    methods: {
    },
    router
})
```

home.vue，点击显示就会将子路由显示在出来，子路由的出口必须在父路由里面，否则子路由无法显示。

### 路由之间跳转？

- 声明式（标签跳转） `<router-link :to="index">`
- 编程式（ js 跳转） `router.push('index')`

### 懒加载（按需加载路由）（常考）

webpack 中提供了 require.ensure()来实现按需加载。以前引入路由是通过 import 这样的方式引入，改为 const 定义的方式进行引入。

- 不进行页面按需加载引入方式：

```js
import  home   from '../../common/home.vue'
```

- 进行页面按需加载的引入方式：

```js
const  home = r => require.ensure( [], () => r (require('../../common/home.vue')))
```

### vuex 是什么？怎么使用？哪种功能场景使用它？

vue 框架中状态管理。在 main.js 引入 store，注入。新建了一个目录 store，….. export 。场景有：单页应用中，组件之间的状态。音乐播放、登录状态、加入购物车、用户名称头像地理位置、商品收藏、购物车

```js
// 新建 store.js
import vue from 'vue'
import vuex form 'vuex'
vue.use(vuex)
export default new vuex.store({
	state:{},
  mutations:{},
  actions:{},
  getters:{}
  modules:{},
})

//main.js
import store from './store'
...
```

### axios请求拦截器  |  响应拦截器

request.js

```javascript
import axios from 'axios'
axios.default.baseURL = '172.0.0.1:3000/'
//请求拦截器
axios.interceptors.request.use(config=>{
  return config
})
axios.interceptors.response.use(response=>{
  return response
},err=>{
  return Promise.reject(err)
})
export default axios
```

http.js(api封装)

```javascript
import axios from './request'


```

### 路由守卫

// 导航守卫 

// 前置守卫

```javascript
router.beforeEach((to, from, next) => {

 // 从from跳转到to

 // 1.设置每个页面的title

 console.log(to);

 document.title = to.matched[0].meta.title

 next()

})
```

// 后置钩子(hook) 

```javascript
router.afterEach((to, from) => {

})
```

### keep-alive

有两个属性{

·exclude	<keep-alive exclude="组件一,组件二"></keep-alive>

·include	与上同

}

#### 一、页面嵌套路由缓存

##### 1.内容外用keep-alive包裹

##### 2.用activated/deactivated方法

##### 3.使用path属性记录离开时的路径，在beforeRouteLeave中记录

![image-20210517142702189](C:\Users\Administrator\Desktop\项目笔记\Vue\vue常用方法\vue常用方法.assets\image-20210517142702189.png)



### 给Vue文件夹起别名以及后缀省略

#### vue2.x

##### webpack配置中的resolve

```javascript
 resolve: {
  extensions: ['.js', '.vue', '.json'],  
  alias: {
   '@': resolve('src'),
   'components':resolve('src/components'),
   'assets':resolve('src/assets'),
   'views':resolve('src/views'),
  }
 },
```

###### 使用

若是用import引入文件

```javascript
import MainTabBar from "components/tabBar/MainTabBar";
```

dom引入

```html
<img slot="tabbar-icon" src="~assets/tabbar/home.svg" />
```

#### vue3.x及以上

##### 创建vue.config.js文件

```javascript
module.export = {
  configureWebpack: { //配置webpack
    resolve: {
      alias: {   //配置路径别名  default: '@': 'src'
        
      }
    }
  }
}
```



### Promise

#### 基础用法

##### 成功

```javascript
new Promise((resolve,reject) => {
  setTimeout(() => {
    //成功的回调
    resolve('Hello World')
  })
}).then( data => {
  // 处理返回的数据
})
```

##### 失败

```javascript
new Promise((resolve,reject) => {
  setTimeout(() => {
    //失败的回调
    reject('error message')
  })
}).then( (data) => {
  // 处理返回的数据
}).catch( (err) => {
  //错误处理
})
```

##### 结合

```javascript
new Promise((resolve, reject) => {
  setTimeout(() => {
    //成功的回调
    resolve('Hello World')
    //失败的回调
    reject('error message')
  })
}).then(data => {
  // 处理成功返回的数据
}).catch(err => {
  // 处理失败返回的数据
})
```

### vue.config.js 常用配置

```javascript
module.export = {
  configureWebpack: { //配置webpack
    resolve: {
      extensions: ['.css'],  //配置后缀省略 default: vue js json
      alias: {   //配置路径别名  default: '@': 'src'
        
      }
    }
  }
}
```



