const template = {
  state: {
    editTemplateData: {},
  },
  mutations: {
    SET_EDIT_DATA: (state, data) => {
      state.editTemplateData = data;
    },
    GET__EDIT_DATA: (state) => state.editTemplateData,
  },
  actions: {},
  getters: {},
};

export default template;
