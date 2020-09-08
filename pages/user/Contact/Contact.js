// pages/user/Contact/Contact.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    logosrc: '/image/Nchu.png',
    adrimg: '/image/contact_logo/location.png',
    clockimg: '/image/contact_logo/time.png',
    phoneimg: '/image/contact_logo/phone.png',
    jtimg: '/image/contact_logo/right.png',
    picimg: '/image/contact_logo/img.png',
    imgUrls: [
      'http://img5.imgtn.bdimg.com/it/u=715213482,2694217721&fm=26&gp=0.jpg',
      'http://img5.imgtn.bdimg.com/it/u=1106193377,1625776152&fm=26&gp=0.jpg',
      'http://img2.imgtn.bdimg.com/it/u=411125187,2269698293&fm=26&gp=0.jpg',
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '15307640340',
    })
  },
  getLocation: function () {
    wx.openLocation({
      latitude: 28.65,
      longitude: 115.82,
      name: "南昌市城市之光",
      address: "南昌市丰和南大道696号27栋宿舍楼",
      scale: 28
    })
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