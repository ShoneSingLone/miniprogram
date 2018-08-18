// pages/home/home.js
let {
  remotHost
} = getApp().data



Page({
  /**
   * 页面的初始数据
   */
  data: {
    productList: [], // 商品列表
    platform: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProductList()
  },
  getProductList() {
    console.log('remotHost', remotHost);
    console.time("start");

    wx.showLoading({
      title: '商品数据加载中',
    })
    wx.request({
      url: remotHost,
      method: 'POST',
      data: {
        endpoint: 'home',
        action: 'getGoods'
      },
      success: res => {
        wx.hideLoading()
        if (res.data.success) {
          console.log(res.data.result)
          this.setData({
            productList: res.data.result
          })
        } else {
          wx.showToast({
            title: '商品数据加载失败',
          })
        }
        console.timeEnd("start");
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: '商品数据加载失败',
        })
      }
    });

  },
  showDetail(event) {
    let url = event.currentTarget.dataset.url
    console.log(url);

    wx.navigateTo({
      url
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