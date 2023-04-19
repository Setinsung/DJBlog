import { request } from './request';

export async function getList(params) {
  return request({
    url: '/categories',
    params,
  });
}
export async function create(data) {
  return request({
    url: '/categories',
    method: 'POST',
    data,
  });
}
