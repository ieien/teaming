// component/Title/Title.js
// 主页图片滚动图

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
    inputShowed: false,
    inputVal: "",
    imgUrls: [
      '../../image/000.jpg',
      '../../image/111.jpg',
      '../../image/222.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  

  /**
   * 组件的方法列表
   */
  methods: {
  
  }
})
