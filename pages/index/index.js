//index.js
//小程序主页

const app = getApp();

Page({
  data: {
    collegeList: [],   //学院列表
  },
  
  /**
   * 从全局变量获取学院列表
   */
  getCollegeList: function(){
    if (app.globalData.collegeList){
      this.setData({
        collegeList: app.globalData.collegeList
      })
    }else{
      // 由于 app.getCollegeList 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况。
      app.collegeListReadyCallback = res => {
        //console.log(res);
        this.setData({
          collegeList: res.data.data,
        })
      }
    }
    
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log("onLoad");
    this.getCollegeList();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //console.log("onReady");
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   // console.log("onShow");
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //console.log("onHide");

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    //console.log("onUnload");

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


  // 滑动监听
  onPageScroll: function (ev) {
    var _this = this;
    var _down = true;
    var _up = false;
    if (ev.scrollTop <= 0) {
      ev.scrollTop = 0;
    } else if (ev.scrollTop > wx.getSystemInfoSync().windowHeight) {
      ev.scrollTop = wx.getSystemInfoSync().windowHeight;
    }
    //判断浏览器滚动条上下滚动
    if (ev.scrollTop > this.data.scrollTop || ev.scrollTop == wx.getSystemInfoSync().windowHeight) {
      _this.setData({ show: "none" });
      //  console.log("down  " + ev.scrollTop + "   " + _this.data.show);   
    }
    else {      //向上滚动
      _this.setData({ show: "flex" });
      // console.log("up  " + ev.scrollTop + "  " + _this.data.show);
    }    //给scrollTop重新赋值
    setTimeout(function () {
      _this.setData({
        scrollTop: ev.scrollTop
      })
    }, 0)
  },

  /**
   * 页面触底时执行
   */
  onReachBottom: function () {
    
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})
