// pages/publish/index/index.js
// 我发布的帖子页面

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
        //console.log(res);
        if(res.data.code === 0){
          _this.setData({
            myPublicList: res.data.data
          })
        } else if (res.data.code === 3){
          console.log('未发布信息');
        }else{
          //此处一个弹框提示（提示用户信息获取失败）
          wx.showModal({
            title: 'fail',
            content: '获取消息失败',
            showCancel: false, //不显示取消按钮，只能确定
            success(res) {
            }
          }) 
        }//if
      }
    })
  },

  /**
   * 查看我发布的帖子详情
   */
  detail: function(e) {
    wx.navigateTo({
      url: '/pages/detail/index?news_id=' + this.data.myPublicList[e.currentTarget.dataset.index].news_id,
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