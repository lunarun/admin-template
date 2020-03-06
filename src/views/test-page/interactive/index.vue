<template>
  <div class="interactive">
    <p>
      Message提示：常用于主动操作后的反馈提示。与 Notification
      的区别是后者更多用于系统级通知的被动提醒。
    </p>
    <el-button type="success" @click="successMessage()">成功提示</el-button>
    <el-button type="warning" @click="warningMessage()">警告提示</el-button>
    <el-button type="danger" @click="errorMessage()">错误提示</el-button>
    <el-button type="info" @click="infoMessage()">信息提示</el-button>
    <p>MessageBox弹框：模态对话框组件。</p>
    <el-button type="primary" @click="confirm()">确认消息</el-button>
    <el-button type="primary" @click="alert()">消息提示</el-button>
    <el-button type="primary" @click="promt()">提交内容弹框</el-button>
    <p>
      Notification
      通知：悬浮出现在页面角落，显示<span>全局</span>的通知提醒消息。
    </p>
    <el-button type="success" @click="successNotify()">成功通知</el-button>
    <el-button type="warning" @click="warningNotify()">警告通知</el-button>
    <el-button type="danger" @click="errorNotify()">错误通知</el-button>
    <el-button type="info" @click="infoNotify()">信息通知</el-button>
    <el-button type="success" @click="successNotify('bottom-right')"
      >右下角</el-button
    >
    <el-button type="success" @click="successNotify('top-left')"
      >左上角</el-button
    >
    <el-button type="success" @click="successNotify('bottom-left')"
      >左下角</el-button
    >
    <p>Loading 加载：加载数据时显示动效。</p>
    <el-button type="primary" @click="loading()">开启loading</el-button>
    <el-button type="primary" @click="closeLoading()">关闭loading</el-button>
    <div class="loading-area">loading区域</div>
    <p>打开新窗口</p>
    <el-button type="primary" @click="openPage()">当前页面打开</el-button>
    <el-button type="primary" @click="openNewPage()">新标签页打开</el-button>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss">
.interactive {
  p {
    span {
      font-weight: bold;
      color: red;
    }
  }
  .loading-area {
    width: 300px;
    height: 200px;
    border: 1px solid #e5e5e5;
    margin: 10px 0;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
