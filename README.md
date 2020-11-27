## 听说读写 -- 一款少儿学习APP

### 目录结构

```
├─api           # 接口管理
├─pages         # 页面
├─static        # 静态资源
├─store         # 全局状态
├─wxcomponents  # 第三方组件库
├─App.vue       # app根组件
├─main.js       # 入口文件
├─pages.json    # 页面配置文件
├─package.json  # 项目依赖配置文件
└─uni.scss      # 全局scss文件
``` 

### 安装依赖

```
npm install
```

### 运行项目

点击运行按钮 -> 真机运行

### 组件库

使用了 **vant weapp** 组件库，在页面使用之前，必须先在 `pages.json` 文件中配置

配置后，**无需**在页面文件中 `import`

```js
  {
    "path": "pages/index/index",
    "style": {
      "navigationBarTitleText": "uni-app",
      // 在这里进行配置
      "usingComponents": {
        "van-button": "/wxcomponents/vant/button/index"
      }
    }
  }
```