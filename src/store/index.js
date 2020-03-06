import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import errorLog from './modules/errorLog';
import tagsView from './modules/tagsView';
import template from './modules/template';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    errorLog,
    tagsView,
    app,
    template,
  },
  getters,
});

export default store;
