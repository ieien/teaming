// pages/user/index/index.js
// 用户页面主页

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar: '', //用户头像
    userName: '', //用户名字
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo.userName != ''){
      this.setData({
        avatar: app.globalData.userInfo.avatar,
        userName: app.globalData.userInfo.userName
      })
    }else{
      this.setData({
        avatar: '/image/user_init.jpg',
        userName: '未设置'
      })
    }
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