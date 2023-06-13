import Vue from "vue"
import Vuex from "vuex"
import appModule from "./store/modules/app"
import App from "./App.vue"
import router from "./router"
import { isPC } from "@/utils";
import {
  Button,
  Select,
  AppBar,
  Menu,
  Icon,
  Popover,
  List,
  Avatar,
  Paper,
  Pagination,
  Chip,
  Carousel,
  Card,
  Tooltip,
  TextField,
  Dialog,
  Divider,
  Badge,
  Form,
  AutoComplete,
  Snackbar,
  Picker,
  Alert,
  Drawer,
  GridList,
  BottomSheet,
  Progress,
  Grid,
  LoadMore,
  SubHeader,
} from "muse-ui"
import VueLazyload from 'vue-lazyload'
import tagCloud from 'v-tag-cloud'
import theme from 'muse-ui/lib/theme'

import "muse-ui/lib/styles/base.less"
import "muse-ui/lib/styles/theme.less"
import "./global.less";
import Helpers from 'muse-ui/lib/Helpers';
Vue.use(Vuex);
Vue.use(Button)
Vue.use(Select)
Vue.use(AppBar)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Popover)
Vue.use(List)
Vue.use(Avatar)
Vue.use(Paper)
Vue.use(Pagination)
Vue.use(Chip)
Vue.use(Carousel)
Vue.use(Card)
Vue.use(Tooltip)
Vue.use(TextField)
Vue.use(Dialog)
Vue.use(Divider)
Vue.use(Badge)
Vue.use(Form)
Vue.use(AutoComplete)
Vue.use(Snackbar)
Vue.use(Picker)
Vue.use(Alert)
Vue.use(Drawer)
Vue.use(GridList)
Vue.use(BottomSheet)
Vue.use(Progress)
Vue.use(Grid)
Vue.use(LoadMore)
Vue.use(SubHeader)
Vue.use(tagCloud)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "http://www.nevergiveupt.top/loading.gif",
  loading: "http://www.nevergiveupt.top/loading.gif",
  attempt: 1,
})
Vue.use(Helpers)


//过滤器
import * as filters from "@/utils/filter.js"
Object.keys(filters).forEach((k) => Vue.filter(k, filters[k])) //注册过滤器


theme.add('selfDark', {
  primary: '#00e676',
  secondary: '#ff4081',
  success: '#4caf50',
  warning: '#fdd835',
  info: '#2196f3',
  error: '#f44336',
  track: '#757575',
  text: {
    primary: '#fff',
    secondary: 'rgba(255, 255, 255, 0.7)',
    alternate: '#303030',
    disabled: 'rgba(255, 255, 255, 0.3)',
    hint: 'rgba(255, 255, 255, 0.3)' // 提示文字颜色
  },
  divider: 'rgba(255, 255, 255, 0.3)',
  background: {
    paper: '#424242',
    chip: '#616161',
    default: '#303030'
  }
}, 'dark')

theme.add('selfLight', {
  primary: '#00e676',
  secondary: '#ff4081',
  success: '#4caf50',
  warning: '#fdd835',
  info: '#2196f3',
  error: '#f44336',
  track: '#bdbdbd',
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'gba(0, 0, 0, 0.54)',
    alternate: '#fff',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)' // 提示文字颜色
  },
  divider: 'rgba(0, 0, 0, 0.12)',
  background: {
    paper: '#fff',
    chip: '#e0e0e0',
    default: '#fafafa'
  }
}, 'light')

const hours = new Date().getHours()
let defaultTheme = ''
if (hours > 6 && hours < 18) {
  defaultTheme = 'selfLight'
}
else {
  defaultTheme = 'selfDark'
}
const selfTheme = localStorage.getItem('selfTheme') || defaultTheme

theme.use(selfTheme)
theme.use('selfDark')


Vue.prototype.avatar = "http://nevergiveupt.top/index.jpg"
Vue.prototype.filterDate = filters.filterDate //时间过滤方法
Vue.prototype.theme = theme
Vue.prototype.isPC = isPC;


Vue.config.productionTip = false

const store = new Vuex.Store({
  modules: {
    app: appModule, // 注册 app module
  },
});


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app") 