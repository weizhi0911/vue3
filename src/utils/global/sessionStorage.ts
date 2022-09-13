/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription: 存储在 sessionStorage 的数据，设置和获取时统一进行 JSON 格式化
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2019-12-27 15:25:59
 * @LastEditTime: 2020-04-07 17:24:47
 */

const SEARCH = 'SEARCH'

// 对操作 key 的方法进行统一处理
const getItem = (key: string) => {
  const item = sessionStorage.getItem(key)
  return item ? JSON.parse(item) : item
}
const setItem = (key: string, val: any) =>
  sessionStorage.setItem(key, JSON.stringify(val))
const removeItem = (key: string) => sessionStorage.removeItem(key)

// 暴露出去操作 key 的方法
export const getSearch = () => getItem(SEARCH)
export const setSearch = (val: any) => setItem(SEARCH, val)
export const delSearch = () => removeItem(SEARCH)
