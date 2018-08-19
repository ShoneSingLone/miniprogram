//app.js

let self = this

const UNPROMPTED = 0
const UNAUTHORIZED = 1
const AUTHORIZED = 2

App({
  data: {
    userInfo: null,
    remotHost: "",
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
    logs.unshift('launch' + Date.now())
    wx.setStorageSync('logs', logs)
  },
  login({
    success,
    error
  }) {
    wx.showLoading({
      title: '正在登录...',
    })
    wx.getSetting({
      success: wxSetting => {
        console.log('getSetting', wxSetting)
        if (wxSetting.authSetting['scope.userInfo'] === false) {
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
          wx.getUserInfo({
            success: (wxUserInfo) => {
              // 可以将 wxUserInfo 发送给后台解码出 unionId
              console.log('wxUserInfo', wxUserInfo)
              // 获取code=>userName，userPwd换取 Token{初次token生成，再次token验证}
              wx.login({
                success: ({
                  errMsg,
                  code
                }) => {
                  console.log('wx.login.code', code)
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  wx.request({
                    url: this.data.remotHost,
                    method: 'POST',
                    data: {
                      endpoint: 'login',
                      action: 'getWeChatToken',
                      code,
                      wxUserInfo
                    },
                    success: res => {
                      console.log('remote login success', res.data.success)
                      wx.hideLoading()
                      if (res.data.success) {
                        let {
                          token,
                          result
                        } = res.data
                        this.data.userInfo = result.userInfo
                        this.data.locationAuthType = AUTHORIZED
                        var login = wx.getStorageSync('login') || {}
                        login.token = token
                        login.userInfo = result.userInfo
                        wx.setStorageSync('login', login)

                        success && success(this.data.userInfo)
                      } else {
                        wx.showModal({
                          title: '提示',
                          content: '网络问题，请稍后再试',
                          showCancel: false
                        })
                        error && error()
                      }
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
  getUserInfo({
    success,
    error
  }) {
    if (userInfo) return userInfo
  },
  checkSession({
    success,
    error
  }) {
    wx.checkSession({
      success: () => {
        let login = wx.getStorageSync('login') || (error && error())
        if (login && login.userInfo) {
          this.data.userInfo = login.userInfo
          success && success(this.data.userInfo)
        }
      },
      fail: () => {
        error && error()
      }
    })
  },
})
// export const remotHost = "https://shonesinglone.leanapp.cn/";