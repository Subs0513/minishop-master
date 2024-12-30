Page({
  data: {
    messages: [], // 聊天记录
    inputContent: "", // 用户输入的消息
    access_token: "", // 存储获取到的 access_token
    userAvatar: "/images/admin.png", // 用户头像
    botAvatar: "/images/wxyy.png" // 对方（机器人）头像
  },

  onLoad: function () {
    this.getToken(); // 页面加载时获取 Token
  },

  // 获取 Token
  getToken() {
    const url_token = "https://aip.baidubce.com/oauth/2.0/token?client_id=yXIxvCXm1Mi4QaKxoVYyNZwA&client_secret=YNcQrcRXhZI6iDm5NwdNJ92O4m9lvVIx&grant_type=client_credentials";
    
    wx.request({
      url: url_token,
      method: "POST",
      header: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      success: res => {
        console.log("获取到的 access_token:", res.data.access_token); // 打印 access_token
        if (res.data.access_token) {
          this.setData({
            access_token: res.data.access_token
          });
        } else {
          console.error("无法获取 access_token");
        }
      },
      fail: err => {
        console.error("获取 Token 失败:", err);
      }
    });
  },

  // 处理用户输入
  onInput: function (e) {
    this.setData({
      inputContent: e.detail.value
    });
  },

  // 发送消息
  sendMessage: function () {
    const { inputContent } = this.data;

    // 检查用户输入是否为空
    if (!inputContent.trim()) {
      wx.showToast({
        title: '请输入消息',
        icon: 'none',
      });
      return;
    }

    console.log("点击发送，输入内容:", inputContent); // 打印用户输入内容

    // 将用户的消息添加到聊天记录，头像在左侧
    this.setData({
      messages: [...this.data.messages, { role: 'user', content: inputContent, avatar: this.data.userAvatar }],
      inputContent: "" // 清空输入框
    });

    // 确保有有效的 access_token
    if (!this.data.access_token) {
      console.error("没有获取到有效的 access_token");
      return;
    }

    const url_chat = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=" + this.data.access_token;

    const payload = {
      "messages": [
        {
          "role": "user",
          "content": inputContent // 确保 content 字段正确
        }
      ]
    };

    console.log("发送的请求数据：", payload); // 打印发送的请求数据

    wx.request({
      url: url_chat,
      method: "POST",
      data: payload,
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        console.log("模型返回的数据：", res.data); // 打印返回的完整数据
        if (res.data.result) {
          const botReply = res.data.result; // 获取模型的回复

          // 在聊天记录中添加模型的回复，头像在左侧
          this.setData({
            messages: [...this.data.messages, { role: 'bot', content: botReply, avatar: this.data.botAvatar }]
          });
        } else {
          console.error("未能获取到模型的回应:", res.data); // 打印完整数据
        }
      },
      fail: (err) => {
        console.error("聊天接口请求失败:", err); // 输出失败的错误信息
      }
    });
  }
});
