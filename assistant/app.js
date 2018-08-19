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
          this.data.locationAuthType = AUTHORIZED
          wx.getUserInfo({
            success: (wxUserInfo) => {
              // 可以将 wxUserInfo 发送给后台解码出 unionId
              this.data.userInfo = wxUserInfo.userInfo
              console.log('wxUserInfo', wxUserInfo)
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
                      code,
                      wxUserInfo
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