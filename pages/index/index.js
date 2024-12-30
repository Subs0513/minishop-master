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
        name:'查询',
        url:'variety'
      },
      {
        name:'通信',
        url:'talk',
        isSplot:true
      },
      {
        name:'信息',
        url:'info',
      },
      {
        name:'智能助理',
        url:'qianfan'
      },
      {
        name:'预留3',
        url:'',
        isSplot:true
      },
      {
        name:'预留4',
        url:''
      }
    ]
  },
  onLoad: function () {
    console.log('onLoad')
  }
    
})
