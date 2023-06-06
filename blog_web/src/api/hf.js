import { request } from '../utils/request'

export async function getHF (params) {
  return request({
    url: '/config/hf',
    params,
  })
}