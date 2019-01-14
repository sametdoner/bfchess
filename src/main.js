import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue';
import JQuery from 'jquery';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
global.jQuery = jQuery;
Vue.config.productionTip = false;

// global.bootstrap = bootstrap;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
