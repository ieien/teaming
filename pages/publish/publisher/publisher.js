// pages/publish/publisher/publisher.js
//查看贴子发布者信息界面

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //发布者个人信息
    userInfo: {}
  },

  /**
   * 通过id查看发布者信息
   */
  getPublisherDetail: function(id){
    const _this = this;
    wx.request({
      url: 'https://teaming.malateam.cn/src/look_publisher.php',
      data: {
        publisher_id: id
      },
      success(res){
        //console.log(res.data)
        if(res.data.code === 0){
          _this.setData({
            userInfo: res.data.data
          })
        }else{
          console.log('查询失败');
        }
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPublisherDetail(options.publisher_id)
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