import axios from 'axios'

// 引入进度条
import nprogress from 'nprogress'
import "nprogress/nprogress.css"

// 最终方案
  // 1.创建axios实例
  const mockRequests = axios.create({
          baseURL: '/mock',
          timeout: 5000
        })
  // 2.axios拦截器
  // 请求拦截
  mockRequests.interceptors.request.use((config) => {
    nprogress.start()
    return config
  }, (err) => {
  })
  // 响应拦截
  mockRequests.interceptors.response.use((res) => {
    // 一般只需要返回数据就行
    nprogress.done()
    return res.data
  }, (err) => {
    return Promise.reject(new Error('faile'))
  })

  // 由于instance本身返回的就是一个promise对象,所以直接返回请求结果就行了
  // 3.发送网络请求

export default mockRequests;