import { reqShopCart, reqdeleteCart, reqcheckCart } from "@/network";

export default {
  state: {
    shopCartList: [],
  },
  mutations: {
    SHOPCARTLIST(state, shopcartlist) {
      state.shopCartList = shopcartlist;
    },
  },
  actions: {
    // 获取购物车学习
    async shopCartList({ commit }) {
      let result = await reqShopCart();
      if (result.code == 200) {
        commit("SHOPCARTLIST", result.data);
      }
    },
    // 删除购物车信息
    async deleteCartList({ commit }, { skuId }) {
      let result = await reqdeleteCart(skuId);
      if (result.code == 200) {
        return "OK";
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
    // 修改购物车产品状态
    async checkCartList({ commit }, { skuId, isChecked }) {
      let result = await reqcheckCart(skuId, isChecked);
      if (result.code == 200) {
        return "OK";
      } else {
        return Promise.reject(new Error("failed"));
      }
    },
    // 选中删除
    checkeddelete({ dispatch, getters }) {
      let promiseAll = [];
      getters.cartList.cartInfoList.forEach((item) => {
        if (item.isChecked == 1) {
          promiseAll.push(dispatch("deleteCartList", { skuId: item.skuId }));
        }
      });
      return Promise.all(promiseAll);
    },
    // 全选按钮
    checkAllShop({ dispatch, getters }, ischecked) {
      let promiseAll = [];
      getters.cartList.cartInfoList.forEach((item) => {
        promiseAll.push(
          dispatch("checkCartList", {
            skuId: item.skuId,
            isChecked: ischecked,
          })
        );
      });
      return Promise.all(promiseAll);
    },
  },
  getters: {
    cartList(state) {
      return state.shopCartList[0] || [];
    },
  },
};
