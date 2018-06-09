//index.js
//获取应用实例
const app = getApp()


Page({
  data: {
    message: 'Hello MINA!'
  },
  onLoad() {
    console.log("hello human")
    console.time("start");
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '广州市',
        temp: "",
        weather: ""
      },
      success: res => {
        let result = res.data.result;
        const weatherMap = {
          'sunny': '晴天',
          'cloudy': '多云',
          'overcast': '阴',
          'lightrain': '小雨',
          'heavyrain': '大雨',
          'snow': '雪'
        }
        this.setData({
          temp: result.now.temp + "°",
          weather: weatherMap[result.now.weather]
        })

        console.timeEnd("start");
      }
    });
  }
})