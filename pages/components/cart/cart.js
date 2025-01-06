Page({
  data: {
    cartData: [], // 购物车商品数据
    totalPrice: 0 // 总价
  },

  onLoad(options) {
    if (options.cartData) {
      const cartData = JSON.parse(options.cartData);
      console.log("Cart Data:", cartData); // 调试数据
      this.setData({
        cartData: cartData
      });
      this.calculateTotal();
    }
  },

  // 计算总价
  calculateTotal() {
    let total = 0;
    this.data.cartData.forEach(item => {
      const price = parseFloat(item.price) || 0; // 确保 price 是数值
      const count = parseInt(item.count, 10) || 0; // 确保 count 是整数
      total += price * count;
    });
    this.setData({
      totalPrice: total.toFixed(2) // 保留两位小数
    });
  },

  // 增加商品数量
  increaseCount(e) {
    const id = e.currentTarget.dataset.id;
    const updatedCartData = this.data.cartData.map(item => {
      if (item.id === id) {
        item.count = parseInt(item.count || 0, 10) + 1; // 确保 count 是有效数值
      }
      return item;
    });
    this.setData({
      cartData: updatedCartData
    });
    this.calculateTotal();
  },

  // 减少商品数量
  decreaseCount(e) {
    const id = e.currentTarget.dataset.id;
    const updatedCartData = this.data.cartData.map(item => {
      if (item.id === id) {
        item.count = Math.max(parseInt(item.count || 0, 10) - 1, 1); // 最低为1
      }
      return item;
    });
    this.setData({
      cartData: updatedCartData
    });
    this.calculateTotal();
  },

  // 删除商品
  removeItem(e) {
    const id = e.currentTarget.dataset.id;
    const updatedCartData = this.data.cartData.filter(item => item.id !== id);
    this.setData({
      cartData: updatedCartData
    });
    this.calculateTotal();
  },

  // 结算按钮
  checkout() {
    wx.showToast({
      title: '因平台规则及相关法规，本小程序没有支付功能',
      icon: 'none',
      duration: 5000
    });
  }
});
