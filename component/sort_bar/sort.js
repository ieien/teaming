// component/sort.js
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
    currentSelect:"NCHU",
    currentindex:-1,
    left: 0,
    nav_list:[
      {
        text: "材料科学与工程学院",
        image:"../../image/cl.png",
       "url": "",
       },
      {
        text:"信息工程学院",
        image: "../../image/xg.png",
        "url": "",},
      {
        text: " 数学与信息科学学院",
        image: "../../image/sx.png",
        "url": "",
      },
      {
        text: "体育学院",
        image: "../../image/ty.png",
        "url": "",
      },
      {
        text:"软件学院",
        image: "../../image/rj.png",
        "url": "",},
      {
        text: "环境与化学工程学院",
        image: "../../image/hh.png",
        "url": "",
      },
      {
        text: "外国语学院",
        image: "../../image/wy.png",
        "url": "",
      },
      {
        text: "测试与光电工程学院",
        image: "../../image/cg.png",
        "url": "",
      },
      {
        text: "土木建筑学院",
        image: "../../image/tm.png",
        "url": "",
      },
      {
        text: "文法学院",
        image: "../../image/wf.png",
        "url": "",
      },
      {
        text: "国际教育学院",
        image: "../../image/gj.png",
        "url": "",
      },
      {
        text: "航空制造工程学院",
        image: "../../image/hz.png",
        "url": "",
      },
      {
        text: "飞行器工程学院",
        image: "../../image/fxq.png",
        "url": "",
      },
      {
        text: "经济管理学院",
        image: "../../image/jg.png",
        "url": "",
      },
      {
        text: "艺术与设计学院",
        image: "../../image/ys.png",
        "url": "",
      },
      {
        text: "音乐学院",
        image: "../../image/yy.png",
        "url": "",
      },
      {
        text: "通航学院",
        image: "../../image/th.png",
        "url": "",
      }
      ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    activeNav(e){
    this.setData(
      // console.log(e.currentTarget.dataset.index)
     {currentindex:e.currentTarget.dataset.index,
      currentSelect:"",
     }
      )
    },
    selectNCHU: function (e) {
      this.setData({
        currentSelect: e.currentTarget.dataset.id,
        currentindex:-1,
      })
    },
    college() {
      wx.navigateTo({
        url: '/pages/college/index/index',
      })
    },
  }
})
