import { request } from '../utils/request'

export async function getTags (params) {
  return request({
    url: '/tags',
    params,
  })
}