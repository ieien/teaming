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
    //当前数组索引
    currentindex: -1,
  },

  /**
   * 组件的方法列表
   */
  methods: {

    //获取被选择的学院的数组下标
    // activeNav(e){
    //   //console.log(e)
    //   this.setData({
    //     currentindex: e.currentTarget.dataset.index,
    //   })
    //   console.log("当前索引  "+ this.data.currentindex)
    // },

    //跳转到主页
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

  }//methods

})
