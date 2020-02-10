// pages/college/competition/detail/detail.js
// 比赛详情页面

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,   //竞赛id
    name: "",  //竞赛名字
    level: "",  //竞赛等级
    content: "",  //竞赛内容简介
    logo: "",  //竞赛logo

    bagImg: "/image/game/game_background/computer_usa.jpg",
    
    userImg1: "/image/home.png",
    userImg2: "/image/home.png",
  },

  /**
   * 通过竞赛id获取竞赛详情
   */
  getCompetitionDetail: function(_id){
    const _this = this;
    wx.request({
      url: 'https://teaming.malateam.cn/src/competitionDetail.php',
      data: {
        id: _id
      },
      success(res) {
        //console.log(res.data); // 测试输出
        //状态码为零，表示成功取得数据
        if (res.data.code === 0) {
          _this.setData({
            id: _id,   //竞赛id
            name: res.data.data.name,  //竞赛名字
            level: res.data.data.level,  //竞赛等级
            content: res.data.data.content,  //竞赛内容简介
            logo: res.data.data.logo,  //竞赛logo
          })
          //console.log(_this.data.competitionList); //测试输出
        } else {
          //此处一个弹框提示（提示用户获取信息失败）
          wx.showModal({
            title: 'fail',
            content: '查询失败',
            showCancel: false, //不显示取消按钮，只能确定
            success(res) {
            }
          }) //
        }
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCompetitionDetail(options.id)
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