//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls: [
      '/images/snack1.jpg',
      '/images/snack2.jpg',
      '/images/snack3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    navItems:[
      {
        name:'可选商品',
        url:'variety'
      },
      {
        name:'直连商家',
        url:'talk',
        isSplot:true
      },
      {
        name:'智能助理',
        url:'qianfan'
      },
      {
        name:'购物结算',
        url:'cart'
      },
      {
        name:'我的室友',
        url:'demo1',
        isSplot:true
      },
      {
        name:'作者信息',
        url:'info',
      }
    ]
  },
  onLoad: function () {
    console.log('onLoad')
  }
    
})
