//index.js
//小程序主页

const app = getApp();

Page({
  data: {
    collegeList: [],   //学院列表
    page: 1, //页数，首页要展示的帖子的数量，1页10个帖子
    haveMore: true, //表示还有更多数据（还可上拉页面）
    postList: [], //帖子列表
    // postList: [{
    //   avatar：用户头像、
    //   user_name：名字、
    //   college_name：学院，
    //   com_logo：比赛图标、
    //   com_name：名字、
    //   level：等级，
    //   news_id：消息id、
    //   title：标题、
    //   detail：详情、
    //   post_time：时间、
    //   views：浏览量、
    //   likes：支持量
    // }]
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
        this.setData({
          collegeList: res.data.data,
        })
      }
    }
    
  },

  /**
   * 分页获取帖子
   */
  getPosts: function(){
    const _this = this;
    wx.request({
      url: 'https://teaming.malateam.cn/src/find_posts_in_homepage.php',
      data: {
        page: _this.data.page //页数
      },
      success(res){
        //console.log(res.data.data);
        // 状态码为0，请求数据成功
        if(res.data.code === 0){
          var addPosts = _this.data.postList;
          addPosts = addPosts.concat(res.data.data);
          //console.log("addPosts");
          //console.log(addPosts);
          _this.setData({
            postList: addPosts
          })
        // 状态码为3，没有更多数据了
        } else if (res.data.code === 3){
          _this.setData({
            haveMore: false
          })
        } else {
          // 数据库操作失败
        }
      }//success
    })//request
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollegeList();
    this.getPosts();
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
    this.setData({
      page: 1, //页数，首页要展示的帖子的数量，1页10个帖子
      haveMore: true, //表示还有更多数据（还可上拉页面）
      postList: [], //帖子列表
    })
    this.getPosts();
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

    if(this.data.haveMore){
      //加载更多的帖子
      var _page = this.data.page + 1;
      this.setData({
        page: _page
      })
      this.getPosts();
    }else{
      console.log('没有更多的信息了');
    }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})
