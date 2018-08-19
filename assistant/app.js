//app.js

let self = this
let userInfo

const UNPROMPTED = 0
const UNAUTHORIZED = 1
const AUTHORIZED = 2

App({
  data: {
    userInfo,
    remotHost: "http://localhost:3000/n/shop",
    locationAuthType: 0
  },
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
  },
  backup: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log('logs', logs)
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
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.data.locationAuthType = AUTHORIZED
          wx.showLoading({
            title: '正在登录...',
          })
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.data.userInfo = res.userInfo
              console.log(this.data.userInfo)
              // 获取code=>userName，userPwd换取 Token{初次token生成，再次token验证}
              wx.login({
                success: ({
                  errMsg,
                  code
                }) => {
                  console.log('wx.login', errMsg)
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  wx.request({
                    url: this.data.remotHost,
                    method: 'POST',
                    data: {
                      endpoint: 'login',
                      action: 'getWeChatToken',
                      code
                    },
                    success: res => {
                      console.log('remote login success', res)
                      wx.hideLoading()
                      success && success(this.data.userInfo)
                    },
                    fail: res => {
                      console.log('remote login fail', res)
                      wx.hideLoading()
                    }
                  });
                }
              })

            }
          })
          console.log(this.data)
        }
      }
    })
  },
  doQcloudLogin({
    success,
    error
  }) {
    // 调用 qcloud 登陆接口
    qcloud.login({
      success: result => {
        if (result) {
          let userInfo = result
          success && success({
            userInfo
          })
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          this.getUserInfo({
            success,
            error
          })
        }
      },
      fail: () => {
        error && error()
      }
    })
  },
})

// export const remotHost = "https://shonesinglone.leanapp.cn/";