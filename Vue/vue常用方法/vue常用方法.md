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

### 在filters中使用this  (注意传参)

```vue
<template>
  <div class="detail-comment">
  	<span>{{ item.created | formatedate(that) }}</span>
  </div>
</template>
<script>
  data() {
    return {
      that: this
    };
  },
  filters: {
    formatedate(val, that) {
      console.log(that.$utils);
      const time = new Date(val * 1000);
      return that.$utils.formatDate(time);
    }
  },
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

dom或其他引入

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



## 用好 Vue 中 v-for 循环的 7 种方法

> **目录**
>
> - \1. 始终在 v-for 循环中使用 key
> - \2. 用 v-for 在一个范围内进行循环
> - \3. 避免在循环中使用 v-if
> - \4. 改用计算属性或方法
> - \5.  把循环放到包装元素中
> - \6.  在循环中访问索引
> - \7. 迭代对象

Vue 中的 `v-for` 循环允许你在模板代码中编写 for 循环，尤其是当我们做下面的操作时非常有用：

- 渲染数组或列表
- 遍历对象属性

在最基本的用法中，`v-for` 循环是这样使用的：

```
<ul>
  <li v-for='product in products'>
    {{ product.name }}
  </li>
</ul>
```

不过它还有一些你不知道的用法，可以使你的 `v-for` 代码更加精确、和高效。

### 1. 始终在 v-for 循环中使用 key

首先要讨论的很多人都已经知道的一种用法：**在 v-for 循环中使用 key**。通过设置唯一的 key 属性，可以确保你的组件按期望的方式工作。

如果我们不使用 key，vue 将会使 DOM 尽可能的高效。这可能意味着 v-for 元素可能出现乱序或其他不可预测的行为。

如果我们对每个元素都有一个**唯一**的键引用，那可以更好地预测 DOM 将会如何被操纵。

```
<ul>
  <li 
    v-for='product in products'
    :key='product._id'  
  >
    {{ product.name }}
  </li>
</ul>
```

### 2. 用 v-for 在一个范围内进行循环

虽然大多数情况下 v-for 用于遍历数组或对象，但肯定存在我们可能只想迭代特定次数的情况。

假设我们要网店创建一个分页系统，并且想在每页只显示 10 个商品品。通过使用变量来跟踪我们当前的页码，可以像这样处理分页：

```
looping over a range<ul>
  <li v-for='index in 10' :key='index'>
    {{ products[page * 10 + index] }}
  </li>
</ul>
```

### 3. 避免在循环中使用 v-if

在 v-for 循环中错误地使用 `v-if` 来过滤数据[1] 是非常常见的。

虽然这样做看起来很直观，但它会导致一个巨大的性能问题—— vue 的 v-for 优先于 v-if 指令 [2]。

这意味着你的组件会遍历每一个元素，然后检查 v-if 条件查看它是否应该被渲染。

> 如果把 v-if 与 v-for 放在一起使用，无论你的条件是什么，都会将遍历数组的每一个元素。

```
// 不好的代码
<ul>
  <li 
    v-for='product in products' 
    :key='product._id' 
    v-if='product.onSale'
  >
    {{ product.name }}
  </li>
</ul>
```

上面的代码会引发什么题呢？

假如我们的商品数组中有几千个项目，但是只有 3 个处于销售状态产品需要渲染。那么每次重新渲染时，即使销售的 3 种产品根本没有变化，vue 也必须遍历几千个项目。所以应该尽量避免这种情况。

接下来是两种替代方案，而不是把 v-for 与 v-if 放在一起用。

### 4. 改用计算属性或方法

为了避免上述问题，应该在我们的模板中迭代之前先过滤这些数据。有两种非常相似的方法可以做到：

1. 使用计算属性
2. 使用过滤方法

至于用哪种方法你自己说了算。下面对两者进行简单的介绍。

首先需要设置一个计算属性。为了打到与之前使用 v-if 相同的效果，代码应该是这样：

```
<ul>
  <li v-for='products in productsOnSale' :key='product._id' >
    {{ product.name }}
  </li>
</ul>

// ...
<script>
  export default {
    data () {
      return {
        products: []
      }
    },
    computed: {
      productsOnSale: function () {
        return this.products.filter(product => product.onSale)
      }
    }
  }
</script>
```

这样做有几个好处：

1. 数据属性只会在依赖项发生变化时才会被重新评估
2. 模板**只会遍历在售商品**，而不是每一个项目

第二种方法的代码几乎和前面一样：

```
<ul>
  <li v-for='products in productsOnSale(50))' :key='product._id' >
    {{ product.name }}
  </li>
</ul>

// ...

<script>
  export default {
    data () {
      return {
        products: []
      }
    },
    methods: {
      productsOnSale (maxPrice) {
        return this.products.filter(product => product.onSale && product.price < maxPrice)
      }
    }
  }
</script>
```

### 5.  把循环放到包装元素中

有时候你可能想把 `v-for` 与 `v-if` 结合起来使用，用来确定是否需要渲染一个列表。

假如我们只想在用户登录时渲染商品列表该怎么办。

```
// 不好的代码
<ul>
  <li 
    v-for='product in products' 
    :key='product._id' 
    v-if='isLoggedIn' <!-- HERE -->
  >
    {{ product.name }}
  </li>
</ul>
```

上面的代码会有什么问题？

和前面一样， vue 模板会优先考虑 `v-for` ，所以它会遍历每个元素并检查 `v-if`。

**即使最终什么都不渲染，也会遍历几千个元素！**

比较简单的解决方案是给代码的 `v-if` 语句换个位置。

```
// 这样比较好
<ul v-if='isLoggedIn'> <!-- Much better -->
  <li 
    v-for='product in products' 
    :key='product._id' 
  >
    {{ product.name }}
  </li>
</ul>
```

这要好很多，因为如果 `isLoggedIn` 为 `false` 的话根本不需要进行迭代。

### 6.  在循环中访问索引

除了遍历数组并访问每个元素之外，还可以跟踪每个项目的索引。

为了达到这个目的，必须在我们的项目之后添加一个索引值。这非常简单，对于分页、显示列表索引、显示排名等操作都很有用。

```
<ul>
  <li v-for='(products, index) in products' :key='product._id' >
    Product #{{ index }}: {{ product.name }}
  </li>
</ul>
```

### 7. 迭代对象

到目前为止，我们只真正研究了用 `v-for` 遍历数组。但是我们可以很容易地迭代对象的键值对。

与访问元素的索引类似，我们必须向循环中添加另一个值。如果用单个参数循环对象的话将会循环所有项目。

如果我们再添加一个参数，将会得到 **item** 和 **key**。如果添加第三个还可以访问 `v-for` 循环的 **index**。

假设要遍历商品的每个属性，代码应该是这样：

```
<ul>
  <li v-for='(products, index) in products' :key='product._id' >
    <span v-for='(item, key, index) in product' :key='key'>
      {{ item }}
    </span>
  </li>
</ul>
```

### Reference

[1]过滤数据:https://learnvue.co/2020/01/how-to-use-vuejs-filters-to-write-better-code/

[2]vue 的 v-for 优先于 v-if 指令 :https://vuejs.org/v2/style-guide/#Avoid-v-if-with-v-for-essential