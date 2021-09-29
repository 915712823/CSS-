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
            //解析路径
            let pathObj = path.parse(req.url)
            //console.log(pathObj)
            if( pathObj.dir in this.reqEvent ) {
                res.render = render
                res.setHeader("content-type","text/html;charset=utf-8");
                req.pathObj = pathObj
                this.reqEvent[pathObj.dir](req,res)
            }else if(pathObj.dir==this.staticDir){
                res.setHeader("content-type",this.getContentType(pathObj.ext))
                let rs = fs.createReadStream('./static/'+pathObj.base)
                rs.pipe(res)
            }else{
                res.setHeader("content-type","text/html;charset=utf-8")
                res.end("<h1>404!页面找不到</h1>")
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
            console.log(data)
            let reg = /\{\{(.*?)\}\}/igs
            let result;
            while(result = reg.exec(data)){
                //去除2边的空白
                let strKey = result[1].trim()
                let strValue = options[strKey]
                data = data.replace(result[0],strValue)
            }

            this.end(data)
        }
    })
}

module.exports = LcApp;