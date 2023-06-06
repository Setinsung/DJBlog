import { request } from '../utils/request'

export async function getCate (params) {
  return request({
    url: '/categories',
    params,
  })
}