// pages/publish/add/add.js
// 发布信息页面js
var util = require('../../../utils/util.js'); //导入时间工具
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    competitionList: [], //比赛列表
    collegeList: [], //学院列表
    beSelectCompetition: {}, //被选中的比赛
    beSelectCollege: {} //被选中的意向学院
  },

  /**
   * 从全局变量中获取学院数据，
   * 从数据库中获取用户所属学院的所有比赛
   */
  getCompetition: function() {
    //先判断用户是否注册了
    //console.log(app.globalData.isRegistered);
    if (app.globalData.isRegistered == true) {
      var _this = this;
      wx.request({
        url: 'https://teaming.malateam.cn/src/competition.php',
        data: {
          college: app.globalData.userInfo.college
        },
        success(res) {
          //console.log(res.data); // 测试输出
          //状态码为零，表示成功取得数据
          if (res.data.code === 0) {
            _this.setData({
              competitionList: res.data.data,
              collegeList: app.globalData.collegeList
            })
            //console.log(_this.data.competitionList); //测试输出
          } else {
            console.log("学院数据获取失败");
          }
        }
      })
    } else { //若没有注册，则跳转信息完善页面注册
      //此处一个弹框提示（提示用户先完善信息），再跳转到完善信息界面
      wx.showModal({
        title: 'SORRY',
        content: '发布信息前一定要先完善自己的信息哦',
        showCancel: false, //不显示取消按钮，只能确定
        success(res) {
          if (res.confirm) {
            //console.log('用户点击确定')
            //跳转到完善信息界面
            wx.navigateTo({
              url: '../../user/updateUserInfo/updateUserInfo?id=1&is_sign_up=true',
            })
          }
        }
      }) //
    }
  },

  /**
   * 自定义组件select绑定的触发事件监听方法，获取下拉列表中选中的值
   */
  getSelection: function(e) {
    //console.log(e);
    if (e.detail.target == 'competitionList') { //如果选择列表中的内容是比赛列表
      this.setData({
        beSelectCompetition: e.detail.data //设置被选中的比赛
      })
    } else if (e.detail.target == 'collegeList') { //如果选择列表中的内容是学院列表
      this.setData({
        beSelectCollege: e.detail.data //设置被选中的学院
      })
    }
  },

  /**
   * 表单提交
   */
  formSubmit: function(e) {
    //测试输出
    //console.log('form发生了submit事件，携带数据为：', e.detail.value);
    //将表单中的信息提交至服务器，并判断是否提交成功
    //console.log("开始更新信息");
    this.publishNews(e.detail.value)

  },

  /**
   * 发布组队消息，表单中点击确认按钮时调用此方法。参数：newsInfo，从表单中获取的发布信息对象。
   * 将发布的信息上传至服务器，并判断是否提交成功
   */
  publishNews: function(newsInfo) {

    //首先获取当前事件， 调用函数时，传入new Date()参数，返回值是日期
    var nowTime = util.formatDate(new Date());
    const _this = this;
    wx.request({
      url: 'https://teaming.malateam.cn/src/posting.php',
      data: {
        openid: app.globalData.openid, //用户id
        title: newsInfo.title, //信息标题
        post_time: nowTime, //当前日期
        com_id: _this.data.beSelectCompetition.id, //赛事id
        num_people: newsInfo.num_people, //目前人数
        aim_college: _this.data.beSelectCollege.id, //意向学院id
        detail: newsInfo.detail //需求详情
      },
      //请求参数传送方式
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success(res) {
        //console.log(res); //测试输出
        if (res.data.code === 0) { //服务器端更新成功，此处更新全局变量          
          //此处一个弹框提示（提示用户信息更新成功）
          wx.showModal({
            title: 'success',
            content: '消息发布成功',
            showCancel: false, //不显示取消按钮，只能确定
            success(res) {
              //console.log(getCurrentPages());
              if (res.confirm) { //console.log('用户点击确定')
                //跳转转回上个页面
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          }) //
        } else {
          //此处一个弹框提示（提示用户信息更新失败）
          wx.showModal({
            title: 'fail',
            content: '消息发布失败',
            showCancel: false, //不显示取消按钮，只能确定
            success(res) {
            }
          }) //
        }
      }, //success
      //调用失败
      fail(res) {
      }
    }) //wx.request
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getCompetition(); //获取比赛数据
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})