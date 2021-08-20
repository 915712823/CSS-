#                   微信小程序之授权登录

一、前言
由于微信官方修改了 getUserInfo 接口，所以现在无法实现一进入微信小程序就弹出授权窗口，只能通过 button 去触发。官方连接：https://developers.weixin.qq.com/community/develop/doc/0000a26e1aca6012e896a517556c01

二、实现思路
自己写一个微信授权登录页面让用户实现点击的功能，也就是实现了通过 button 组件去触发 getUserInof 接口。在用户进入微信小程序的时候，判断用户是否授权了，如果没有授权的话就显示授权页面，让用户去执行授权的操作。如果已经授权了，则直接跳过这个页面，进入首页。

三、界面简介
1.不带 tabBar

![image-20210819130606103](C:\Users\Administrator\Desktop\项目笔记\微信小程序\login\login.assets\image-20210819130606103.png)

2.带 tabBar

![image-20210819130622383](C:\Users\Administrator\Desktop\项目笔记\微信小程序\login\login.assets\image-20210819130622383.png)

四、源码
1.index.wxml

```wx
<view wx:if="{{isHide}}">
    <view wx:if="{{canIUse}}" >
        <view class='header'>
            <image src='/images/wx_login.png'></image>
        </view>

        <view class='content'>
            <view>申请获取以下权限</view>
            <text>获得你的公开信息(昵称，头像等)</text>
        </view>
     
        <button class='bottom' type='primary' open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="bindGetUserInfo">
            授权登录
        </button>
    </view>
    <view wx:else>请升级微信版本</view>

</view>

<view wx:else>
    <view>我的首页内容</view>
</view>
```

2.index.wcss

```
.header {
    margin: 90rpx 0 90rpx 50rpx;
    border-bottom: 1px solid #ccc;
    text-align: center;
    width: 650rpx;
    height: 300rpx;
    line-height: 450rpx;
}

.header image {
    width: 200rpx;
    height: 200rpx;
}

.content {
    margin-left: 50rpx;
    margin-bottom: 90rpx;
}

.content text {
    display: block;
    color: #9d9d9d;
    margin-top: 40rpx;
}

.bottom {
    border-radius: 80rpx;
    margin: 70rpx 50rpx;
    font-size: 35rpx;
}
```

3.index.js

```
Page({
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isHide: false
    },

    onLoad: function() {
        var that = this;
        // 查看是否授权
        wx.getSetting({
            success: function(res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function(res) {
                            // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
                            // 根据自己的需求有其他操作再补充
                            // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
                            wx.login({
                                success: res => {
                                    // 获取到用户的 code 之后：res.code
                                    console.log("用户的code:" + res.code);
                                    // 可以传给后台，再经过解析获取用户的 openid
                                    // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                                    // wx.request({
                                    //     // 自行补上自己的 APPID 和 SECRET
                                    //     url: 'https://api.weixin.qq.com/sns/jscode2session?appid=自己的APPID&secret=自己的SECRET&js_code=' + res.code + '&grant_type=authorization_code',
                                    //     success: res => {
                                    //         // 获取到用户的 openid
                                    //         console.log("用户的openid:" + res.data.openid);
                                    //     }
                                    // });
                                }
                            });
                        }
                    });
                } else {
                    // 用户没有授权
                    // 改变 isHide 的值，显示授权页面
                    that.setData({
                        isHide: true
                    });
                }
            }
        });
    },
     
    bindGetUserInfo: function(e) {
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            var that = this;
            // 获取到用户的信息了，打印到控制台上看下
            console.log("用户的信息如下：");
            console.log(e.detail.userInfo);
            //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
            that.setData({
                isHide: false
            });
        } else {
            //用户按了拒绝按钮
            wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel: false,
                confirmText: '返回授权',
                success: function(res) {
                    // 用户没有授权成功，不需要改变 isHide 的值
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”');
                    }
                }
            });
        }
    }

})
```

关于 TabBar 的处理，只需要把上面写好的页面设置到 app.json 里面即可。

4.github 下载
https://github.com/yyzheng1729/loginDemo