let events = require("events");
let fs = require("fs")
let ee = new events.EventEmitter();

ee.on("helloSuccess",function(eventMsg){
    console.log("1吃夜宵")
    console.log(eventMsg)
})
ee.on("helloSuccess",function(){
    console.log("2唱K")
})
ee.on("helloSuccess",function(){
    console.log("3打王者")
})
ee.on("helloSuccess",function(){
    console.log("4打dota")
})

function lcReadFile(path){
    return new Promise(function(resolve,reject){
        fs.readFile(path,{encoding:"utf-8"},function(err,data){
            if(err){
                //console.log(err)
                reject(err)
            }else{
                //console.log(data)
                resolve(data)
                //ee.emit("helloSuccess",data)
            }
        })
    })
}

lcReadFile('hello.txt').then(function(data){
    ee.emit("helloSuccess",data)
})

async function test(){
    let data = await lcReadFile('hello.txt')
    ee.emit("helloSuccess",data)
}
test()