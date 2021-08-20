# 京东css初始化代码

```css
* {
  margin: 0;
  padding: 0
}

em,
i {
  font-style: normal
}

li {
  list-style: none
}

img {
  border: 0;
  vertical-align: middle
}

button {
  cursor: pointer
}

a {
  color: #666;
  text-decoration: none
}

a:hover {
  color: #c81623
}

button,
input {
  font-family: Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, "\5B8B\4F53", sans-serif
}

body {
  -webkit-font-smoothing: antialiased;
  background-color: #fff;
  font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, "\5B8B\4F53", sans-serif;
  color: #666
}

.hide,
.none {
  display: none
}

.clearfix:after {
  visibility: hidden;
  clear: both;
  display: block;
  content: ".";
  height: 0
}

.clearfix {
  *zoom: 1
}
```



# 背景图片的使用

![](C:\Users\Administrator\Desktop\项目笔记\html\css\css实际开发的一些小技巧\image-20210324135517150.png)

# border问题

#### 1.给表格添加border的时候，很多表格边框会重叠

去除方式：border-collapse:collapse  <font size="4px" color="red">合并相邻边框</font>

![](C:\Users\Administrator\Desktop\项目笔记\html\css\css实际开发的一些小技巧\image-20210324154733129.png)

# margin问题

外边距margin可以让<font size="4px" color="red">块级盒子</font><font size="4px" color="pink">水平居中</font>，但必须满足两个条件：

1.盒子必须指定了宽度

2.margin 将左右边距设为auto 



# 用伪类做箭头   '<'    '>'

#### <  的案例

```css
.cardItem::before{

 content: '';

 display: block;

 width: 20px;

 height: 20px;

 border:2px solid rgba(0, 0, 0, 0);

 border-top-color: #000;

 border-right-color: #000;

 transform: translateY(-50%) rotate(-135deg);

 position: absolute;

 top: 50%;

 left: 70px;

}
```

#### >  的案例

```css
.cardItem::after{

 content: '';

 display: block;

 width: 20px;

 height: 20px;

 border:2px solid rgba(0, 0, 0, 0);

 border-top-color: #000;

 border-right-color: #000;

 transform: translateY(-50%) rotate(45deg);

 position: absolute;

 top: 50%;

 right: 70px;

}
```



# CSS 在隐藏父元素的情况下显示子元素

```css
.father{
  visibility: hidden;
}
.son{
  visibility: visible;
}
```

| 值       | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| visible  | 默认值（元素可见）                                           |
| hidden   | 元素不可见                                                   |
| collapse | 当在表格元素中使用时，此值可删除一行或一列，但是它不会影响表格的布局。被行或列占据的空间会留给其他内容使用。如果此值被用在其他的元素上，会呈现为 "hidden"。 |
| inherit  | 规定应该从父元素继承 visibility 属性的值。                   |

# 鼠标经过时显示遮罩层

```css
.box{
  position: relative;
}
.mask{
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .4);
}
.box:hover .mask{
  display: block;
}
```

# 精灵图的使用

工具（FW）

#### 核心总结：

1.主要针对小的背景图片使用

2.主要借助背景位置来实现---------background-position

3.一般情况下精灵图位置都是负值(X轴右边走是正直，左边走是负值，Y轴同理)

# CSS画三角

```css
.triangle{
  width: 0px;
  height: 0px;
  border: 6px solid transparent;
  border-bottom-color: rgba(0, 0, 0, .2);
  /* 为了照顾兼容性 */
  line-height: 0;
  font-size: 0;
}
```



# 防止拖拽文本域(textarea)

```css
textarea{
  resize: none;
}
```

# vertical-align

#### 常用于设置图片或者表单(行内块元素)和文字垂直对齐

#### 还能解决图片底部缝隙问题



# 溢出文字省略号显示

#### 1.单行文本溢出显示省略号

```css
.txt{
  /* 1.先强制一行内显示文本 */
 	white-space: nowrap;  
  /* 2.超出本分隐藏 */
  overflow: hidden;
  /* 3.文字用省略号代替超出的部分 */
  text-overflow: ellipsis;
}
```

#### 2.多行文本溢出显示省略号

(推荐让后台做这个效果，后台可以设置显示多少个字，操作更简单)

多行文本溢出显示省略号有较大的兼容性问题，适用于webkit浏览器或者移动端

```css
.txt{
  overflow: hidden;
  text-overflow: ellipsis;
  /* 弹性伸缩盒子模型显示 */
  display: -webkit-box;
  /* 限制在一个块元素显示的文本的行数 */
  -webkit-line-clamp: 2;
  /* 设置或检索伸缩盒对象的子元素的排列方式 */
  -webkit-box-orient: vertical;
}
```

# 用margin负值解决问题

## 1.浮动边框重叠问题

### 1）如果盒子没有定位，则鼠标经过添加<font size="4px" color="pink">相对定位</font>即可

```css
ul li{
  border: 1px solid #ccc;
  margin-left: -1px;
}
ul li:hover{
  position: relative;
  border: 1px solid red;
}
```



### 2）如果盒子已有定位，则鼠标经过利用<font size="6px" color="red">z-index</font>提高层级

```css
ul li{
  position: relative;
  border: 1px solid #ccc;
  margin-left: -1px;
}
ul li:hover{
  z-index: 1;  /* 如果li都有定位，则利用z-index提高层级 */
  border: 1px solid red;
}
```

# 文字围绕浮动元素巧妙运用

```html
<div class="box">
	<div class="pic">
    <img src="..." alt="">
  </div>
  <p>
    【集锦】热身赛-巴西0-1秘鲁内马尔替补两人血染赛场
  </p>
</div>
```

```css
.box{
  width: 300px;
  height: 70px;
}
.box .pic{
  float: left;  /* 主要代码hhh */
  width: 120px;
  height: 60px;
}
.box .pic img{
  width: 100%;
}
```

