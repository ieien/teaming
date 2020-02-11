// pages/detail/index.js
// 发布的信息详情页面

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "天梯赛在线找队友",
    bisai: "../../image/detail_image/bisai.png",
    touxiang: "../../image/detail_image/touxiang.png",
    name: "李路雨",
    grade: "17级-软件学院",
    match: "天梯赛",
    matchtype: "国家B类",
    ren: "../../image/detail_image/ren.png",
    zhuangtai: "../../image/detail_image/zhuangtai.png",
    xueyuan: "../../image/detail_image/xueyuan.png",
    number: "2",
    state: "还在找指导老师",
    college: "软件学院",
    content_expression: "碗大宽无影不想给你机会先别怼就散了吧听完这首歌就洗洗睡我这一生漂泊四海 看淡了今朝月高高的挂无暇人生能有几次机会啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊相聚甚是少情谊别轻易放啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊掉门前雨落下我浪迹天涯有儿女情长悲欢离合呀一声笑啊啊啊啊啊傲江湖闯江湖分出胜负你看这个面它又又宽就像这个碗它又大又圆你看这个面它又长又宽就像这个碗它又大啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊又圆",
    time: "2019-10-12",
    zhichi: "../../image/detail_image/zhichi.png",
    jubao: "../../image/detail_image/jubao.png",
    text: "../text/text1",
  },


  ding: function () {
    wx.showToast({
      title: '谢谢支持',
      icon: 'success',
      duration: 2000
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