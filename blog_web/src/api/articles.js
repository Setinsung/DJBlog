import { request } from '../utils/request'

export async function getList (params) {
  return request({
    url: '/articles',
    params,
  })
}
export async function getArticle (params) {
  return request({
    url: `/articles/${params.id}`,
    params
  })
}