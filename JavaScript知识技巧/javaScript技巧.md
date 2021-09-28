## 断点调试

[^步骤]: 断点调试是指自己在程序的某一行设置一个断点，调试时，程序运行到这一行就会停住，然后你可以一步一步往下调试，调试过程中可以看各个变量当前的值，出错的话，调试到出错的代码行即显示错误，停下。

## 数组去重

### ES5实现

1. filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
2. indexOf() 方法可返回数组中某个指定的元素位置。

```JavaScript
var arr = [1,2,2,3,4,55,55]
function unique(arr) {
    var res = arr.filter(function(item, index, array) {
        return array.indexOf(item) === index
    })
    return res
}
console.log(unique(arr)) //[1,2,3,55]
```

### ES6实现

1、set是ES6中引入的新的数据类型。set只允许存储不重复的值，所以当你放入一个数组，它会自动去掉重复的值。

2、...是扩展运算符（对象展开符）

```javascript
var unique = arr => [...new Set(arr)]
console.log(unique(arr)) //[1,2,3,55]
```

将上面的代码解析一下，怕忘掉：

```javascript
var unique = function (arr){
  // 两种转回数组的方法(1.[],2.Array.from)，set是ES6中引入的新的数据类型。set只允许存储不重复的值，所以当你放入一个数组，它会自动去掉重复的值。
  return [...new Set(arr)];
  // return Array.from(new Set(arr))
}
console.log(unique(arr));
```

### 扩展

扩展运算符不仅可以数组去重，还可以合并数组

```javascript
let a=[1,2,3]
let b=[2,3,4]
let c=[...a,...b]
console.log(c) // [1,2,3,2,3,4]
var unique = arr => [...new Set(arr)]
console.log(unique(c))//[1,2,3,4]
```

## 1.函数柯里化

函数柯里化的是一个为多参函数实现递归降解的方式。其实现的核心是:

1. 要思考如何缓存每一次传入的参数
2. 传入的参数和目标函数的入参做比较

这里通过闭包的方式缓存参数，实现如下：

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

