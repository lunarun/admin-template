<template>
  <div>
    base
  </div>
</template>
<script>
export default {
  name: 'base',
  data() {
    return {};
  },
  props: {
    base: {
      type: Number,
      required: false,
      default: () => 60,
    },
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {},
  },
};
</script>
<style scoped lang="scss"></style>
