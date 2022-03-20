import requests from "./request";
import mockRequests from'./mockAjax'
// 三级联动接口
export const reqCategroyList = () => {
  return requests.get('/product/getBaseCategoryList')
}

// 获取轮播图数据
export const reGetBannerList = ()=>mockRequests.get('/banner')

// 获取floor数据
export const reqGetFloorList = () => mockRequests.get('/floor')

// 获取search页面信息,地址：/api/list, 方式post
export const reqGetSearchInfo = (params) => {
  return requests({
    url: '/list',
    method: 'post',
    data: params
  })
}
// 获取商品详情信息
export const reqGoodsInfo = (goodsId) => {
  return requests({
    url: `/item/${goodsId}`, 
    method: 'get'
  })
}
// 将产品添加到购物车中（获取更新某一个产品的个数）
///api/cart/addToCart/{skuId}/{skuNum} post
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
  })
}

// 获取购物车
// /api/cart/cartList
export const reqShopCart = () => {
  return requests({
    url: '/cart/cartList',
    method: 'get'
  })
}
// 删除购物车数据
// /api/cart/deleteCart/{skuId}
export const reqdeleteCart = (skuId) => {
  return requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
  })
}

// 切换购物车的商品状态
// /api/cart/checkCart/{skuID}/{isChecked}
export const reqcheckCart = (skuId, isChecked) => {
  return requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
  })
}
// 获取验证码
// /api/user/passport/sendCode/phone
export const reqGetCode = (phone) => {
  return requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
  })
}

// 注册
// /api/user/passport/registe
export const reqRegister = (data) => {
  return requests({
    url: '/user/passport/register',
    data,
    method: 'post'
  })
}

// 登录
// /api/user/passport/login
export const reqUserLogin = (data) => {
  return requests({
    url: '/user/passport/login',
    data,
    method: 'post'
  })
}

// 通过token获取用户信息
// /api/user/passport/auth/getUserInfo
export const reqUserInfo = () => {
  return requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
  })
}
// 退出登录
// /api/user/passport/logout
export const logOut = () => {
  return requests({
    url: '/user/passport/logout',
    method: "get"
  })
}

// 获取用户地址信息
// api/user/userAddress/auth/findUserAddressList
export const userAddress = () => {
  return requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
  })
}
// 获取订单trade信息
// /api/order/auth/trade
export const userTrade = () => {
  return requests({
    url: '/order/auth/trade',
    method: 'get'
  })
}

// trade页面提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}
export const submitOrder = (tradeNo, data) => {
  return requests({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: "post"
  })
}
// 订单支付，通过订单号获取信息
// /api/payment/weixin/createNative/{orderId}
export const userOrder = (orderId) => {
  return requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
  })
}

// 查看支付订单状态
// /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) => {
  return requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
  })
}

// 请求我的订单列表
// /api/order/auth/{page}/{limit}
export const reqMyOrder = (page, limit) => {
  return requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
  })
}