// pages/college/index/index.js
// 学院详情

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    college: "软件学院",
    url: "/image/college_logo/rj.png",
    back_img: "/image/college/back_img.jpg",
    sort_img: "/image/college/sort_img.png",

    collegeList: []
  },

  //跳转到学院页面
  getIntoCompetition: function () {
    wx.navigateTo({
      url: '/pages/college/competition/index/index'
    })
  },

  /**
   * 从全局变量中获取学院列表
   */
  getCollegeList: function(){
    this.setData({
      collegeList: app.globalData.collegeList
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.getCollegeList();
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

  },



  onPageScroll: function (ev) {
    var _this = this;
    var _down = true;
    var _up = false;
    if (ev.scrollTop <= 0) {
      ev.scrollTop = 0;
    } else if (ev.scrollTop > wx.getSystemInfoSync().windowHeight) {
      ev.scrollTop = wx.getSystemInfoSync().windowHeight;
    }
    //判断浏览器滚动条上下滚动
    if (ev.scrollTop > this.data.scrollTop || ev.scrollTop == wx.getSystemInfoSync().windowHeight) {
      _this.setData({ show: "none" });
      //  console.log("down  " + ev.scrollTop + "   " + _this.data.show);   
    }
    else {      //向上滚动
      _this.setData({ show: "flex" });
      // console.log("up  " + ev.scrollTop + "  " + _this.data.show);
    }    //给scrollTop重新赋值
    setTimeout(function () {
      _this.setData({
        scrollTop: ev.scrollTop
      })
    }, 0)
  }
})