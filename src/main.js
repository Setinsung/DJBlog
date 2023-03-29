import Vue from 'vue'
import App from './App.vue'
import router from './router.js'

Vue.config.productionTip = false

import {isPC} from '@/utils'
// 把是否为PC挂载到Vue的原型上，使其全局可用
Vue.prototype.isPC = isPC

import './global.less';
// 用于适配大屏幕和移动端
import 'lib-flexible';

import 'muse-ui/lib/styles/base.less';
import { Button, Select, AppBar, Icon, Menu, List, Popover, Avatar,BottomSheet } from 'muse-ui';
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


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
