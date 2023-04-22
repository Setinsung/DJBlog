import { request } from './request';

export async function getList(params) {
  return request({
    url: '/tags',
    params,
  });
}
export async function create(data) {
  return request({
    url: '/tags',
    method: 'POST',
    data,
  });
}

export async function update(data) {
  return request({
    url: '/tags',
    method: 'PUT',
    data,
  });
}

export async function updateStatus(data) {
  return request({
    url: '/tags/status',
    method: 'PUT',
    data,
  });
}

export async function remove(data) {
  return request({
    url: '/tags',
    method: 'DELETE',
    data,
  });
}
