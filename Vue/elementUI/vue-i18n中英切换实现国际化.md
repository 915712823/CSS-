# 利用vue-i18n中英文切换实现国际化，及从后台读取配置文件国际化解决方案

控制整个系统的中英文或其他语言显示，大概思路就是就是要把整个系统显示的中文对应的英文全部翻译一遍，然后写定key，根据配置的中英文属性，拿value。

1、npm install  vue-i18n --save 安装依赖

2、编写语言文件，我放在这里，en.js为英文配置文件，zh.js为中文配置文件，en英文配置文件部分截图，对应的zh中文配置文件截图

3、在main.js里面引入vue-i18n插件及中英文配置文件

![img](C:\Users\Administrator\Desktop\项目笔记\Vue\elementUI\vue-i18n中英切换实现国际化.assets\20190529180620720.png)

4、在页面中可以写一个下拉或者button用于切换，绑定上事件

```vue
<el-dropdown trigger="click" @command="handleSetLanguage">

  <div>
    <span class="el-dropdown-link">
      {{language}}
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
  </div>

  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="zh">中文</el-dropdown-item>
    <el-dropdown-item command="en">English</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
<script>
handleSetLanguage(temp) {
  this.$i18n.locale = temp; //改变当前语言
  localStorage.language = temp;
}, 
// 将temp 语言存在localStorage里，main里面就会根据属性值进行判断。
</script>
```

5、此时，在页面里的汉字

```
如: <span>欢迎</span>
此时就要写为<span>{{$t('others.welcom')}}</span> 
vue绑定的这种如:lable=“欢迎”需要改为:label = "$t(others.welcom)"，若果是在js代码里。
非页面里如element的message:" 欢迎";就要改为message:"this.$t('others.welcom')"，这个others.welcome结构可以随意修改，只要能拿到就好了。
另如果是在js中写这种多语言翻译就要注意，js不像vue的html可以实时渲染，它只在调用的时候才会运行，那么切换按钮对它将不起作用，此时可以在切换时用强制刷新来解决。
```

6、要实现国际化，除了前端这种固定的要配置，后端返回的配置文件也要进行配置

我们可爱的后台将对应相同value的中英文对返回给我们了，分别为name(中文)及enName（英文）

可爱的前端同事自己做了一个方法，通过判断拿到的localStorage.language，来显示name,我们的页面的配置文件，统一显示为name,如果属性值为zh(中文)，正常显示，如果属性值为en(英文)则将enName的值赋给name就好了，不过要注意，在切换时，配置文件也要强制刷新。

# vue 强制刷新

1、在要强制刷新的父组件中注册reload方法

```vue
reload() {
  this.isRouterAlive = false
  this.$nextTick(function() {
    this.isRouterAlive = true
    console.log('reload')
  })
},
控制router-view的显示与隐藏
<router-view v-if="isRouterAlive"></router-view>
```


如图所示

![img](C:\Users\Administrator\Desktop\项目笔记\Vue\elementUI\vue-i18n中英切换实现国际化.assets\20190530174719359.png)

provide允许父组件向所有子孙组件后代注入一个依赖。

2、在组件中注入reload方法。

然后在子组件中直接this.reload就可以了。这个就是大概利用v-if的条件渲染和nextTick的异步功能，控制渲染的显示，避免

js原生方法window.location.reload()或vue路由方法this.$router.go(0)出现重新加载的空白页。