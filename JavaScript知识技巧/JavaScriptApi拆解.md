### 手写map方法

map() 方法根据回调函数映射一个新数组

```javascript
Array.prototype.map=function(fn){
  const result=[]
  for(let i=0;i<this.length;i++){
    if(!this.hasOwnProperty(i)) continue; //处理是稀疏数组的情况
    result.push(fn(this[i],i,this))
  }
  return result;
}
//使用
const arr=[1,2,3,,5];
const mapArr=arr.map(item=>item*2)
console.log(mapArr)
```

