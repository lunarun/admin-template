/*
 * @Author: YJ
 * @Date: 2019-10-23 10:37:41
 * @LastEditTime: 2019-10-23 11:14:24
 * @LastEditors: Please set LastEditors
 * @Description: 路由列表
 * @FilePath: /iyourcar-admin-front-template/src/router/table.js
 */
import Layout from '@/views/layout/Layout';

export default [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/_refresh-redirect/index'),
      },
    ],
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    name: '',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/home/index'),
        meta: { title: '仪表盘', icon: 'dashboard' },
      },
    ],
  },
  {
    path: '',
    component: Layout,
    redirect: '/test-page/index',
    name: '',
    meta: { title: '实验室', icon: 'flask' },
    children: [
      {
        path: '/test-page/yc-echart-demo',
        component: () => import('@/views/test-page/yc-echart-demo/index.vue'),
        meta: { title: '百度图表' },
      },
      {
        path: '/test-page/baidu-map',
        component: () => import('@/views/test-page/baidu-map/index.vue'),
        meta: { title: '百度地图' },
      },
      {
        path: '/test-page/dialog-test',
        component: () => import('@/views/test-page/dialog-test/index.vue'),
        meta: { title: '图片预览' },
      },
      {
        path: '/test-page/downtime',
        component: () => import('@/views/test-page/downtime/index.vue'),
        meta: { title: '倒计时' },
      },
      {
        path: '/test-page/guide',
        component: () => import('@/views/test-page/guide/index.vue'),
        meta: { title: '引导页面' },
      },
      {
        path: '/test-page/guide-image',
        component: () => import('@/views/test-page/guide-image/index.vue'),
        meta: { title: '引导页面-图片版' },
      },
      {
        path: '/test-page/guide-simple',
        component: () => import('@/views/test-page/guide-simple/index.vue'),
        meta: { title: '引导页面-简化版' },
      },
      {
        path: '/test-page/guide-two',
        component: () => import('@/views/test-page/guide-two/index.vue'),
        meta: { title: '引导页面-分段版' },
      },
      {
        path: '/test-page/back-to-top',
        component: () => import('@/views/test-page/back-to-top/index.vue'),
        meta: { title: '返回顶部' },
      },
      {
        path: '/test-page/index',
        component: () => import('@/views/test-page/index.vue'),
        meta: { title: '图片上传' },
      },
      {
        path: '/test-page/search-form',
        component: () => import('@/views/test-page/search-form/index.vue'),
        meta: { title: '筛选表单-表格-弹窗' },
      },
      {
        path: '/test-page/interactive',
        component: () => import('@/views/test-page/interactive/index.vue'),
        meta: { title: '后台交互' },
      },
      {
        path: '/test-page/http',
        component: () => import('@/views/test-page/http-page/index.vue'),
        meta: { title: 'HTTP例子' },
      },
      {
        path: '/test-page/auth',
        component: () => import('@/views/test-page/auth/index.vue'),
        meta: { title: '权限控制' },
      },
      {
        path: '/test-page/container',
        component: () => import('@/views/test-page/router-container/index.vue'),
        meta: { title: '路由容器-富文本' },
      },
      {
        path: '/test-page/excel',
        component: () => import('@/views/test-page/excel/index.vue'),
        meta: { title: 'excel操作' },
      },
      {
        path: '/test-page/ui',
        component: () => import('@/views/test-page/UI/index.vue'),
        meta: { title: 'UI' },
      },
      {
        path: '/test-page/font-awesome',
        component: () => import('@/views/test-page/font-awesome/index.vue'),
        meta: { title: 'font-awesome用法' },
      },
      {
        path: '/test-page/preview-video',
        component: () => import('@/views/test-page/preview-video/index.vue'),
        meta: { title: '视频预览' },
      },
    ],
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    name: '',
    hidden: true,
    children: [
      {
        path: '/change-password',
        hidden: true,
        component: () => import('@/views/change-password/index'),
        meta: { title: '修改密码', icon: 'dashboard' },
      },
    ],
  },

  {
    path: '/login',
    hidden: true,
    meta: { title: '登录' },
    component: () => import('@/views/login/index'),
  },
];
