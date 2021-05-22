# CSS特殊选择器

## 选择器参考手册

| 选择器                                                       | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [[*attribute*\]](https://www.w3school.com.cn/cssref/selector_attribute.asp) | 用于选取带有指定属性的元素。                                 |
| [[*attribute*=*value*\]](https://www.w3school.com.cn/cssref/selector_attribute_value.asp) | 用于选取带有指定属性和值的元素。                             |
| [[*attribute*~=*value*\]](https://www.w3school.com.cn/cssref/selector_attribute_value_contain.asp) | 用于选取属性值中包含指定词汇的元素。                         |
| [[*attribute*\|=*value*\]](https://www.w3school.com.cn/cssref/selector_attribute_value_start.asp) | 用于选取带有以指定值开头的属性值的元素，该值必须是整个单词。 |
| [[*attribute*^=*value*\]](https://www.w3school.com.cn/cssref/selector_attr_begin.asp) | 匹配属性值以指定值开头的每个元素。                           |
| [[*attribute*$=*value*\]](https://www.w3school.com.cn/cssref/selector_attr_end.asp) | 匹配属性值以指定值结尾的每个元素。                           |
| [[attribute*=value\]](https://www.w3school.com.cn/cssref/selector_attr_contain.asp) | 匹配属性值中包含指定值的每个元素。                           |

## 后代选择器与子元素选择器的区别

#### 1.用法

```html
<div>
  <span>
  	<p>123</p>
  </span>
</div>
```



后代选择器：div p{}

子代选择器：div>span>p{}

#### 2.规则

顾名思义后代选择器会选中符合和子代、孙代等全部元素；而子元素选择器只会选择子代元素，若对应不上则不会有任何效果。

#### 3.案例代码

##### 3.1<font color="red">子元素</font>选择器

html

```html
<nav>
  <ul>
    <li>1
      <ul>
        <li>2</li>
      </ul>
    </li>
  </ul>
</nav>
```

css

```css
<style>
nav>ul>li{
  list-type: none;
}
</style>
```

3.2<font color="red">后代</font>选择器(html与前面同)

```css
<style>
nav ul li{
  list-type: none;
}
</style>
```

#### 4.效果图

子元素

![](C:\Users\Administrator\Desktop\项目笔记\CSS易忘易混笔记\image-20210318104721968.png)

后代

![](C:\Users\Administrator\Desktop\项目笔记\CSS易忘易混笔记\image-20210318110808703.png)

## +选择器与~选择 器的区别

+选择器：只会影响下一个元素的样式

~选择器：会影响到后面全部的元素

```html
<div>
  <p class="one"></p>
  <p></p>
  <p></p>
  <p class="two"></p>
  <p></p>
  <p></p>
</div>
```

```css
.one + p{
  color:red;
}
.two ~ p{
  color:pink;
}
```

如上：class类one后面的一个p颜色会变红，而two后面的所有p颜色会变粉

# 元素的显示与隐藏

#### 1.Display(显示) 

| none  | 此元素不会被显示。（隐藏）直接消失 不占地              |
| ----- | ------------------------------------------------------ |
| block | 此元素将显示为块级元素，此元素前后会带有换行符。(显示) |

#### 2.Visibility（可见性）

| hidden  | 元素是不可见的。还是会占住该区域 |
| ------- | -------------------------------- |
| visible | 元素是可见的。                   |

