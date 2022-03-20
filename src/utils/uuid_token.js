import {v4 as uuidv4} from 'uuid'
// 生成一个随机字符串，且每次执行不发生变化

export const getUUID = () => {
  // 先从本地存储获取uuid（判断是否有）
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  // 如果没有
  if(!uuid_token) {
    // 生成游客临时身份
    uuid_token = uuidv4();
    // 本地存储一次
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  return uuid_token
}

 // 防抖函数
 export function debouce(func, delay = 50){
  let timer = null
  return function (...args){
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}