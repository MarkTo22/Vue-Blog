import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import VueRouter from 'vue-router'
import 'iview/dist/styles/iview.css'
import { routes } from './routes'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { store } from './store';
import NProgress from 'vue-nprogress';//引入进度条
import VueQuillEditor from 'vue-quill-editor';//引入vue-quill-editor富文本编辑器

Vue.use(VueAxios, axios)
Vue.use(VueRouter);
Vue.use(NProgress);//使用NProgress
Vue.use(VueQuillEditor);

const nprogress = new NProgress()

const router = new VueRouter({
  routes
})

Vue.use(iView);

new Vue({
  el: '#app',
  nprogress,
  router,
  store,
  render: h => h(App)
})