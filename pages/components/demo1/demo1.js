Page({
  data: {
    photos: [
      { id: 1, url: 'cloud://test1-3gsvd4o39769272a.7465-test1-3gsvd4o39769272a-1333758115/image/0001.jpg' },
      { id: 2, url: 'cloud://test1-3gsvd4o39769272a.7465-test1-3gsvd4o39769272a-1333758115/image/0002.jpg' },
      { id: 3, url: 'cloud://test1-3gsvd4o39769272a.7465-test1-3gsvd4o39769272a-1333758115/image/0003.jpg' },
      { id: 4, url: 'cloud://test1-3gsvd4o39769272a.7465-test1-3gsvd4o39769272a-1333758115/image/0004.jpg' }
      
    ],
    currentIndex: 0
  },

  onLoad: function () {
    // 页面加载时的逻辑
  },

  changeSwiper: function (e) {
    // 更新当前显示的图片索引
    this.setData({
      currentIndex: e.detail.current
    });
  }
});
