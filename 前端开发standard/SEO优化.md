# 一、meta

```html
<meta name="description" content="XXXX">
<meta name="keywords" content="XXX">
```

# 二、title

```html
<title>XXX</title>
```

# 三、LOGO

1) 步骤：

1.logo里面首先放一个h1标签，目的是提权，让搜索引擎知道这里很重要

2.h1里面再放一个a链接，可以返回首页，把logo的背景图片链接即可

3.为了搜索引擎收录我们，我们链接里面要放文字(网站名称），但是文字不要显示出来。

- ​	方法1 : text-indent移到盒子外面( text-indent: -9999px)，然后overflow:hidden; 淘宝的做法。
- ​	方法2∶直接给<font color="red">font-size:0; </font>就看不到文字了，京东的做法。

4.最后给链接一个title属性，这样鼠标放到logo上就可以看到提示文字了。

HTML

```html

```

CSS

```css

```

