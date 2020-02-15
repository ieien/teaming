// pages/college/competition/detail/detail.js
// 比赛详情页面

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,   //竞赛id
    name: "",  //竞赛名字
    level: "",  //竞赛等级
    content: "",  //竞赛内容简介
    logo: "",  //竞赛logo

    page: 1, //页数，首页要展示的帖子的数量，1页10个帖子
    haveMore: true, //表示还有更多数据（还可上拉页面）
    postList: [], //帖子列表

    bagImg: "/image/game/game_background/computer_usa.jpg",
    
    userImg1: "/image/home.png",
    userImg2: "/image/home.png",
  },

  /**
   * 通过竞赛id获取竞赛详情
   */
  getCompetitionDetail: function(_id){
    const _this = this;
    wx.request({
      url: 'https://teaming.malateam.cn/src/competitionDetail.php',
      data: {
        id: _id
      },
      success(res) {
        //console.log(res.data); // 测试输出
        //状态码为零，表示成功取得数据
        if (res.data.code === 0) {
          _this.setData({
            id: _id,   //竞赛id
            name: res.data.data.name,  //竞赛名字
            level: res.data.data.level,  //竞赛等级
            content: res.data.data.content,  //竞赛内容简介
            logo: res.data.data.logo,  //竞赛logo
          })
          //console.log(_this.data.competitionList); //测试输出
        } else {
          //此处一个弹框提示（提示用户获取信息失败）
          wx.showModal({
            title: 'fail',
            content: '查询失败',
            showCancel: false, //不显示取消按钮，只能确定
            success(res) {
            }
          }) //
        }
      }
    })
  },

  /**
   * 分页获取帖子（获取当前比赛的帖子）
   */
  getPosts: function () {
    const _this = this;
    wx.request({
      url: 'https://teaming.malateam.cn/src/find_posts_in_competition.php',
      data: {
        page: _this.data.page, //页数
        com_id: _this.data.id  //比赛id
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
    this.setData({
      id: options.id
    })
    this.getCompetitionDetail(options.id);
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
    this.setData({
      page: 1, //页数，首页要展示的帖子的数量，1页10个帖子
      haveMore: true, //表示还有更多数据（还可上拉页面）
      postList: [], //帖子列表
    })
    this.getPosts();
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

  }
})