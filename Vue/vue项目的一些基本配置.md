## 对Vue项目团队开发的一些基本配置封装分享

以下文章来源于掘金开发者社区 ，作者wangly19

[![掘金开发者社区](C:\Users\Administrator\Desktop\项目笔记\Vue\0)**掘金开发者社区**掘金，一个帮助开发者成长的技术社区](https://mp.weixin.qq.com/s?__biz=MzIyMDkwODczNw==&mid=2247497864&idx=2&sn=61cc0a68cf86ebc2b42c8f2c32b23e93&key=cc61bf6afcc50e9b28014288610f6513566abc841732192d7df8bb5b18823a4759d3df68d0c3c9fc1c1dd408e186bb1e5da41c139c3e13deb988fc837037d5ce4206c57f5124d801f709e7294329612ef743821b90f0b10da8cec1d812f63724a773919cc11dfb3b7c8e03d5d10f9b22089d7b6022afce1ed7c6cb93069d1c01&ascene=0&uin=MTQ0NTA2NTI2Mg%3D%3D&devicetype=Windows+10+x64&version=63020184&lang=zh_CN&exportkey=A5pZl6%2BegjHdJglzYcvL820%3D&pass_ticket=kWCmAbT3Dgy26gf1u9jsiqni64a5EwQ1DBIPHwBtgRCz6NSXz5DsA%2BRyThOE3jnF&wx_header=0&fontgear=2#)

本篇文章主要带来的是 `vue 基础架构` 篇，大家都知道， `Vue3.0` 后 `Vue2.0` 会有一个终结版出来，也就说明 `Vue` 迎来了新时代，但是并不是所有项目都能够一起迈向新时代的轮船。本文主要是承接上篇优化的技巧文章做一个续篇吧，这个续篇主要是针对团队开发相关的东西，相关插件和库只是微微带过，如果本文能够推动你们的生产线，就点个赞吧。

> 配置相关类的可以去搜索对应的分享贴，或者看我之前的文章，本文内容较为贴合团队开发，非工具链分享文，大部分都能引发一些技术层面的思考。

## 前言

在很多时候，对于 `vue` 项目来说，很多刚入门，或者是受业务妥协的朋友大都是从百度`CV` 一套看得过去的架子，如常见的 `D2Admin` ， `vue-element-admin` ，进行一个二次迭代的开发，其项目本身非常的优质，而在其 `template` 中去进行一个更改能够使得项目在一开始有一个很好的基础环境，但是如果没有花时间去琢磨透其中三分明细。在后续排雷来说，无疑是非常的困难的，因此大部分前端团队都会重构出自己的一套基础脚手架封装，有通过`webpack`进行处理的，也有基于 `VueCli` 打造的，最终都是自身团队的财产，从技术分享都细分实践都能给团队的小伙伴或多或少带来一些开发上面的便利。对后续团队人员的变动也能快速的投入生产当中。

## 做了什么？

- 基本 HTTP 请求封装
- 约定式 HTTP 请求管理
- Mmixin 数据管理
- jsdoc 项目文档
- log 异常处理
- 组件和页面管理
- 常用的指令
- 使用 sass 还是 scss？
- @mixin 和 %placeholder
- eslint

## 基本 HTTP 请求做了什么?

### 错误处理

在这里选用的是现如今兼容性比较好的 `axios` ，可以说是比较好的一个请求库，相比于 `fetch` 来说，两者各有优势，（我已经开始使用 `fetch` ）。这一部分其实无非就是封装一些公共调用时需要处理的行为，如：`token` ， `请求拦截` ， `响应拦截` ， `错误码约定` ， `异常上报` ，`中间件` 等一系列基础的行为模式。

如下实例，当 `HTTP` 请求出现错误的时候，首先通过 `getEnv` 获取当前的开发环境，如果是`dev(开发环境下)` 只做一个简单的 `console.log`，非开发环境下，则是上报进行异常监听，对于前后端来说都

```
function handleError ( error, msg) {
  if (getEnv() === 'dev') {
    tools.log.danger('>>>>>> HTTP Error >>>>>>')
    console.log(error, msg)
  } else {
    Store.dispatch('logs/push', {
      message: msg,
      type: 'danger'
    })
  }
}
```

### RESTFul

相对于一些拦截器来说，都非常的简单，需要注意的无非就是根据团队的一些规范制定一些规则，如常见的 `code` 码等方法，大部分情况下，如无意外，99% 的接口都是请求成功的，但因为特殊性，内部会有一个 `code` 的状态来定义正反向。同样的，在操作接口时，一些状态也是需要和接口的请求方式同步，参考如下：

- GET: 200 OK
- POST: 201 Created
- PUT: 200 OK
- DELETE: 204 No Content

现如今大部分的接口的规范都使用 `RESTful` ，如果不知道 `RESTful` 是什么，可以看看 `@阮一峰` 的文章来初步了解。RESTful API 最佳实践 @阮一峰的网络日志

### 状态码机制

同样的 `code` 中我们也自定义日常开发中的一些状态码，当我们需要用到 `第三方API` 的时候，前后端都需要快速的定位是自身服务的问题，还是其他服务（例如中台）的问题，因此对接服务我们都自定义了一些 `code` 来陈述这一类错误的处理。可以参考如下，这些其实都是创建在一个对象当中的：![图片](C:\Users\Administrator\Desktop\项目笔记\Vue\640)自定义 code

| code   | 状态                  | 描述                   |
| :----- | :-------------------- | :--------------------- |
| 30000  | invalid credential    | 不合法的凭证           |
| 30001  | invalid connect_type  | 不合法的 connect_type  |
| 30001  | invalid group_conf_id | 不合法的 group_conf_id |
| ...... | ......                | ......                 |

当我们细化一些异常时，这时候是可以划分的非常细致的，这里给出微信的一些参考：

| 40039 | invalid url size              | 不合法的 url 长度           |
| :---- | :---------------------------- | :-------------------------- |
| 40048 | invalid url domain            | 不合法的 url 域名           |
| 40054 | invalid sub button url domain | 不合法的子菜单按钮 url 域名 |
| 40055 | invalid button url domain     | 不合法的菜单按钮 url 域名   |
| 40066 | invalid url                   | 不合法的 url                |
| 41001 | access_token missing          | 缺失 access_token 参数      |
| 41002 | appid missing                 | 缺失 appid 参数             |
| 41003 | refresh_token missing         | 缺失 refresh_token 参数     |
| 41004 | appsecret missing             | 缺失 secret 参数            |
| 41005 | media data missing            | 缺失二进制媒体文件          |
| 41006 | media_id missing              | 缺失 media_id 参数          |
| 41007 | sub_menu data missing         | 缺失子菜单数据              |
| 41008 | missing code                  | 缺失 code 参数              |
| 41009 | missing openid                | 缺失 openid 参数            |
| 41010 | missing url                   | 缺失 url 参数               |
| 42001 | access_token expired          | access_token 超时           |
| 42002 | refresh_token expired         | refresh_token 超时          |

```
function createHttpService (settings) {
  const service = Axios.create(settings)
  service.interceptors.request.use(
    config => {
      
      const token = localStorage.getItem('access_token')
      config.headers.token = token
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
  
  service.interceptors.response.use(
    response => {
      console.log(response)
      const { code, message, data } = response.data
      
      if (code >= 30000) {
        console.log('>>> 自定义错误信息，全局提示处理', message)
        return data
      }
      
      if (code >= 200 && code < 300) {
        return data
      }

      
      if (code >= 300 && code < 600) {
        return Promise.reject(response.data)
      }
    },
    error => {
      const { status = 404 } = error?.response
      if (Object.prototype.hasOwnProperty.call(codeMessage, status)) {
        handleError(error, codeMessage[status])
      }
      throw error
    }
  )
  return service
}

const http = createHttpService({
  withCredentials,
  timeout,
  baseURL
})
```

## 约定式 http 请求

看过我上几篇文章的文章大家都大致清楚，约定式请求可以很好的简化请求封装的复杂度，同样的当你公司存在小白或者是实习生的话，对于请求的拆封是没有考虑的，当你交付一个任务，完成并不是等于较为好的完成。

约定式除了减少新手开发者在团队中不稳定的代码因素的同时，也减少了开发时一个个的写`AxiosPromise` 函数的重复行为。下面是一个基本的接口约定，在 `login-api.js` 下写的文件，都将被映射成为 `请求函数`

```
export default {
  getPerson: 'GET /person',
  setPerson: 'POST /person',
  updatePerson: 'PUT /person/:id',
  deletePerson: 'DELETE /person/:id'
}
```

如 `log.js` 打印的结果，团队开发人员不需要关注函数本身，只需要关注调用。同时， `开发环境下` 所有的接口信息都会通过 `console.table` 输出到控制台，在没有很好的类型推导的情况下，依旧可以快速的调用对应接口来获取后端数据。![图片](C:\Users\Administrator\Desktop\项目笔记\Vue\640)

> 本身 api 函数拆分出来，其实都是一个重复的工作，对开发者成长是毫无意义的。

### 不同的调用方式

为了统一的调用，也适当的给出了两种使用方式，大多数场景下使用都是通用的，第一种方式较为的保守，其本质上是交由成员来处理任务，实例：

```
<script>
 
import { useServices } from 'framework'


const { getPerson } = useServices()

export default {
  name: 'home',
  created () {
    
    getPerson().then(res => {
      console.log(res)
      alert('接口请求成功')
    }, err => {
      console.log(err)
      alert('接口请求失败')
    })
  }
}
</script>
```

上述实例非常的简单，相信有一点基础的同学都可以看得出来，第一种方法非常的普遍，适用于大多数人群，但是弊端也很明显，如果每一个接口都需要做一次 `then & catch & finally` 的话无疑是一个灾难，因此第二种方法诞生了，对于新手来说，更加的友好。如下实例：

```
<script>
 
import { useServices } from 'framework'

const Admin = {
  created () {
    this.getPersonData()
  },
  methods: {
    
    async getPersonData () {
      const [, err] = await useServices('getPerson')
      if (err) {
        alert('接口请求失败')
      } else {
        alert('接口请求成功')
      }
    }
  }
}
export default Admin
</script>
```

在原先 api 的基础上， `useServices` 为 `Promise` 的行为包裹了一层中间件，当你决定使用非常态请求时，这个 `promise中间件` 行为会被触发。且将 `Promise` 后的结果形态抽象成为了一个数组返回出来，那么在逻辑块中，我们只需要简单的通过 `async & await` 对结果中的数据进行处理，而不必关注无意义的 `try catch` 和 `then catch` 。

> 兼容两种方式的原因是不同开发者不同习惯问题，有些时候开发者认为，错误的处理还是交由处理人去解决，从而达到错误解决目的。

## Mixin 数据管理 (model)

有了约定式的请求，很统一的解决我们请求的问题，但随之而来的就是异步数据的管理问题，很长一段时间中，Vue 开发者都习惯性的将接口请求，数据逻辑处理放在 vue 文件中，比如最常见的 `分页表格数据` ， `基础表单显示`，每一个页面中都声明了非常多的 `total` ，`pageSize` ， `currentPage` ，`tableData` 等字段，并且乐此不疲的反复 CV，结束忙碌的一天后美滋滋觉得今天又完成了 10 多个页面。其实细心的同学也发现了，不管你 CV 多少次代码，对自身的提升是有限度的，无非就是孰能生巧，复制粘贴的速度更加快了，就好比你写了 4000 次 `hello` 不代表你有了 4000 个词汇一般。

因此就产生了封装自己的表格组件，只需要传递很小一部分参数进去（如 HTTP 请求方法），就可以达到渲染表格的实现。同样的，也有小伙伴们封装了 `Global Mixin` 来解决这部分的任务。同样的，为了很好的管理数据层，我也在尝试不同的数据管理，随着业务逻辑增大，大部分的页面的异步数据都难以管理，或多或少会和页面的逻辑数据混淆，过一段时间后，需要将`$data` 中的数据解构重新梳理，才能泡通逻辑。

因此，在尝试不同的解决方案后， `mixin` 成了首当其冲的方案，它并不像 `vuex` 一般会在全局生效，而只对混入的页面生效，所以在简单的尝试后，对 mixin 进行了包装，抽象成为了一个 `model` 层，这个 `model` 层的作用主要是处理菜单级页面的异步数据的流向打造的，视图页面数据在 `.vue` 中声明， `后端数据` 在 `model.js` 中。

一个基本的 model.js 它看起来是这样的

```
export default {
  namespace: 'Home',
  state: {
    move: {},
    a: 1,
    b: 2
  },
  actions: {
    
    async setUser (state, { payload, set }) {
      const data = await test()
      await set(state, 'move', data)
      return state.move
    }
  }
}

const test = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        user: 'wangly',
        age: 21
      })
    }, 2000)
  })
}
```

那么在页面中，声明的组件都会被传入到 `useModels` 中进行混入，混入后的 `Mixin` 命名格式已经比较复杂了，这个时候来使用的就不是当前的 `this.xxx` ，而是统一执行 `this.useDispatch` 进行处理，并没有直接去触发 `model methods` ，同样的对所有的 `model` 状态都在发生改变，内部会有不同的 loading。

### 一个简单的实例

通过一个简单的实例来模拟一次服务端数据加载，从无到有的过程，纯 `model.js` 控制数据和状态 通过下面 test 模拟一个数据接口，在 `getDesserts` 进行获取，为了保证阅读质量，模拟的数据就截断了，可以参考 vuetifyUI Table Demo 数据。

```
export default {
  namespace: 'Admin',
  state: {
    mockTabData: [],
    headers: [
      { text: 'Dessert (100g serving)', value: 'name' },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Iron (%)', value: 'iron' }
    ]
  },
  actions: {
    
    async getDesserts (state, { payload, set }) {
      const data = await test()
      console.log(data)
      if (data) {
        state.mockTabData = data
      }
    }
  }
}

const test = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        
      ])
    }, 2000)
  })
}
```

在页面中，在 `created` 钩子中，通过调用 `this.useDispatch('Admin/getDesserts')` 进行数据获取，然后将 `Admin.headers` ， `Admin.mockTabData` 赋值到对应的组件参数上去，同时通过 `当前model` 方法的副作用进行骨架屏的控制。

> 所有的 `model` 方法都会在 `data` 中生成一个副作用状态，为避免冲突，data 中避免定义`model` ，以免被 `model.js` 覆盖。

```
<template>
  <div>
    <v-data-table
      v-if="!model['Admin/getDesserts']"
      :headers="Admin.headers"
      :items="Admin.mockTabData"
    ></v-data-table>
    <v-sheet v-else>
      <v-skeleton-loader :boilerplate="false" type="table"></v-skeleton-loader>
    </v-sheet>
  </div>
</template>

<script>
import { useModels } from 'framework'

const Admin = {
  created () {
    this.useDispatch('Admin/getDesserts')
  }
}
export default useModels(Admin, ['Admin'])
</script>
```

看看效果把，非常的简单的控制数据响应变化：

![图片](C:\Users\Administrator\Desktop\项目笔记\Vue\640)

> 该特性实验中，只作为参考。性能压测还在进行中 QAQ。

## jsDoc 项目文档

项目文档是一个非常重要的事情，不要过度相信自己的代码，如果业务大的话，3 个月左右的时间，你经手的项目可能就会丢失一部分直观的记忆，这个时候不论是你继续维护还是新人继续维护都是一件非常头疼的事情，同时需要考虑的是当项目进行到一般，后面有新人加入的时候，庞大的 `components` ， `utils` ， `api` 都会让新人感到无从下手的感觉，因此一份文档就显得格外珍贵了。那么有同学问了，我业务都忙不过，还要花时间整理文档，其他人的事情关我什么事？

一个好的项目必然会有一个好的文档，基于这类问题，所以才引入了一个文档工具来生成文档，在这个期间，也同时的对文档进行了改进，更加的贴合 `vue` 本身，首先就是对文档语法 `@module` 进行了改造，同时通过 `@page` 来声明页面，通过 `@component` 声明公共组件，如下示例：

```
<template>
  <div>2222</div>
</template>

<script>
import { useModels, useServices } from 'framework'

const Admin = {
  created () {
    this.getPersonData()
  },
  data: () => ({
    
    discount: false,
    
    currentTab: 1
  }),
  methods: {
    
    async getPersonData () {
      const [, err] = await useServices('getPerson')
      if (err) {
        alert('接口请求失败')
      } else {
        alert('接口请求成功')
      }
    }
  }
}
export default useModels(Admin, ['Admin'])
</script>
```

那么最终通过 `yarn doc` 命令生成文档：

> yarn doc

效果看上去是下面这样的![图片](C:\Users\Administrator\Desktop\项目笔记\Vue\640)可以看到，现在的一些注释就已经很规范了，但依旧不完美，主要因素是来自于 `jsdoc` 文档的主题问题，如果团队需要的话，可以自己重构一套出来，也相对来说简单。

> 文中实例仅限参考，注释文档请移步：jsdoc

## 自定义开发日志 log

对于 `console` 的使用，当时在看 `D2Admin` 的时候将其克隆了一份过来，对于抛错的日志来说，我们并不需要将自身的一些 `consle` 也进行收集，但是 `console` 之间也存在等级，如果通过 `console.error` 进行的话，可能会被捕捉从而传入给后台，因此，重写了一份 log.js 用于开发版和测试版的调试使用。

```
const log = {}


function typeColor (type = 'default') {
  let color = ''
  switch (type) {
    case 'default':
      color = '#303133'
      break
    case 'primary':
      color = '#409EFF'
      break
    case 'success':
      color = '#67C23A'
      break
    case 'warning':
      color = '#E6A23C'
      break
    case 'danger':
      color = '#F56C6C'
      break
    default:
      break
  }
  return color
}


log.capsule = function (title, info, type = 'primary') {
  console.log(
    `%c ${title} %c ${info} %c`,
    'background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
    `background:${typeColor(
      type
    )}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,
    'background:transparent'
  )
}


