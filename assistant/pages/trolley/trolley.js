// pages/trolley/trolley.js
let app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: {},
    trolleyList: [{
      id: 1,
      name: '商品1',
      image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product1.jpg',
      price: 45,
      source: '海外·瑞典',
      count: 1,
      checked: false
    }, {
      id: 2,
      name: '商品2',
      image: 'https://s3.cn-north-1.amazonaws.com.cn/u-img/product2.jpg',
      price: 158,
      source: '海外·新西兰',
      count: 3,
    }], // 购物车商品列表
    trolleyAccount: 0, // 购物车结算总价
    isTrolleyEdit: true, // 购物车是否处于编辑状态
    isTrolleyTotalCheck: false, // 购物车中商品是否全选
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onTapLogin: function () {
    console.log('onTaplogin userInfo:', app.data.userInfo)
    app.login({
      success: (result) => {
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
        console.log({
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
        this.getTrolleyList()
      }
    })
  },
  changeList(trolleyList) {
    let {
      trolleyAccount,
      isTrolleyTotalCheck
    } = this.trolleyComputed(trolleyList)
    this.setData({
      isTrolleyTotalCheck,
      trolleyAccount
    })
  },
  getTrolleyList() {
    wx.showLoading({
      title: '刷新购物车数据...',
    })
    app.authority({
        data: {
          endpoint: 'trolley',
          action: 'getTrolleyList'
        }
      },
      response => {
        console.log("response", response);
        console.log("response.result.products", response.result.products);
        console.log("response.result.trolleyRecords.trolleyList", response.result.trolleyRecords.productList);
        wx.hideLoading()
        this.setData({
          trolleyList: response.result.trolleyRecords.productList,
          products: response.result.products
        })
        this.changeList(this.data.trolleyList)
      },
      (error) => {
        console.log('error', error)
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '刷新购物车数据失败',
        })
      })
  },
  onTapCheckSingle(event) {
    let trolley = event.currentTarget.dataset.trolley
    let index = event.currentTarget.dataset.index

    this.data.trolleyList[index].checked = !trolley.checked

    let {
      trolleyAccount,
      isTrolleyTotalCheck
    } = this.trolleyComputed(this.data.trolleyList)
    this.setData({
      trolleyList: this.data.trolleyList,
      isTrolleyTotalCheck,
      trolleyAccount
    })
  },
  onTapCheckTotal(event) {

    let list = this.data.trolleyList
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      element.checked = !this.data.isTrolleyTotalCheck
    }

    let {
      trolleyAccount,
      isTrolleyTotalCheck
    } = this.trolleyComputed(list)
    this.setData({
      trolleyList: list,
      isTrolleyTotalCheck,
      trolleyAccount
    })
  },
  /**
   * 
   * 购物车List改变后重新获取信息
   * 
   * @param {any} trolleyList 
   * @returns 
   */
  trolleyComputed(trolleyList) {
    let trolleyAccount = 0,
      isTrolleyTotalCheck = false

    let trolleyListChecked = trolleyList.filter(trolley => {
      if (trolley.checked) {
        trolleyAccount += this.data.products[trolley.id].price * trolley.count
        return true
      }
      return false
    })
    if (trolleyListChecked.length === trolleyList.length) {
      isTrolleyTotalCheck = true
    }
    return {
      trolleyAccount,
      isTrolleyTotalCheck
    }

  },
  onTapEditTrolley() {
    let isTrolleyEdit = this.data.isTrolleyEdit
    this.setData({
      isTrolleyEdit: !isTrolleyEdit
    })

  },
  adjustTrolleyProductCount(event) {
    let type = event.currentTarget.dataset.type
    let trolley = event.currentTarget.dataset.trolley
    let index = event.currentTarget.dataset.index
    let count = parseInt(type)
    console.log(count)
    trolley.count = parseInt(trolley.count) + count
    if (trolley.count === 0) {
      this.data.trolleyList.splice(index, 1)
      console.log(this.data.trolleyList)
    } else {
      this.data.trolleyList[index] = trolley
    }

    this.setData({
      trolleyList: this.data.trolleyList
    })
    this.changeList(this.data.trolleyList)
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