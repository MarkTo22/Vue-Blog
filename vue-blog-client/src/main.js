import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import VueRouter from 'vue-router'
import 'iview/dist/styles/iview.css'   // 使用 CSS
import { routes } from './routes'

Vue.use(VueRouter);

const router = new VueRouter({
  routes
})

Vue.use(iView);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
