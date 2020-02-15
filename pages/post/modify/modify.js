// pages/post/modify/modify.js
// 修改帖子的页面

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collegeList: [], //学院列表

    news_id: 0,
    num_people: 1,
    com_name: '',
    aim_college_id: 1,
    title: '',
    detail: '',
    stage: '',
  },

  /**
   * 自定义组件select绑定的触发事件监听方法，获取下拉列表中选中的值
   */
  getSelection: function (e) {
    if (e.detail.target == 'collegeList') { //如果选择列表中的内容是学院列表
      this.setData({
        aim_college_id: e.detail.data.id //设置被选中的学院
      })
    }
  },

  /**
   * 表单提交
   */
  formSubmit: function (e) {
    // 检验表单信息格式是否正确
    if (e.detail.value.num_people == null || e.detail.value.num_people == '') {
      //此处一个弹框提示
      wx.showToast({
        title: '目前人数不能为空',
        icon: 'none',
        duration: 2500,
      })
    }  else if (e.detail.value.title.length < 1 || e.detail.value.title.length == null) {
      //此处一个弹框提示
      wx.showToast({
        title: '标题不能为空',
        icon: 'none',
        duration: 2500,
      })
    } else if (e.detail.value.detail.length < 1 || e.detail.value.detail.length == null) {
      //此处一个弹框提示
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 2500,
      })
    } else {
      //将表单中的信息提交至服务器，并判断是否提交成功
      this.modifyNews(e.detail.value);
    }
  },

  /**
   * 修改帖子，表单中点击确认按钮时调用此方法。
   * 参数：newsInfo，从表单中获取的发布信息对象。
   * 将信息上传至服务器，并判断是否提交成功
   */
  modifyNews: function (newsInfo) {
    const _this = this;
    wx.request({
      url: 'https://teaming.malateam.cn/src/modify_post.php',
      data: {
        news_id: _this.data.news_id,
        title: newsInfo.title, //信息标题
        num_people: newsInfo.num_people, //目前人数
        aim_college: _this.data.aim_college_id, //意向学院id
        detail: newsInfo.detail, //需求详情
        stage: (newsInfo.stage == '' || newsInfo.stage == null) ? '准备中' : newsInfo.stage //进展
      },
      //请求参数传送方式
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success(res) {
        //console.log(res); //测试输出
        if (res.data.code === 0) {          
          //此处一个弹框提示（提示用户信息更新成功）
          wx.showModal({
            title: 'success',
            content: '修改成功',
            showCancel: false, //不显示取消按钮，只能确定
            success(res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          }) //
        } else {
          //此处一个弹框提示（提示用户信息发布失败）
          wx.showModal({
            title: 'fail',
            content: '修改失败',
            showCancel: false, //不显示取消按钮，只能确定
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
  onLoad: function (options) {
    var post = JSON.parse(options.post);
    this.setData({
      collegeList: app.globalData.collegeList,
      news_id: post.news_id,
      num_people: post.num_people,
      com_name: post.com_name,
      aim_college_id: post.aim_college_id,
      title: post.title,
      detail: post.detail,
      stage: post.stage,
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