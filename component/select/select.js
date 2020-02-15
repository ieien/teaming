// 下拉框组件js，

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    // 要显示的数据：对象数组，[{id, name}, {}, ...]
    propArray: {
      type: Array,
    },
    // 要显示的目标，值建议设为调用组件时传过来的数组名(propArray属性的数组名)
    target: {
      type: String,
    },

  },

  /**
   * 组件的私有数据
   */
  data: {
    down_img:"/image/add_page/down.png",
    selectShow: false,//初始option不显示
    nowText: "请选择",//初始内容
    animationData: {}//右边箭头的动画
  },

  /**
   * 声明周期函数
   */
  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached: function () {

    } 
  },


  /**
   * 组件的方法列表
   */
  methods: {

    //option的显示与否
    selectToggle: function () {
      var nowShow = this.data.selectShow;//获取当前option显示的状态
      //创建动画
      var animation = wx.createAnimation({
        timingFunction: "ease"
      })
      this.animation = animation;
      if (nowShow) {
        animation.rotate(0).step();
        this.setData({
          animationData: animation.export()
        })
      } else {
        animation.rotate(180).step();
        this.setData({
          animationData: animation.export()
        })
      }
      this.setData({
        selectShow: !nowShow
      })
    },

    //设置内容和触发事件
    setText: function (e) {

      var nowData = this.properties.propArray;//当前option的数据是引入组件的页面传过来的，所以这里获取数据只有通过this.properties
      var nowIdx = e.target.dataset.index;//当前点击的索引
      var nowText = nowData[nowIdx].name;//当前点击的内容
      //再次执行动画，注意这里一定，一定，一定是this.animation来使用动画
      this.animation.rotate(0).step();
      this.setData({
        selectShow: false,
        nowText: nowText,
        animationData: this.animation.export()
      });

      //自定义组件触发事件，参数：事件名、detail对象、事件选项。提供给页面监听此组件使用
      var myEventDetail = {  // detail对象，提供给事件监听函数
        index: nowIdx,  //当前数组索引
        data: nowData[nowIdx],  //当前数组中选中的对象
        target: this.properties.target  //当前数组表示的目标
      };
      var myEventOption = {}; // 触发事件的选项
      this.triggerEvent('beSelection', myEventDetail, myEventOption);
    }

  }


})