Page({
  data: {
    navList: [
      { id: 0, name: '热销商品' },
      { id: 1, name: '饼干糕点' },
      { id: 2, name: '糖果坚果' },
      { id: 3, name: '休闲零食' },
      { id: 4, name: '酒水饮料' },
    ],
    varietyList: [
      [
        { name: "郭朝阳", price: 9999, num: 1, id: 999 },
        { name: "杜璟钰", price: 9.9, num: 1, id: 888 },
        { name: "张正澍", price: 888, num: 1, id: 777 },
      ],
      [
        { name: "巧克力饼干", price: 12.5, num: 100, id: 1 },
        { name: "奶油蛋卷", price: 15, num: 50, id: 2 },
        { name: "绿茶饼干", price: 9.9, num: 80, id: 3 },
        { name: "咖啡曲奇", price: 14.5, num: 90, id: 4 },
        { name: "椰奶威化", price: 13, num: 60, id: 5 },
        { name: "盐味苏打饼", price: 8.5, num: 120, id: 6 },
        { name: "奶酪小饼", price: 10.5, num: 90, id: 7 },
        { name: "火腿面包", price: 15.5, num: 30, id: 8 },
        { name: "白巧克力威化", price: 14.5, num: 70, id: 9 },
        { name: "巧克力酱曲奇", price: 16, num: 80, id: 10 },
        { name: "曲奇礼盒", price: 35, num: 20, id: 11 },
        { name: "椰蓉蛋糕", price: 22, num: 30, id: 12 },
        { name: "柠檬曲奇", price: 15.8, num: 70, id: 13 },
        { name: "巧克力布朗尼", price: 26, num: 30, id: 14 },
        { name: " ", price:  0, num:  0, id:0   }
      ],
      [
        { name: "果味软糖", price: 8.8, num: 200, id: 15 },
        { name: "酸奶坚果", price: 18, num: 120, id: 16 },
        { name: "辣味花生", price: 12, num: 100, id: 17 },
        { name: "牛奶巧克力", price: 25, num: 70, id: 18 },
        { name: "草莓果冻", price: 6.8, num: 150, id: 19 },
        { name: "蜂蜜坚果棒", price: 16, num: 50, id: 20 },
        { name: "山楂糕", price: 12, num: 70, id: 21 },
        { name: "蓝莓果酱", price: 18, num: 40, id: 22 },
        { name: "柑橘软糖", price: 5.8, num: 200, id: 23 },
        { name: "薄荷巧克力", price: 21, num: 50, id: 24 },
        { name: "红枣夹核桃", price: 22, num: 50, id: 25 },
        { name: "咖啡豆巧克力", price: 29, num: 50, id: 26 },
        { name: "草莓牛奶糖", price: 12.5, num: 100, id: 27 },
        { name: " ", price:  0, num:  0, id:0   }

      ],
      [
        { name: "海苔脆片", price: 10, num: 150, id: 28 },
        { name: "薯片", price: 7.5, num: 300, id: 29 },
        { name: "水果干", price: 15.5, num: 60, id: 30 },
        { name: "芝士爆米花", price: 20, num: 40, id: 31 },
        { name: "蜜饯梅子", price: 11.5, num: 130, id: 32 },
        { name: "蜂蜜黄油薯片", price: 9.9, num: 120, id: 33 },
        { name: "咸蛋黄味薯条", price: 13.8, num: 90, id: 34 },
        { name: "蔓越莓干", price: 18.5, num: 60, id: 35 },
        { name: "香蕉片", price: 6.5, num: 120, id: 36 },
        { name: "蒜香青豆", price: 7.5, num: 150, id: 37 },
        { name: "芒果干", price: 19.8, num: 60, id: 38 },
        { name: "芝麻糊", price: 8, num: 90, id: 39 },
        { name: " ", price:  0, num:  0, id:0   }
      ],
      [
        { name: "可乐", price: 5, num: 500, id: 40 },
        { name: "柠檬茶", price: 6.5, num: 150, id: 41 },
        { name: "橙汁", price: 7, num: 200, id: 42 },
        { name: "抹茶冰淇淋", price: 22, num: 30, id: 43 },
        { name: "椰子汁", price: 8.5, num: 250, id: 44 },
        { name: "金桔柠檬汁", price: 9, num: 100, id: 45 },
        { name: "蜂蜜柠檬茶", price: 10, num: 80, id: 46 },
        { name: "果汁棒冰", price: 5.5, num: 200, id: 47 },
        { name: "姜味苏打水", price: 6, num: 150, id: 48 },
        { name: " ", price:  0, num:  0, id:0   }
      ]
    ], 
    curIndex: 0,  // 当前选中的分类
    cartTotal: 0, // 选购的商品总数
    cartList: [], // 购物车商品列表
    iconType: 'circle',  // 初始状态是circle
    cartVisible: true, // 购物车显示状态
  },
    // 处理点击事件，切换图标
  toggleIcon: function() {
    // 获取被点击的图标的索引
    const index = e.currentTarget.dataset.index;
    
    // 根据点击的图标索引来切换其状态
    let newIconTypes = this.data.iconTypes;
    newIconTypes[index] = newIconTypes[index] === 'circle' ? 'success' : 'circle';
    
    this.setData({
      iconTypes: newIconTypes
    });
  
  },
  
  selectNav(e) {
    this.setData({
      curIndex: e.currentTarget.dataset.index
    });
  },

  selectsnack(e) {
    const snackId = e.currentTarget.dataset.snack;
    const varietyList = this.data.varietyList[this.data.curIndex];
    const snack = varietyList.find(item => item.id === snackId);

    if (snack) {
      let cartList = this.data.cartList;
      let cartItem = cartList.find(item => item.id === snack.id);

      if (cartItem) {
        if (cartItem.count < snack.num) {
          cartItem.count += 1;
          this.setData({
            cartList: cartList,
            cartTotal: this.data.cartTotal + 1
          });
        } else {
          wx.showToast({ title: '库存不足', icon: 'none' });
        }
      } else {
        cartList.push({
          id: snack.id,
          name: snack.name,
          count: 1
        });
        this.setData({
          cartList: cartList,
          cartTotal: this.data.cartTotal + 1
        });
      }
    }
  },
  
  
  toggleCart() {
    this.setData({
      cartVisible: !this.data.cartVisible
    });
  },

  goToCartPage() {
    // 将购物车数据传递到新的页面
    wx.navigateTo({
      url: '/pages/components/cart/cart?cartData=' + JSON.stringify(this.data.cartList)
    });
    
  }
});
