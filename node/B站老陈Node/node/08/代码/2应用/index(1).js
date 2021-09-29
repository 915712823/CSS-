let {write,read,readdir} = require('lcfs')

readdir('../').then(function(files){
    console.log(files)
})

async function test(){
    let files = await readdir("../../");
    console.log(files);
}

test()