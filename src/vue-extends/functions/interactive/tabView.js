import store from '@/store';
/**
 * 关闭当前tag页
 */
function closeTabView() {
  store.dispatch('closeTabView', this);
}
export const $closeTabView = closeTabView;
/**
 * 刷新tab页面
 */
function refreshTabView() {
  store.dispatch('refreshTabView', this);
}
export const $refreshTabView = refreshTabView;
