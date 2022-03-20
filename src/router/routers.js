const Home = () => import("views/Home");
const Login = () => import("views/Login");
const Register = () => import("views/Register");
const Search = () => import("views/Search");
const Detail = () => import("views/Detail");
const AddCartSuccess = () => import("views/AddCartSuccess");
const ShopCart = () => import("views/ShopCart");
const Trade = () => import("views/Trade");
const Pay = () => import("views/Pay");
const PaySuccess = () => import("views/PaySuccess");
const Center = () => import("views/Center");
const GroupOrder = () => import("views/Center/groupOrder");
const MyOrder = () => import("views/Center/myOrder");

export const routes = [
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
    meta: {
      show: true,
    },
  },
  {
    path: "/login",
    component: Login,
    meta: {
      show: false,
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      show: false,
    },
  },
  {
    // 加上keyword表示params可传可不串
    path: "/search/:keyword?",
    component: Search,
    meta: {
      show: true,
    },
    name: "search",
    // 第一种传参
    // props: true
    // 第二种
    // props: {a: 1, b: 3}
    // 第三种路由组件传参
    // props: ($route) => {
    //   return {keyword: $route.params.keyword, k: $route.query.key}
    // }
  },
  {
    path: "/detail/:goodsId?",
    component: Detail,
    meta: {
      show: true,
    },
  },
  //加入购物车跳转页面
  {
    path: "/addcartsuccess/:skuNum?",
    component: AddCartSuccess,
    name: "addcartsuccess",
    meta: {
      show: true,
    },
  },
  // 购物车
  {
    path: "/shopcart",
    component: ShopCart,
    meta: {
      show: true,
    },
  },
  // 结算界面trade
  {
    path: "/trade",
    component: Trade,
    meta: {
      show: true,
    },
    beforeEnter: (to, from, next) => {
      if (from.path == "/shopcart") {
        next();
      } else {
        next(from.path);
      }
    },
  },
  // 订单页面pay
  {
    path: "/pay",
    component: Pay,
    meta: {
      show: true,
    },
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade") {
        next();
      } else {
        next(to.path);
      }
    },
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    meta: {
      show: true,
    },
  },
  // 个人中心
  {
    path: "/center",
    component: Center,
    children: [
      {
        path: "/center",
        redirect: "myorder",
      },
      {
        path: "myorder",
        component: MyOrder,
      },
      {
        path: "grouporder",
        component: GroupOrder,
      },
    ],
    meta: {
      show: true,
    },
  },
];
