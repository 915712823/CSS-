### 实现弹性自适应效果

目前主流的实现是通过设定根元素的`font-size`大小，具体元素或模块使用`rem`或`em`单位来实现。

一种是直接设定一个临界点字体大小，如：

这种基于`@media`的CSS实现问题在于，内容的弹性自适应只会在临界点的时候，“Duang”变化下，于是，我们浏览器尺寸拉伸的时候，会感受到类似“噔噔噔”卡壳的效果

```css
html {
    font-size: 16px;
}
@media screen and (min-width: 600px) {
    html {
        font-size: 18px;
    }
}
@media screen and (min-width: 1000px) {
    html {
        font-size: 22px;
    }
}
```

还有一种就是使用JS在resize或者屏幕旋转的时候，动态修改root的`font-size`大小。

使用JS的问题在于他是JS，要保证加载体验，需要头部内联，为了保证实时性，需要多个浏览器变化事件监测。

### 案例

经过大型项目实践，下面这段CSS是最好的基于`rem`和`vw`和`calc`实践代码：

[基于vw的弹性布局小演示小demo](https://www.zhangxinxu.com/study/201608/vw-layout-typography.html)

```css
html {
    font-size: 16px;
}

@media screen and (min-width: 375px) {
    html {
        /* iPhone6的375px尺寸作为16px基准，414px正好18px大小, 600 20px */
        font-size: calc(100% + 2 * (100vw - 375px) / 39);
        font-size: calc(16px + 2 * (100vw - 375px) / 39);
    }
}
@media screen and (min-width: 414px) {
    html {
        /* 414px-1000px每100像素宽字体增加1px(18px-22px) */
        font-size: calc(112.5% + 4 * (100vw - 414px) / 586);
        font-size: calc(18px + 4 * (100vw - 414px) / 586);
    }
}
@media screen and (min-width: 600px) {
    html {
        /* 600px-1000px每100像素宽字体增加1px(20px-24px) */
        font-size: calc(125% + 4 * (100vw - 600px) / 400);
        font-size: calc(20px + 4 * (100vw - 600px) / 400);
    }
}
@media screen and (min-width: 1000px) {
    html {
        /* 1000px往后是每100像素0.5px增加 */
        font-size: calc(137.5% + 6 * (100vw - 1000px) / 1000);
        font-size: calc(22px + 6 * (100vw - 1000px) / 1000);
    }
}
```

