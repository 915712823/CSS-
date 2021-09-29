let fs = require("fs");
let {fsWrite,fsRead} = require('./lcfs');

const txtPath = "all.txt"
fs.readdir('../03fs',function(err,files){
    if(err){
        //console.log(err)
    }else{
        //console.log(files)
        files.forEach(async function(filename,i){
            let content = await fsRead('../03fs/'+filename)
            await fsWrite(txtPath,content);
        })
    }
    
})