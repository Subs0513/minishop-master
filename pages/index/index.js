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
        name:'购物车',
        url:'variety'
      },
      {
        name:'直连商家',
        url:'talk',
        isSplot:true
      },
      {
        name:'作者信息',
        url:'info',
      },
      {
        name:'智能助理',
        url:'qianfan'
      },
      {
        name:'预留空位',
        url:'',
        isSplot:true
      },
      {
        name:'预留空位',
        url:''
      }
    ]
  },
  onLoad: function () {
    console.log('onLoad')
  }
    
})
