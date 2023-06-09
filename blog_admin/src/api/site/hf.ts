import { request } from '../request';

export async function queryHeaderFooter() {
  return request({
    url: '/config/hf',
  });
}
export async function addHeaderFooter(data) {
  return request({
    url: '/config/hf',
    method: 'POST',
    data,
  });
}

export async function updateHeaderFooter(data) {
  return request({
    url: '/config/hf',
    method: 'PUT',
    data,
  });
}
