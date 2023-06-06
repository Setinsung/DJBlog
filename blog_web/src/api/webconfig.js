import { request } from '../utils/request'

export async function getAd (params) {
  return request({
    url: '/config/right/ad',
    params,
  })
}
export async function getIntro (params) {
  return request({
    url: '/config/right/introduction',
    params,
  })
}
