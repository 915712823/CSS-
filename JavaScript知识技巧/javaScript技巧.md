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