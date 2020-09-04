import axios from 'axios'

// 创建axios实例
const service = axios.create({
  // baseURL: 'http://192.168.0.3:8888', // api的base_url
  baseURL: 'http://i.yd-jxt.com/v2', // api的base_url
  timeout: 5000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
  // config.headers['Authorization'] = 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxNDM4OTk5IiwidXNlcklkIjoiYjc2NTkxMzcwOGE5NDllZjg2NTZlZGQ0ZjhhZjdhM2YiLCJ1c2VyTmFtZSI6IuWkqemfs-S4reWtpueuoeeQhuWRmCIsInh4ZG0iOiIxNDM4IiwidHlwZSI6IjIiLCJleHBpcmUiOjE1NjU0MjU1MDM1MDZ9.ASRhz3ZL5itsl-h1yAgtEi47KDZdR_iXCHvnqtyCUiymA8lmWlEo35Y4axXAcWfebrHEiVV2XRFwj3LxgoWiDPEwRsZVaZfOB_uYIP0J23K_pAFX2NbMa6gsYuqaEEE9He_XcBS_iZ4wNSidtdOuc5QnLTrRf4Q6b9B08h4ah9c'
  // console.log(config,808)
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    if (response.status === 200 || response.status === 304) {
      
      return response.data
    } else {
      console.log('网络不太给力哦，检查一下您的网络再试吧！')
      
    }
  },
  error => {
    console.log(JSON.stringify(error.response.status)) // for debug
    console.log('网络不太给力哦，检查一下您的网络再试吧！')
    let error_status = error.response.status
    // alert(JSON.stringify(error.response.status))
    if(error_status == 401 || error_status == 40101) {
      window.localStorage.removeItem('admin-token')
      window.$myConfirmBox(true,(isOk)=>{
        window.location.hash = 'Login'
        window.location.reload()
      },'返回', '用户信息失效','重新登录')
    }
    return Promise.reject(error)
  }
)

export default service
