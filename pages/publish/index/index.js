// pages/publish/index/index.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //我发布的信息列表,[{news_id, title, views, likes, remain_time, post_time}, {}, ...]
    myPublicList: [],    

    book_img: "/image/add_page/book.png",
    left_img: "/image/add_page/left.png",
    add_img: "/image/add_page/add.png",
  },

  onTapDayWeather() {
    wx.navigateTo({
      url: '/pages/publish/add/add',
    })
  },

  /**
   * 获得我发布的信息，得到一个对象数组
   */
  getMyPublicList: function(){
    const _this = this;
    wx.request({
      url: 'https://teaming.malateam.cn/src/my_public_list.php',
      data: {
        user_id: app.globalData.openid
      },
      success(res) {
        console.log(res);
        if(res.data.code === 0){
          _this.setData({
            myPublicList: res.data.data
          })
        }else{
          console.log('获取我的发布信息失败');
        }
      }
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
    this.getMyPublicList();
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