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

export async function queryAd() {
  return request({
    url: '/config/right/ad',
  });
}

export async function addAd(data) {
  return request({
    url: '/config/right/ad',
    method: 'post',
    data,
  });
}
export async function updateAd(data) {
  return request({
    url: '/config/right/ad',
    method: 'put',
    data,
  });
}
