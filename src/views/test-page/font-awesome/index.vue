<template>
  <div class="font-icon-container">
    <svg-icon iconClass="user"></svg-icon>
    <icon type="user"></icon>
    <h2>字体图标</h2>
    <p>
      使用全局组件icon，传入type，type为图标类型，必传参数，具体的type可根据<a
        href="http://fontawesome.dashgame.com/"
        target="_blank"
        >font-awesome的图标库</a
      >进行选择
    </p>
    <img src="./image/type.jpg" alt="" />
    <h2>用法及展示</h2>
    <p>该组件写在src/components/font-icon</p>
    <div class="show">
      <img src="./image/example.jpg" alt="" />
      <icon type="battery-quarter lg" className="ml32" />
    </div>
  </div>
</template>
<style lang="scss">
.font-icon-container {
  height: 100%;
  a {
    cursor: pointer;
    color: #e65d6e;
    font-weight: 500;
    font-size: 16px;
    text-decoration: underline;
  }
  .show {
    display: flex;
    align-items: center;
  }
}
</style>
