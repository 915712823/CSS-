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