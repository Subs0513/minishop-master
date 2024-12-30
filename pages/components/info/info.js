// info.js
Page({
  data: {
    developer: {
      name: "郭朝阳",
      email: "subs0513@outlook.com",
      github: "https://github.com/Subs0513",
    },
    project: {
      title: "鬼点子系统",
      team:"郭朝阳、张正澍、杜璟钰",
      description: "一个简单的商品推荐系统",
      version: "0.0.1",
      technologies: ["微信小程序", "JavaScript", "Node.js"]
    }
  },

  onLoad() {
    // Initialize any data or perform actions when the page loads
    console.log("Info page loaded");
  },

  copyEmail() {
    wx.setClipboardData({
      data: this.data.developer.email,
      success: () => {
        wx.showToast({
          title: "Email copied!",
          icon: "success"
        });
      }
    });
  }
});
