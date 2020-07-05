/*
封装axois以复用
 */
import axios from 'axios'

const reqPrefix = 'http://127.0.0.1:8089/api' // 请求地址

// 配置拦截器
const instance = axios.create()
instance.defaults.baseURL = reqPrefix

export default instance
