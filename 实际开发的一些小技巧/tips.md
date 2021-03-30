# 背景图片的使用

![](C:\Users\Administrator\Desktop\项目笔记\实际开发的一些小技巧\image-20210324135517150.png)

# border问题

#### 1.给表格添加border的时候，很多表格边框会重叠

去除方式：border-collapse:collapse  <font color="red">合并相邻边框</font>

![image-20210324154733129](C:\Users\Administrator\Desktop\项目笔记\实习开发的一些小技巧\image-20210324154733129.png)

# margin问题

外边距margin可以让<font color="red">块级盒子</font><font color="pink">水平居中</font>，但必须满足两个条件：

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