## word点击下载

```javascript
handleDownload(row) {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token')
  axios.get(defaultSettings.api + '你的url接口?fileId=' + row.id, {
    headers: {
      'Authorization': token
    },
    responseType: 'arraybuffer'
  }).then((res) => {
    const link = document.createElement('a')
    const blob = new Blob([res.data], {
      type: 'application/octet-stream;charset=UTF-8'
    })
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    link.download = row.realName // 下载的文件名
    // 点击下载
    link.click()
    link.remove()
  })
},
```

