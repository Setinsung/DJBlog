import { request } from './request';

export async function queryAbout() {
  return request({
    url: '/about',
  });
}
export async function addAbout(data) {
  return request({
    url: '/about',
    method: 'POST',
    data,
  });
}

export async function updateAbout(data) {
  return request({
    url: '/about',
    method: 'PUT',
    data,
  });
}
