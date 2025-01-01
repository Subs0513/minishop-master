# 小程序开发 开发日记

## 开发注意点

微信颜色展示用十六进制编码，rgb不适用

## 12.25

### 微信小程序基本构成

```微信小程序格式
pages //存放页面的文件夹
    index //首页
    --index.js //首页的业务逻辑
    ---index.json //首页的配置
    ---index.wxml //首页的模板
    ---index.wxss //首页的样式
	logs日志页面

utils //工具
--util.js//工具

.eslintrc.js //语法检测配置

app.js //小程序的入口js
app.json //小程序的配置
app.wxss //小程序全局样式
project.confg.json //项目的配置
project.private.config.json //个人项目配置
sitemap.json //站点地图(告诉微信搜索那些页面可以被收录)
```

### 

## 12.26

实现简单局域网内通讯小程序

### websocket通讯

#### socket本地服务器搭建

```websocket-server.js
// GPT所生成服务器
// 引入ws库
const WebSocket = require("ws");

// 创建一个WebSocket服务器，监听8000端口
const wss = new WebSocket.Server({ port: 8000 });

// 当客户端连接时
wss.on("connection", (ws) => {
    console.log("客户端已连接");

    // 当接收到客户端的消息时
    ws.on("message", (message) => {
        console.log("收到消息: %s", message);

        // 将收到的消息发送回客户端
        ws.send(`服务器: 收到消息，内容是 ${message}`);
    });

    // 当连接关闭时
    ws.on("close", () => {
        console.log("客户端已断开连接");
    });


});

console.log("WebSocket服务器正在监听8000端口...");
```

#### socket本地服务器搭建（备用）

```server.js
var ws = require("nodejs-websocket")

// Scream server example: "hi" -> "HI!!!"
//创建一个server
var server = ws.createServer(function (conn) {
    console.log("New connection")
    conn.on("text", function (str) {
        // console.log("Received "+str)
        // conn.sendText(str.toUpperCase()+"!!!")
        //链接成功之后，发送欢迎语
        console.log("连接成功")
        //欢迎语
        if(str == 'null'){
            conn.sendText("有什么能帮到您？");
        }
        //输入文字
        else if(str != 'null' && str){
            conn.sendText("文字")
        }
        //输入多媒体
        else{
            conn.sendText("多媒体文本")
        }
        console.log(str);
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
}).listen(8000)
```





## 12.27

实现双软件综合，遇到index页面广告滚动播放异常问题

​	解决方案：还原app.wxss，等待后续改进

​	存在问题：.containner冲突（12.31增加）

## 12.28

自主搭建利用微信云托管搭建微信云服务器

### 微信云托管一键部署（教学熟悉）

#### 官方教程

