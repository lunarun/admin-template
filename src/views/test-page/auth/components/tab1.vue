<template>
  <div>
    <el-button v-auth="auth.button1">button1</el-button>
    <el-button v-auth="auth.button2">button2</el-button>
  </div>
</template>

<script>
export default {
  name: 'tab1',
  data() {
    return {
      auth: {
        currentTab: 'tab1',
        button1: 'button1',
        button2: 'button2',
      },
    };
  },
  created() {
    this.$authGuard.setCurrentTab(this.auth.currentTab);
  },
};
</script>
