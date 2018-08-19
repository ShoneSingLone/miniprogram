// pages/user/user.js
// pages/user/user.js
let app = getApp()

console.log('when get app userInfo:', app.data.userInfo)

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.data.userInfo,
    locationAuthType: app.data.locationAuthType,
    remotHost: app.data.remotHost
  },
  onTapLogin: function () {
    console.log('onTaplogin userInfo:', app.data.userInfo)
    app.login({
      success: ({
        userInfo
      }) => {
        console.log('when login success userInfo:', app.data.userInfo)
        this.setData({
          userInfo: app.data.userInfo,
          locationAuthType: app.data.locationAuthType
        })
        console.log('login success', {
          userInfo: app.data.userInfo,
          locationAuthType: app.data.locationAuthType
        })
      },
      error: () => {
        this.setData({
          locationAuthType: app.data.locationAuthType
        })
        this.setData({
          userInfo: app.data.userInfo,
          locationAuthType: app.data.locationAuthType
        })
        console.log('login fail', {
          userInfo: app.data.userInfo,
          locationAuthType: app.data.locationAuthType
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady')

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow')

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload')

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom')

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})