[快速开始 / 自定义部署 / Python](https://developers.weixin.qq.com/miniprogram/dev/wxcloudservice/wxcloudrun/src/quickstart/custom/python.html)

#### 云托管服务名称

express-gmz2-001

#### 环境ID

prod-1gq42k846fd37e87

#### 云端数据库

账号：root
密码：nk4PS9zt

#### 域名地址

[express-gmz2](https://express-gmz2-133545-9-1333758115.sh.run.tcloudbase.com)

https://express-gmz2-133545-9-1333758115.sh.run.tcloudbase.com

#### 基本使用

在小程序util.js中按需要使用如下的代码（取代原有wx.request用法）：

```js
// 确认已经在 onLaunch 中调用过 wx.cloud.init 初始化环境（任意环境均可，可以填空）
const res = await wx.cloud.callContainer({
  config: {
    env: '填入云环境ID', // 微信云托管的环境ID
  },
  path: '/xxx', // 填入业务自定义路径和参数，根目录，就是 / 
  method: 'POST', // 按照自己的业务开发，选择对应的方法
  header: {
    'X-WX-SERVICE': 'xxx', // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
    // 其他header参数
  }
  // dataType:'text', // 默认不填是以JSON形式解析返回结果，若不想让SDK自己解析，可以填text
  // 其余参数同 wx.request
});

console.log(res);
```

如上使用前，需要在小程序app.js中，执行wx.init，如下代码：

```js
App({
  async onLaunch() {
    // 使用callContainer前一定要init一下，全局执行一次即可
    wx.cloud.init()
    // 下面的请求可以在页面任意一处使用
    const result = await wx.cloud.callContainer({
      config: {
        env: 'prod-01', // 微信云托管的环境ID
      },
      path: '/', // 填入业务自定义路径和参数，根目录，就是 / 
      method: 'GET', // 按照自己的业务开发，选择对应的方法
      header: {
        'X-WX-SERVICE': 'xxx', // xxx中填入服务名称（微信云托管 - 服务管理 - 服务列表 - 服务名称）
      }
      // dataType:'text', // 默认不填是以JSON形式解析返回结果，若不想让SDK自己解析，可以填text
    })
    console.log(result)
  }
})
```

以PUT为例，修改后对比代码

```
async function putApi(url, data, successCallback, errCallback, completeCallback) {
  try {
    const res = await wx.cloud.callContainer({
      config: {
        env: '你的云环境ID', // 填入你的微信云环境ID
      },
      path: url, // 填入你需要访问的 API 路径
      method: 'PUT', // 设置 HTTP 请求方法
      header: {
        'Authorization': app.globalData.accessToken, // 设置授权头
        'X-WX-SERVICE': '你的服务名称', // 填入你云托管服务的名称
        // 如果需要其他的header可以继续添加
      },
      data: data, // 请求的参数
    });

    if (res.statusCode === 250 || res.statusCode === 500) {
      if (typeof errCallback === "function") {
        errCallback(res);
      } else {
        wx.showToast({
          title: res.data,
          duration: 2000
        });
      }
    } else {
      if (typeof successCallback === "function") {
        successCallback(res);
      }
    }
  } catch (err) {
    if (typeof errCallback === "function") {
      errCallback(err);
    } else {
      wx.showToast({
        title: '接口调用失败！',
        duration: 2000
      });
    }
  } finally {
    if (typeof completeCallback === "function") {
      completeCallback();
    }
  }
}

```

#### 服务器架设后，微信官方建议所用小程序代码使用格式

```js
wx.cloud.callContainer({
  "config": {
    "env": "prod-1gq42k846fd37e87"
  },
  "path": "/api/count",
  "header": {
    "X-WX-SERVICE": "express-gmz2"
  },
  "method": "POST",
  "data": {
    "action": "inc"
  }
})
```

### 微信云托管自定义部署（13.31补充）

#### 云托管服务名称

websocket-server

#### 容器端口

8000

## 12.29

完善小程序通讯功能，今天想尝试双路线：继续使用自主代码、尝试接入腾讯im即时通讯（最后放弃了）

今儿还把代码传到了github

```
css
	iconfont.wxss
	weui.wxss
images
	admin.png
pages
	components
		info
		--info.js
    	---info.json
    	---info.wxml
    	---info.wxss
		server
		---server.js
		talk
		--talk.js
    	---talk.json
    	---talk.wxml
    	---talk.wxss
		utils
		util.js
		varity
		--varity.js
    	---varity.json
    	---varity.wxml
    	---varity.wxss
	index
    --index.js
    ---index.json
    ---index.wxml
    ---index.wxss
	logs日志页面
    --logs.js
    ---logs.json
    ---logs.wxml
    ---logs.wxss
server
---server.js
utils
--util.js
.gitignore
app.js
app.json
app.wxss
project.confg.json
project.private.config.json
README.md
```

### git命令

#### 创建仓库

- **git init**：初始化一个git仓库
- **git clone**：clone一个git仓库

#### git基本命令

- **git config**：配置信息
- **git add**：添加文件到缓存命令
- **git status**：查看文件的状态命令
- **git diff**：查看更新的详细信息命令
- **git commit**：提交命令
- **git reset HEAD**：取消缓存命令
- **git rm**：删除命令
- **git mv**：移动或重命名命令

#### Git分支管理

- **git branch**：查看分支命令
- **git branch (branchname)**：创建分支命令
- **git checkout (branchname)**：切换分支命令
- **git merge**：合并分支命令
- **git branch -d (branchname)**：删除分支命令

#### Git查看提交历史

- **git log --oneline** ：查看历史记录的简洁版本
- **git log --graph** ：查看历史中什么时候出现了分支、合并
- **git log --reverse** ：逆向显示所有日志
- **git log --author** ：查找指定用户的提交日志
- **git log --since、git log --before、 git log --until、git log --after**： 指定筛选日期
- **git log --no-merges** ：选项以隐藏合并提交

#### Git 标签

- **git tag**：查看所有便签
- **git tag -a <tagname> -m "某某标签"**：查看指定标签信息

#### Git 远程仓库

- **git remote add**：添加远程仓库
- **git remote**：查看当前的远程仓库
- **git fetch**、**git pull**：提取远程仓仓库
- **git push**：推送到远程仓库
- **git remote rm**：删除远程仓库

## 12.30

新增文心一言功能模块。

完善整体功能

## 12.31

实现微信云托管部署，新增“我的室友板块”，最终完成项目。