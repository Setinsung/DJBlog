import { request } from '../utils/request'

export async function getAbout (params) {
  return request({
    url: '/about',
    params,
  })
}