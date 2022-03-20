import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 图片懒加载插件
import logo from 'assets/logo.png'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: logo,
})
// 表单验证
import "@/plugins/validate";
// 引用三级联动组件，多个页面都要用，设置为全局组件
import TypeNav from 'components/TypeNav'
// 注册轮播图全局1组件
import Carsousel from 'components/Carsousel'
// 注册分页器
import Pagination from 'components/Pagination'
import * as API from './network'

// 添加elementUI组件
import { Button} from 'element-ui';

import { MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;


Vue.config.productionTip = false
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsousel.name, Carsousel)
Vue.component(Pagination.name, Pagination)
// 引入MockServe.js
import '@/mock/mockServe'
// 引入swiper样式
import "swiper/css/swiper.css"
new Vue({
  router,
  store ,
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  render: h => h(App),
}).$mount('#app')
