import { request } from '../request';

export async function queryHome() {
  return request({
    url: '/config/home',
  });
}
export async function addHome(data) {
  return request({
    url: '/config/home',
    method: 'POST',
    data,
  });
}

export async function updateHome(data) {
  return request({
    url: '/config/home',
    method: 'PUT',
    data,
  });
}
