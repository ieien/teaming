// pages/detail/index.js
// 发布的信息详情页面

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postDetail: {},
    //postDetail: {
    // aim_college_name: "对象学院"
    // avatar: "用户头像"
    // college_name: "用户所在学院学院"
    // com_logo: "比赛logo"
    // com_name: "竞赛名字"
    // detail: "帖子详情"
    // level: "比赛等级"
    // likes: 支持量
    // news_id: 帖子id
    // news_remain_time: "剩余展示时间"
    // num_people: "目前人数"
    // post_time: "发表时间"
    // stage: "进展"
    // title: "标题"
    // user_id: "发布者id"
    // user_name: "发布者名字"
    // views: 浏览量
    //}
    ren: "/image/detail_image/ren.png",
    zhuangtai: "/image/detail_image/zhuangtai.png",
    xueyuan: "/image/detail_image/xueyuan.png",
    zhichi: "/image/detail_image/zhichi.png",
    jubao: "/image/detail_image/jubao.png",
  },


  ding: function () {
    const _this = this;
    wx.request({
      url: 'https://teaming.malateam.cn/src/likes.php',
      data: {
        news_id: _this.data.postDetail.news_id
      },
      success(res){
        if(res.data.code === 0){
          wx.showToast({
            title: '谢谢支持',
            icon: 'success',
            duration: 2000
          })
        }else{
          console.log('点赞失败');
        }
      }
    })
  },

  jubao: function () {
    wx.showModal({
      title: '提示',
      content: '您确定举报此项目吗？',
      success(res) {
        if (res.confirm) {
          wx.showToast({
            title: '举报成功',
            icon: "success",
            duration: 2000
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 通过帖子id获取帖子的详细信息。(数据库会自动更新浏览量)
   */
  getPostDetail: function(id){
    const _this = this;
    wx.request({
      url: 'https://teaming.malateam.cn/src/post_detail.php',
      data: {
        news_id: id
      },
      success(res){
        //console.log(res);
        if(res.data.code === 0){
          _this.setData({
            postDetail: res.data.data
          })
        }else{
          console.log('获取信息失败');
        }
      }
    })
  },

  /**
   * 通过发布者id查看发布者详细信息
   */
  lookPublisher: function(){
    const _this = this;
    wx.navigateTo({
      url: '/pages/publish/publisher/publisher?publisher_id=' + _this.data.postDetail.user_id,
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPostDetail(options.news_id);
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