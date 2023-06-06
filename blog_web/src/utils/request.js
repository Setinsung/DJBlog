import axios from 'axios'


export const request = (config) => {
  const http = axios.create({
    baseURL: '/web/v1',
    // timeout: 5000
  })
  const putall = ['/articles/collectStatus']
  // 请求拦截，对请求参数处理
  http.interceptors.request.use(
    (config) => {
      if ((config.method === 'put' && !putall.includes(config.url)) || config.method === 'delete') {
        config.url = `${config.url}/${config.data._id || config.data.id}`
      }
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }
    // (error) => {}
  )

  // 响应拦截，对响应数据处理
  http.interceptors.response.use(
    (res) => {
      return res.data ? res.data : res
    },
    (error) => {
      // 这里暂时打印错误信息
      console.log('error===', error.response)
      if (error.response && error.response.status) {
        if (error.response.status === 403) {
          // location.href = '/403';
          // location.href = '/#/admin/login'

        }
        if (error.response.status === 401) {
          // location.href = '/401';
          // location.href = '/#/admin/login'

        }
        if (error.response.status === 422) {
          const detail = error.response.data.detail
          const errorMsg = detail.map((item) => `Field (${item.field}) ${item.message}`).join('，')
          // Notification.error({
          //   title: '参数错误',
          //   content: errorMsg,
          // })
          return {
            code: error.response.status,
            msg: errorMsg,
          }
        }
      }
    }
  )

  return http(config)
}
