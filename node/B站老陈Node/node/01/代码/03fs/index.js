var fs = require('fs');
//导入文件模块
//node,读写文件也有同步和异步的接口




//同步,等待和阻塞
//var content = fs.readFileSync('hello.txt',{flag:'r',encoding:"utf-8"})
//异步
// fs.readFile("hello.txt",{flag:'r',encoding:"utf-8"},function(err,data){
//     if(err){
//         console.log(err)
//     }else{
//         console.log(data)

//     }
//     //console.log(456)
// })

function fsRead(path){
    return new Promise(function(resolve,reject){
        fs.readFile(path,{flag:'r',encoding:"utf-8"},function(err,data){
            if(err){
                //console.log(err)
                //失败执行的内容
                reject(err)

            }else{
                //console.log(data)
                //成功执行的内容
                resolve(data)
            }
            //console.log(456)
        })
    })
}

//console.log(123)

var w1 = fsRead('hello.txt')
w1.then(function(res){
    console.log(res)
})


async function ReadList(){
    var file2 = await fsRead('hello.txt');
    console.log("1:",file2.toString()+".txt")
    console.log("1:","hello2.txt")
    console.log(file2.length)
    var file3 = await fsRead(file2.trim()+".txt");
    console.log(file3)
    var file3Content = await fsRead("hello3.txt".trim())
    console.log(file3Content)
}

ReadList()


//console.log(content)

