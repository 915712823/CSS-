# vue中swiper vue-awesome-swiper的使用及参数配置选项

### 1.安装指定版本，我是用的   3

```npm
npm install vue-awesome-swiper@3 --save-dev
```

### 2.在vue中引入vue-awesome-swiper（有两种引入）

#### 1）全局引入 main.js

```javascript
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper);
```

***引入之后直接在组件中用就好了

##### 案例1：

```vue
<template>
	<div class="swiperBox">
		<swiper :options="swiperOption" ref="mySwiper">
			<swiper-slide>Slide 1</swiper-slide>
			<swiper-slide>Slide 2</swiper-slide>
			<swiper-slide>Slide 3</swiper-slide>
			<swiper-slide>Slide 4</swiper-slide>
			<swiper-slide>Slide 5</swiper-slide>
			<swiper-slide>Slide 6</swiper-slide>
			<swiper-slide>Slide 7</swiper-slide>
			<swiper-slide>Slide 8</swiper-slide>
			<swiper-slide>Slide 9</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
			<div class="swiper-button-prev" slot="button-prev"></div>
			<div class="swiper-button-next" slot="button-next"></div>
		</swiper>
	</div>
</template>

<script>
export default {
	name: "Home",
	data() {
		return {
			swiperOption: {
				slidesPerView: 4,
				spaceBetween: 30,
				slidesPerGroup: 4,
				// 显示分页
				pagination: {
					el: ".swiper-pagination",
					clickable: true, //允许分页点击跳转
				},
				// 设置点击箭头
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
        //响应式
				breakpoints: {
					1280: {
						//当屏幕宽度大于等于320
						slidesPerView: 2,
						spaceBetween: 10,
					},
					1440: {
						//当屏幕宽度大于等于768
						slidesPerView: 3,
						spaceBetween: 20,
					},
					1630: {
						//当屏幕宽度大于等于1280
						slidesPerView: 4,
						spaceBetween: 30,
					},
				},
			},
		};
	},
	computed: {
		swiper() {
			return this.$refs.mySwiper.swiper;
		},
	},
	mounted() {
		// current swiper instance
		// 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
		console.log("this is current swiper instance object", this.swiper);
		// this.swiper.slideTo(3, 1000, false);
	},
	methods: {},
};
</script>
<style scoped >
.swiperBox .swiper-container {
	position: relative;
	width: 100%;
	height: 200px;
	background: pink;
}
.swiperBox .swiper-container .swiper-slide {
	width: 100%;
	line-height: 200px;
	background: yellowgreen;
	color: #000;
	font-size: 16px;
	text-align: center;
}
</style>
```



#### 2）组件内引入 home.vue

##### 案例2

```vue
<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
    <swiper-slide>Slide 6</swiper-slide>
    <swiper-slide>Slide 7</swiper-slide>
    <swiper-slide>Slide 8</swiper-slide>
    <swiper-slide>Slide 9</swiper-slide>
    <swiper-slide>Slide 10</swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
// 引入插件
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true //允许分页点击跳转
        },
        // 设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log("this is current swiper instance object", this.swiper);
    // this.swiper.slideTo(3, 1000, false);
  }
};
</script>
<style scoped >
.swiper-container{
  position: relative;
  width: 100%;
  height: 200px;
  background: pink;
}  
 .swiper-slide{
  width: 100%;
  line-height: 200px;
  background: yellowgreen;
  color: #000;
  font-size: 16px;
  text-align: center;
}
</style>
```

### 3. api查找文档

[中文api - Swiper中文网](https://www.swiper.com.cn/api/index.html)

案例一有响应式，一次显示4张图，每次切换四张图等api的使用，可以借鉴。