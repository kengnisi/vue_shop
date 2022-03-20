import { reqGetSearchInfo } from "@/network"
export default {
  state: {
    searchList: {}
  },
  mutations: {
    GETSEARCHLIST(state, searchList) {
      state.searchList = searchList
    }
  },
  actions: {
    // 获取search模块数据
    async getSearchList({commit}, payload = {}) {
      let result = await reqGetSearchInfo(payload)
      if(result.code == 200) {
        commit('GETSEARCHLIST', result.data);
      }
    }
  },
  getters: {
    goodsList(state) {
      // 防止网络差时，还没返回数据会编程undifined,所有返回一个空数组
      return state.searchList.goodsList || []
    },
    // 手机配置信息
    attrsList(state) {
      return state.searchList.attrsList || []
    },
    // 手机品牌信息
    trademarkList(state) {
      return state.searchList.trademarkList || []
    },
    // 搜索结果数量
    gettotal(state) {
      return state.searchList.total || 0
    }
  }
}