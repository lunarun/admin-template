<style lang="scss">
.default-to-top-out {
  z-index: 100;
  color: red;
}
.item {
  height: 2000px;
}
.container {
  height: 500px;
  background: green;
  overflow: auto;
}
.mb10 {
  margin-bottom: 10px;
}
</style>

<template>
  <section>
    <el-button class="mb10" @click="chcangeType('selfType')"
      >自定义样式返回顶部</el-button
    >
    <el-button class="mb10" @click="chcangeType('inheritType')"
      >继承样式返回顶部</el-button
    >
    <el-button class="mb10" @click="chcangeType('defaultType')"
      >默认返回顶部样式</el-button
    >
    <el-button class="mb10" @click="chcangeType('dom')"
      >dom 返回顶部测试</el-button
    >
    <el-button class="mb10" @click="chcangeType('time')"
      >有时间长度控制 返回顶部测试</el-button
    >
    <el-button class="mb10" @click="chcangeType('interval')"
      >有时间长度控制 返回顶部测试 间隔时间大于总时间</el-button
    >
    <el-button class="mb10" @click="chcangeType('cb')">添加回调函数</el-button>
    <el-button class="mb10" @click="chcangeType('interrupt')"
      >去掉滚动中断</el-button
    >
    <el-button class="mb10" @click="chcangeType('mode')"
      >滚动长度为当前滚动条长度</el-button
    >
    <el-button class="mb10" @click="chcangeType('show')"
      >不显示返回顶部节点</el-button
    >
    <!-- 自定义返回顶部样式 -->
    <template v-if="testType === 'selfType'">
      <back-to-top :key="testType">
        <div slot="arrow">
          Up
        </div>
        <div class="item" v-for="n in 10" :key="n">{{ n }}</div>
      </back-to-top>
    </template>
    <!-- 继承样式返回顶部 -->
    <template v-if="testType === 'inheritType'">
      <back-to-top class="default-to-top-out" :key="testType">
        <div class="item" v-for="n in 10" :key="n">{{ n }}</div>
      </back-to-top>
    </template>
    <!-- 默认返回顶部样式  -->
    <template v-if="testType === 'defaultType'">
      <back-to-top :key="testType">
        <div class="item" v-for="n in 10" :key="n">{{ n }}</div>
      </back-to-top>
    </template>
    <!-- 默认返回顶部样式 dom -->
    <template v-if="testType === 'dom'">
      <back-to-top :type="true" :key="testType">
        <div class="container">
          <div class="item" v-for="n in 10" :key="n">{{ n }}</div>
        </div>
      </back-to-top>
    </template>
    <!-- 默认返回顶部样式 dom 加时间 -->
    <template v-if="testType === 'time'">
      <back-to-top :time="2000" :interval="30" :type="true" :key="testType">
        <div class="container">
          <div class="item" v-for="n in 10" :key="n">{{ n }}</div>
        </div>
      </back-to-top>
    </template>
    <!-- 默认返回顶部样式 dom 加时间 间隔时间大于总时间-->
    <template v-if="testType === 'interval'">
      <back-to-top :time="200" :interval="1000" :type="true" :key="testType">
        <div class="container">
          <div class="item" v-for="n in 10" :key="n">{{ n }}</div>
        </div>
      </back-to-top>
    </template>
    <!--添加回调函数-->
    <template v-if="testType === 'cb'">
      <back-to-top
        :time="2000"
        :interval="30"
        :type="true"
        :key="testType"
        @beforeStart="beforeStart"
        @progress="progress"
        @end="end"
      >
        <div class="container">
          <div class="item" v-for="n in 10" :key="n">{{ n }}</div>
        </div>
      </back-to-top>
    </template>
    <!--去掉滚动中断-->
    <template v-if="testType === 'interrupt'">
      <back-to-top
        :time="5000"
        :interval="30"
        :interrupt="true"
        :type="true"
        :key="testType"
        @beforeStart="beforeStart"
        @progress="progress"
        @end="end"
      >
        <div class="container">
          <div class="item" v-for="n in 10" :key="n">{{ n }}</div>
        </div>
      </back-to-top>
    </template>
    <!--滚动长度为当前滚动条长度-->
    <template v-if="testType === 'mode'">
      <back-to-top
        :time="5000"
        :interval="30"
        :interrupt="true"
        :mode="true"
        :type="true"
        :key="testType"
        @beforeStart="beforeStart"
        @progress="progress"
        @end="end"
      >
        <div class="container">
          <div class="item" v-for="n in 10" :key="n">{{ n }}</div>
        </div>
      </back-to-top>
    </template>
    <!--不显示返回顶部节点-->
    <template v-if="testType === 'show'">
      <el-button class="mb10" type="primary" @click="toTop"
        >不显示返回顶部节点 返回顶部事件触发</el-button
      >
      <back-to-top
        :time="5000"
        :interval="30"
        :interrupt="true"
        :mode="true"
        :type="true"
        :show="false"
        :key="testType"
        ref="test"
        @beforeStart="beforeStart"
        @progress="progress"
        @end="end"
      >
        <div class="container">
          <div class="item" v-for="n in 10" :key="n">{{ n }}</div>
        </div>
      </back-to-top>
    </template>
  </section>
</template>

<script>
import Vue from 'vue';
export default {
  data() {
    return {
      // 1、selfType 自定义样式返回顶部 2、inheritType 继承样式返回顶部
      // 3、defaultType(window) 默认返回顶部样式 4、dom 返回顶部测试
      // 5、time 时间控制滑动 6、cb 添加回调函数 7、interrupt 去掉滚动中断
      // 8、mode 滚动长度为当前滚动条长度 9、show 不显示返回顶部节点
      testType: '',
    };
  },
  components: {},
  mounted() {},
  methods: {
    beforeStart() {
      console.log('beforeStart');
    },
    progress() {
      console.log('progress');
    },
    end() {
      console.log('end');
    },
    chcangeType(type) {
      this.testType = type;
    },
    toTop() {
      this.$refs.test.toTop();
    },
  },
};
</script>
