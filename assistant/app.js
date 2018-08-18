//app.js

let self = this
let userInfo

const UNPROMPTED = 0
const UNAUTHORIZED = 1
const AUTHORIZED = 2
App({
  onLaunch: function () {
    wx.getSystemInfo({
      success: res => {
        console.log('getSystemInfo', res)
        console.log('data.remotHost', this.data.remotHost = res.platform === 'devtools' ? "http://localhost:3000/n/shop" : "https://shonesinglone.leanapp.cn/n/shop")
        console.log('data', this.data)
      },
      fail: res => {
        console.log('getSystemInfo', res)
      }
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.data.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  backup: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log('logs', logs)
  },
  data: {
    userInfo,
    remotHost: "http://localhost:3000/n/shop",
    locationAuthType: 0
  },
  getSettings() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('wx.getSetting', res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.data.userInfo = res.userInfo
              console.log('wx.getUserInfo', res)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  login({
    success,
    error
  }) {
     // 登录
     wx.login({
       success: res => {
         console.log('wx.login',res)
         // 发送 res.code 到后台换取 openId, sessionKey, unionId
       }
     })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo'] === false) {
          this.data.locationAuthType = UNAUTHORIZED
          // 已拒绝授权
          wx.showModal({
            title: '提示',
            content: '请授权我们获取您的用户信息',
            showCancel: false
          })
          error && error()
        } else {
          this.data.locationAuthType = AUTHORIZED
          console.log(success, this.data)
          // this.doQcloudLogin({ success, error })
        }
      }
    })
  },
})

// export const remotHost = "https://shonesinglone.leanapp.cn/";