log.colorful = function (textArr) {
  console.log(
    `%c${textArr.map(t => t.text || '').join('%c')}`,
    ...textArr.map(t => `color: ${typeColor(t.type)};`)
  )
}

log.default = function (text) {
  log.colorful([{ text }])
}

log.primary = function (text) {
  log.colorful([{ text, type: 'primary' }])
}

log.success = function (text) {
  log.colorful([{ text, type: 'success' }])
}

log.warning = function (text) {
  log.colorful([{ text, type: 'warning' }])
}

log.danger = function (text) {
  log.colorful([{ text, type: 'danger' }])
}

export default log
```

如下图效果：

```
log.default('>>> 我是一些默认提示')
log.primary('>>> 我是一些标记提示')
log.success('>>> 我是一些成功提示')
log.warning('>>> 我是一些警告提示')
log.danger('>>> 我是一些错误提示')
```

![图片](C:\Users\Administrator\Desktop\项目笔记\Vue\640)

## 组件和页面管理

在开发过程中，同样养成一些好习惯对于项目体验会有很好的帮助，写代码就和针线活一样，细心谨慎，逻辑分明才能学到更多，减少 `P0 BUG` 的出现，如果你项目不赶，还一直出现同一个问题，感官是非常差的。因此，牢记以下小技巧，希望对你有帮助

### 页面文件

在这里推荐所有的页面级别都放在一个树下，目录菜单使用文件夹且默认视图为`index.vue` ，名称都为小写驼峰，最好是一句小写涵盖如：`home` ， `user` 。等等，组件统一放在起始页面的 `components` 下，且名称为大驼峰带模块名，如 `Admin` 下的 `Header` 组件为 `AdminHeader.vue` ，使用时则为：`<admin-header/>` ，引入时，统一使用 `@/views/admin/components/xxx` 引入。菜单在深都是在一级菜单下的东西，带上页面名称是为了更好的区分，防止组件混淆。![图片](C:\Users\Administrator\Desktop\项目笔记\Vue\640)

### 方法导出

很多时候，不同的团队成员在编写 `utils` 时，有使用箭头函数，也有使用 `function` 来声明的，因此，在这里推荐统一使用 `export function` 的形式进行 `js` 的声明，如下方法：

```
import asyncAxiosInstance from '@/plugin/createService'
import currentModels from '@/plugin/createModel'

