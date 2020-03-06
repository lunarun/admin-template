const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  errorLogs: (state) => state.errorLog.logs,
  token: (state) => state.user.token,
};
export default getters;
