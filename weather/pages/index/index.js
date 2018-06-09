//index.js
//获取应用实例
const app = getApp()


Page({
  data: {
    message: 'Hello MINA!',
    temp: "",
    weather: "",
    weatherBackground: "",
    currentCity:"上海"
  },
  onLoad() {
    this.getNow();
  },
  onPullDownRefresh() {
    this.getNow(true);
  },
  getNow(isStop) {
    console.time("start");
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '上海'
      },
      success: res => {
        let result = res.data.result;
        console.log(result);
        const weatherMap = {
          'sunny': '晴天',
          'cloudy': '多云',
          'overcast': '阴',
          'lightrain': '小雨',
          'heavyrain': '大雨',
          'snow': '雪'
        }
        const weatherColorMap = {
          'sunny': '#cbeefd',
          'cloudy': '#deeef6',
          'overcast': '#c6ced2',
          'lightrain': '#bdd5e1',
          'heavyrain': '#c5ccd0',
          'snow': '#aae1fc'
        }

        let nowWeather = weatherMap[result.now.weather];

        this.setData({
          temp: result.now.temp + "°",
          weather: nowWeather,
          weatherBackground: "/images/" + result.now.weather + "-bg.png",
          message: result.now.temp + "°" +
            nowWeather +
            "/images/" + result.now.weather + "-bg.png"
        });
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[result.now.weather],
        });

        console.timeEnd("start");
      },
      complete: () => {
        if (isStop) {
          wx.stopPullDownRefresh();
          return console.log("stopPullDownRefresh()");
        }
        return console.log("PullDownRefresh()");
      }
    });
  }

})