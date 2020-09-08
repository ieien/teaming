//index.js
//小程序主页
//获取搜索框实例
var WxSearch = require('../../wxSearch/wxSearch.js')
const app = getApp();

Page({
  
  data: {
    inputShowed: false,//这里开始是关于轮播图的js-begin
    inputVal: "",
    imgUrls: [
      '../../image/000.jpg',
      '../../image/111.jpg',
      '../../image/222.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,  //这里开始是关于轮播图的js-end
    //当前数组索引
    currentindex: -1,
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
        wx.stopPullDownRefresh();
      }//success
    })//request
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollegeList();
    this.getPosts();
    console.log('搜索框-onLoad')
    var that = this
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that,45,['数学建模竞赛','三小','微信小程序设计大赛','两岸新锐设计竞赛','全国大学生化工设计竞赛','大学生计算机设计大赛']);
    WxSearch.initMindKeys(['数学建模竞赛','三小','微信小程序设计大赛','两岸新锐设计竞赛','全国大学生化工设计竞赛','大学生计算机设计大赛','市场调查与分析大赛','先进成图技术与产品信息建模大赛','三维数字化创新设计大赛','全国高校钢琴大赛','大学生服务外包创新大赛','大学生计算机设计大赛']);
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
      this.close(); 
    }
    else {      //向上滚动
      _this.setData({ show: "flex" });
      this.open();
      // console.log("up  " + ev.scrollTop + "  " + _this.data.show);
    }    //给scrollTop重新赋值
    setTimeout(function () {
      _this.setData({
        scrollTop: ev.scrollTop
      })
    }, 0)
  },
  wxSearchFn: function(e){
    var that = this
    WxSearch.wxSearchAddHisKey(that);
    
  },
  wxSearchInput: function(e){
    var that = this
    WxSearch.wxSearchInput(e,that);
  },
  wxSerchFocus: function(e){
    var that = this
    WxSearch.wxSearchFocus(e,that);
  },
  wxSearchBlur: function(e){
    var that = this
    WxSearch.wxSearchBlur(e,that);
  },
  wxSearchKeyTap:function(e){
    var that = this
    WxSearch.wxSearchKeyTap(e,that);
  },
  wxSearchDeleteKey: function(e){
    var that = this
    WxSearch.wxSearchDeleteKey(e,that);
  },
  wxSearchDeleteAll: function(e){
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function(e){
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
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

  },
open: function(e){
  var that = this;
  var obj = wx.createSelectorQuery();
  obj.select('.nav_wrap').boundingClientRect(function (rect) {
      //获取内容高度
      var contentHeight = rect.height;
      //创建动画
      var animation = wx.createAnimation();
      that.animation = animation;
      animation.height(contentHeight).step();
      // console.log('slideUp'+contentHeight);
      //设置动画
      that.setData({
          boxAnimation: animation.export(),
          // maskStyle: 'display: block;'
      });
  }).exec();
},
//点击收起
close: function(e){
  //创建动画
  var animation = wx.createAnimation();
  this.animation = animation;
  animation.height(0).step();
  // console.log('slideDown');
  //设置动画
  this.setData({
      boxAnimation: animation.export(),
      // maskStyle: 'display: none;'
  });
},
selectNCHU: function (e) {
  wx.switchTab({
    url: '/pages/index/index',
  })
},

//监听点击事件，然后关闭当前页面，跳转到另一学院页面
clickCollege: function(e) {
  //获取被选择的学院的数组下标
  this.setData({
    currentindex: e.currentTarget.dataset.index,
  })
  //console.log("当前索引  " + this.data.currentindex)//测试输出

  var index = this.data.currentindex; //当前数组下标
  //var college = this.properties.collegeList; //学院列表
  //var beSelectCollege = college[index]; //被选择的学院
  //console.log(beSelectCollege.id +" "+ beSelectCollege.name); //测试输出
  //获取当前页面栈数量
  var pages =  getCurrentPages().length;
  if(pages > 1){ //不是首页的情况
    wx.redirectTo({
      url: '/pages/college/index/index?index=' + index,
    })
  }else{ //是首页的情况
    wx.navigateTo({
      url: '/pages/college/index/index?index=' + index,
    })
  }
}



})
