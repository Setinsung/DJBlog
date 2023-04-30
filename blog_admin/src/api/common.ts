import { request } from './request';

export async function upload(data) {
  return request({
    url: '/upload',
    method: 'POST',
    data,
  });
}
