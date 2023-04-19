import axios from 'axios';

export const request = (config) => {
  const http = axios.create({
    baseURL: '/api/v1',
    // timeout: 5000
  });

  // 请求拦截，对请求参数处理
  http.interceptors.request.use(
    (config) => {
      if (config.method === 'put' || config.method === 'delete') {
        config.url = `${config.url}/${config.data._id || config.data.id}`;
        // config.url += config.data._id || config.data.id;
      }
      return config;
    }
    // (error) => {}
  );

  // 响应拦截，对响应数据处理
  http.interceptors.response.use(
    (res) => {
      return res.data ? res.data : res;
    },
    (error) => {
      // 这里暂时打印错误信息
      console.log('error===', error.response);
    }
  );

  return http(config);
};
