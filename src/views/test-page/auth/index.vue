<template>
  <div>
    <div>
      <el-button v-auth="auth.primaryButton" type="primary">primary</el-button>
      <el-button v-auth="auth.dangerButton" type="danger">danger</el-button>
      <el-button v-auth="auth.infoButton" type="info">info</el-button>
    </div>
    <div>
      <el-tabs>
        <el-tab-pane v-if="$authGuard.checkAuth(auth.tab1)" label="标签1">
          <tab1></tab1
        ></el-tab-pane>
        <el-tab-pane v-if="$authGuard.checkAuth(auth.tab2)" label="标签2">
          标签2内容
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script src="./index.js"></script>
