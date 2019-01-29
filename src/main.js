import Vue from 'vue';
import jQuery from 'jquery';
import App from './App.vue';
import router from './router';
import store from './store';
import Chess from '../node_modules/chess.js';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

global.jQuery = jQuery;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