export function getEnv () {
  return process.env.VUE_APP_MODE || 'dev'
}


export function useModels (component, models, isDispatch = true) {
  const current = []
  currentModels.forEach(item => {
    if (models.includes(item.name)) {
      current.push(item.mixin)
    }
  })
  if (isDispatch && current.length > 0) {
    current.push(currentModels[0].mixin)
  }
  console.log(current)
  if (component?.mixins) {
    const preMixin = component.mixins
    component.mixins = current.concat(preMixin)
    return component
  }
  component.mixins = [...current]
  console.log(component)
  return component
}
```

## 常用的指令

日常开发中，一些指令能够达到事半功倍的效果，但是指令需要贴合业务进行，同时设计者在设计时，同样需要标注文档，方便团队成员查看。下面的一些指令推荐在进行注册掉：

- v-click-outside 外部点击指令：当点击非绑定元素会进行元素隐藏
- v-intersect 元素监视器：检测元素在用户视图中是否可见
- v-resize 缩放监听器：窗口进行缩放时的监听指令
- v-scroll 滚动监视器：可以灵活观察绑定的元素滚动变化
- v-touch 触控监视器：可以灵活监视移动端当中的触摸行为，并产生回调
- v-auth 权限监视器：重写自 `v-permission` 主要做按钮级别权限校验和页面权限校验

> 指令资源

## 使用 SASS 还是 SCSS？

现如今最好的 `CSS扩展语言` 依旧是 `SASS` 和 `LESS` ，两者大差不差，可以根据团队需要进行更换，使用起来没有啥差别。在开发项目中，对于 `SASS` 我是首先推荐的（非 SCSS），如果没有熟悉使用 `SASS` 的同学会觉得非常反人类，但如果你的规范好的话，我想你可以看下下面的这段 `SASS` 代码：

```
@mixin flex ($mod: flex, $justifyContent: center, $alignItems: center, $direction: initial)
  display: $mod
  justify-content: $justifyContent
  align-items: $alignItems
  flex-direction: $direction
