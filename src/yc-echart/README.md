# yc-echart 总的文档说明

## 目录说明

```
|-- src
    |-- index.js                              // 注册入口文件
    |-- yc-echart.md                           // yc-echart.md
    |-- components                            // 自定封装echart组件的基础组件
    |   |-- echartStatus
    |   |   |-- index.js
    |   |   |-- index.scss
    |   |   |-- index.vue
    |   |-- ycEchartBase
    |       |-- index.js
    |       |-- index.scss
    |       |-- index.vue
    |-- echartCmponents                       // 具体封装的echart组件
    |-- static                                // 静态资源 css 图片等
    |   |-- css
    |       |-- common.scss
    |-- tool                                  // 工具文件夹
        |-- common.js                         // 封装echart的公用模块
        |-- constant.js                       // 封装echart的常量
        |-- justiceEmpty.js                   // 判定图标状态是否为空
        |-- tool.js                           // 工具方法

```

## 添加具体组件的 props 说明

- props 具体参数添加结构分成两级，不在向下扩招，配置过于复杂。
  - 例如: tooltip、toolbox 这些下级对象比较少的变量直接放在第一级
  - 例如: title、legend 这些下级对象参数比较多，放置在第二级
    - props 按照模块放置，具体看实例。
    - 命名是 e + 一级变量属性名 + 具体对应的二级属性名。
    - 采用驼峰命名规则。（例：eTitleName，eTitleSubtext 等）
- props 有一个公用模块，用于存放全部 props 公用的 props。
  - 这个模块暂时不用，应该不同的图表，对应的参数名相同，但是对应的参数格式不一定同。
  - 留着这个扩展以后对一些具体公用的参数进行提取，如图表名称等。
- props 尽量在每一个模块进行添加。
  - 因为每个图表即便相同参数名，但是参数根式不一定相同。

## 具体的文档查找规律

- [echart 参数配置文档](https://www.echartsjs.com/zh/option.html#title)
  - 根据 props 对应的名称找到对应的参数一级配置目录。
  - 再根据图表的命名找到该参数的下面对应图表的类型的配置参数。

## echart 的具体实例文档查找

- [echart 实例大全](https://www.echartsjs.com/examples/zh/index.html)
  - 根据封装的具体 echart 组件的名称规则查找实例
