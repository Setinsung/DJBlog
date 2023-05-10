import axios from 'axios';
import { Notification } from '@arco-design/web-react';

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
      }
      const token = localStorage.getItem('token');
      config.headers.Authorization = `Bearer ${token}`;
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
      if (error.response && error.response.status) {
        if (error.response.status === 403) {
          // location.href = '/403';
          location.href = '/#/admin/login';
          Notification.error({
            title: '权限错误',
            content: error.response.data.msg,
          });
        }
      }
    }
  );

  return http(config);
};