// end flex mixin ...
```

在写 CSS 时，都建议在末尾加上一段 `end` 注释来作为逻辑符号的完成，用于区分样式块的代码，防止逻辑混乱，当大量的样式维护较差时，我想 `SCSS` 给的安全感是比较高的，同理，当维护的好的时候， `SASS` 无疑是更加简洁。当然也容易出错。

> 两者殊途同归，可以根据团队成员习惯选择。

## @mixin 和 %placeholder

首先， `@mixin` 适合用来写一些具有逻辑性的 `css` ，如最基本的 `flex` ，可以通过传递的 `params` 进行不同的设置，这是 `%placeholder` 欠缺的，但是 `%placeholder` 在静态样式的继承上，可以减少重复 `css` 的调用，减少重复代码，运用的多数场景为：`基本卡片样式` ， `统一的组件样式` 等设计稿无偏差的时候使用，因此不需要无脑使用 `@mixin` ，有时候`%placeholder` 更香。

使用一个实例进行比对：

```
%demo
  color: red
  font-size: 20px
  border: 1px solid red
 // end ...

.test1
  @extend %demo
// end ...

.test2
  @extend %demo
// end ...

.test3
  @extend %demo
复制代码
```

如上代码，使用 `%placeholder` 最终会生成的样式是下面这样的：

```
.test1, .test2, .test3 {
  color: red
  font-size: 20px
  border: 1px solid red
}
```

而如果换成 `@mixin` ，他们的结果是这样的：

```
@mixin demo()
  color: red
  font-size: 20px
  border: 1px solid red
// end ...

.test1
  @include demo()
// end ...

.test2
  @@include demo()
// end ...

.test3
  @@include demo()
// end ...
```

编译后：

```
.test1 {
  color: red
  font-size: 20px
  border: 1px solid red
}
.test2 {
  color: red
  font-size: 20px
  border: 1px solid red
}
.test3 {
  color: red
  font-size: 20px
  border: 1px solid red
}
```

> 不用我说，你应该知道怎么用了吧。

## ESLint

理想的情况下，大部分前端团队都会存在有 `Eslint` ，作为一个代码质量的标准，但也仅仅只是一个标准，配合 `Git Commit` 前置动作可以执行代码检阅是否合格来防止低于标准的代码提交到存储库中，这一个动作需要开发者自身养成良好的编码习惯和代码质量意识。

如果使用的是 `VS CODE` 那么就需要在编译器中进行配置来开启规则检查，当违背了语法警告的同时，会提示如下警告：![图片](C:\Users\Administrator\Desktop\项目笔记\Vue\640)

不推荐直接 commit 时直接编译化代码，Eslint 是帮助开发者代码成长的，而不是一个表面功夫的工具。