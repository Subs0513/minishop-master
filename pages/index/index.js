//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    imgUrls: [
      'cloud://test1-3gsvd4o39769272a.7465-test1-3gsvd4o39769272a-1333758115/image/115129hraplm5jyirwmffz.jpg',
      'cloud://test1-3gsvd4o39769272a.7465-test1-3gsvd4o39769272a-1333758115/image/001.jpg',
      'cloud://test1-3gsvd4o39769272a.7465-test1-3gsvd4o39769272a-1333758115/image/008bKhBGly1he9dscu2znj31hc0u01ad.jpg'
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
