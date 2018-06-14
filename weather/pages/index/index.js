//index.js
//获取应用实例
const app = getApp()


Page({
  data: {
    message: 'Hello MINA!',
    temp: "",
    weather: "",
    weatherBackground: "",
    currentCity: "上海",
    hourlyWeather: [],
    todayTemp: "",
    todayDate: ""
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

        let
          nowWeather = weatherMap[result.now.weather],
          nowHour = new Date().getHours(),
          hourlyWeather = [],
          forecast = result.forecast;

        for (let i = 0; i < 24; i += 3) {
          hourlyWeather.push({
            time: (i + nowHour) % 24 + "时",
            src: '/images/' + forecast[i / 3].weather + '-icon.png',
            temp: forecast[i / 3].temp + '°'
          })
        }
        hourlyWeather[0].time = "现在";
        this.setData({
          temp: result.now.temp + "°",
          weather: nowWeather,
          weatherBackground: "/images/" + result.now.weather + "-bg.png",
          hourlyWeather
        });
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[result.now.weather],
        });

        /**setToday */
        this.setToday(result);

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
  },
  setToday(result) {
    let date = new Date()
    this.setData({
      todayTemp: `${result.today.minTemp}° - ${result.today.maxTemp}°`,
      todayDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 今天`
    })
  },
  onTapDayWeather() {
    console.info("onTapDayWeather");

    wx.navigateTo({
      url: '/pages/list/list',
    })

  }
})