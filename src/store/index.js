import Vue from 'vue-native-core';
import Vuex from 'vuex';
import {actions} from './auth/actions';
import {mutations} from './auth/mutations';
import {getters} from './auth/getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    users: [],
    headers:'',
    error: '',
    user: {},
    token: '',
    showLoader: false,
  },
  mutations,
  getters,
  actions
});

export default store;