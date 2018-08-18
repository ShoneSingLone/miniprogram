// pages/detail/detail.js
import {
  remotHost
} from '../../app'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getProduct(options.id)
  },
  getProduct(id) {
    console.log('remotHost', remotHost);
    console.time("start");
    wx.showLoading({
      title: '商品数据加载中...',
    })

    wx.request({
      url: remotHost + '?id=' + id,
      method: 'POST',
      data: {
        endpoint: 'home',
        action: 'getGoodDetailById'
      },
      success: res => {
        wx.hideLoading()
        if (res.data.success && res.data.result.length === 1) {
          console.log(res.data.result[0])
          this.setData({
            product: res.data.result[0]
          })
        } else {
          setTimeout(() => {
            wx.navigateBack()
          }, 2000)
        }
        console.timeEnd("start");
      },
      fail: res => {
        wx.hideLoading()
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }
    });
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