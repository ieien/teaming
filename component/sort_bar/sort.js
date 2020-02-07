// component/sort.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 要显示的数据：对象数组，[{id, name, logo}, {}, ...]
    collegeList: {
      type: Array
    },
    // 要显示的目标，值建议设为调用组件时传过来的数组名(propArray属性的数组名)
    //target: {
      //type: String,
   // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //currentSelect:"NCHU",
    currentindex: -1,
    //left: 0,
    //nav_list: []
  },

  /**
   * 组件的方法列表
   */
  methods: {

    //获取被选择的学院的数组下标
    activeNav(e){
      //console.log(e)
      this.setData({
        currentindex: e.currentTarget.dataset.index,
      })
      console.log("当前索引  "+ this.data.currentindex)
    },

    //跳转到主页
    selectNCHU: function (e) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    },

    //监听点击事件，然后关闭当前页面，跳转到另一学院页面
    college: function(e) {
      var index = this.data.currentindex; //当前下标
      var college = this.properties.collegeList; //学院列表
      var beSelectCollege = college[index]; //被选择的学院
      console.log(beSelectCollege.id +" "+ beSelectCollege.name); //测试输出
      wx.navigateTo({
        url: '/pages/college/index/index?index={{this.data.currentindex}}',
      })
    },

  }//methods

})
