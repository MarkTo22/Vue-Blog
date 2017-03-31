import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import VueRouter from 'vue-router'
import 'iview/dist/styles/iview.css'
import { routes } from './routes'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { store } from './store';

Vue.use(VueAxios, axios)
Vue.use(VueRouter);

const router = new VueRouter({
  routes
})

Vue.use(iView);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})