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

export async function update(data) {
  return request({
    url: '/categories',
    method: 'PUT',
    data,
  });
}

export async function remove(data) {
  return request({
    url: '/categories',
    method: 'DELETE',
    data,
  });
}
