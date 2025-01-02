// info.js
Page({
  data: {
    developer: {
      name: "郭朝阳",
      email: "subs0513@outlook.com",
      github: "https://github.com/Subs0513",
    },
    project: {
      title: "皮皮的智能展示系统",
      university:"扬州大学",
      description: "一个简单的商品推荐系统",
      version: "1.0.3",
      technologies: ["微信小程序框架", "微信云开发", "websocket协议", "心跳检测", "JavaScript", "Node.js"]
    },
    team: {
      mates: ["郭朝阳", "张正澍", "杜璟钰", "孔令辉"],
      university:"扬州大学",
      description: "临时攒的小团队",
    }
  },

  onLoad() {
    // Initialize any data or perform actions when the page loads
    console.log("信息加载中…");
  },

  copyEmail() {
    wx.setClipboardData({
      data: this.data.developer.email,
      success: () => {
        wx.showToast({
          title: "邮箱已复制!",
          icon: "success"
        });
      }
    });
  }
});
