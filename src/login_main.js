// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import login from './login';
import router from './router/router.js';
// import VueJsonp from 'vue-jsonp';
// import store from './vuex/store.js';
import location from './location/location.js';
import './directive/mixin.js';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/reset.css';
import './assets/css/globel.css';
import './assets/font/iconfont.css';
import './request';
// import './assets/css/element.less';
import VueParticles from 'vue-particles';
Vue.use(VueParticles);
import {
  Form,
  FormItem,
  Input,
  Button,
  Message,
  MessageBox
} from 'element-ui';
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
// Vue.use(VueJsonp);
Object.defineProperty(Vue.prototype, '$location', { value: location });

var tiems;
$(window).resize(function() {
  if (tiems) {
    clearTimeout(tiems);
  }
  tiems = setTimeout(function() {
    var win = window.innerWidth >= 1024 ? window.innerWidth : 1024;
    document.getElementsByTagName('html')[0].style.fontSize = win / 10.24 + 'px';
  }, 350);

});
var win = window.innerWidth >= 1024 ? window.innerWidth : 1024;
document.getElementsByTagName('html')[0].style.fontSize = win / 10.24 + 'px';



Vue.config.productionTip = false;

//启动应用
// const app = new Vue({ //eslint-disable-line no-unused-vars
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app');
// 
 // 启动应用
const app = new Vue({ //eslint-disable-line no-unused-vars
  router,
  // store,
  render: h => h(login)
}).$mount('#login');
