<template>
  <i :class="`fa ${formatType}${className}`" @click="iconClick"></i>
</template>

<script>
export default {
  name: 'icon',
  props: {
    type: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
    iconClick: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    formatType() {
      const arr = this.type.split(' ');
      let newType = '';
      arr.forEach((i) => {
        newType += `${~i.indexOf('fa-') ? '' : 'fa-'}${i} `;
      });
      return newType;
    },
  },
};
</script>

<style scoped></style>
