import { request } from './request';

export async function getList(params) {
  return request({
    url: '/categories',
    params,
  });
}
