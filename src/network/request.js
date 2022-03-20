import axios from 'axios'

// 引入进度条
import nprogress from 'nprogress'
import "nprogress/nprogress.css"

// 引入store得到游客账号
import store from '@/store'

// 最终方案
  // 1.创建axios实例
  const requests = axios.create({
          baseURL: '/api',
          timeout: 5000
        })
  // 2.axios拦截器
  // 请求拦截
  requests.interceptors.request.use((config) => {
    // 在config请求头headers添加游客账号
    if(store.state.detail.uuid_token) {
      config.headers.userTempId = store.state.detail.uuid_token
    }
    // 在config请求头token添加用户的token
    if(store.state.user.token) {
      config.headers.token = store.state.user.token
    }
    nprogress.start()
    return config
  }, (err) => {
  })
  // 响应拦截
  requests.interceptors.response.use((res) => {
    // 一般只需要返回数据就行
    nprogress.done()
    return res.data
  }, (err) => {
    return Promise.reject(new Error('faile'))
  })

  // 由于instance本身返回的就是一个promise对象,所以直接返回请求结果就行了
  // 3.发送网络请求
export default requests;