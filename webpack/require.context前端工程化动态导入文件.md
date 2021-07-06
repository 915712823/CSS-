# **Webpack require.context() 前端工程化之动态导入文件**

2019.07.25 17:59 5833浏览

## 前言

随着项目越来越大，业务需要越来越多，我们项目的目录层级也是非常的多。如果还是通过`import`分别引入文件，那是非常的不科学的。

![Webpack require.context() 前端工程化之动态导入文件](C:\Users\Administrator\Desktop\项目笔记\webpack\require.context前端工程化动态导入文件.assets\5d397d4600010f1411000825.jpg)

比如vue项目vuex文件非常多：

```javascript
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import user from './stores/user';
import info from './stores/info';
... // 此处省略N多文件

export default new Vuex.Store({
  modules: {
      user,
      info,
      ...
  },
});
```

要是有几个文件，还好。几十个，几百个，就非常头疼了。怎么解决这个问题了？

我们就要用到 `Webpack` 中的`require.context()`方法，动态加载某个文件夹下的所有JS文件，是不是就解决问题了呢！下面看看`require.context()`如何使用。

## require.context()

![Webpack require.context() 前端工程化之动态导入文件](C:\Users\Administrator\Desktop\项目笔记\webpack\require.context前端工程化动态导入文件.assets\5d397d46000136da12000500.jpg)

### 语法：

```javascript
require.context(directory, useSubdirectories = false, regExp = /^.//);
```

### 示例

```javascript
// 一个test文件夹下面（不包含子目录），能被require请求到，所有文件名以 `.test.js` 结尾的文件形成的上下文（模块）。
require.context("./test", false, /\.test\.js$/);

// 一个父级文件夹下面（包含子目录），所有文件名以 `.stories.js` 结尾的文件形成的上下文（模块）。
require.context("../", true, /\.stories\.js$/);
```

下面看看，我们如何应用到vue项目中？

## Vue项目中，使用require.context()

![Webpack require.context() 前端工程化之动态导入文件](C:\Users\Administrator\Desktop\项目笔记\webpack\require.context前端工程化动态导入文件.assets\5d397d470001f4fe12000500.jpg)

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import App from './App'
import router from './router'

const strict = process.env.NODE_ENV !== 'production'

Vue.config.productionTip = false

const modules = {}
// 获取stores文件夹下所有js文件
let requireContext = require.context('./stores', true, /^\.\/.*\/index\.js$/)
// requireContext.keys() 返回匹配成功模块的名字组成的数组
requireContext.keys().forEach((key) => {
  // 通过 requireContext(key)导出文件内容
  const mod = requireContext(key)
  modules[key.slice(2, -9)] = mod.__esModule && mod.default ? mod.default : mod
})
Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  strict
})
sync(store, router)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
```

通过以上方法就可以动态的导入`stores`文件夹中的所有`js`文件，这样就方便管理了，也不用一个个引入， 同理，如果路由文件等非常多，也可以用`require.context()`导入。

### 全局过滤器导入

![Webpack require.context() 前端工程化之动态导入文件](C:\Users\Administrator\Desktop\项目笔记\webpack\require.context前端工程化动态导入文件.assets\5d397d470001d25821001181.jpg)

```javascript
Vue.use((Vue) => {
  ((requireContext) => {
    const arr = requireContext.keys().map(requireContext);
    (arr || []).forEach((filter) => {
      filter = filter.__esModule && filter.default ? filter.default : filter;
      Object.keys(filter).forEach((key) => {
        Vue.filter(key, filter[key]);
      });
    });
  })(require.context('./filters', false, /^\.\/.*\.js$/));
});
```

### 全局指令导入

![Webpack require.context() 前端工程化之动态导入文件](C:\Users\Administrator\Desktop\项目笔记\webpack\require.context前端工程化动态导入文件.assets\5d397d4800017afa13560656.jpg)

```javascript
Vue.use((Vue) => {
  ((requireContext) => {
    const arr = requireContext.keys().map(requireContext);
    (arr || []).forEach((directive) => {
      directive = directive.__esModule && directive.default ? directive.default : directive;
      Object.keys(directive).forEach((key) => {
        Vue.directive(key, directive[key]);
      });
    });
  })(require.context('./directives', false, /^\.\/.*\.js$/));
});
```

![Webpack require.context() 前端工程化之动态导入文件](C:\Users\Administrator\Desktop\项目笔记\webpack\require.context前端工程化动态导入文件.assets\5d397d490001055d10540359.jpg)

## 总结

webpack作为前端构建的打包工具， 把各种资源，例如JS（含JSX）、coffee、css（含less/sass）、图片等都作为模块来处理和使用，它已经做了非常好了，它还有非常多的功能等待我们去发掘，研究。