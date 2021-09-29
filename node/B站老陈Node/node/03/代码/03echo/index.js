const axios = require("axios");
const fs = require("fs")
const path = require('path')




//目标：下载音乐
//1获取音乐相关的信息，通过音乐相关的信息获取mp3地址
//2如何获取打量的音乐信息，通过获取音乐列表
//3通过音乐的分类页，获取音乐列表

async function getPage(num){
    let httpUrl = "http://www.app-echo.com/api/recommend/sound-day?page="+num;
    let res = await axios.get(httpUrl);
    //console.log(res.data.list)
    var num = 1;
    res.data.list.forEach(function(item,i){
        let title = item.sound.name;
        let mp3Url = item.sound.source;
        let filename = path.parse(mp3Url).name;
        
        let content = `${title},${mp3Url},${filename}\n`
        fs.writeFile('music.txt',content,{flag:'a'},function(){
            console.log("写入完成："+title)
        })
        console.log(filename)
        console.log(mp3Url)
        
        download(mp3Url,filename);
        
       

    })

}

async function download(mp3Url,filename){
    axios.get(mp3Url,{responseType:"stream"}).then(function(res){
        let ws = fs.createWriteStream('./mp3/'+filename+".mp3");
        res.data.pipe(ws)
    })
}

getPage()