<template>
  <div class="ui-page">
    <h2>间距</h2>
    <p>
      元素见的间距采用<em>8倍数</em>的原则，8，16，24，32...我们统一以<em>16px</em>为标准间距，在设置padding，margin时尽量统一用这个标准。
    </p>
    <h2>字阶与行高</h2>
    <p>
      建议的主要字体为 <em>14</em>，与之对应的行高为
      <em>22</em
      >。其余的字阶的选择可根据具体情况进行自由的定义，建议在一个系统设计中（展示型页面除外），字阶的选择尽量控制在
      <em>3-5</em> 种之间，保持克制的原则。
    </p>
    <img src="./image/font-size.png" class="image" />
    <h2>字重</h2>
    <p>
      字重的选择同样基于秩序、稳定、克制的原则。多数情况下，只出现 regular 以及
      medium 的两种字体重量，分别对应代码中的 <em>400</em> 和
      <em>500</em>。在英文字体加粗的情况下会采用 semibold
      的字体重量，对应代码中的 <em>600</em>。
    </p>
    <img src="./image/font-weight.png" class="image" />
    <h2>字体颜色</h2>
    <el-table :data="colorList" border class="color-table">
      <el-table-column prop="type" label="颜色类型" />
      <el-table-column prop="light_c" label="浅色背景下" class-name="light">
        <template slot-scope="item">
          <div
            :style="{ backgroundColor: item.row.light_c }"
            class="show-item"
          ></div>
          <span>{{ item.row.light_c }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="deep_c" label="深色背景下" class-name="deep">
        <template slot-scope="item">
          <div
            :style="{
              backgroundColor: item.row.deep_c,
              border: '1px solid #fff',
            }"
            class="show-item"
          ></div>
          <span>{{ item.row.deep_c }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script src="./index.js"></script>

<style lang="scss">
@import 'index.scss';
</style>
