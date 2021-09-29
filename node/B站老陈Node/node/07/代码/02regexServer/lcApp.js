let http = require('http')
let path = require('path')
let url = require('url')
let fs = require('fs')
class LcApp{
    constructor(){
        this.server = http.createServer()
        this.reqEvent = {}
        this.staticDir = '/static'
        
        this.server.on('request',(req,res)=>{
            let resState = false
            //解析路径
            let pathObj = path.parse(req.url);
            req.pathObj = pathObj;
            res.render = render;
            console.log(req.url)
            
            //循环匹配正则路径
            for(let key in this.reqEvent){
               
                let regStr = key
                let reg = new RegExp(regStr,'igs');
                //console.log(regStr,reg)
                if(reg.test(req.url)){
                    this.reqEvent[key](req,res)
                    resState = true
                    break;
                }
            }
            
            if(!resState){
                try {
                    if(pathObj.dir==this.staticDir){
                        res.setHeader("content-type",this.getContentType(pathObj.ext))
                        let rs = fs.createReadStream('./static/'+pathObj.base)
                        rs.pipe(res)
                    }else{
                        res.setHeader("content-type","text/html;charset=utf-8")
                        res.end("<h1>404!页面找不到</h1>")
                    }
                } catch (error) {
                    console.log(error)
                    res.end(`<h1>500!${error}</h1>`)
                }
            }
            
        })
    }
    on(url,fn){
        this.reqEvent[url] = fn;
    }
    run(port,callback){
        this.server.listen(port,callback)
    }
    getContentType(extName){
        switch(extName){
            case ".jpg":
                return "image/jpeg";
            case ".html":
                return "text/html;charset=utf-8";
            case ".js":
                return "text/javascript;charset=utf-8";
            case ".json":
                return "text/json;charset=utf-8";
            case ".gif":
                return "image/gif";
            case ".css":
                return "text/css"
        }
    }
}

function render(options,path){
    fs.readFile(path,{encoding:"utf-8",flag:"r"},(err,data)=>{
        if(err){
            console.log(err)
        }else{
            try {
                data = replaceArr(data,options)
                data = replaceVar(data,options)
            } catch (error) {
               console.log(error)     
            }

            this.end(data)
        }
    })
}

function replaceVar(data,options){
    let reg = /\{\{(.*?)\}\}/igs
    let result;
    //console.log(options);
    //console.log(data);
    while(result = reg.exec(data)){
        //去除2边的空白
        let strKey = result[1].trim()
        
        // item,item.abc
        let strValue = eval('options.'+strKey);
        //console.log("strKey:",strKey,";strValue:"+strValue)
        data = data.replace(result[0],strValue)
        reg.lastIndex = 0;
    }
    //console.log(data)
    return data
}

function replaceArr(data,options){
    //匹配循环的变量，并且替换循环的内容
    let reg = /\{\%for \{(.*?)\} \%\}(.*?)\{\%endfor\%\}/igs
    while(result = reg.exec(data)){
        let strKey = result[1].trim();
        //通过KEY值获取数组内容
        let strValueArr = options[strKey]
        let listStr = ""
        strValueArr.forEach((item,i)=>{
            //替换每一项内容里的变量
            listStr = listStr + replaceVar(result[2],{"item":item,"index":i})
        })
        data = data.replace(result[0],listStr)
        reg.lastIndex = 0;
    }
    return data;
}

module.exports = LcApp;