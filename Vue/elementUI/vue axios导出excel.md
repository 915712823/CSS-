## vue axios 导出excel

```vue
<script>
 exportExcel() {
        var _this = this;
        axios({
          method: "post",
          url: config.EXPORT_EXCEL + this.$store.state.userId,   //接口地址
          data: {range: _this.range, apiName: 'all',},           //接口参数
          responseType:'blob',                                  
           //上面这个参数不加会乱码，据说{responseType: 'arraybuffer'}也可以
          headers: {         
            Authorization: this.$store.state.loginToken,
            "Content-Type": "application/json"
          },
        })
          .then(function (res) {
            let fileName = 'SamplePointsDetail.xls'                      //excel文件名称
            let blob = new Blob([res.data], { type: 'application/x-xls'})   //word文档为msword,pdf文档为pdf，excel文档为x-xls
            if (window.navigator.msSaveOrOpenBlob) {
              navigator.msSaveBlob(blob, fileName);
            } else {
              var link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = fileName;
              link.click();
              window.URL.revokeObjectURL(link.href);
            }
          })
          .catch(function (res) {
            _this.$message({
              message: res.data.message,
              type: "warning"
            });
          });
      },
</script>
```

