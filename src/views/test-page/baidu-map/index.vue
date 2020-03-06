<!--
 * @Author: YJ
 * @Date: 2019-10-23 11:05:36
 * @LastEditTime: 2019-10-23 12:04:42
 * @LastEditors: Please set LastEditors
 * @Description: 百度地图
 * @FilePath: /iyourcar-admin-front-template/src/views/test-page/baidu-map/index.vue
 -->
<style lang="scss"></style>

<template>
  <section>
    <baidu-map :city-options="cityOptions" ref="baidu-map"></baidu-map>
  </section>
</template>

<script>
export default {
  data() {
    return {
      keyword: '',
      cityValue: [],
      cityOptions: [
        {
          value: '广东',
          label: '广东',
          children: [
            {
              value: '广州',
              label: '广州',
            },
            {
              value: '深圳',
              label: '深圳',
            },
          ],
        },
      ],
    };
  },
  components: {},
  mounted() {},
  methods: {
    searchMap() {
      const mapDom = this.$refs['baidu-map'];
      mapDom.$onSearchKeyword('珠江新城', '广州');
    },
  },
};
</script>
