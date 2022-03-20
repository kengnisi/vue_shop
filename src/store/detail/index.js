import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/network"
// 封装游客身份模块uuid，生成一个随机字符串（生成之后不变）
import { getUUID } from "@/utils/uuid_token"

const state = {
  goodsInfo: {},
  // 游客临时身份
  uuid_token: getUUID()
}
const mutations = {
  GOODSINFO(states, goodsInfo) {
    states.goodsInfo = goodsInfo
  }
}
const actions = {
  // 获取产品信息
  async GoodsInfo({commit}, goodsId) {
    let result = await reqGoodsInfo(goodsId)
    if(result.code == 200){
      commit("GOODSINFO", result.data)
    }
  },
  // 加入购物车或者修改购物车产品数量
  async addOrUpdateShopCart({commit}, {skuId, skuNum}) {
    // 发请求:前端带一些参数给服务器【需要存储这些数据】，存储成功，没有返回数据
    // 不需要再三连环（仓库存储数据）
    // 注意:async函数执行返回的结果一定时promise
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if(result.code == 200) {
      return 'OK';
    }else {
      return Promise.reject(new Error('fail'))
    }
  }
}
const getters = {
  // 获取产品具体信息
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {}
  },
  // 获取导航信息
  categoryView(state) {
    return state.goodsInfo.categoryView || {}
  },
  // 获取选购信息
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}