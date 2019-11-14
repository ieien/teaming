// component/notice/notice.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    show: "flex",
    scrollTop: 0,
    number: [{}, {}, {}, {}],
    Title: "ACM诚心交友",
    date_time: "2019-09-04",
    user_image: "../../image/user_image.jpg",
    game_image: "../../image/acm.jpg",
    content: "我从来不曾抗拒你的魅力,虽然你从来不曾对我著迷,我总是微笑的看著你,我的情意总是轻易就洋溢眼底，啦啦啦~~~",
    username: "陈起涛",
    college: "软件学院",
    c_name: "ACM",
    level: "国家二等",

    //测试数据
    //result: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    detail() {
      wx.navigateTo({
        //  url:'../test/index',
        url: '/pages/detail/index',
      })
    },
    
  }
})
