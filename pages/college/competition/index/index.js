// pages/college/competition/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    college_img: "/image/rj.png",
    collage: "软件学院",
    content1: "下面是该学院推荐的比赛项目",
    content2: "The following are the recommended competitionsfor the college",
    item: {
      src: "/image/acm.jpg",
      protext1: "美国大学生程序设计大赛",
      protext2: "国家级二等竞赛",
    }
  },

  detail() {
    wx.navigateTo({
      url: '/pages/college/competition/detail/detail',
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