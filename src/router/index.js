import Vue from "vue";
import Router from "vue-router";
import { routes } from "./routers";
// 引入store模块
import store from "../store";
import { Store } from "vuex";

Vue.use(Router);

// 重新定义router原型的push，解决重复点击同一个路由的报错
let originPush = Router.prototype.push;
let originReplace = Router.prototype.replace;
// 重写push|replace
// 第一个参数：告诉原来的push方法，你往哪里跳转（传递哪些参数—）
// 第二个参数：成功回调
// 第三个参数：失败回调
// call||apply的区别
// 相同点，都可以调用函数一次，都可以篡改函数的上下文一次
// 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
Router.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
Router.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

const router = new Router({
  routes,
  mode: "history",
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 };
  },
});
router.beforeEach(async (to, from, next) => {
  // if(store.state.user.token)
  // console.log(store.state.user.token)
  // console.log(to.path)
  if (store.state.user.token) {
    if (to.path == "/login"||to.path == "/register") {
      next("/home");
    } else {
      if (store.state.user.userInfo.name) {
        next();
      } else {
        // 通过token获取用户名的信息
        try {
          await store.dispatch("userInfo");
          next();
        } catch (error) {
          await store.dispatch("logOut");
          next("/login");
        }
      }
    }
  } else {
    let path = ['/pay','/paysuccess','/center/myorder']
    if (path.includes(to.path)) {
      next("/login?next="+to.path);
    } else {
      next();
    }
  }
});

export default router;
