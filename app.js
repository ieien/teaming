//app.js
App({
  /**
   * 小程序的全局变量
   */
  globalData: {
    //appid: '',  //小程序id
    //secret: '', //密钥
    openid: '', //用户的openid
    //用户详细信息
    userInfo: {
      userName: '',  //用户姓名
      sex: '',   //性别
      grade: '',  //年级
      college: '',   //学院
      experience: '',  //经历（比赛）
      qq: '', //qq
      weixin: '', //微信
      tel: '', //电话
      introduction: ''  //个人简介
    },
    //学院列表，对象数组，[{id, name, logo}, {} ...]
    collegeList: null,  
    //是否已经注册，网络延迟原因，检测到用户已注册后更新此值有延迟（时间大于页面onLoad）
    isRegistered: false
  },

  /**
   * 自动登录，并设置全局变量
   */
  autoLogin: function () {
    var that = this;
    //获取用户登陆凭证
    wx.login({
      success(res) {
        //测试输出
        //console.log("登陆凭证：\n");
        //console.log(res);
        if (res.code) {
          //通过登陆凭证获取用户openid，并检查用户是否存在，若不存在则跳转更新信息页面
          wx.request({
            url: 'https://teaming.malateam.cn/src/login.php',
            data: {
              code: res.code
            },
            success(res) {
              //console.log("openid:\n");   //测试输出
              //console.log(res);
              //设置全局变量openid
              that.globalData.openid = res.data.data.openid;
              //console.log(that.globalData);
              //如果查询到用户信息
              if (res.data.code === 0) {
                //设置全局变量-用户信息
                that.globalData.userInfo.userName = res.data.data.userInfo.user_name;
                that.globalData.userInfo.sex = res.data.data.userInfo.sex;
                that.globalData.userInfo.grade = res.data.data.userInfo.grade;
                that.globalData.userInfo.college = res.data.data.userInfo.college_name;
                that.globalData.userInfo.experience = res.data.data.userInfo.experience;
                that.globalData.userInfo.qq = res.data.data.userInfo.qq;
                that.globalData.userInfo.weixin = res.data.data.userInfo.weixin;
                that.globalData.userInfo.tel = res.data.data.userInfo.tel;
                that.globalData.userInfo.introduction = res.data.data.userInfo.user_introduction;
                that.globalData.isRegistered = true;
                //测试输出
                console.log(that.globalData.userInfo);
                //若用户还没注册
              } else {
                //此处一个弹框提示（提示用户先完善信息），再跳转到完善信息界面
                wx.showModal({
                  title: '欢迎来到Teaming',
                  content: '您还未注册哦，先去完善信息吧',
                  showCancel: false,  //不显示取消按钮，只能确定
                  success(res) {
                    if (res.confirm) {
                      //console.log('用户点击确定')
                      //跳转到完善信息界面
                      wx.navigateTo({
                        url: '/pages/user/updateUserInfo/updateUserInfo?id=1&is_sign_up=true',
                      })
                    } 
                  }
                })//
              }
            }//success
          })//wx.request

        } else {
          //此处应为弹框提示
          console.log('登录失败！' + res.errMsg)
        }
      }//wx.login.success
    })//wx.login

  },

  /**
   * 从服务器中获取学院数据
   */
  getCollegeList: function () {
    var that = this;
    wx.request({
      url: 'https://teaming.malateam.cn/src/college.php',
      success: res => {
        // 测试输出
        // console.log("cllege\n");
        // console.log(res);
        //状态码为零，表示成功取得数据
        if (res.data.code === 0) {
          that.globalData.collegeList = res.data.data;
          //console.log(that.globalData.collegeList); //测试输出
        } else {
          console.log("学院数据获取失败");
        }
        // 由于 getCollegeList 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (that.collegeListReadyCallback) {
          that.collegeListReadyCallback(res)
        }
      }
    })
  },




  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function (options) {
    this.autoLogin();
    this.getCollegeList();
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }

})