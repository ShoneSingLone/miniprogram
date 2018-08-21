// pages/order/order.js
let app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: app.data.userInfo,
    products: {},
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow')
    app.checkSession({
      success: (
        userInfo
      ) => {
        this.setData({
          userInfo
        })
        this.getOrder()
      }
    })
  },
  getOrder() {
    wx.showLoading({
      title: '刷新订单数据...',
    })
    app.authority({
        data: {
          endpoint: 'order',
          action: 'getOrderList'
        }
      },
      response => {
        console.log("getOrder", response);
        wx.hideLoading()
        this.setData({
          orderList: response.result.orderList,
          products: response.result.products
        })
      },
      (error) => {
        console.log('error', error)
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '刷新订单数据失败',
        })
      })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})