使用方式如下：![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

> 函数柯里化仅仅只是上面求和的这种运用吗？？

👆这个问题，有必要去🤔一下。其实利用函数柯里化这种思想，我们可以更好的实现函数的封装。

就比如有监听某一事件那么就会有移除该事件的操作，那么就可以利用柯里化的思想去封装代码了。

或者说一个输入 A 有唯一并且对应的输出 B，那么从更大的角度去思想这样的工程项目是更安全，独立的。也便于去维护。

## 2.关于数组

### 手写 map 方法

map() 方法根据回调函数映射一个新数组

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

### 手写 filter 方法

filter() 方法返回一个数组，返回的每一项是在回调函数中执行结果 true。

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

> filter 和 map 的区别：filter 是映射出条件为 true 的 item，map 是映射每一个 item。

### 手写 reduce 方法

reduce() 方法循环迭代，回调函数的结果都会作为下一次的形参的第一个参数。

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

### 手写 every 方法

every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

### 手写 some 方法

some() 方法测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个 Boolean 类型的值。

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

### 手写 find 方法

find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

### 拉平数组

将嵌套的数组扁平化，在处理业务数据场景中是频率出现比较高的。那如何实现呢？

- 利用 ES6 语法 flat(num) 方法将数组拉平。

该方法不传参数默认只会拉平一层，如果想拉平多层嵌套的数组，需要传入一个整数，表示要拉平的层级。该返回返回一个新的数组，对原数组没有影响。

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

- 利用 reduce() 方法将数组拉平。

利用 reduce 进行迭代，核心的思想是递归实现。

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

- 模拟栈实现数组拉平

该方法是模拟栈，在性能上相对最优解。

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

## 3.图片懒加载 & 惰性函数

实现图片懒加载其核心的思想就是将 img 的 src 属性先使用一张本地占位符，或者为空。然后真实的图片路径再定义一个 data-set 属性存起来，待达到一定条件的时将 data-img 的属性值赋给 src。

如下是通过`scroll`滚动事件监听来实现的图片懒加载，当图片都加载完毕移除事件监听，并且将移除 html 标签。

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

`scroll`滚动事件容易造成性能问题。那可以通过 `IntersectionObserver` 自动观察 img 标签是否进入可视区域。

实例化 IntersectionObserver 实例，接受两个参数：callback 是可见性变化时的回调函数，option 是配置对象（该参数可选）。

当 img 标签进入可视区域时会执行实例化时的回调，同时给回调传入一个 entries 参数，保存着实例观察的所有元素的一些状态，比如每个元素的边界信息，当前元素对应的 DOM 节点，当前元素进入可视区域的比率，每当一个元素进入可视区域，将真正的图片赋值给当前 img 标签，同时解除对其的观察。

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

如上是懒加载图片的实现方式。

> 值得思考的是，懒加载和惰性函数有什么不一样嘛？

我所理解的懒加载顾名思义就是需要了才去加载，懒加载正是惰性的一种，但惰性函数不仅仅是懒加载，它还可以包含另外一种方向。

惰性函数的另一种方向是在重写函数，每一次调用函数的时候无需在做一些条件的判断，判断条件在初始化的时候执行一次就好了，即下次在同样的条件语句不需要再次判断了，比如在事件监听上的兼容。

## 4.预加载

预加载顾名思义就是提前加载，比如提前加载图片。

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

当用户需要查看时，可直接从本地缓存中取。预加载的优点在于如果一张图片过大，那么请求加载图片一定会慢，页面会出现空白的现象，用户体验感就变差了，为了提高用户体验，先提前加载图片到本地缓存，当用户一打开页面时就会看到图片。

## 5.节流 & 防抖

针对高频的触发的函数，我们一般都会思考通过节流或者防抖去实现性能上的优化。

节流实现原理是通过定时器以和时间差做判断。定时器有延迟的能力，事件一开始不会立即执行，事件结束后还会再执行一次；而时间差事件一开始就立即执行，时间结束之后也会立即停止。

结合两者的特性封装节流函数：

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

函数节流不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数。

防抖实现原理是通过定时器，如果在规定时间内再次触发事件会将上次的定时器清除，即不会执行函数并重新设置一个新的定时器，直到超过规定时间自动触发定时器中的函数。

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

## 6.实现 new 关键字

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

## 7.实现 instanceof

instanceof 运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

## 8.实现 call，apply，bind

- call

call 函数实现的原理是借用方法，关键在于隐式改变`this`的指向。

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

- apply

apply 函数实现的原理和 call 是相同的，关键在于参数的处理和判断。

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

> call() 方法的作用和 apply() 方法类似，区别就是 call() 方法接受的是参数列表，而 apply() 方法接受的是一个参数数组。

- bind

bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

实现的关键思路：

1. 拷贝保存原函数，新函数和原函数原型链接
2. 生成新的函数，在新函数里调用原函数

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

## 9.封装数据类型函数

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

## 10.自记忆函数

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

## 11.是否存在循环引用

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

## 12.拷贝函数

拷贝数据一直是业务开发中绕不开的技巧，对于深浅拷贝数据之前写过一篇文章来讲述聊聊深拷贝浅拷贝。

- 通过深度优先思维拷贝数据（DFS）

深度优先是通过纵向的维度去思考问题，在处理过程中也考虑到对象环的问题。

解决对象环的核心思路是先存再拷贝。一开始先通过一个容器用来储存原来的对象再进行拷贝，在每一次拷贝之前去查找容器里是否已存在该对象。这样就切断了原来的对象和拷贝对象的联系。

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

- 通过广度优先思维拷贝数据（BFS）

广度优先是通过横向的维度去思考问题，通过创造源队列和拷贝数组队列之间的关系实现拷贝。

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

## 13.Promise 系列

之前写过一篇关于 Promise 的学习分享。

### Promsie.all

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

### Promsie.race

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

### Promsie.finally

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

## 14.实现 async-await

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

## 15.实现简易订阅 - 发布

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

## 16.单例模式

单例模式：保证一个类仅有一个实例，并提供一个访问它的全局访问点。实现方法一般是先判断实例是否存在，如果存在直接返回，如果不存在就先创建再返回。

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

## 17.实现 Object.create

Object.create() 方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

该方法是实现了已有对象和新建对象的原型是一个浅拷贝的过程。

## 18.实现 ES6 的 class 语法

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

使用 Object.create() 方法将子类的实例对象继承与父类的原型对象，通过 Object.setPrototypeOf() 能够实现从父类中继承静态方法和静态属性。

## 19.实现一个 compose 函数

compose 函数是用来组合合并函数，最后输出值的思想。在 redux 源码中用于中间件的处理。

- 使用 while 循环实现

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

- 使用 reduce 迭代实现

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

## 20.实现异步并行函数

fn 是一个返回 Promise 的函数才可使用下面的函数：

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

fn 不是一个返回 Promsie 的话那就包一层：

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

## 21.实现异步串行函数

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

## 22.私有变量的实现

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

以上是 es5 实现的私有变量的封装，通过使用 WeakMap 可以扩展每个实例所对应的私有属性，私有属性在外部无法被访问，而且随 this 对象的销毁和消失。

这里有个小细节值得一提, 请看如下的代码：

![图片](C:\Users\Administrator\Desktop\项目笔记\JavaScript知识技巧\640)

如上是挂在到原型上的方法和每个实例独有的方法不同写法。它们有什么区别呢？（ps: 可以手动打印）

调用原型上的方法那么私有变量的值是与最近一个实例调用原型方法的值。其上一个实例的值也是随之改变的，那么就出现问题了...

而使用 WeakMap 可以解决如上的问题：做到将方法挂在到原型，且不同时期同一个实例调用所产生的结果是一致的。



## \1. 带有多个条件的 if 语句



把多个值放在一个数组中，然后调用数组的 includes 方法。

```
//longhand
if (x === 'abc' || x === 'def' || x === 'ghi' || x ==='jkl') {
    //logic
}
//shorthand
if (['abc', 'def', 'ghi', 'jkl'].includes(x)) {
   //logic
}
```

## \2. 简化 if true...else



对于不包含大逻辑的 if-else 条件，可以使用下面的快捷写法。我们可以简单地使用三元运算符来实现这种简化。

```
// Longhand
let test: boolean;
if (x > 100) {
    test = true;
} else {
    test = false;
}
// Shorthand
let test = (x > 10) ? true : false;
//or we can use directly
let test = x > 10;
console.log(test);
```

如果有嵌套的条件，可以这么做。

```
let x = 300,
test2 = (x > 100) ? 'greater 100' : (x < 50) ? 'less 50' : 'between 50 and 100';
console.log(test2); // "greater than 100"
```

## \3. 声明变量



当我们想要声明两个具有相同的值或相同类型的变量时，可以使用这种简写。

```
//Longhand 
let test1;
let test2 = 1;
//Shorthand 
let test1, test2 = 1;
```

## \4. null、undefined 和空值检查



当我们创建了新变量，有时候想要检查引用的变量是不是为非 null 或 undefined。JavaScript 确实有一个很好的快捷方式来实现这种检查。

```
// Longhand
if (test1 !== null || test1 !== undefined || test1 !== '') {
    let test2 = test1;
}
// Shorthand
let test2 = test1 || '';
```

## \5. null 检查和默认赋值



```
let test1 = null,
    test2 = test1 || '';
console.log("null check", test2); // output will be ""
```

## \6. undefined 检查和默认赋值



```
let test1 = undefined,
    test2 = test1 || '';
console.log("undefined check", test2); // output will be ""
```

一般值检查

```
let test1 = 'test',
    test2 = test1 || '';
console.log(test2); // output: 'test'
```

另外，对于上述的 4、5、6 点，都可以使用?? 操作符。

如果左边值为 null 或 undefined，就返回右边的值。默认情况下，它将返回左边的值。

```
const test= null ?? 'default';
console.log(test);
// expected output: "default"
const test1 = 0 ?? 2;
console.log(test1);
// expected output: 0
```

## \7. 给多个变量赋值



当我们想给多个不同的变量赋值时，这种技巧非常有用。

```
//Longhand 
let test1, test2, test3;
test1 = 1;
test2 = 2;
test3 = 3;
//Shorthand 
let [test1, test2, test3] = [1, 2, 3];
```

## \8. 简便的赋值操作符



在编程过程中，我们要处理大量的算术运算符。这是 JavaScript 变量赋值操作符的有用技巧之一。

```
// Longhand
test1 = test1 + 1;
test2 = test2 - 1;
test3 = test3 * 20;
// Shorthand
test1++;
test2--;
test3 *= 20;
```

## \9. if 判断值是否存在



这是我们都在使用的一种常用的简便技巧，在这里仍然值得再提一下。

```
// Longhand
if (test1 === true) or if (test1 !== "") or if (test1 !== null)
// Shorthand //it will check empty string,null and undefined too
if (test1)
```

注意：如果 test1 有值，将执行 if 之后的逻辑，这个操作符主要用于 null 或 undefinded 检查。

## \10. 用于多个条件判断的 && 操作符



如果只在变量为 true 时才调用函数，可以使用 && 操作符。

```
//Longhand 
if (test1) {
 callMethod(); 
} 
//Shorthand 
test1 && callMethod();
```



## \11. for each 循环



这是一种常见的循环简化技巧。

```
// Longhand
for (var i = 0; i < testData.length; i++)
// Shorthand
for (let i in testData) or  for (let i of testData)
```

遍历数组的每一个变量。

```
function testData(element, index, array) {
  console.log('test[' + index + '] = ' + element);
}
[11, 24, 32].forEach(testData);
// logs: test[0] = 11, test[1] = 24, test[2] = 32
```



## \12. 比较后返回



我们也可以在 return 语句中使用比较，它可以将 5 行代码减少到 1 行。

```
// Longhand
let test;
function checkReturn() {
    if (!(test === undefined)) {
        return test;
    } else {
        return callMe('test');
    }
}
var data = checkReturn();
console.log(data); //output test
function callMe(val) {
    console.log(val);
}
// Shorthand
function checkReturn() {
    return test || callMe('test');
}
```



## \13. 箭头函数



```
//Longhand 
function add(a, b) { 
   return a + b; 
} 
//Shorthand 
const add = (a, b) => a + b;
```

更多例子：

```
function callMe(name) {
  console.log('Hello', name);
}
callMe = name => console.log('Hello', name);
```



## \14. 简短的函数调用



我们可以使用三元操作符来实现多个函数调用。

```
// Longhand
function test1() {
  console.log('test1');
};
function test2() {
  console.log('test2');
};
var test3 = 1;
if (test3 == 1) {
  test1();
} else {
  test2();
}
// Shorthand
(test3 === 1? test1:test2)();
```



## \15. switch 简化



我们可以将条件保存在键值对象中，并根据条件来调用它们。

```
// Longhand
switch (data) {
  case 1:
    test1();
  break;
  case 2:
    test2();
  break;
  case 3:
    test();
  break;
  // And so on...
}
// Shorthand
var data = {
  1: test1,
  2: test2,
  3: test
};
data[something] && data[something]();
```



## \16. 隐式返回



通过使用箭头函数，我们可以直接返回值，不需要 return 语句。

```
//longhand
function calculate(diameter) {
  return Math.PI * diameter
}
//shorthand
calculate = diameter => (
  Math.PI * diameter;
)
```



## \17. 指数表示法



```
// Longhand
for (var i = 0; i < 10000; i++) { ... }
// Shorthand
for (var i = 0; i < 1e4; i++) {
```



## \18. 默认参数值



```
//Longhand
function add(test1, test2) {
  if (test1 === undefined)
    test1 = 1;
  if (test2 === undefined)
    test2 = 2;
  return test1 + test2;
}
//shorthand
add = (test1 = 1, test2 = 2) => (test1 + test2);
add() //output: 3
```



## \19. 延展操作符简化



```
//longhand
// joining arrays using concat
const data = [1, 2, 3];
const test = [4 ,5 , 6].concat(data);
//shorthand
// joining arrays
const data = [1, 2, 3];
const test = [4 ,5 , 6, ...data];
console.log(test); // [ 4, 5, 6, 1, 2, 3]
```

我们也可以使用延展操作符进行克隆。

```
//longhand
// cloning arrays
const test1 = [1, 2, 3];
const test2 = test1.slice()
//shorthand
// cloning arrays
const test1 = [1, 2, 3];
const test2 = [...test1];
```



## \20. 模板字面量



如果你厌倦了使用 + 将多个变量连接成一个字符串，那么这个简化技巧将让你不再头痛。

```
//longhand
const welcome = 'Hi ' + test1 + ' ' + test2 + '.'
//shorthand
const welcome = `Hi ${test1} ${test2}`;
```



## \21. 跨行字符串



当我们在代码中处理跨行字符串时，可以这样做。

```
//longhand
const data = 'abc abc abc abc abc abc\n\t'
    + 'test test,test test test test\n\t'
//shorthand
const data = `abc abc abc abc abc abc
         test test,test test test test`
```



## \22. 对象属性赋值



```
let test1 = 'a'; 
let test2 = 'b';
//Longhand 
let obj = {test1: test1, test2: test2}; 
//Shorthand 
let obj = {test1, test2};
```



## \23. 将字符串转成数字



```
//Longhand 
let test1 = parseInt('123'); 
let test2 = parseFloat('12.3'); 
//Shorthand 
let test1 = +'123'; 
let test2 = +'12.3';
```



## \24. 解构赋值



```
//longhand
const test1 = this.data.test1;
const test2 = this.data.test2;
const test2 = this.data.test3;
//shorthand
const { test1, test2, test3 } = this.data;
```



## \25. 数组 find 简化



当我们有一个对象数组，并想根据对象属性找到特定对象，find 方法会非常有用。

```
const data = [{
        type: 'test1',
        name: 'abc'
    },
    {
        type: 'test2',
        name: 'cde'
    },
    {
        type: 'test1',
        name: 'fgh'
    },
]
function findtest1(name) {
    for (let i = 0; i < data.length; ++i) {
        if (data[i].type === 'test1' && data[i].name === name) {
            return data[i];
        }
    }
}
//Shorthand
filteredData = data.find(data => data.type === 'test1' && data.name === 'fgh');
console.log(filteredData); // { type: 'test1', name: 'fgh' }
```



## \26. 条件查找简化



如果我们要基于不同的类型调用不同的方法，可以使用多个 else if 语句或 switch，但有没有比这更好的简化技巧呢？

```
// Longhand
if (type === 'test1') {
  test1();
}
else if (type === 'test2') {
  test2();
}
else if (type === 'test3') {
  test3();
}
else if (type === 'test4') {
  test4();
} else {
  throw new Error('Invalid value ' + type);
}
// Shorthand
var types = {
  test1: test1,
  test2: test2,
  test3: test3,
  test4: test4
};
var func = types[type];
(!func) && throw new Error('Invalid value ' + type); func();
```



## \27. indexOf 的按位操作简化



在查找数组的某个值时，我们可以使用 indexOf() 方法。但有一种更好的方法，让我们来看一下这个例子。

```
//longhand
if(arr.indexOf(item) > -1) { // item found 
}
if(arr.indexOf(item) === -1) { // item not found
}
//shorthand
if(~arr.indexOf(item)) { // item found
}
if(!~arr.indexOf(item)) { // item not found
}
```

按位 (~) 运算符将返回 true（-1 除外），反向操作只需要!~。另外，也可以使用 include() 函数。

```
if (arr.includes(item)) { 
// true if the item found
}
```



## \28. Object.entries()



这个方法可以将对象转换为对象数组。

```
const data = { test1: 'abc', test2: 'cde', test3: 'efg' };
const arr = Object.entries(data);
console.log(arr);
/** Output:
[ [ 'test1', 'abc' ],
  [ 'test2', 'cde' ],
  [ 'test3', 'efg' ]
]
**/
```



## \29. Object.values()



这也是 ES8 中引入的一个新特性，它的功能类似于 Object.entries()，只是没有键。

```
const data = { test1: 'abc', test2: 'cde' };
const arr = Object.values(data);
console.log(arr);
/** Output:
[ 'abc', 'cde']
**/
```



## \30. 双重按位操作



```
// Longhand
Math.floor(1.9) === 1 // true
// Shorthand
~~1.9 === 1 // true
```



## \31. 重复字符串多次



为了重复操作相同的字符，我们可以使用 for 循环，但其实还有一种简便的方法。

```
//longhand 
let test = ''; 
for(let i = 0; i < 5; i ++) { 
  test += 'test '; 
} 
console.log(str); // test test test test test 
//shorthand 
'test '.repeat(5);
```



## \32. 查找数组的最大值和最小值



```
const arr = [1, 2, 3]; 
Math.max(…arr); // 3
Math.min(…arr); // 1
```



## \33. 获取字符串的字符



```
let str = 'abc';
//Longhand 
str.charAt(2); // c
//Shorthand 
str[2]; // c
```



## \34. 指数幂简化



```
//longhand
Math.pow(2,3); // 8
//shorthand
2**3 // 8
```

## 1、随机获取布尔值

```
const randomBoolean =  () => Math.random() >= 0.5;
console.log(randomBoolean());
```

Math.random() 输出 0 - 1 之间的随机数，然后判断这个随机数是否大于等于 0.5。

这就说明有 50% 的机会得到真值或假值。

## 2、判断给的日期是工作日还是双休日

```
const isWeekday = (date) => date.getDay() % 6 !== 0;
console.log(isWeekday(new Date(2021, 0, 11)));
// 结果: true (Monday)
console.log(isWeekday(new Date(2021, 0, 10)));
// 结果: false (Sunday)
```

## 3、反转字符串

```
const reverse = str => str.split('').reverse().join('');
reverse('hello world');     
// 结果 : 'dlrow olleh'
```

## 4、判断数字是偶数还是奇数

```
const isEven = num => num % 2 === 0;
console.log(isEven(2));
// 结果: true
console.log(isEven(3));
// 结果: false
```

## 5、从日期获取当地时间

```
const timeFromDate = date => date.toTimeString().slice(0, 8);
console.log(timeFromDate(new Date(2021, 0, 10, 17, 30, 0))); 
// 结果: "17:30:00"
console.log(timeFromDate(new Date()));
// 结果: will log the current time
```

## 6、使用 `Math.pow()` 方法，将数字四舍五入到固定的小数点

```
const toFixed = (n, fixed) => ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);
// Examples
toFixed(25.198726354, 1);       // 25.1
toFixed(25.198726354, 2);       // 25.19
toFixed(25.198726354, 3);       // 25.198
toFixed(25.198726354, 4);       // 25.1987
toFixed(25.198726354, 5);       // 25.19872
toFixed(25.198726354, 6);       // 25.198726
```

## 7、使用 `document.activeElement` 属性，检查元素当前是否处于焦点

```
const elementIsInFocus = (el) => (el === document.activeElement);
elementIsInFocus(anyElement);

//结果: will return true if in focus, false if not in focus
```

## 8、检查当前用户是否在 Apple 设备上

```
const isAppleDevice = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
console.log(isAppleDevice);

//结果: will return true if user is on an Apple device
```

## 9、滚动到页面顶部

使用 `window.scrollTo()` 方法将 `x = 0` 和 `y = 0` 。

```
const goToTop = () => window.scrollTo(0, 0);
goToTop();
// Result: will scroll the browser to the top of the page
```



## 【JS】11个JavaScript代码重构最佳实践

模式和重构之间有着一种与生俱来的关系。从某种角度来看，设计模式的目的就是为许多重构行为提供目标。

### 1.提炼函数

在JavaScript开发中，我们大部分时间都在与函数打交道，所以我们希望这些函数有着良好的命名，函数体内包含的逻辑清晰明了。如果一个函数过长，不得不加上若干注释才能让这个函数显得易读一些，那这些函数就很有必要进行重构。

如果在函数中有一段代码可以被独立出来，那我们最好把这些代码放进另外一个独立的函数中。这是一种很常见的优化工作，这样做的好处主要有以下几点。

- 避免出现超大函数。
- 独立出来的函数有助于代码复用。
- 独立出来的函数更容易被覆写。
- 独立出来的函数如果拥有一个良好的命名，它本身就起到了注释的作用。

比如在一个负责取得用户信息的函数里面，我们还需要打印跟用户信息有关的log，那么打印log的语句就可以被封装在一个独立的函数里：

```
var getUserInfo = function(){
    ajax( 'http:// xxx.com/userInfo', function( data ){
        console.log( 'userId: ' + data.userId );
        console.log( 'userName: ' + data.userName );
        console.log( 'nickName: ' + data.nickName );
    });
};

改成：

var getUserInfo = function(){
    ajax( 'http:// xxx.com/userInfo', function( data ){
        printDetails( data );
    });
};

var printDetails = function( data ){
    console.log( 'userId: ' + data.userId );
    console.log( 'userName: ' + data.userName );
    console.log( 'nickName: ' + data.nickName );
};
```

### 2.合并重复的条件片段

如果一个函数体内有一些条件分支语句，而这些条件分支语句内部散布了一些重复的代码，那么就有必要进行合并去重工作。假如我们有一个分页函数paging，该函数接收一个参数currPage，currPage表示即将跳转的页码。在跳转之前，为防止currPage传入过小或者过大的数字，我们要手动对它的值进行修正，详见如下伪代码：

```
var paging = function( currPage ){
    if ( currPage <= 0 ){
        currPage = 0;
        jump( currPage );    // 跳转
    }else if ( currPage >= totalPage ){
        currPage = totalPage;
        jump( currPage );    // 跳转
    }else{
        jump( currPage );    // 跳转
    }
};
```

可以看到，负责跳转的代码jump( currPage )在每个条件分支内都出现了，所以完全可以把这句代码独立出来：

```
var paging = function( currPage ){
    if ( currPage <= 0 ){
        currPage = 0;
    }else if ( currPage >= totalPage ){
        currPage = totalPage;
    }
    jump( currPage );    // 把jump函数独立出来
};
```

### 3.把条件分支语句提炼成函数

在程序设计中，复杂的条件分支语句是导致程序难以阅读和理解的重要原因，而且容易导致一个庞大的函数。假设现在有一个需求是编写一个计算商品价格的getPrice函数，商品的计算只有一个规则：如果当前正处于夏季，那么全部商品将以8折出售。代码如下：

```
var getPrice = function( price ){
    var date = new Date();
    if ( date.getMonth() >= 6 && date.getMonth() <= 9 ){    // 夏天
        return price * 0.8;
    }
    return price;
};
```

观察这句代码：

```
if ( date.getMonth() >= 6 && date.getMonth() <= 9 ){
    // ...
}
```

这句代码要表达的意思很简单，就是判断当前是否正处于夏天（7~10月）。尽管这句代码很短小，但代码表达的意图和代码自身还存在一些距离，阅读代码的人必须要多花一些精力才能明白它传达的意图。其实可以把这句代码提炼成一个单独的函数，既能更准确地表达代码的意思，函数名本身又能起到注释的作用。代码如下：

```
var isSummer = function(){
    var date = new Date();
    return date.getMonth() >= 6 && date.getMonth() <= 9;
};

var getPrice = function( price ){
    if ( isSummer() ){    // 夏天
        return price * 0.8;
    }
    return price;
};
```

### 4.合理使用循环

在函数体内，如果有些代码实际上负责的是一些重复性的工作，那么合理利用循环不仅可以完成同样的功能，还可以使代码量更少。下面有一段创建XHR对象的代码，为了简化示例，我们只考虑版本9以下的IE浏览器，代码如下：

```
var createXHR = function(){
    var xhr;
    try{
        xhr = new ActiveXObject( 'MSXML2.XMLHttp.6.0' );
    }catch(e){
        try{
            xhr = new ActiveXObject( 'MSXML2.XMLHttp.3.0' );
        }catch(e){
            xhr = new ActiveXObject( 'MSXML2.XMLHttp' );
        }
    }
    return xhr;
};

var xhr = createXHR();
```

下面我们灵活地运用循环，可以得到跟上面代码一样的效果：

```
var createXHR = function(){
var versions= [ 'MSXML2.XMLHttp.6.0ddd', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp' ];
    for ( var i = 0, version; version = versions[ i++ ]; ){
        try{
            return new ActiveXObject( version );
        }catch(e){

        }
    }
};

var xhr = createXHR();
```

### 5.提前让函数退出代替嵌套条件分支

许多程序员都有这样一种观念：“每个函数只能有一个入口和一个出口。”现代编程语言都会限制函数只有一个入口。但关于“函数只有一个出口”，往往会有一些不同的看法。

下面这段伪代码是遵守“函数只有一个出口的”的典型代码：

```
var del = function( obj ){
    var ret;
    if ( !obj.isReadOnly ){    // 不为只读的才能被删除
        if ( obj.isFolder ){    // 如果是文件夹
            ret = deleteFolder( obj );
        }else if ( obj.isFile ){    // 如果是文件
            ret = deleteFile( obj );
        }
    }
    return ret;
};
```

嵌套的条件分支语句绝对是代码维护者的噩梦，对于阅读代码的人来说，嵌套的if、else语句相比平铺的if、else，在阅读和理解上更加困难，有时候一个外层if分支的左括号和右括号之间相隔500米之远。用《重构》里的话说，嵌套的条件分支往往是由一些深信“每个函数只能有一个出口的”程序员写出的。但实际上，如果对函数的剩余部分不感兴趣，那就应该立即退出。引导阅读者去看一些没有用的else片段，只会妨碍他们对程序的理解。

于是我们可以挑选一些条件分支，在进入这些条件分支之后，就立即让这个函数退出。要做到这一点，有一个常见的技巧，即在面对一个嵌套的if分支时，我们可以把外层if表达式进行反转。重构后的del函数如下：

```
var del = function( obj ){
    if ( obj.isReadOnly ){    // 反转if表达式
        return;
    }
    if ( obj.isFolder ){
        return deleteFolder( obj );
    }
    if ( obj.isFile ){
        return deleteFile( obj );
    }
};
```

### 6.传递对象参数代替过长的参数列表

有时候一个函数有可能接收多个参数，而参数的数量越多，函数就越难理解和使用。使用该函数的人首先得搞明白全部参数的含义，在使用的时候，还要小心翼翼，以免少传了某个参数或者把两个参数搞反了位置。如果我们想在第3个参数和第4个参数之中增加一个新的参数，就会涉及许多代码的修改，代码如下：

```
var setUserInfo = function( id, name, address, sex, mobile, qq ){
    console.log( 'id= ' + id );
    console.log( 'name= ' +name );
    console.log( 'address= ' + address );
    console.log( 'sex= ' + sex );
    console.log( 'mobile= ' + mobile );
    console.log( 'qq= ' + qq );
};

setUserInfo( 1314, 'sven', 'shenzhen', 'male', '137********', 377876679 )
```

;

这时我们可以把参数都放入一个对象内，然后把该对象传入setUserInfo 函数，setUserInfo函数需要的数据可以自行从该对象里获取。现在不用再关心参数的数量和顺序，只要保证参数对应的key值不变就可以了：

```
var setUserInfo = function( obj ){
    console.log( 'id= ' + obj.id );
    console.log( 'name= ' + obj.name );
    console.log( 'address= ' + obj.address );
    console.log( 'sex= ' + obj.sex );
    console.log( 'mobile= ' + obj.mobile );
    console.log( 'qq= ' + obj.qq );
};

setUserInfo({
    id: 1314,
    name: 'sven',
    address: 'shenzhen',
    sex: 'male',
    mobile: '137********',
    qq: 377876679
});
```

### 7.尽量减少参数数量

如果调用一个函数时需要传入多个参数，那这个函数是让人望而生畏的，我们必须搞清楚这些参数代表的含义，必须小心翼翼地把它们按照顺序传入该函数。而如果一个函数不需要传入任何参数就可以使用，这种函数是深受人们喜爱的。在实际开发中，向函数传递参数不可避免，但我们应该尽量减少函数接收的参数数量。下面举个非常简单的示例。有一个画图函数draw，它现在只能绘制正方形，接收了3个参数，分别是图形的width、heigth以及square：

```
var draw = function( width, height, square ){};
```

但实际上正方形的面积是可以通过width和height计算出来的，于是我们可以把参数square从draw函数中去掉：

```
var draw = function( width, height ){
    var square = width * height;
};
```

假设以后这个draw函数开始支持绘制圆形，我们需要把参数width和height换成半径radius， 但图形的面积square始终不应该由客户传入，而是应该在draw函数内部，由传入的参数加上一定的规则计算得来。此时，我们可以使用策略模式，让draw函数成为一个支持绘制多种图形的函数。

### 8.少用三目运算符

有一些程序员喜欢大规模地使用三目运算符，来代替传统的if、else。理由是三目运算符性能高，代码量少。不过，这两个理由其实都很难站得住脚。

即使我们假设三目运算符的效率真的比if、else高，这点差距也是完全可以忽略不计的。在实际的开发中，即使把一段代码循环一百万次，使用三目运算符和使用if、else的时间开销处在同一个级别里。

同样，相比损失的代码可读性和可维护性，三目运算符节省的代码量也可以忽略不计。让JS文件加载更快的办法有很多种，如压缩、缓存、使用CDN和分域名等。把注意力只放在使用三目运算符节省的字符数量上，无异于一个300斤重的人把超重的原因归罪于头皮屑。

如果条件分支逻辑简单且清晰，这无碍我们使用三目运算符：

```
var global = typeof window !== "undefined" ? window : this;
```

但如果条件分支逻辑非常复杂，如下段代码所示，那我们最好的选择还是按部就班地编写if、else。if、else语句的好处很多，一是阅读相对容易，二是修改的时候比修改三目运算符周围的代码更加方便：

```
if ( !aup || !bup ) {
    return a === doc ? -1 :
        b === doc ? 1 :
        aup ? -1 :
        bup ? 1 :
        sortInput ?
        ( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
        0;
}
```

### 9.合理使用链式调用

经常使用jQuery的程序员相当习惯链式调用方法，在JavaScript中，可以很容易地实现方法的链式调用，即让方法调用结束后返回对象自身，如下代码所示：

```
var User = function(){
    this.id = null;
    this.name = null;
};

User.prototype.setId = function( id ){
    this.id = id;
    return this;
};

User.prototype.setName = function( name ){
    this.name = name;
    return this;
};

console.log( new User().setId( 1314 ).setName( 'sven' ) );
```

或者：

```
var User = {
    id: null,
    name: null,
    setId: function( id ){
        this.id = id;
        return this;
    },
    setName: function( name ){
        this.name = name;
        return this;
    }
};

console.log( User.setId( 1314 ).setName( 'sven' ) );
```

使用链式调用的方式并不会造成太多阅读上的困难，也确实能省下一些字符和中间变量，但节省下来的字符数量同样是微不足道的。链式调用带来的坏处就是在调试的时候非常不方便，如果我们知道一条链中有错误出现，必须得先把这条链拆开才能加上一些调试log或者增加断点，这样才能定位错误出现的地方。

如果该链条的结构相对稳定，后期不易发生修改，那么使用链式调用无可厚非。但如果该链条很容易发生变化，导致调试和维护困难，那么还是建议使用普通调用的形式：

```
var user = new User();

user.setId( 1314 );
user.setName( 'sven' );
```

### 10.分解大型类

在HTML5版“街头霸王”的第一版代码中，负责创建游戏人物的Spirit 类非常庞大，不仅要负责创建人物精灵，还包括了人物的攻击、防御等动作方法，代码如下：

```
var Spirit = function( name ){
    this.name = name;
};

Spirit.prototype.attack = function( type ){    // 攻击
    if ( type === 'waveBoxing' ){
        console.log( this.name + ': 使用波动拳' );
    }else if( type === 'whirlKick' ){
        console.log( this.name + ': 使用旋风腿' );
    }
};

var spirit = new Spirit( 'RYU' );

spirit.attack( 'waveBoxing' );      // 输出：RYU: 使用波动拳
spirit.attack( 'whirlKick' );    // 输出：RYU: 使用旋风腿
```

后来发现，Spirit.prototype.attack这个方法实现是太庞大了，实际上它完全有必要作为一个单独的类存在。面向对象设计鼓励将行为分布在合理数量的更小对象之中：

```
var Attack = function( spirit ){
    this.spirit = spirit;
};

Attack.prototype.start = function( type ){
    return this.list[ type ].call( this );
};

Attack.prototype.list = {
    waveBoxing: function(){
        console.log( this.spirit.name + ': 使用波动拳' );
    },
    whirlKick: function(){
        console.log( this.spirit.name + ': 使用旋风腿' );
    }
};
```

现在的Spirit类变得精简了很多，不再包括各种各样的攻击方法，而是把攻击动作委托给Attack类的对象来执行，这段代码也是策略模式的运用之一：

```
var Spirit = function( name ){
    this.name = name;
    this.attackObj = new Attack( this );
};

Spirit.prototype.attack = function( type ){    // 攻击
    this.attackObj.start( type );
};

var spirit = new Spirit( 'RYU' );

spirit.attack( 'waveBoxing' );    // 输出：RYU: 使用波动拳
spirit.attack( 'whirlKick' );    // 输出：RYU: 使用旋风
```

### 11.用return退出多重循环

假设在函数体内有一个两重循环语句，我们需要在内层循环中判断，当达到某个临界条件时退出外层的循环。我们大多数时候会引入一个控制标记变量：

```
var func = function(){
    var flag = false;
    for ( var i = 0; i < 10; i++ ){
        for ( var j = 0; j < 10; j++ ){
            if ( i * j >30 ){
                flag = true;
                break;
            }
        }
        if ( flag === true ){
            break;
        }
    }
};
```

第二种做法是设置循环标记：

```
var func = function(){
    outerloop:
    for ( var i = 0; i < 10; i++ ){
        innerloop:
        for ( var j = 0; j < 10; j++ ){
            if ( i * j >30 ){
                break outerloop;
            }
        }
    }
};
```

这两种做法无疑都让人头晕目眩，更简单的做法是在需要中止循环的时候直接退出整个方法：

```
var func = function(){
    for ( var i = 0; i < 10; i++ ){
        for ( var j = 0; j < 10; j++ ){
            if ( i * j >30 ){
                return;
            }
        }
    }
};
```

当然用return直接退出方法会带来一个问题，如果在循环之后还有一些将被执行的代码呢？如果我们提前退出了整个方法，这些代码就得不到被执行的机会：

```
var func = function(){
    for ( var i = 0; i < 10; i++ ){
        for ( var j = 0; j < 10; j++ ){
            if ( i * j >30 ){
                return;
            }
        }
    }
    console.log( i );    // 这句代码没有机会被执行
};
```

为了解决这个问题，我们可以把循环后面的代码放到return后面，如果代码比较多，就应该把它们提炼成一个单独的函数：

```
var print = function( i ){
    console.log( i );
};

var func = function(){
    for ( var i = 0; i < 10; i++ ){
        for ( var j = 0; j < 10; j++ ){
            if ( i * j >30 ){
                return print( i );
            }
        }
    }
};

func();
```

## 34个JavaScript简写优化技术

### 1.如果有多个条件

我们可以在数组中存储多个值，并且可以使用数组 `include` 方法。

```
//Longhand
if (x === 'abc' || x === 'def' || x === 'ghi' || x ==='jkl') {
  //logic
}

//Shorthand
if (['abc', 'def', 'ghi', 'jkl'].includes(x)) {
  //logic
}
```

### 2.如果为真…否则简写

这对于我们有 `if-else` 条件，里面不包含更大的逻辑时，是一个较大的捷径。我们可以简单的使用三元运算符来实现这个简写。

```
// Longhand
let test: boolean;
if (x > 100) {
  test = true;
} else {
  test = false;
}

// Shorthand
let test = (x > 10) ? true : false;
//or we can use directly
let test = x > 10;
console.log(test);
```

当我们有嵌套条件时，我们可以采用这种方式。

```
let x = 300,
test2 = (x > 100) ? 'greater 100' : (x < 50) ? 'less 50' : 'between 50 and 100';
console.log(test2); // "greater than 100"
```

### 3.声明变量

当我们要声明两个具有共同值或共同类型的变量时，可以使用此简写形式。

```
//Longhand
let test1;
let test2 = 1;

//Shorthand
let test1, test2 = 1;
```

### 4.Null, Undefined，空检查

当我们创建新的变量时，有时我们想检查我们引用的变量的值是否为空或 undefined。JavaScript 确实有一个非常好的简写工具来实现这些功能。

```
// Longhand
if (test1 !== null || test1 !== undefined || test1 !== '') {
    let test2 = test1;
}

// Shorthand
let test2 = test1 || '';
```

### 5.null 值检查和分配默认值

```
let test1 = null,
    test2 = test1 || '';

console.log("null check", test2); // output will be ""
```

### 6.undefined 值检查和分配默认值

```
let test1 = undefined,
    test2 = test1 || '';

console.log("undefined check", test2); // output will be ""
```

正常值检查

```
let test1 = 'test',
    test2 = test1 || '';

console.log(test2); // output: 'test'
```

### 7.将值分配给多个变量

当我们处理多个变量并希望将不同的值分配给不同的变量时，此简写技术非常有用。

```
//Longhand
let test1, test2, test3;
test1 = 1;
test2 = 2;
test3 = 3;

//Shorthand
let [test1, test2, test3] = [1, 2, 3];
```

### 8.赋值运算符简写

我们在编程中处理很多算术运算符，这是将运算符分配给 JavaScript 变量的有用技术之一。

```
// Longhand
test1 = test1 + 1;
test2 = test2 - 1;
test3 = test3 * 20;

// Shorthand
test1++;
test2--;
test3 *= 20;
```

### 9.如果存在简写

这是我们大家都在使用的常用简写之一，但仍然值得一提。

```
// Longhand
if (test1 === true) or if (test1 !== "") or if (test1 !== null)

// Shorthand //it will check empty string,null and undefined too
if (test1)
```

注意：如果 test1 有任何值，它将在 if 循环后进入逻辑，该运算符主要用于 `null` 或`undefined` 的检查。

### 10.多个条件的 AND（&&）运算符

如果仅在变量为 `true` 的情况下才调用函数，则可以使用 `&&` 运算符。

```
//Longhand
if (test1) {
 callMethod();
}

//Shorthand
test1 && callMethod();
```

### 11.foreach 循环简写

这是迭代的常用简写技术之一。

```
// Longhand
for (var i = 0; i < testData.length; i++)

// Shorthand
for (let i in testData) or  for (let i of testData)
```

每个变量的数组

```
function testData(element, index, array) {
  console.log('test[' + index + '] = ' + element);
}

[11, 24, 32].forEach(testData);
// logs: test[0] = 11, test[1] = 24, test[2] = 32
```

### 12.return 中比较

我们也可以在 return 语句中使用比较。它将避免我们的 5 行代码，并将它们减少到 1 行。

```
// Longhand
let test;
function checkReturn() {
  if (!(test === undefined)) {
    return test;
  } else {
    return callMe('test');
  }
}
var data = checkReturn();
console.log(data); //output test
function callMe(val) {
    console.log(val);
}

// Shorthand
function checkReturn() {
    return test || callMe('test');
}
```

### 13.箭头函数

```
//Longhand
function add(a, b) {
   return a + b;
}

//Shorthand
const add = (a, b) => a + b;
```

更多示例。

```
function callMe(name) {
  console.log('Hello', name);
}
callMe = name => console.log('Hello', name);
```

### 14.短函数调用

我们可以使用三元运算符来实现这些功能。

```
// Longhand
function test1() {
  console.log('test1');
};
function test2() {
  console.log('test2');
};
var test3 = 1;
if (test3 == 1) {
  test1();
} else {
  test2();
}

// Shorthand
(test3 === 1? test1:test2)();
```

### 15. Switch 简写

我们可以将条件保存在键值对象中，并可以根据条件使用。

```
// Longhand
switch (data) {
  case 1:
    test1();
  break;

  case 2:
    test2();
  break;

  case 3:
    test();
  break;
  // And so on...
}

// Shorthand
var data = {
  1: test1,
  2: test2,
  3: test
};

data[something] && data[something]();
```

### 16.隐式返回简写

使用箭头函数，我们可以直接返回值，而不必编写 return 语句。

```
//longhand
function calculate(diameter) {
  return Math.PI * diameter
}

//shorthand
calculate = diameter => (
  Math.PI * diameter;
)
```

### 17.小数基数指数

```
// Longhand
for (var i = 0; i < 10000; i++) { ... }

// Shorthand
for (var i = 0; i < 1e4; i++) {
```

### 18.默认参数值

```
//Longhand
function add(test1, test2) {
  if (test1 === undefined)
    test1 = 1;
  if (test2 === undefined)
    test2 = 2;
  return test1 + test2;
}

//shorthand
add = (test1 = 1, test2 = 2) => (test1 + test2);
add() //output: 3
```

### 19.扩展运算符简写

```
//longhand

// joining arrays using concat
const data = [1, 2, 3];
const test = [4 ,5 , 6].concat(data);

//shorthand

// joining arrays
const data = [1, 2, 3];
const test = [4 ,5 , 6, ...data];
console.log(test); // [ 4, 5, 6, 1, 2, 3]
```

对于克隆，我们也可以使用扩展运算符。

```
//longhand

// cloning arrays
const test1 = [1, 2, 3];
const test2 = test1.slice()

//shorthand

// cloning arrays
const test1 = [1, 2, 3];
const test2 = [...test1];
```

### 20.模板文字

如果您厌倦了在单个字符串中使用 `+` 来连接多个变量，那么这种简写可以消除您的头痛。

```
//longhand
const welcome = 'Hi ' + test1 + ' ' + test2 + '.'

//shorthand
const welcome = `Hi ${test1} ${test2}`;
```

### 21.多行字符串简写

当我们在代码中处理多行字符串时，可以使用以下功能：

```
//longhand
const data = 'abc abc abc abc abc abc\n\t'
    + 'test test,test test test test\n\t'

//shorthand
const data = `abc abc abc abc abc abc
         test test,test test test test`
```

### 22.对象属性分配

```
let test1 = 'a';
let test2 = 'b';

//Longhand
let obj = {test1: test1, test2: test2};

//Shorthand
let obj = {test1, test2};
```

### 23.将字符串转换成数字

```
//Longhand
let test1 = parseInt('123');
let test2 = parseFloat('12.3');

//Shorthand
let test1 = +'123';
let test2 = +'12.3';
```

### 24.用解构简写

```
//longhand
const test1 = this.data.test1;
const test2 = this.data.test2;
const test2 = this.data.test3;

//shorthand
const { test1, test2, test3 } = this.data;
```

### 25.用 Array.find 简写

当我们确实有一个对象数组并且我们想要根据对象属性查找特定对象时，find 方法确实很有用。

```
const data = [
  {
    type: 'test1',
    name: 'abc'
  },
  {
    type: 'test2',
    name: 'cde'
  },
  {
    type: 'test1',
    name: 'fgh'
  },
]
function findtest1(name) {
  for (let i = 0; i < data.length; ++i) {
    if (data[i].type === 'test1' && data[i].name === name) {
      return data[i];
    }
  }
}

//Shorthand
filteredData = data.find(data => data.type === 'test1' && data.name === 'fgh');
console.log(filteredData); // { type: 'test1', name: 'fgh' }
```

### 26.查找条件简写

如果我们有代码来检查类型，根据类型需要调用不同的方法，我们可以选择使用多个 else ifs 或者 switch，但是如果我们有比这更好的简写方法呢？

```
// Longhand
if (type === 'test1') {
  test1();
}
else if (type === 'test2') {
  test2();
}
else if (type === 'test3') {
  test3();
}
else if (type === 'test4') {
  test4();
} else {
  throw new Error('Invalid value ' + type);
}

// Shorthand
var types = {
  test1: test1,
  test2: test2,
  test3: test3,
  test4: test4
};

var func = types[type];
(!func) && throw new Error('Invalid value ' + type); func();
```

### 27.按位索引简写

当我们遍历数组以查找特定值时，我们确实使用 `indexOf()` 方法，如果找到更好的方法该怎么办？让我们看看这个例子。

```
//longhand
if(arr.indexOf(item) > -1) { // item found
}
if(arr.indexOf(item) === -1) { // item not found
}

//shorthand
if(~arr.indexOf(item)) { // item found
}
if(!~arr.indexOf(item)) { // item not found
}
```

按位（`〜`）运算符将返回除-1 以外的任何值的真实值。否定它就像做 `~~` 一样简单。另外，我们也可以使用 `include()` 函数：

```
if (arr.includes(item)) {
    // true if the item found
}
```

### 28.Object.entries()

此函数有助于将对象转换为对象数组。

```
const data = { test1: 'abc', test2: 'cde', test3: 'efg' };
const arr = Object.entries(data);
console.log(arr);
/** Output:
[ [ 'test1', 'abc' ],
  [ 'test2', 'cde' ],
  [ 'test3', 'efg' ]
]
**/
```

### 29.Object.values()

这也是 ES8 中引入的一项新功能，该功能执行与 `Object.entries()` 类似的功能，但没有关键部分：

```
const data = { test1: 'abc', test2: 'cde' };
const arr = Object.values(data);
console.log(arr);
/** Output:
[ 'abc', 'cde']
**/
```

### 30.双按位简写

双重 NOT 按位运算符方法仅适用于 32 位整数）

```
// Longhand
Math.floor(1.9) === 1 // true

// Shorthand
~~1.9 === 1 // true
```

### 31.重复一个字符串多次

要一次又一次地重复相同的字符，我们可以使用 for 循环并将它们添加到同一循环中，但是如果我们有一个简写方法呢？

```
//longhand
let test = '';
for(let i = 0; i < 5; i ++) {
  test += 'test ';
}
console.log(str); // test test test test test

//shorthand
'test '.repeat(5);
```

### 32.在数组中查找最大值和最小值

```
const arr = [1, 2, 3];
Math.max(…arr); // 3
Math.min(…arr); // 1
```

### 33.从字符串中获取字符

```
let str = 'abc';

//Longhand
str.charAt(2); // c

//Shorthand
Note: If we know the index of the array then we can directly use index insted of character.If we are not sure about index it can throw undefined
str[2]; // c
```

### 34.数学指数幂函数的简写

```
//longhand
Math.pow(2,3); // 8

//shorthand
2**3 // 8
```



### // 数组对象排序   

```js
let objArr = [{ name: 'lisi', age: 20 }, { name: 'yalr', age: 18 }, { name: 'xiaoming', age: 30 },]    
const sortNumArr = objArr.sort((a, b) => a.age - b.age) 
```

//根据数字对比排序    

```js
const sortStrArr = JSON.parse(
  JSON.stringify(objArr)).sort((a, b) => a.name.localeCompare(b.name)
)
```

 //根据字符串排序(中文也可以)    

```js
console.log(sortNumArr, sortStrArr);     
```

### // 过滤虚值 ( 0,undefined,null,false,'',"" )    

```js
let Filtervirtual = [0, 100, '', 'any', null].filter(Boolean) // 输出 [100, "any"]    
```



###  // 去除数组中的重复值    const repeatArr = [10, 30, 50, 10, 100, 50, 9]    	

```js
// 1.通过filter方法    
const removeRepeat = repeatArr.filter((item, index,arr) => arr.indexOf(item) == index)    	

// 2.通过es6的Set   
 const setArr = [...new Set(repeatArr)]    
```



### //计算字符串中的字符出现的次数   

```js
let string = 'sadlsakdlzaasd'    
function counter(str) {       
let table = {}        
for (let attr of str) {          
  table[attr] = table[attr] + 1 || 1      
  }      
  return table   
 }   
 console.log(counter(string)); // 输出{s: 3, a: 4, d: 3, l: 2, k: 1, z: 1}    
```

###  // 将十进制转化为二进制或16进制   

```js
 const num = 10    

const towNum = num.toString(2) // 1010    

const eightNum = num.toString(8) // 12    

const sixteenNum = num.toString(16) // a   
```

###  // 将object属性转化为属性数组    

```js
const obj = { a: 1, b: 2, c: 3 }    
console.log(Object.entries(obj)); // [["a", 1], ["b", 2] ,["c", 3]]  
```

// 使用解构展开和插入    

```js
let objB = { a: 100,b: 20 }    

let NewObj = { name:'lisi',...objB,hobby:'sing' } //{name: "lisi", a: 100, b: 20, hobby: "sing"}
```

## 100个js常用代码片段

#### 实现字符串长度截

```
function cutstr(str, len) {
  var temp;
  var icount = 0;
  var patrn = /[^\x00-\xff]/;
  var strre = "";   
  	for (var i = 0; i < str.length; i++) { 
  		if (icount < len - 1) { 
      	temp = str.substr(i, 1);
  			if (patrn.exec(temp) == null) { 
  				icount = icount + 1       
  			 } else { 
  				icount = icount + 2       
  			 }        
  			strre += temp      
 		 	 } else { 
  			break      
  		}    
  	}  
  return strre + "..." 
}
```

#### 获取域名主机

```
function getHost(url) { 
var host = "null";  
if(typeof url == "undefined"|| null == url) { 
url = window.location.href;  
}   
var regex = /^\w+\:\/\/([^\/]*).*/; 
var match = url.match(regex); 
if(typeof match != "undefined" && null != match) {  
host = match[1];  
}   
return host;
}
```

#### 清除空格

```
 String.prototype.trim = function() {  
 var reExtraSpace = /^\s*(.*?)\s+$/; 
 return this.replace(reExtraSpace, "$1") 
 }
```

#### 替换全部

```
  String.prototype.replaceAll = function(s1, s2) { 
  return this.replace(new RegExp(s1, "gm"), s2) 
  }
```

#### 转义html标签

```
 function HtmlEncode(text) { 
 return text.replace(/&/g, '&').replace(/\"/g, '"').replace(/, '<').replace(/>/g, '>')   }
```

#### 生JavaScript还原html标签

```
 function HtmlDecode(text) { 
 return text.replace(/&/g, '&').replace(/"/g, '\"').replace(/, '<').replace(/>/g, '>')   }
```

#### 时间日期格式转换

```
Date.prototype.Format = function(formatStr) {  
var str = formatStr;  
var Week = ['日', '一', '二', '三', '四', '五', '六'];   
str = str.replace(/yyyy|YYYY/, this.getFullYear());  
str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));  
str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1)); 
str = str.replace(/M/g, (this.getMonth() + 1));  
str = str.replace(/w|W/g, Week[this.getDay()]); 
str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
str = str.replace(/d|D/g, this.getDate()); 
str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours()); 
str = str.replace(/h|H/g, this.getHours());  
str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes()); 
str = str.replace(/m/g, this.getMinutes());  
str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());   
str = str.replace(/s|S/g, this.getSeconds());  
return str 
}
```

#### 判断是否为数字类型

```
function isDigit(value) { 
var patrn = /^[0-9]*$/; 
if (patrn.exec(value) == null || value == "") { 
return false  
} else {  
return true   
} 
}
```

#### 设置cookie值

```
function setCookie(name, value, Hours) {   
var d = new Date();  
var offset = 8; 
var utc = d.getTime() + (d.getTimezoneOffset() * 60000);  
var nd = utc + (3600000 * offset);
var exp = new Date(nd); 
exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000); 
document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";domain=360doc.com;" 
}
```

#### 获取cookie值

```
function getCookie(name) { 
var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)")); 
if (arr != null) return unescape(arr[2]); 
return null
}
```

#### 加入收藏夹

```
function AddFavorite(sURL, sTitle) {   
try {  
window.external.addFavorite(sURL, sTitle)
} 
catch(e) {  
  try {    
  window.sidebar.addPanel(sTitle, sURL, "")  
  }
  catch(e) {   
  alert("加入收藏失败，请使用Ctrl+D进行添加")  
  } 
} 
}
```

#### 设为首页

```
function setHomepage() {  
if (document.all) {  
document.body.style.behavior = 'url(#default#homepage)';      document.body.setHomePage('http://***') 
} else if (window.sidebar) {   
if (window.netscape) {    
try {    
netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")    
} 
catch(e) {   
alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true")   
}   
}   
var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);   
prefs.setCharPref('browser.startup.homepage', 'http://***') 
} 
}
```

#### 判断IE6

```
var ua = navigator.userAgent.toLowerCase(); 
var isIE6 = ua.indexOf("msie 6") > -1; 
if (isIE6) {  
try {   
document.execCommand("BackgroundImageCache", false, true) 
}
catch(e) {} 
}
```

#### 加载样式文件

```
function LoadStyle(url) {  
try {   
document.createStyleSheet(url) 
}
catch(e) { 
var cssLink = document.createElement('link');  
cssLink.rel = 'stylesheet';  
cssLink.type = 'text/css'; 
cssLink.href = url;   
var head = document.getElementsByTagName('head')[0];   
head.appendChild(cssLink)  
} 
}
```

#### 返回脚本内容

```
function evalscript(s) {  
if(s.indexOf('<script'< span>) == -1) return s; 
var p = /]*?>([^\x00]*?)<\ script="">/ig; 
var arr = [];   
while(arr = p.exec(s)) {   
var p1 = /]*?src=\"([^\>]*?)\"[^\>]*?(reload=\"1\")?(?:charset=\"([\w\-]+?)\")?><\ script="">/i;  
var arr1 = [];  
arr1 = p1.exec(arr[0]); 
if(arr1) {    
appendscript(arr1[1], '', arr1[2], arr1[3]);  
} else {   
p1 = /;  
arr1 = p1.exec(arr[0]);  
appendscript('', arr1[2], arr1[1].indexOf('reload=') != -1);  
}  
}  
return s;
}
```

#### 清除脚本内容

```
function stripscript(s) {  
return s.replace(/, '');
}
```

#### 动态加载脚本文件

```
function appendscript(src, text, reload, charset) {    var id = hash(src + text);    if(!reload && in_array(id, evalscripts)) return;    if(reload && $(id)) {      $(id).parentNode.removeChild($(id));    }       evalscripts.push(id);    var scriptNode = document.createElement("script");    scriptNode.type = "text/javascript";    scriptNode.id = id;    scriptNode.charset = charset ? charset : (BROWSER.firefox ? document.characterSet : document.charset);    try {      if(src) {        scriptNode.src = src;        scriptNode.onloadDone = false;        scriptNode.onload = function () {          scriptNode.onloadDone = true;          JSLOADED[src] = 1;        };        scriptNode.onreadystatechange = function () {          if((scriptNode.readyState == 'loaded' || scriptNode.readyState == 'complete') && !scriptNode.onloadDone) {            scriptNode.onloadDone = true;            JSLOADED[src] = 1;          }        };      } else if(text){        scriptNode.text = text;      }      document.getElementsByTagName('head')[0].appendChild(scriptNode);    } catch(e) {}  }
```

#### 返回按ID检索的元素对象

```
 function $(id) {     return !id ? null : document.getElementById(id);   }
```

#### 返回浏览器版本内容

```
function browserVersion(types) {    var other = 1;    for(i in types) {      var v = types[i] ? types[i] : i;      if(USERAGENT.indexOf(v) != -1) {        var re = new RegExp(v + '(\\/|\\s)([\\d\\.]+)', 'ig');        var matches = re.exec(USERAGENT);        var ver = matches != null ? matches[2] : 0;        other = ver !== 0 && v != 'mozilla' ? 0 : other;      }else {        var ver = 0;      }      eval('BROWSER.' + i + '= ver');    }    BROWSER.other = other;  }
```

#### 元素显示的通用方法

```
function $(id) {    return !id ? null : document.getElementById(id);  }  function display(id) {    var obj = $(id);    if(obj.style.visibility) {      obj.style.visibility = obj.style.visibility == 'visible' ? 'hidden' : 'visible';    } else {      obj.style.display = obj.style.display == '' ? 'none' : '';    }  }
```

#### 中有insertBefore方法,可惜却没有insertAfter方法?用如下函数实现

```
function insertAfter(newChild,refChild){   var parElem=refChild.parentNode;   if(parElem.lastChild==refChild){     refChild.appendChild(newChild);   }else{     parElem.insertBefore(newChild,refChild.nextSibling);   } }
```

#### 中兼容浏览器绑定元素事件

```
function addEventSamp(obj,evt,fn){   if (obj.addEventListener) {     obj.addEventListener(evt, fn, false);   }else if(obj.attachEvent){     obj.attachEvent('on'+evt,fn);   } }
```

#### 光标停在文字的后面，文本框获得焦点时调用

```
function focusLast(){   var e = event.srcElement;   var r =e.createTextRange();   r.moveStart('character',e.value.length);   r.collapse(true);   r.select(); }
```

#### 检验URL链接是否有效

```
function getUrlState(URL){   var xmlhttp = new ActiveXObject("microsoft.xmlhttp");   xmlhttp.Open("GET",URL, false);   try{     xmlhttp.Send();   }catch(e){  }finally{     var result = xmlhttp.responseText;     if(result){       if(xmlhttp.Status==200){         return(true);       }else{         return(false);       }     }else{       return(false);     }   } }
```

#### 格式化CSS样式代码

```
function formatCss(s){//格式化代码  s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");  s = s.replace(/;\s*;/g, ";"); //清除连续分号  s = s.replace(/\,[\s\.\#\d]*{/g, "{");  s = s.replace(/([^\s])\{([^\s])/g, "$1 {\n\t$2");  s = s.replace(/([^\s])\}([^\n]*)/g, "$1\n}\n$2");  s = s.replace(/([^\s]);([^\s\}])/g, "$1;\n\t$2");  return s;}
```

#### 压缩CSS样式代码

```
function yasuoCss (s) {//压缩代码  s = s.replace(/\/\*(.|\n)*?\*\//g, ""); //删除注释  s = s.replace(/\s*([\{\}\:\;\,])\s*/g, "$1");  s = s.replace(/\,[\s\.\#\d]*\{/g, "{"); //容错处理  s = s.replace(/;\s*;/g, ";"); //清除连续分号  s = s.match(/^\s*(\S+(\s+\S+)*)\s*$/); //去掉首尾空白  return (s == null) ? "" : s[1];}
```

#### 获取当前路径

```
var currentPageUrl = "";if (typeof this.href === "undefined") {  currentPageUrl = document.location.toString().toLowerCase();}else {  currentPageUrl = this.href.toString().toLowerCase();}
```

#### IP转成整型

```
function _ip2int(ip){  var num = 0;  ip = ip.split(".");  num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);  num = num >>> 0;  return num;}
```

#### 整型解析为IP地址

```
function _int2iP(num){  var str;  var tt = new Array();  tt[0] = (num >>> 24) >>> 0;  tt[1] = ((num << 8) >>> 24) >>> 0;  tt[2] = (num << 16) >>> 24;  tt[3] = (num << 24) >>> 24;  str = String(tt[0]) + "." + String(tt[1]) + "." + String(tt[2]) + "." + String(tt[3]);  return str;}
```

#### 实现checkbox全选与全不选

```
function checkAll() {  var selectall = document.getElementById("selectall");  var allbox = document.getElementsByName("allbox");  if (selectall.checked) {    for (var i = 0; i < allbox.length; i++) {      allbox[i].checked = true;    }  } else {    for (var i = 0; i < allbox.length; i++) {      allbox[i].checked = false;    }  }}
```

#### 判断是否移动设备

```
function isMobile(){  if (typeof this._isMobile === 'boolean'){    return this._isMobile;  }  var screenWidth = this.getScreenWidth();  var fixViewPortsExperiment = rendererModel.runningExperiments.FixViewport || rendererModel.runningExperiments.fixviewport;  var fixViewPortsExperimentRunning = fixViewPortsExperiment && (fixViewPortsExperiment.toLowerCase() === "new");  if(!fixViewPortsExperiment){    if(!this.isAppleMobileDevice()){      screenWidth = screenWidth/window.devicePixelRatio;    }  }  var isMobileScreenSize = screenWidth < 600;  var isMobileUserAgent = false;  this._isMobile = isMobileScreenSize && this.isTouchScreen();  return this._isMobile;}
```

#### 判断是否移动设备访问

```
 function isMobileUserAgent(){   return (/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase())); }
```

#### 判断是否苹果移动设备访问

```
1 function isAppleMobileDevice(){2   return (/iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase()));3 }
```

#### 判断是否安卓移动设备访问

```
1 function isAndroidMobileDevice(){2   return (/android/i.test(navigator.userAgent.toLowerCase()));3 }
```

#### 判断是否Touch屏幕

```
1 function isTouchScreen(){2   return (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);3 }
```

#### 判断是否在安卓上的谷歌浏览器

```
function isNewChromeOnAndroid(){  if(this.isAndroidMobileDevice()){    var userAgent = navigator.userAgent.toLowerCase();    if((/chrome/i.test(userAgent))){      var parts = userAgent.split('chrome/');      var fullVersionString = parts[1].split(" ")[0];      var versionString = fullVersionString.split('.')[0];      var version = parseInt(versionString);      if(version >= 27){        return true;      }    }  }  return false;}
```

#### 判断是否打开视窗

```
1 function isViewportOpen() {2   return !!document.getElementById('wixMobileViewport');3 }
```

#### 获取移动设备初始化大小

```
function getInitZoom(){  if(!this._initZoom){    var screenWidth = Math.min(screen.height, screen.width);    if(this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()){      screenWidth = screenWidth/window.devicePixelRatio;    }    this._initZoom = screenWidth /document.body.offsetWidth;  }  return this._initZoom;}
```

#### 获取移动设备最大化大小

```
function getZoom(){  var screenWidth = (Math.abs(window.orientation) === 90) ? Math.max(screen.height, screen.width) : Math.min(screen.height, screen.width);  if(this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()){    screenWidth = screenWidth/window.devicePixelRatio;  }  var FixViewPortsExperiment = rendererModel.runningExperiments.FixViewport || rendererModel.runningExperiments.fixviewport;  var FixViewPortsExperimentRunning = FixViewPortsExperiment && (FixViewPortsExperiment === "New" || FixViewPortsExperiment === "new");  if(FixViewPortsExperimentRunning){    return screenWidth / window.innerWidth;  }else{    return screenWidth / document.body.offsetWidth;  }}
```

#### 获取移动设备屏幕宽度

```
function getScreenWidth(){  var smallerSide = Math.min(screen.width, screen.height);  var fixViewPortsExperiment = rendererModel.runningExperiments.FixViewport || rendererModel.runningExperiments.fixviewport;  var fixViewPortsExperimentRunning = fixViewPortsExperiment && (fixViewPortsExperiment.toLowerCase() === "new");  if(fixViewPortsExperiment){    if(this.isAndroidMobileDevice() && !this.isNewChromeOnAndroid()){      smallerSide = smallerSide/window.devicePixelRatio;    }  }  return smallerSide;}
```

#### 完美判断是否为网址

```
function IsURL(strUrl) {  var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i  if (regular.test(strUrl)) {    return true;  }  else {    return false;  }}
```

#### 根据样式名称检索元素对象

```
function getElementsByClassName(name) {  var tags = document.getElementsByTagName('*') || document.all;  var els = [];  for (var i = 0; i < tags.length; i++) {    if (tags[i].className) {      var cs = tags[i].className.split(' ');      for (var j = 0; j < cs.length; j++) {        if (name == cs[j]) {          els.push(tags[i]);          break        }      }    }  }  return els}
```

#### 判断是否以某个字符串开头

```
1 String.prototype.startWith = function (s) {2   return this.indexOf(s) == 03 }
```

#### 判断是否以某个字符串结束

```
1 String.prototype.endWith = function (s) {2   var d = this.length - s.length;3   return (d >= 0 && this.lastIndexOf(s) == d)4 }
```

#### 返回IE浏览器的版本号

```
function getIE(){  if (window.ActiveXObject){    var v = navigator.userAgent.match(/MSIE ([^;]+)/)[1];    return parseFloat(v.substring(0, v.indexOf(".")))  }  return false}
```

#### 获取页面高度

```
function getPageHeight(){  var g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat"      ? a      : g.documentElement;  return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);}
```

#### 获取页面scrollLeft

```
1 function getPageScrollLeft(){2   var a = document;3   return a.documentElement.scrollLeft || a.body.scrollLeft;4 }
```

#### 获取页面可视宽度

```
function getPageViewWidth(){  var d = document, a = d.compatMode == "BackCompat"      ? d.body      : d.documentElement;  return a.clientWidth;}
```

#### 获取页面宽度

- 

```
function getPageWidth(){  var g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat"      ? a      : g.documentElement;  return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);}
```

#### 获取页面scrollTop

```
1 function getPageScrollTop(){2   var a = document;3   return a.documentElement.scrollTop || a.body.scrollTop;4 }
```

#### 获取页面可视高度

```
function getPageViewHeight() {  var d = document, a = d.compatMode == "BackCompat"      ? d.body      : d.documentElement;  return a.clientHeight;}
```

#### 跨浏览器添加事件

```
function addEvt(oTarget,sEvtType,fnHandle){  if(!oTarget){return;}  if(oTarget.addEventListener){    oTarget.addEventListener(sEvtType,fnHandle,false);  }else if(oTarget.attachEvent){    oTarget.attachEvent("on" + sEvtType,fnHandle);  }else{    oTarget["on" + sEvtType] = fnHandle;  }}
```

#### 跨浏览器删除事件

- 

```
function delEvt(oTarget,sEvtType,fnHandle){  if(!oTarget){return;}  if(oTarget.addEventListener){    oTarget.addEventListener(sEvtType,fnHandle,false);  }else if(oTarget.attachEvent){    oTarget.attachEvent("on" + sEvtType,fnHandle);  }else{    oTarget["on" + sEvtType] = fnHandle;  }}
```

#### 去掉url前缀

```
function removeUrlPrefix(a){ a=a.replace(/：/g,":").replace(/．/g,".").replace(/／/g,"/"); while(trim(a).toLowerCase().indexOf("http://")==0){  a=trim(a.replace(/http:\/\//i,"")); } return a;}
```

#### 随机数时间戳

```
1 function uniqueId(){2   var a=Math.random,b=parseInt;3   return Number(new Date()).toString()+b(10*a())+b(10*a())+b(10*a());4 }
```

#### 全角半角转换,iCase: 0全到半，1半到全，其他不转化

```
function chgCase(sStr,iCase){  if(typeof sStr != "string" || sStr.length <= 0 || !(iCase === 0 || iCase == 1)){    return sStr;  }  var i,oRs=[],iCode;  if(iCase){/*半->全*/    for(i=0; i<sstr.length;i+=1){       iCode = sStr.charCodeAt(i);      if(iCode == 32){        iCode = 12288;              }else if(iCode < 127){        iCode += 65248;      }      oRs.push(String.fromCharCode(iCode));     }      }else{/*全->半*/    for(i=0; i<sstr.length;i+=1){       iCode = sStr.charCodeAt(i);      if(iCode == 12288){        iCode = 32;      }else if(iCode > 65280 && iCode < 65375){        iCode -= 65248;              }      oRs.push(String.fromCharCode(iCode));     }      }      return oRs.join("");    }
```

#### 确认是否键盘有效输入值

```
function checkKey(iKey){  if(iKey == 32 || iKey == 229){return true;}/*空格和异常*/  if(iKey>47 && iKey < 58){return true;}/*数字*/  if(iKey>64 && iKey < 91){return true;}/*字母*/  if(iKey>95 && iKey < 108){return true;}/*数字键盘1*/  if(iKey>108 && iKey < 112){return true;}/*数字键盘2*/  if(iKey>185 && iKey < 193){return true;}/*符号1*/  if(iKey>218 && iKey < 223){return true;}/*符号2*/  return false;}
```

#### 获取网页被卷去的位置

```
function getScrollXY() {  return document.body.scrollTop ? {    x: document.body.scrollLeft,    y: document.body.scrollTop  }: {    x: document.documentElement.scrollLeft,    y: document.documentElement.scrollTop  }}
```

#### 另一种正则日期格式化函数+调用方法

```
Date.prototype.format = function(format){ //author: meizz var o = {  "M+" : this.getMonth()+1, //month  "d+" : this.getDate(),  //day  "h+" : this.getHours(),  //hour  "m+" : this.getMinutes(), //minute  "s+" : this.getSeconds(), //second  "q+" : Math.floor((this.getMonth()+3)/3), //quarter  "S" : this.getMilliseconds() //millisecond } if(/(y+)/.test(format)) format=format.replace(RegExp.$1,  (this.getFullYear()+"").substr(4 - RegExp.$1.length)); for(var k in o)if(new RegExp("("+ k +")").test(format))  format = format.replace(RegExp.$1,   RegExp.$1.length==1 ? o[k] :    ("00"+ o[k]).substr((""+ o[k]).length)); return format;}alert(new Date().format("yyyy-MM-dd hh:mm:ss"));
```

#### 时间个性化输出功能

```
/*1、< 60s, 显示为“刚刚”2、>= 1min && < 60 min, 显示与当前时间差“XX分钟前”3、>= 60min && < 1day, 显示与当前时间差“今天 XX:XX”4、>= 1day && < 1year, 显示日期“XX月XX日 XX:XX”5、>= 1year, 显示具体日期“XXXX年XX月XX日 XX:XX” */function timeFormat(time){ var date = new Date(time)  , curDate = new Date()  , year = date.getFullYear()  , month = date.getMonth() + 1  , day = date.getDate()  , hour = date.getHours()  , minute = date.getMinutes()  , curYear = curDate.getFullYear()  , curHour = curDate.getHours()  , timeStr; if(year < curYear){  timeStr = year +'年'+ month +'月'+ day +'日 '+ hour +':'+ minute; }else{  var pastTime = curDate - date   , pastH = pastTime/3600000;  if(pastH > curHour){   timeStr = month +'月'+ day +'日 '+ hour +':'+ minute;  }else if(pastH >= 1){   timeStr = '今天 ' + hour +':'+ minute +'分';  }else{   var pastM = curDate.getMinutes() - minute;   if(pastM > 1){    timeStr = pastM +'分钟前';   }else{    timeStr = '刚刚';   }  } } return timeStr;}
```

#### 解决offsetX兼容性问题

```
// 针对火狐不支持offsetX/Yfunction getOffset(e){ var target = e.target, // 当前触发的目标对象   eventCoord,   pageCoord,   offsetCoord; // 计算当前触发元素到文档的距离 pageCoord = getPageCoord(target); // 计算光标到文档的距离 eventCoord = {  X : window.pageXOffset + e.clientX,  Y : window.pageYOffset + e.clientY }; // 相减获取光标到第一个定位的父元素的坐标 offsetCoord = {  X : eventCoord.X - pageCoord.X,  Y : eventCoord.Y - pageCoord.Y }; return offsetCoord;}function getPageCoord(element){ var coord = { X : 0, Y : 0 }; // 计算从当前触发元素到根节点为止， // 各级 offsetParent 元素的 offsetLeft 或 offsetTop 值之和 while (element){  coord.X += element.offsetLeft;  coord.Y += element.offsetTop;  element = element.offsetParent; } return coord;}
```

#### 常用的正则表达式

```
//正整数/^[0-9]*[1-9][0-9]*$/;//负整数/^-[0-9]*[1-9][0-9]*$/;//正浮点数/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;  //负浮点数/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //浮点数/^(-?\d+)(\.\d+)?$/;//email地址/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;//url地址/^[a-zA-z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/;//年/月/日（年-月-日、年.月.日）/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;//匹配中文字符/[\u4e00-\u9fa5]/;//匹配帐号是否合法(字母开头，允许5-10字节，允许字母数字下划线)/^[a-zA-Z][a-zA-Z0-9_]{4,9}$/;//匹配空白行的正则表达式/\n\s*\r/;//匹配中国邮政编码/[1-9]\d{5}(?!\d)/;//匹配身份证/\d{15}|\d{18}/;//匹配国内电话号码/(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/;//匹配IP地址/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;//匹配首尾空白字符的正则表达式/^\s*|\s*$/;//匹配HTML标记的正则表达式< (\S*?)[^>]*>.*?|< .*? />;
```

#### 实现返回顶部的通用方法

```
function backTop(btnId) {  var btn = document.getElementById(btnId);  var d = document.documentElement;  var b = document.body;  window.onscroll = set;  btn.style.display = "none";  btn.onclick = function() {    btn.style.display = "none";    window.onscroll = null;    this.timer = setInterval(function() {      d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);      b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);      if ((d.scrollTop + b.scrollTop) == 0) clearInterval(btn.timer, window.onscroll = set);    },    10);  };  function set() {    btn.style.display = (d.scrollTop + b.scrollTop > 100) ? 'block': "none"  }};backTop('goTop');
```

#### 获得URL中GET参数值

```
// 用法：如果地址是 test.htm?t1=1&t2=2&t3=3, 那么能取得：GET["t1"], GET["t2"], GET["t3"]function get_get(){  querystr = window.location.href.split("?") if(querystr[1]){  GETs = querystr[1].split("&")  GET =new Array()  for(i=0;i<gets.length;i++){   tmp_arr = GETs[i].split("=")   key=tmp_arr[0]   GET[key] = tmp_arr[1]  } } return querystr[1];}
```

#### 实现全选通用方法

```
function checkall(form, prefix, checkall) {  var checkall = checkall ? checkall : 'chkall';  for(var i = 0; i < form.elements.length; i++) {    var e = form.elements[i];    if(e.type=="checkbox"){      e.checked = form.elements[checkall].checked;    }  }}
```

#### 实现全部取消选择通用方法

```
function uncheckAll(form) {  for (var i=0;i<form.elements.length;i++){    var e = form.elements[i];    if (e.name != 'chkall')    e.checked=!e.checked;  }}
```

#### 实现打开一个窗体通用方法

```
function openWindow(url,windowName,width,height){  var x = parseInt(screen.width / 2.0) - (width / 2.0);   var y = parseInt(screen.height / 2.0) - (height / 2.0);  var isMSIE= (navigator.appName == "Microsoft Internet Explorer");  if (isMSIE) {    var p = "resizable=1,location=no,scrollbars=no,width=";    p = p+width;    p = p+",height=";    p = p+height;    p = p+",left=";    p = p+x;    p = p+",top=";    p = p+y;    retval = window.open(url, windowName, p);  } else {    var win = window.open(url, "ZyiisPopup", "top=" + y + ",left=" + x + ",scrollbars=" + scrollbars + ",dialog=yes,modal=yes,width=" + width + ",height=" + height + ",resizable=no" );    eval("try { win.resizeTo(width, height); } catch(e) { }");    win.focus();  }}
```

#### 判断是否为客户端设备

```
function client(o){      var b = navigator.userAgent.toLowerCase();     var t = false;    if (o == 'isOP'){       t = b.indexOf('opera') > -1;    }    if (o == 'isIE'){       t = b.indexOf('msie') > -1;    }    if (o == 'isFF'){       t = b.indexOf('firefox') > -1;    }    return t;}
```

#### 获取单选按钮的值

```
function get_radio_value(field){  if(field&&field.length){      for(var i=0;i<field.length;i++){          if(field[i].checked){              return field[i].value;                      }          }      }else {        return ;          }  }
```

#### 获取复选框的值

```
function get_checkbox_value(field){    if(field&&field.length){      for(var i=0;i<field.length;i++){            if(field[i].checked && !field[i].disabled){        return field[i].value;      }    }      }else {    return;  }      }
```

#### 判断是否为邮箱

```
function isEmail(str){  var re=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;   if (re.test(str) != true) {    return false;  }else{    return true;  }  }
```

#### 判断是否有列表中的危险字符

```
function isValidReg(chars){  var re=/<|>|\[|\]|\{|\}|『|』|※|○|●|◎|§|△|▲|☆|★|◇|◆|□|▼|㊣|﹋|⊕|⊙|〒|ㄅ|ㄆ|ㄇ|ㄈ|ㄉ|ㄊ|ㄋ|ㄌ|ㄍ|ㄎ|ㄏ|ㄐ|ㄑ|ㄒ|ㄓ|ㄔ|ㄕ|ㄖ|ㄗ|ㄘ|ㄙ|ㄚ|ㄛ|ㄜ|ㄝ|ㄞ|ㄟ|ㄢ|ㄣ|ㄤ|ㄥ|ㄦ|ㄧ|ㄨ|ㄩ|■|▄|▆|\*|@|#|\^|\\/;  if (re.test( chars) == true) {    return false;  }else{    return true;  }  }
```

#### 判断字符串是否大于规定的长度

```
function isValidLength(chars, len) {  if (chars.length < len) {    return false;  }  return true;}
```

#### 判断字符串是为网址不区分大小写

```
function isValidURL( chars ) {  var re=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(\S+\.\S+)$/;  if (!isNULL(chars)) {    chars = jsTrim(chars);    if (chars.match(re) == null)      return false;    else      return true;  }  return false;}
```

#### 判断字符串是否为小数

```
function isValidDecimal( chars ) {  var re=/^\d*\.?\d{1,2}$/;  if (chars.match(re) == null)    return false;  else    return true;}
```

#### 判断字符串是否为整数

```
function isNumber( chars ) {  var re=/^\d*$/;  if (chars.match(re) == null)    return false;  else    return true;}
```

#### 判断字符串是否为浮点数

```
function isFloat( str ) {  for(i=0;i<str.length;i++) {    if ((str.charAt(i)<"0" || str.charAt(i)>"9")&& str.charAt(i) != '.'){      return false;    }  }  return true;}
```

#### 判断字符是否为A-Za-z英文字母

```
function isLetters( str ){  var re=/^[A-Za-z]+$/;  if (str.match(re) == null)    return false;  else    return true;}
```

#### 判断字符串是否邮政编码

```
function isValidPost( chars ) {  var re=/^\d{6}$/;  if (chars.match(re) == null)    return false;  else    return true;}
```

#### 判断字符是否空NULL

```
function isNULL( chars ) {  if (chars == null)    return true;  if (jsTrim(chars).length==0)    return true;  return false;}
```

#### 用正则表达式提取页面代码中所有网址

```
1 var aa = document.documentElement.outerHTML.match(/(url\(|src=|href=)[\"\']*([^\"\'\(\)\<\>\[\] ]+)[\"\'\)]*|(http:\/\/[\w\-\.]+[^\"\'\(\)\<\>\[\] ]+)/ig).join("\r\n").replace(/^(src=|href=|url\()[\"\']*|[\"\'\>\) ]*$/igm,"");2 alert(aa)
```

#### 用正则表达式清除相同的数组(低效率)

```
1 Array.prototype.unique=function(){2   return this.reverse().join(",").match(/([^,]+)(?!.*\1)/ig).reverse();3 }
```

#### 用正则表达式清除相同的数组(高效率)

```
String.prototype.unique=function(){  var x=this.split(/[\r\n]+/);  var y='';  for(var i=0;i<x.length;i++){    if(!new RegExp("^"+x[i].replace(/([^\w])/ig,"\\$1")+"$","igm").test(y)){      y+=x[i]+"\r\n"    }  }  return y}
```

#### 用正则表达式按字母排序，对每行进行数组排序

```
1 function SetSort(){2   var text=K1.value.split(/[\r\n]/).sort().join("\r\n");//顺序3   var test=K1.value.split(/[\r\n]/).sort().reverse().join("\r\n");//反序4   K1.value=K1.value!=text?text:test;5 }
```

#### 字符串反序

```
1 function IsReverse(text){2   return text.split('').reverse().join('');3 }
```

#### 用正则表达式清除html代码中的脚本

```
1 function clear_script(){2  K1.value=K1.value.replace(/,"");3 }
```

#### 动态执行JavaScript脚本

```
function javascript(){  try{   eval(K1.value);  }catch(e){    alert(e.message);  }}
```

#### 动态执行VBScript脚本

```
function vbscript(){  try{    var script=document.getElementById("K1").value;    if(script.trim()=="")return;    window.execScript('On Error Resume Next \n'+script+'\n If Err.Number<>0 Then \n MsgBox "请输入正确的VBScript脚本!",48,"脚本错误!" \n End If',"vbscript")  }catch(e){    alert(e.message);  }}
```

#### 实现金额大写转换函数

```
function transform(tranvalue) { try {  var i = 1;  var dw2 = new Array("", "万", "亿"); //大单位  var dw1 = new Array("拾", "佰", "仟"); //小单位  var dw = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //整数部分用  //以下是小写转换成大写显示在合计大写的文本框中     //分离整数与小数  var source = splits(tranvalue);  var num = source[0];  var dig = source[1];  //转换整数部分  var k1 = 0; //计小单位  var k2 = 0; //计大单位  var sum = 0;  var str = "";  var len = source[0].length; //整数的长度  for (i = 1; i <= len; i++) {   var n = source[0].charAt(len - i); //取得某个位数上的数字   var bn = 0;   if (len - i - 1 >= 0) {    bn = source[0].charAt(len - i - 1); //取得某个位数前一位上的数字   }   sum = sum + Number(n);   if (sum != 0) {    str = dw[Number(n)].concat(str); //取得该数字对应的大写数字，并插入到str字符串的前面    if (n == '0') sum = 0;   }   if (len - i - 1 >= 0) { //在数字范围内    if (k1 != 3) { //加小单位     if (bn != 0) {      str = dw1[k1].concat(str);     }     k1++;    } else { //不加小单位，加大单位     k1 = 0;     var temp = str.charAt(0);     if (temp == "万" || temp == "亿") //若大单位前没有数字则舍去大单位     str = str.substr(1, str.length - 1);     str = dw2[k2].concat(str);     sum = 0;    }   }   if (k1 == 3) //小单位到千则大单位进一   {    k2++;   }  }  //转换小数部分  var strdig = "";  if (dig != "") {   var n = dig.charAt(0);   if (n != 0) {    strdig += dw[Number(n)] + "角"; //加数字   }   var n = dig.charAt(1);   if (n != 0) {    strdig += dw[Number(n)] + "分"; //加数字   }  }  str += "元" + strdig; } catch(e) {  return "0元"; } return str;}//拆分整数与小数function splits(tranvalue) { var value = new Array('', ''); temp = tranvalue.split("."); for (var i = 0; i < temp.length; i++) {  value[i] = temp[i]; } return value;}
```

#### 常用的正则表达式大收集

```
匹配中文字符的正则表达式： [\u4e00-\u9fa5] 匹配双字节字符（包括汉字在内）：[^\x00-\xff] 匹配空行的正则表达式：\n[\s| ]*\r匹配 HTML 标记的正则表达式：<(.*)>.*<\/\1>|<(.*)>匹配首尾空格的正则表达式：(^\s*)|(\s*$) 匹配 IP 地址的正则表达式：/(\d+)\.(\d+)\.(\d+)\.(\d+)/g匹配 Email 地址的正则表达式：\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*匹配网址 URL 的正则表达式：http://(/[\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?sql 语句：^(select|drop|delete|create|update|insert).*$ 非负整数：^\d+$ 正整数：^[0-9]*[1-9][0-9]*$ 非正整数：^((-\d+)|(0+))$ 负整数：^-[0-9]*[1-9][0-9]*$ 整数：^-?\d+$ 非负浮点数：^\d+(\.\d+)?$ 正浮点数：^((0-9)+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$ 非正浮点数：^((-\d+\.\d+)?)|(0+(\.0+)?))$ 英文字符串：^[A-Za-z]+$ 英文大写串：^[A-Z]+$ 英文小写串：^[a-z]+$ 英文字符数字串：^[A-Za-z0-9]+$ 英数字加下划线串：^\w+$ E-mail地址：^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$ URL：^[a-zA-Z]+://(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\s*)?$ 或：^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$ 邮政编码：^[1-9]\d{5}$ 电话号码：^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$ 手机号码：^((\(\d{2,3}\))|(\d{3}\-))?13\d{9}$ 双字节字符（包括汉字在内）：^\x00-\xff匹配首尾空格：(^\s*)|(\s*$)匹配 HTML 标记：<(.*)>.*<\/\1>|<(.*)> 匹配空行：\n[\s| ]*\r提取信息中的网络链接：(h|H)(r|R)(e|E)(f|F) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)? 提取信息中的邮件地址：\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)* 提取信息中的图片链接：(s|S)(r|R)(c|C) *= *('|")?(\w|\\|\/|\.)+('|"| *|>)? 提取信息中的 IP 地址：(\d+)\.(\d+)\.(\d+)\.(\d+) 提取信息中的中国手机号码：(86)*0*13\d{9} 提取信息中的中国固定电话号码：(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8} 提取信息中的中国电话号码（包括移动和固定电话）：(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14} 提取信息中的中国邮政编码：[1-9]{1}(\d+){5} 提取信息中的浮点数（即小数）：(-?\d*)\.?\d+ 提取信息中的任何数字 ：(-?\d*)(\.\d+)?IP：(\d+)\.(\d+)\.(\d+)\.(\d+) 电话区号：^0\d{2,3}$腾讯 QQ 号：^[1-9]*[1-9][0-9]*$ 帐号（字母开头，允许 5-16 字节，允许字母数字下划线）：^[a-zA-Z][a-zA-Z0-9_]{4,15}$ 中文、英文、数字及下划线：^[\u4e00-\u9fa5_a-zA-Z0-9]+$
```

#### 实现窗体改变事件resize的操作

> 兼容所以的浏览器

```
(function(){  var fn = function(){    var w = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth      ,r = 1255      ,b = Element.extend(document.body)      ,classname = b.className;    if(w < r){      //当窗体的宽度小于1255的时候执行相应的操作    }else{      //当窗体的宽度大于1255的时候执行相应的操作    }  }  if(window.addEventListener){    window.addEventListener('resize', function(){ fn(); });  }else if(window.attachEvent){    window.attachEvent('onresize', function(){ fn(); });  }  fn();})();
```

#### 用正则清除空格分左右

```
1 function ltrim(s){ return s.replace( /^(\s*| *)/, ""); } 2 function rtrim(s){ return s.replace( /(\s*| *)$/, ""); } 3 function trim(s){ return ltrim(rtrim(s));} 
```

#### 判断变量是否空值

```
/** * 判断变量是否空值 * undefined, null, '', false, 0, [], {} 均返回true，否则返回false */function empty(v){  switch (typeof v){    case 'undefined' : return true;    case 'string'  : if(trim(v).length == 0) return true; break;    case 'boolean'  : if(!v) return true; break;    case 'number'  : if(0 === v) return true; break;    case 'object'  :       if(null === v) return true;      if(undefined !== v.length && v.length==0) return true;      for(var k in v){return false;} return true;      break;  }  return false;}
```

#### 实现base64解码

```
function base64_decode(data){  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,ac = 0,dec = "",tmp_arr = [];  if (!data) { return data; }  data += '';  do {     h1 = b64.indexOf(data.charAt(i++));    h2 = b64.indexOf(data.charAt(i++));    h3 = b64.indexOf(data.charAt(i++));    h4 = b64.indexOf(data.charAt(i++));    bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;    o1 = bits >> 16 & 0xff;    o2 = bits >> 8 & 0xff;    o3 = bits & 0xff;    if (h3 == 64) {      tmp_arr[ac++] = String.fromCharCode(o1);    } else if (h4 == 64) {      tmp_arr[ac++] = String.fromCharCode(o1, o2);    } else {      tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);    }  } while (i < data.length);  dec = tmp_arr.join('');  dec = utf8_decode(dec);  return dec;}
```

#### 实现utf8解码

```
function utf8_decode(str_data){  var tmp_arr = [],i = 0,ac = 0,c1 = 0,c2 = 0,c3 = 0;str_data += '';  while (i < str_data.length) {    c1 = str_data.charCodeAt(i);    if (c1 < 128) {      tmp_arr[ac++] = String.fromCharCode(c1);      i++;    } else if (c1 > 191 && c1 < 224) {          c2 = str_data.charCodeAt(i + 1);      tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));      i += 2;    } else {      c2 = str_data.charCodeAt(i + 1);      c3 = str_data.charCodeAt(i + 2);      tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));      i += 3;    }  }   return tmp_arr.join('');}
```

#### 获取窗体可见范围的宽与高

```
function getViewSize(){  var de=document.documentElement;  var db=document.body;  var viewW=de.clientWidth==0 ? db.clientWidth : de.clientWidth;  var viewH=de.clientHeight==0 ? db.clientHeight : de.clientHeight;  return Array(viewW ,viewH);}
```

#### 判断IE版本号

> （既简洁、又向后兼容！）

```
var _IE = (function(){  var v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');  while (    div.innerHTML = '',    all[0]  );  return v > 4 ? v : false ;}());
```

#### 获取浏览器版本号

```
function browserVersion(types) {  var other = 1;  for (i in types) {    var v = types[i] ? types[i] : i;    if (USERAGENT.indexOf(v) != -1) {      var re = new RegExp(v + '(\\/|\\s|:)([\\d\\.]+)', 'ig');      var matches = re.exec(USERAGENT);      var ver = matches != null ? matches[2] : 0;      other = ver !== 0 && v != 'mozilla' ? 0 : other;    } else {      var ver = 0;    }    eval('BROWSER.' + i + '= ver');  }  BROWSER.other = other;}
```

#### 半角转换为全角函数

```
function ToDBC(str){ var result = ''; for(var i=0; i < str.length; i++){  code = str.charCodeAt(i);  if(code >= 33 && code <= 126){   result += String.fromCharCode(str.charCodeAt(i) + 65248);  }else if (code == 32){   result += String.fromCharCode(str.charCodeAt(i) + 12288 - 32);  }else{   result += str.charAt(i);  } } return result;}
```

#### 全角转换为半角函数

```
function ToCDB(str){ var result = ''; for(var i=0; i < str.length; i++){  code = str.charCodeAt(i);  if(code >= 65281 && code <= 65374){   result += String.fromCharCode(str.charCodeAt(i) - 65248);  }else if (code == 12288){   result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);  }else{   result += str.charAt(i);  } } return result;
```

## ES6简化代码技巧

### 开始 （聚焦 ES6）

这里引用 `阮一峰` 老师的 `ES6标准入门` 一书中的总结：ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版本以后的 `JavaScript` 的下一代标准，涵盖了 `ES2015、ES2016、ES2017`等，而 `ES2015` 则是正式名称，特指当年发布的正式版本的语言标准 市面上提到的 ES6 一般是指 `ES2015` 标准，但有时也是泛指 `下一代 JavaScript`

**本文主要讲解以下内容:**

- 块级作用域（Block scoping，ES2015）
- 解构（Destructuring，ES2015）
- 箭头函数（Arrow Functions，ES2015）
- 模板字符串（template string，ES2015）
- 剩余参数 / 展开语法（Rest and spread parameters，ES2015）
- 对象字面量简写语法（Object shorthand，ES2015）
- 数组实例的 includes() （ES2016）
- Async/await 异步语法 (ES2017)

#### 块级作用域

为什么需要块级作用域?

ES5 只有全局作用域和函数作用域，没有块级作用域，这导致很多场景不合理。

- 第一种场景，内层变量可能会覆盖外层变量。

```
var tmp = new Date()function fn() { console.log(tmp) if (false) {  var tmp = hello world }}fn() // undefined复制代码
```

以上代码的原意是， if 代码块的外部使用外层的 tmp 变量，内部使用内层的 tmp 变量。但是，函数 `fn` 执行后，输出结果为 `undefined` ，原因在于变量提升导致内层的 tmp 变量覆盖了外层的 tmp 变量。

- 第二种场景，用来计数的循环变量泄露为全局变量。

```
var s = hellofor (var i = O; i < s.length; i++) { console.log(s[i])}console.log(i) // 5复制代码
```

上面的代码中，变量 `i` 只用来控制循环，但是循环结束后，它并没有消失，而是泄露成了全局变量。

`let` 实际上为 `JavaScript` 新增了块级作用域。

```
function fl() { let n = 5 if (true) {  let n = 10 } console.log(n) // 5}复制代码
```

上面的函数有两个代码块，都声明了变量 `n`，运行后输出 `5` 。这表示外层代码块不受内层代码块的影响。如果使用 `var` 定义变量 ，最后输出的值就是 `10`

那么我们能利用`块级作用域`做什么呢？

我们先来做道面试题

```
for (var i = 0; i < 5; i++) { setTimeout(() => {  console.log(i) }, 1000)}// 5 5 5 5 5复制代码
```

改成 `ES6` 中的 let

```
for (let i = 0; i < 5; i++) { setTimeout(() => {  console.log(i) }, 1000)}// 0 1 2 3 4复制代码
```

看到这，相信聪明的你已经理解块级作用域的好处了 O(∩_∩)O

那么 `ES5` 能不能实现 `块级作用域` 的效果呢? 可以的，我们可以利用闭包

```
for (var i = 0; i < 5; i++) { ;(function (index) {  setTimeout(() => {   console.log(index)  }, 1000) })(i)}// 0 1 2 3 4复制代码
```

#### 解构

> 解构 ：是将一个数据结构分解为更小的部分的过程。ES6 中，从数组和对象中提取值，对变量进行赋值。

那么解构有什么用处呢？

1. `可以大大的简化变量声明操作。`

```
// ES5var foo = 1var bar = 2var baz = 3// ES6let [foo, bar, baz] = [1, 2, 3]复制代码
```

1. `变量交换：看起来如同镜像。赋值语句的左侧的解构模式，右侧是临时创建的数组字面量。x 被赋值为数组中的 y，y 被赋值为数组中的 x。`

```
let x = 1let y = 2;[x, y] = [y, x]// x = 2, y = 1复制代码
```

1. `对象解构`

```
var obj = { x: 1, y: 2, c: 1 }let { x, y } = obj// x = 1// y = 2复制代码
```

1. `字符串解构`

```
const [a, b, c, d, e] = hello// a => h// b => e// c => l// d => l// e => o复制代码
```

1. `函数参数解构`

```
const xueyue = { name: 雪月 , age: 18,}function getAge({ name, age }) { return `${name}今年${age}岁`}getAge(xueyue) // 雪月今年18岁复制代码
```

#### 箭头函数

`ES6` 允许使用箭头 `=>` 定义函数

```
var f = v => v// 等同于 ES5 的var f = function (v) { return v}复制代码
```

如果箭头函数不需要参数或需要多个参数，就使用圆括号代表参数部分。

```
var f = () => 5// 等同于 ES5 的var f = function () { return 5}var sum = (numl, num2) => numl + num2// 等同于 ES5 的var sum = function (numl, num2) { return numl + num2}复制代码
```

箭头函数可以与解构结合使用。

```
const full = ({ first , last }) => first +   + last;// 等同于 ES5 的function full(person) { return person.first +   + person.last;}复制代码
```

箭头函数使得表达更加简洁

```
const isEven = n => n % 2 === 0const square = n => n * nvar result = values.sort((a, b) => a - b)// 等同于 ES5 的var result = values.sort(function (a, b) { return a - b})复制代码
```

上面代码只用了两行，就定义了两个简单的工具函数。如果不用箭头函数，可能就要占用多行，而且还不如现在这样写醒目。

**箭头函数使用注意点**

1. 函数体内的 `this` 对象，就是定义时所在的对象，而不是使用时所在的对象。
2. 不可以当作构造函数，也就是说，不可以使用 `new` 命令，否则会抛出一个错误。
3. 不可以使用 `arguments` 对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替。
4. 不可以使用 `yield` 命令，因此箭头函数不能用作 `Generator` 函数。

上面四点中，第一点尤其值得注意。`this` 对象的指向是可变的，但是在箭头函数中，它是固定的。

```
// ES6function foo() { setTimeout(() => {  console.log( id: , this.id) }, 100)}// 转换成ES5function foo() { var _this = this setTimeout(function () {  console.log( id: , _this.id) }, 100)}复制代码
```

上面代码中，转换后的 `ES5` 版本清楚地说明了，箭头函数里面根本没有自己的 `this`，而是引用外层的 `this`。

#### 模板字符串

> 模板字符串（ template string ）是增强版的字符串 ，用反引号 `(``)` 标识 。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

```
const { log } = consoleconst name = 雪月const age = 18// 普通字符串拼接const result = name + 今年 + age + 岁// 使用模板字符串const result2 = `${name}今年${age}岁`log(result) // 雪月今年18岁log(result2) // 雪月今年18岁// ${} 大括号可以放入任意的 JavaScript 表达式，可以进行运算const result3 = `${name}今年${age * 2}岁`log(result3) // 雪月今年36岁复制代码
```

#### 剩余参数 / 展开语法

ES6 引入了 rest 参数（形式为`...变量名`），用于获取函数的多余参数，这样就不需要使用 `arguments` 对象了。`rest` 参数搭配的变量是一个数组，该变量将多余的参数放入其中。

```
function sortNumbers() { return Array.prototype.slice.call(arguments).sort()}// 使用 restconst sortNumbers = (...numbers) => numbers.sort()复制代码
```

比较上面的两种写法可以发现， `rest` 参数的写法更自然也更简洁。

扩展运算符（ `spread` ）是三个点（...） 如同 `rest` 参数的逆运算 将一个数组转为用逗号分隔的参数序列

```
console.log(...[1, 2, 3])// 1 2 3console.log(1, ...[2, 3, 4], 5)// 1 2 3 4 5复制代码
```

下面是扩展运算符取代 `apply` 方法的一个实际例子 应用 `Math.max` 方法简化求出数组中的最大元素。

```
// ESS 的写法Math.max.apply(null, [14, 3, 77])// ES6 的写法Math.max(...[14, 3, 77])// 等同于Math.max(14, 3, 77)复制代码
```

扩展运算符提供了数组合并的新写法。

```
// ESS;[1, 2].concat(more)// ES6;[1, 2, ...more]复制代码
```

对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

```
let z = { a: 3, b: bb }let n = { ...z }n // { a: 3, b: bb  }n === z // false复制代码
```

**特别注意：** `...`扩展对象，只能做到当对象属性是 `基本数据类型` 才是 `深拷贝`，如果是 `引用数据类型`，那就是`浅拷贝`。

```
let z = { a: 3, b: bb , c: { name: ccc } }let n = { ...z }n // { a: 3, b: bb , c: { name: ccc  } }n === z // falsen.c === z.c // true// n.c 跟 z.c 是同一个引用地址复制代码
```

#### 对象字面量简写语法

```
const name = 雪月// ES5写法const obj = { name: name, f: function () {  console.log(this.name) },}// ES6简写const obj2 = { name, f() {  console.log(this.name) },}obj.f() // 雪月obj2.f() // 雪月复制代码
```

使用 `vue` 的同学是不是感到很熟悉

```
new Vue({ el: #app , data() {  return {   list: [],  } },})复制代码
```

#### 数组实例的 includes()

Array.prototype.includes 方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的 includes 方法类似。ES2016 引入了该方法。

```
;[1, 2, 3].includes(2) // true;[1, 2, 3].includes(4) // false;[1, 2, NaN].includes(NaN) // true复制代码
```

没有该方法之前，我们通常使用数组的 indexOf 方法，检查是否包含某个值。

```
// ES5if (arr.indexOf(el) !== -1) { // ...}// ES6if (arr.includes(el)) { // ...}// 那么 indexOf 能不能做到类似于 includes 的写法呢？ 我们可以利用 ~ 位运算符if (~arr.indexOf(el)) { // ...}复制代码
```

`indexOf` 方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。二是，它内部使用严格相等运算符（===）进行判断，这会导致对 `NaN` 的误判。

```
;[NaN].indexOf(NaN)// -1复制代码
```

`includes` 使用的是不一样的判断算法，就没有这个问题

```
;[NaN].includes(NaN)// true复制代码
```

#### Async/await 异步语法

`ES2017` 标准引入了 `async` 函数，使得异步操作变得更加方便。

`async` 函数是什么？一句话，它就是 `Generator` 函数的语法糖。

```
async function getTitle(url) { let response = await fetch(url) let html = await response.text() return html.match(//i)[1]}getTitle( https://tc39.github.io/ecma262/ ).then((res) => console.log(res))复制代码
```

上面代码中，函数 `getTitle` 内部有三个操作：`抓取网页`、`取出文本`、`匹配页面标题`。只有这三个操作全部完成，才会执行 `then` 方法里面的 `console.log`

### 结束（意犹未尽）

文章介绍了 `ES6` 常用的一些语法以及使用场景; 但是 `ES6` 内容远不止于此，感兴趣的同学可以去 `阮一峰老师的` ES6 入门教程 一书中查看详细内容。如果您认可这本书，也可以去正版渠道购买书籍。这样可以使出版社不因出版开源书籍而亏钱，进而鼓励更多的作者开源自己的书籍。

### 后记（列举API）

还有很多 `ES6` 实用的 `API` 我就简单提及一下，朋友们看看平时是否有用到

```
复制代码
}
;[1, 4, -5, 10].find(n => n < 0)// -5;[1, 5, 10, 15].findIndex((value, index, arr) => value > 9) // 2;[1, 2, [3, [4, 5]]].flat()// [1, 2, 3, [4, 5]];[1, 2, [3, [4, 5]]].flat(2)// [1, 2, 3, 4, 5];[3, 8, 54, 8, 3, NaN, NaN, NaN , NaN ].filter((number, index, arr) => arr.indexOf(number) === index)// [3, 8, 54, "NaN"] 利用filter过滤去重，注意会漏掉NaN;[1, 2, 3, 4].map((item) => item * 2)// [2, 4, 6, 8] 利用map返回一个新数组，不改变原数组// 使用 reduce 求和; reduce功能极其强大 ! yyds;[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array){ return accumulator + currentValue;}); // 10// ES2017 引入了跟 Object.keys 配套的 Object.values 和 Object.entries，作为遍历一个对象的补充手段，// 供 for...of 循环使用。let { keys, values, entries } = Object;let obj = { a: 1, b: 2, c: 3 };for (let key of keys(obj)) { console.log(key); // a , b , c}for (let value of values(obj)) { console.log(value); // 1, 2, 3}for (let [key, value] of entries(obj)) { console.log([key, value]); // [ a , 1], [ b , 2], [ c , 
```