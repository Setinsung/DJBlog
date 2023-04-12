import Vue from 'vue'
import App from './App.vue'
import router from './router.js'

Vue.config.productionTip = false

import { isPC } from '@/utils'
// 把是否为PC挂载到Vue的原型上，使其全局可用
// 把头像挂载到Vue的原型上，使其全局可用
Vue.prototype.isPC = isPC
Vue.prototype.avatar = "http://nevergiveupt.top/index.jpg"


import './global.less';
// 用于适配大屏幕和移动端
import 'lib-flexible';

import 'muse-ui/lib/styles/base.less';
import {
  Button,
  Select,
  AppBar,
  Icon,
  Menu,
  List,
  Popover,
  Avatar,
  BottomSheet,
  Paper,
  Pagination,
  Chip,
  Carousel,
  Card
} from 'muse-ui';
import 'muse-ui/lib/styles/theme.less';
Vue.use(Button);
Vue.use(Select);
Vue.use(AppBar);
Vue.use(Icon);
Vue.use(Menu);
Vue.use(List);
Vue.use(Popover);
Vue.use(Avatar);
Vue.use(BottomSheet);
Vue.use(Paper);
Vue.use(Pagination);
Vue.use(Chip);
Vue.use(Carousel);
Vue.use(Card);

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "http://www.nevergiveupt.top/loading.gif",
  loading: "http://www.nevergiveupt.top/loading.gif",
  attempt: 1,
});


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
