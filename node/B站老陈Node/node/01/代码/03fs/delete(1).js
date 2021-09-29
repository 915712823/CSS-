let fs = require("fs")
fs.unlink('lc.txt',function(){
    console.log("成功删除！")
})