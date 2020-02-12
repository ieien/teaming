// pages/college/index/index.js
// 学院详情

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,   //学院id
    college: '', //学院名字
    logo: '',  //学院logo
    back_img: "/image/college/back_img.jpg",

    collegeList: [], 

    page: 1, //页数，首页要展示的帖子的数量，1页10个帖子
    haveMore: true, //表示还有更多数据（还可上拉页面）
    postList: [], //帖子列表
  },

  //跳转到学院比赛页面
  getIntoCompetition: function () {
    var id = this.data.id;
    var name = this.data.college;
    var logo = this.data.logo;
    wx.navigateTo({
      url: '/pages/college/competition/index/index?id='+id+'&name='+name+'&logo='+logo
    })
  },

  /**
   * 从全局变量中获取学院列表
   */
  getCollegeList: function(){
    this.setData({
      collegeList: app.globalData.collegeList
    })
  },

  /**
   * 从学院列表中获取当前学院
   */
  getCollege: function(index){
    var prevCollege = this.data.collegeList[index];
    //console.log(prevCollege.logo);//测试输出
    this.setData({
      id: prevCollege.id,
      college: prevCollege.name,
      logo: prevCollege.logo
    })
  },

  /**
   * 分页获取帖子（获取当前学院内用户发表的帖子）
   */
  getPosts: function () {
    const _this = this;
    wx.request({
      url: 'https://teaming.malateam.cn/src/find_posts_in_college.php',
      data: {
        page: _this.data.page, //页数
        college_id: _this.data.id  //学院id
      },
      success(res) {
        //console.log(res.data.data);
        // 状态码为0，请求数据成功
        if (res.data.code === 0) {
          var addPosts = _this.data.postList;
          addPosts = addPosts.concat(res.data.data);
          //console.log("addPosts");
          //console.log(addPosts);
          _this.setData({
            postList: addPosts
          })
          // 状态码为3，没有更多数据了
        } else if (res.data.code === 3) {
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
    //console.log("当前索引---index："+options.index);
    this.getCollegeList();
    this.getCollege(options.index);
    this.getPosts();
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
    if (this.data.haveMore) {
      //加载更多的帖子
      var _page = this.data.page + 1;
      this.setData({
        page: _page
      })
      this.getPosts();
    } else {
      console.log('没有更多的信息了');
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },



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
  }
})