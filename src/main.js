// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueWechatTitle from 'vue-wechat-title'
import './rem'
import Vant from 'vant';
import {Popup} from 'vant'
import 'vant/lib/index.css';
import axios from 'axios'

Vue.use(Vant).use(Popup)

Vue.config.productionTip = false
Vue.prototype.axios = axios


Vue.use(VueWechatTitle)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
