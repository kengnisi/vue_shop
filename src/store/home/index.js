import { reqCategroyList, reGetBannerList, reqGetFloorList } from "@/network"
const state = {
  categroyList: [],
  bannerList: [],
  floorList: []
}
const mutations ={
  CATEGORYLIST(state, categroyList) {
    state.categroyList = categroyList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}
const actions = {
  async categroyList({commit}) {
    let result = await reqCategroyList();
    if(result.code == 200) {
      commit("CATEGORYLIST", result.data)
    }
  },
  // 获取首页轮播图的数据
  async getBannerList({commit}) {
    let result = await reGetBannerList()
    if(result.code == 200) {
      commit('GETBANNERLIST', result.data)
    }
  },
  // 获取floor数据
  async getFloorList({commit}) {
    let result = await reqGetFloorList()
    if(result.code == 200) {
      commit('GETFLOORLIST', result.data)
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}