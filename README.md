# 前端starter框架

## 框架介绍

## 项目结构
```
|-- root
    |-- design view-design主题文件，用于生成定制主题
    |-- public 静态资源
    |   |-- favicon.ico 网站图标
    |-- src 项目文件
        |-- App.vue 项目首页
        |-- main.js 项目入口
        |-- api 接口存放目录
        |-- assets 资源
        |   |-- base.css css3变量
        |   |-- logo.svg logo
        |   |-- common 项目公共组件样式
        |   |-- icons iview-admin字体与图标
        |   |-- images iview-admin图片
        |-- components 项目公共组件
        |-- config 项目配置
        |-- directive 指令
        |-- layout 界面布局
        |-- libs iview-admin的工具
        |-- plugins 自定义插件
        |-- router 路由
        |   |-- index.js 路由拦截器
        |   |-- modules 项目路由
        |-- store vuex状态管理配置
        |-- style 主题
        |   |-- normalize.css 重置浏览器默认样式
        |   |-- reset.css 重置浏览器默认样式
        |   |-- variables.less 全局less变量
        |   |-- theme view-design定制主题，将生成的定制主题放到这里
        |-- utils 项目函数
        |-- views 页面
            |-- HomeView.vue 首页
            |-- Redirect.vue 重定向
            |-- ErrorPage 错误页
            |-- Login 登录页
```

## 技术栈
- vite3
- vue2 + vue-router + vuex
- less
- vue-design
- axios
- jsx

## 运行环境
- nodejs ^14.18.0

## 依赖安装
```shell
npm i

# 或
yarn

# 或
pnpm i

```

## 启动脚本
```shell
# 开发本地启动
npm run dev

```

## 打包部署

1. 执行构建指令
> 构建完成后会生成`dist`文件夹到项目的根目录

```shell
# 开发本地构建
npm run build

# 线上develop环境构建
npm run build:dev

# 线上测试环境（uat）构建
npm run build:uat

# 生产环境构建
npm run build:prod

```
2. 将根目录下的`dist`文件夹上传到服务器的网站目录下即可

## Usage

## copyright

## license
