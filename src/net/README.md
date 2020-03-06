### HTTP 模块

服务端交互的请求模块

- 方法($post、$get、\$http)挂载到 Vue.prototype
- 使用拦截器 Promise chain

```bash
.
├── index.js                          // 入口文件
├── config.js                         // 配置文件
├── lib                               // 核心目录
│   ├── core                          // 核心代码
├── interceptors                      // 拦截器目录
│   ├── index.js                      // 拦截器模块入口
.
---
```

### 使用说明

#### 基础使用

```javascript
import net from './net';
Vue.use(net);
```

#### 高级使用（可选）

- 配置(net/config.js)

文件内已包含所有配置项，按需开启对应的配置即可。

**注意：部分功能通过 【拦截器】或【配置】 均可实现，具体看场景选择**

- 拦截器(net/interceptors/index.js)

```javascript
# request
export default {
  fulfilled(request) {

  },
  rejected(error) {

  }
}

# response
export default {
  fulfilled(response) {

  },
  rejected(error) {

  }
}
```

1.  请求(request)拦截器
    1. 在 net/interceptors/ 创建文件，以 requestXXXInterceptor 命名
    1. 引入到 net/interceptors/index.js 的 requestInterceptors 数组内
1.  响应(response)拦截器
    1. 在 net/interceptors/ 创建文件，以 responseXXXInterceptor 命名
    1. 引入到 net/interceptors/index.js 的 responseInterceptors 数组内

---

### API

#### Methods

| 方法名              | 说明           | 参数                                               |
| ------------------- | -------------- | -------------------------------------------------- |
| \$http              | axios 原生对象 | 参考 axiosAPI：http://www.axios-js.com/zh-cn/docs/ |
| \$post(url, params) | POST 请求      | (url:String, params:Object)                        |
| \$get(url, params)  | GET 请求       | (url:String, params:Object)                        |

---

### 常见问题

1. 由于 axios 实现原因，request 拦截器的调用顺序是反转的
1. 拦截器 fulfilled, rejected 都是可选的
1. 当 fulfilled 抛出异常(throw error 或者 Promise.reject())，会中断 Promise fulfilled chain，并找到下一个 rejected 并自动消费掉，然后继续执行
