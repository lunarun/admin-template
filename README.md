# 后台管理系统模板

## 1.开发前阅读

> 为了更好地维护项目，请参与开发该项目的同学认真阅读该文档，并严格、严格、严格按照该文档的约定规范进行开发，如有疑问，欢迎大家一起讨论 💪 👩‍💻 👨‍💻

## 2.依赖

- vue
- vue-router
- vuex
- element-ui
- axios
- js-cookie
- qiniu-js
- font-awesome

## 3.安装依赖

```bash
npm install
```

## 4.开发和发布流程

```bash
# 开发环境（可设置port参数修改端口）
npm start
# 测试环境
npm run build:testing
# 发布环境
npm run build:release
# 生产环境
npm run build:production
# 项目详情报告
npm run build:report
```

## 5.说明

### 脚手架环境变量配置（config）

```bash
.
# 根据不同scripts，获取各自的环境变量
|-- config
|   |-- development.env.js  开发环境变量 -> dev
|   |-- index.js            webpack配置
|   |-- production.env.js   生产环境变量 -> build:production
|   |-- release.env.js      发布环境变量 -> build:release
|   |-- testing.env.js      测试环境变量 -> build:testing

```

### 常量定义与使用（src/constant）

项目中使用到的常量都应该定义在目录中，引入到 index.js

- 使用方式如下

```JS
this.$constant.xxx
```

### Vue 方法的扩展（vue-extends/functions）

**tab 标签页的操作**

```JS
1. 关闭当前 `tab` 页面，组件中调用 `this.$closeTabView();`
2. 刷新当前 `tab` 页面，组件中调用 `this.$refreshTabView();`
```

**例如：对 `ElementUI` 的 `$message` 方法进行了重新封装**

```JS
// ElementUI 调用方式
this.$message({
    type: 'success', // type的值有：success、error、warning
    message: '操作成功'
});
// 封装后的调用（this.$message的调用方式依然保留）
this.$successMessage('成功');
// 或者
this.$successMessage({
    message: '成功'
});
this.$errorMessage('错误');
this.$wainingMessage('警告');
```

### 请求模块（src/net）

```JS
* 项目服务：src/net/commonApi.js
* 模块服务：src/views/${module}/service.js
* 页面服务：src/views/${module}/${page}/service.js，
* 组件服务：src/views/${module}/${page}/components/${component}/service.js
```

### 样式

1. 该项目支持 `sass` 和 `less` ，但建议统一使用 `sass`
2. 已在 `./build/utils.js` 配好了样式 `loader` ，需要使用 `./src/assets/scss/mixin.scss` 和 `./src/assets/scss/variables.scss` 声明的变量，直接使用变量即可，无需 `@import './src/assets/scss/variables.scss'` 引入文件

### GIT 使用规范

请详细阅读[GIT 规范](https://xrainbow.suv163.com/#/project/26/doc/31413)

包括`GIT分支模型`，`GIT COMMIT规范`，`GIT Merge Request规范`章节

## 6.目录结构

```bash
.
|-- .babelrc                    babel配置
|-- .postcssrc.js               postcss配置
|-- .prettierrc.js              prettier配置
|-- favicon.ico                 APP ICON
|-- index.html                  首页
|-- build                       构建配置
|-- config                      环境配置
|-- src
|   |-- App.vue                 Vue根Root
|   |-- errorLog.js             错误日志模块
|   |-- main.js                 APP主入口
|   |-- assets                  APP资源
|   |   |-- images              图片
|   |   |-- scss                SCSS
|   |   |-- theme               主题
|   |-- components              组件
|   |   |-- commonCompoentns    公用全局组件
|   |   |-- domCompoentns       公用页面组件
|   |-- constant                常量
|   |-- icons                   图标库
|   |-- net                     网络IO模块
|   |-- router                  路由模块
|   |-- session                 用户身份认证模块
|   |-- static_resource         静态资源
|   |-- store                   Vuex
|   |-- utils                   工具
|   |-- views                   页面
|   |-- vue-extends             Vue扩展
|   |   |-- directives          指令
|   |   |-- functions           方法
|-- static
    |-- ueditor                 百度编辑器

```
