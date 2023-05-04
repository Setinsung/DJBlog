import { request } from '../request';

export async function queryIntroduction() {
  return request({
    url: '/config/right/introduction',
  });
}

export async function addIntroduction(data) {
  return request({
    url: '/config/right/introduction',
    method: 'post',
    data,
  });
}
export async function updateIntroduction(data) {
  return request({
    url: '/config/right/introduction',
    method: 'put',
    data,
  });
}
