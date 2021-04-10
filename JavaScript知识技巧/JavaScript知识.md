## 数组

### 冒泡排序

是一种算法，把一系列的数据按照一定的顺序进行排列显示(从小到大或从大到小)。





## 函数

### 返回值（return）

#### 案例

```javascript
function getSum(num1,num2){
  return num1 + num2;
  console.log(123);
}
console.log(getSum(1, 2));      //3
```

<font color="red">ps：函数里return之后的代码不会被执行,return只能返回一个值，如果用逗号隔开以最后一个为准，如果想要return多个值，可以把值放数组里。</font>

```javascript
function getSum(num1,num2){
  return [num1 + num2, num1 - num2, num1 * num2, num1 / num2];
}
console.log(getSum(1, 2));      //[3, -1, 2, 0.5]
```

