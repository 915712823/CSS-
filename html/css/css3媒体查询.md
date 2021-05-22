# CSS3之媒体查询（响应式布局）

![图片](C:\Users\Administrator\Desktop\项目笔记\html\css\css3媒体查询.assets\640)

### 为啥有媒体查询：

2.移动设备的快速普及完全颠覆了Web设计领域。用户不再仅在传统桌面系统上查看Web内容，他们越来越多地使用具有各种尺寸的智能电话、平板电脑和其他设备。

1.Web设计人员的挑战是确保他们的网站不仅在大屏幕上看起来不错，在小型的电话以及介于它们之间的各种设备上看起来也不错。（说白了就是不同大小显示器web适配问题。CSS2中也有媒体查询，CSS3在此基础更加丰满）

### 什么是媒体查询：

1.媒体查询是向不同设备提供不同样式的一种方式，它为每种类型的用户提供了最佳的体验。

2.css2: media type media type(媒体类型)是css 2中的一个非常有用的属性，通过media type我们可以对不同的设备指定特定的样式，从而实现更丰富的界面。

3.css3: media query media query是CSS3对media type的增强，事实上我们可以将media query看成是media type+css属性(媒体特性Media features)判断。

### 如何使用媒体查询：

link标签引入：media属性（eg：引入（screen）彩色屏幕显示，并且最大宽度不超过800px时候的CSS样式）

```
<link rel="stylesheet" media="screen and (max-width:800px)" href="./demo.css">
```

1.媒体类型（Media Type):  all(全部)、screen(屏幕)、print(页面打印或打印预览模式)

2.媒体特性（Media features): width(渲染区宽度)、device-width(设备宽度)... Media Query是CSS3 对Media Type的增强版，其实可以将Media Query看成Media Type(判断条件)+CSS(符合条件的样式规则)

style中直接引入：当显示宽度不大于400px时，div该有的样式。

```
@media screen and (max-width: 400px) {
 
.wrapper div{
 
width: 100%;
 
}
 
}
复制代码
```

### 媒体类型(media type) ：常用all，screen，print。

![图片](C:\Users\Administrator\Desktop\项目笔记\html\css\css常用方法.assets\640)

### 媒体特性(media features) ：

![图片](C:\Users\Administrator\Desktop\项目笔记\html\css\css常用方法.assets\640)

### 逻辑操作符 and：

合并多个媒体属性

eg：@media screen and (min-width: 600px) and (max-width:100px)

合并多个媒体属性或合并媒体属性与媒体类型, 一个基本的媒体查询，即一个媒体属性与默认指定的screen媒体类型

### 指定备用功能：

eg：@media screen and (min-width: 769px), print and (min-width: 6in)"

没有or关键词可用于指定备用的媒体功能。相反，可以将备用功能以逗号分割列表的形式列出，这会将样式应用到宽度超过769像素的屏幕**或**使用至少6英寸宽的纸张的打印设备。**（逗号代表或）**

### 指定否定条件：

eg：@media not screen and (monochrome)

要指定否定条件，可以在媒体声明中添加关键字not，不能在单个条件前使用not。该关键字必须位于声明的开头，而且它会否定整个声明。所以，上面的示例会应用于除单色屏幕外的所有设备。

### 向早期浏览器隐藏媒体查询（不常用）

eg：media="only screen and (min-width: 401px) and (max-width: 600px)"

媒体查询规范还提供了关键字only，它用于向早期浏览器隐藏媒体查询。类似于not，该关键字必须位于声明的开头。早期浏览器应该将以下语句

media="screen and (min-width: 401px) and (max-width: 600px)" 解释为media="screen"：

换句话说，它应该将样式规则应用于所有屏幕设备，即使它不知道媒体查询的含义。无法识别媒体查询的浏览器要求获得逗号分割的媒体类型列表，规范要求，它们应该在第一个不是连字符的非数字字母字符之前截断每个值。所以，早期浏览器应该将上面的示例解释为：media="only"  因为没有only这样的媒体类型，所以样式表被忽略。

### 注意点：

device-width/height   width/height来做为的判定值

device-width/height 是设备的宽度（如电脑手机的宽度，不是浏览器的宽度）

width/height使用documentElement.clientWidth/Height即viewport的值。