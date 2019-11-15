// pages/user/updateUserInfo/updateUserInfo.js
// 用户注册和更新信息的页面 

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, //个人信息
    collegeList: [], //学院列表
    index: 0, //学院列表中所选学院的下标
    is_sign_up: false,  //注册信息还是更新信息,true表示注册
  },

  /**
   * 更新用户信息（将用户信息上传至服务器）
   */
  updateUserInfo: function (userInfo) {
    //var that = this;
    //var app = getApp(); //获取全局实例对象

    wx.request({
      url: 'https://teaming.malateam.cn/src/update_user_info.php',
      data: {
        is_sign_up: this.data.is_sign_up, //注册信息 or 更新信息
        openid: app.globalData.openid,    //用户openid
        userName: userInfo.userName,  //用户姓名
        sex: userInfo.sex,   //性别
        grade: userInfo.grade,  //年级
        college: userInfo.college,  //学院
        experience: userInfo.experience,  //经历（比赛）
        qq: userInfo.qq, //qq
        weixin: userInfo.weixin, //微信
        tel: userInfo.tel, //电话
        introduction: userInfo.introduction  //个人简介
      },
      //请求参数传送方式
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success(res) {
        console.log("更新请求成功");
        console.log(res);  //测试输出
        if (res.data.code === 0) { //服务器端更新成功，此处更新全局变量
          app.globalData.userInfo.userName = userInfo.userName;
          app.globalData.userInfo.sex = userInfo.sex;
          app.globalData.userInfo.grade = userInfo.grade;
          app.globalData.userInfo.college = userInfo.college;
          app.globalData.userInfo.experience = userInfo.experience;
          app.globalData.userInfo.qq = userInfo.qq;
          app.globalData.userInfo.weixin = userInfo.weixin;
          app.globalData.userInfo.tel = userInfo.tel;
          app.globalData.userInfo.introduction = userInfo.introduction;
          app.globalData.isRegistered = true;
          //此处一个弹框提示（提示用户信息更新成功）
          wx.showModal({
            title: 'success',
            content: '信息更新成功',
            showCancel: false,  //不显示取消按钮，只能确定
            success(res) {
              //console.log(getCurrentPages());
              if (res.confirm) { //console.log('用户点击确定')
                //跳转转回上个页面
                wx.navigateBack({
                  delta: 1
                })
              } 
            }
          })//
        } else {
          console.log("信息更新失败");
        }
      },//success
      //调用失败
      fail(res) {

      }
    })//wx.request
  },

  /**
   * 表单提交
   */
  formSubmit: function (e) {
    //测试输出
    //console.log('form发生了submit事件，携带数据为：', e.detail.value);
    //将表单中的信息提交至服务器，并判断是否提交成功
    //console.log("开始更新信息");
    this.updateUserInfo(e.detail.value);

  },

  /**
   * 表单重置
   */
  formReset: function () {
    //测试输出
    //console.log('form发生了reset事件')
  },
  //普通选择器触发事件，选择改变时自动触发改变e.detail.value的值
  bindPickerChange: function (e) {
    //测试输出
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //从全局变量中获取学院数据,及其他参数
    //var app = getApp();
    this.setData({
      collegeList: app.globalData.collegeList,
      is_sign_up: options.is_sign_up, //调用此页面传过来的参数（注册信息或更新信息）
    })

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