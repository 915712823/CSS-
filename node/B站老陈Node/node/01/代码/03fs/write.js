let fs = require('fs')
//write=>w     read=>r      append =>a
// fs.writeFile('test.txt',"今晚吃啥\n",{flag:"a",encoding:"utf-8"},function(err){
//    if(err){
//        console.log("写入内容出错")
//    }else{
//        console.log("写入内容成功")
//    }
// })

function writefs(path,content){
    return new Promise(function(resolve,reject){
        fs.writeFile(path,content,{flag:"a",encoding:"utf-8"},function(err){
            if(err){
                //console.log("写入内容出错")
                reject(err)
            }else{
                resolve(err)
                //console.log("写入内容成功")
            }
        })
    })
}

// async function writeList(){
//     await writefs('lc.txt',"1今天吃烧烤\n");
//     await writefs('lc.txt',"2今天吃烧烤\n");
//     await writefs('lc.txt',"3今天吃烧烤\n");
//     await writefs('lc.txt',"4今天吃烧烤\n");
// }
async function writeList(){
    await writefs('lc.html',"<h1>1今天吃烧烤</h1>");
    await writefs('lc.html',"<h1>2今天吃烧烤</h1>");
    await writefs('lc.html',"<h1>3今天吃烧烤</h1>");
    await writefs('lc.html',"<h1>4今天吃烧烤</h1>");
}


writeList()
