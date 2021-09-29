let fs = require("fs");

fs.readFile("hello.txt",{flag:"r",encoding:"utf-8"},function(err,data){
    if(err){
        console.log(err)
    }else{
        console.log(data)
        lcEvent.emit('helloSuccess',data)
        //1数据库查看所有的用详细信息
        //2统计年龄比例
        //3查看所有用户学校的详细信息
    }
})



let lcEvent = {
    event:{
        //fileSuccess:[fn,fn,fn]
    },
    on:function(eventName,eventFn){
        if(this.event[eventName]){
            this.event[eventName].push(eventFn)
        }else{
            this.event[eventName] = []
            this.event[eventName].push(eventFn)
        }
    },
    emit:function(eventName,eventMsg){
        if(this.event[eventName]){
            this.event[eventName].forEach(itemFn => {
                itemFn(eventMsg)
            });
        }
    }
}

lcEvent.on('helloSuccess',function(eventMsg){
    console.log("1数据库查看所有的用户详细信息")
})
lcEvent.on('helloSuccess',function(eventMsg){
    console.log("2统计用户年龄比例")
})
lcEvent.on('helloSuccess',function(eventMsg){
    console.log("3查看所有用户学校的详细信息")
})