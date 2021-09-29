const axios = require("axios");

let httpUrl = "https://www.doutula.com/article/detail/9002522"
let options = {
    proxy: {
        host: '59.44.247.194',
        port: 9797,
    },
}
axios.get(httpUrl,options).then(function(res){
    console.log(res.data)
})