//app.js
App({
  // 初始化事件
  onLaunch: function () {
    var that = this;
    console.log("appjs-onLaunch");

    // 从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
  },

  // 页面每次显示时执行
  onShow: function () {
    var that = this;
    console.log('onShow');

    // 登陆授权
    that.checkAuthorization(that.onLogin);
  },

  // 页面隐藏时执行
  onHide: function () {
    console.log('onHide');
    // 在此处可以调用退出登录相关函数，例如：
    // that.logOut();
  },

  // 获取微信用户信息
  getWxUserInfo: function (callback) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        var data = JSON.parse(res.rawData);
        data.iv = res.iv;
        data.encryptedData = res.encryptedData;
        that.setwxUserInfo(data);
        console.log(that.globalData.wxUserInfo);
        if (typeof(callback) == "function") {
          callback(res);
        }
      }
    });
  },

  // 验证授权
  checkAuthorization: function (callback) {
    var that = this;
    if (that.globalData.isLoginErp) callback();
    else if (wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log('用户已经授权，登陆ERP获取unioid');
          console.log('iv:' + that.globalData.wxUserInfo.iv);
          console.log("data:" + that.globalData.wxUserInfo.encryptedData);
          that.loginErp(callback);
        } else {
          console.log('用户未授权，转至授权页面');
          wx.reLaunch({
            url: '/pages/home/temp'
          });
        }
      }
    }));
  },

  // 登录ERP
  loginErp: function (callback) {
    var that = this;
    wx.login({
      success: function (res) {
        var code = res.code;
        console.log('loginErpCode:' + code);
        that.getWxUserInfo(function () {
          wx.request({
            url: that.globalData.apiHost + 'up/Supplier/Login?code=' + code + '&iv=' + that.globalData.wxUserInfo.iv + '&encryptedData=' + that.globalData.wxUserInfo.encryptedData,
            method: 'GET',
            success: function (res) {
              if (res.statusCode == 250) {
                wx.showToast({
                  title: res.data,
                  duration: 2000
                });
              } else {
                console.log("登录成功,返回数据：" + res.data);
                that.setcurrentUserInfo(res.data.supplier);
                that.globalData.accessToken = res.data.accessToken;
                that.globalData.unionId = res.data.unionid;
                that.globalData.isLoginErp = true;
                if (typeof(callback) == "function") {
                  callback(res);
                }
              }
            },
            fail: function (res) {
              console.log('fail:' + res.errMsg);
            },
            complete: function (res) {
              console.log('complete:' + res.errMsg);
            }
          });
        });
      }
    });
  },

  // 获取当前页面URL
  getCurrentPageUrl: function () {
    var pages = getCurrentPages(); // 获取加载的页面
    var url = '';
    if (pages.length > 0) {
      var currentPage = pages[pages.length - 1]; // 获取当前页面的对象
      url = currentPage.route; // 当前页面url
    }
    return url;
  },

  // 退出登录
  logOut: function () {
    var that = this;
    that.globalData.id = 0;
    that.globalData.phone = "";
    that.globalData.name = "";
    that.globalData.status = null;
    that.globalData.publicOpenId = "";
    that.globalData.accessToken = null;
    that.globalData.unionId = null;
    that.globalData.isLoginErp = false;
    that.globalData.wxUserInfo = [];
    console.log('清除登陆信息！');
  },

  // 获取用户信息
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo);
    } else {
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo);
            }
          });
        }
      });
    }
  },

  // 保存当前用户信息
  setcurrentUserInfo: function (user) {
    var that = this;
    that.globalData.id = user.id;
    that.globalData.phone = user.phone;
    that.globalData.status = user.status;
    that.globalData.publicOpenId = user.publicOpenId;
    that.globalData.name = user.name;
  },

  // 保存微信用户信息
  setwxUserInfo: function (user) {
    var that = this;
    that.globalData.wxUserInfo.avatarUrl = user.avatarUrl; // 头像
    that.globalData.wxUserInfo.city = user.city; // 城市
    that.globalData.wxUserInfo.country = user.country; // 国家
    that.globalData.wxUserInfo.gender = user.gender; // 性别 int类型
    that.globalData.wxUserInfo.language = user.language; // 语言
    that.globalData.wxUserInfo.nickName = user.nickName; // 昵称
    that.globalData.wxUserInfo.province = user.province; // 省
    that.globalData.wxUserInfo.encryptedData = user.encryptedData; // 校验用户信息
    that.globalData.wxUserInfo.iv = user.iv; // 加密算法的初始向量
  },

  globalData: {
    userInfo: null, // 用户信息
    id: 0,   // 用户编号
    phone: "",   // 用户手机
    name: "", // 用户名称
    status: null,  // 用户状态
    publicOpenId: "",  // 用户服务号OpenId
    accessToken: null,  // 应用签名
    unionId: null,  // 登录标识
    isLoginErp: false, // 是否登录
    wxUserInfo: [],   // 微信用户信息
    // socketHost: "ws://localhost:8000", // WebSocket地址
    socketConnected: false, // 是否已连接WebSocket
    wsUrl: 'wss://websocket-server-133545-9-1333758115.sh.run.tcloudbase.com', // WebSocket地址
    // apiHost: 'ws://localhost:8000/' // API服务器地址
  }
});
