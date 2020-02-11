// pages/college/competition/index/index.js
// 学院比赛列表页面
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0, //学院id
    college_logo: "", //学院logo
    college: "", //学院名字
    content1: "下面是该学院推荐的比赛项目",
    content2: "The following are the recommended competitionsfor the college",
    competitionList: [] //比赛对象数组
    // {
    //   id: 0,
    //   logo: "/image/detail_image/bisai.png",
    //   name: "美国大学生程序设计大赛",
    // }
  },

  detail: function(e) {
    //获取选择的比赛id
    var com_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/college/competition/detail/detail?id='+com_id,
    })
  },

  /**
   * 获取页面路径中的参数
   */
  getUrlParameter: function(options){
    this.setData({
      id: options.id,
      college: options.name,
      college_logo: options.logo
    })
  },

  /**
   * 获取当前学院的所有比赛
   */
  getCompetitions: function(){
    var _this = this;
    wx.request({
      url: 'https://teaming.malateam.cn/src/competition.php',
      data: {
        college: _this.data.college
      },
      success(res) {
        //console.log(res.data); // 测试输出
        //状态码为零，表示成功取得数据
        if (res.data.code === 0) {
          _this.setData({
            competitionList: res.data.data,
          })
          //console.log(_this.data.competitionList); //测试输出
        } else {
          //此处一个弹框提示（提示用户学院数据获取失败）
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
    this.getUrlParameter(options);
    this.getCompetitions();
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