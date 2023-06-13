import { request } from '../utils/request'

export async function getHome (params) {
  return request({
    url: '/config/home',
    params,
  })
}