// component/notice/notice.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /** post: {
     *   avatar：用户头像、
     *   user_name：名字、
     *   college_name：学院，
     *   com_logo：比赛图标、
     *   com_name：名字、
     *   level：等级，
     *   news_id：消息id、
     *   title：标题、
     *   detail：详情、
     *   post_time：时间、
     *   views：浏览量、
     *   likes：支持量
     *  }
     */
    post: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: "flex",
    scrollTop: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    detail() {
      wx.navigateTo({
        url: '/pages/detail/index?news_id=' + this.properties.post.news_id,
      })
    },

  }
})