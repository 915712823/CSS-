let fs = require('fs');

let fd = fs.openSync('hello.txt')
let buf = Buffer.alloc(1024)
let content = fs.readSync(fd,buf,0,1024,0)
console.log(buf.toString())