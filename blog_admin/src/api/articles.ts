import { request } from './request';

export async function getList(params) {
  return request({
    url: '/articles',
    params,
  });
}

export async function create(data) {
  return request({
    url: '/articles',
    method: 'post',
    data,
  });
}
export async function update(data) {
  return request({
    url: '/articles',
    method: 'put',
    data,
  });
}

export async function remove(data) {
  return request({
    url: '/articles',
    method: 'delete',
    data,
  });
}
export async function updateStatus(data) {
  return request({
    url: '/articles/status',
    method: 'put',
    data,
  });
}

export async function updatePublishStatus(data) {
  return request({
    url: '/articles/publishStatus',
    method: 'put',
    data,
  });
}
