// pages/user/updateUserInfo/updateUserInfo.js
// 用户注册或更新信息的页面 

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

    avatar: '', //获取到的微信头像
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 更新用户信息。参数：userInfoForm，从表单中获取的用户信息对象
   * 将发布的信息上传至服务器，并判断是否提交成功
   */
  updateUserInfo: function (userInfoForm) {
    console.log(userInfoForm);
    const _this = this;
    wx.request({
      url: 'https://teaming.malateam.cn/src/update_user_info.php',
      data: {
        is_sign_up: this.data.is_sign_up, //注册信息 or 更新信息
        openid: app.globalData.openid,    //用户openid
        userName: userInfoForm.userName,  //用户姓名
        avatar: _this.data.avatar,  //头像
        sex: userInfoForm.sex,   //性别
        grade: userInfoForm.grade,  //年级
        college: userInfoForm.college,  //学院
        experience: userInfoForm.experience,  //经历（比赛）
        qq: userInfoForm.qq, //qq
        weixin: userInfoForm.weixin, //微信
        tel: userInfoForm.tel, //电话
        introduction: userInfoForm.introduction  //个人简介
      },
      //请求参数传送方式
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success(res) {
        // 服务器端更新成功，此处更新全局变量
        if (res.data.code === 0) { 
          app.globalData.userInfo.userName = userInfoForm.userName;
          app.globalData.userInfo.avatar = _this.data.avatar;
          app.globalData.userInfo.sex = userInfoForm.sex;
          app.globalData.userInfo.grade = userInfoForm.grade;
          app.globalData.userInfo.college = userInfoForm.college;
          app.globalData.userInfo.experience = userInfoForm.experience;
          app.globalData.userInfo.qq = userInfoForm.qq;
          app.globalData.userInfo.weixin = userInfoForm.weixin;
          app.globalData.userInfo.tel = userInfoForm.tel;
          app.globalData.userInfo.introduction = userInfoForm.introduction;
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
          //此处一个弹框提示（提示用户信息更新失败）
          wx.showModal({
            title: 'fail',
            content: '消息更新失败',
            showCancel: false, //不显示取消按钮，只能确定
          }) //
        }
      },//success
    })//wx.request
  },

  /**
   * 表单提交
   */
  formSubmit: function (e) {
    //检验表单数据是否合法
    if (e.detail.value.userName.length < 2 || e.detail.value.userName.length == null){
      //此处一个弹框提示
      wx.showToast({
        title: '昵称长度要在2-10之间',
        icon: 'none',
        duration: 2500,
      }) 
    } else if (e.detail.value.sex == null || e.detail.value.grade == null || e.detail.value.sex == '' || e.detail.value.grade == ''){
      //此处一个弹框提示
      wx.showToast({
        title: '性别和年级不能为空',
        icon: 'none',
        duration: 2500,
      }) 
    } else if ((e.detail.value.qq == '' || e.detail.value.qq == null) && (e.detail.value.weixin == '' || e.detail.value.weixin == null) && (e.detail.value.tel == '' || e.detail.value.tel == null)){
      //此处一个弹框提示
      wx.showToast({
        title: 'QQ、微信、电话至少填一项',
        icon: 'none',
        duration: 2500,
      }) 
    } else{
      //将表单中的信息提交至服务器，并判断是否提交成功
      this.updateUserInfo(e.detail.value);
    }
  },

  /**
   * 普通选择器触发事件，选择改变时自动触发改变e.detail.value的值
   */
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  /**
   * 获取用户微信头像
   */
  getUserAvatar: function (e) {
    this.setData({
      avatar: e.detail.userInfo.avatarUrl,
    })
    console.log(this.data.avatar);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从全局变量中获取学院数据,及其他参数
    //var app = getApp();
    this.setData({
      collegeList: app.globalData.collegeList,
      userInfo: app.globalData.userInfo,
      avatar: app.globalData.userInfo.avatar,
      is_sign_up: options.is_sign_up, //注册信息或更新信息
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