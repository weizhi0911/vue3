// 全局公共自定义变量类型声明入口，适用于确定的变量类型
export type CheckboxOption = {
  checked: boolean
  clickCheckedAll?: boolean
  name?: string
  children?: CheckboxOption[]
  // 下面两个选项是做全选用的，在 Checkboxs 中 自动向 选项中注入
  checkedCount?: number
  childrenCount?: number
  // 用于存储其它数据
  other?: any
}

export type RowUpOption = {
  size: number
  step: number
  obj: {}
  prop: string
  start?: number
  duration?: number
}

export type CopyOption = {
  config?: {},
  successMsg?: string
  errorMsg?: string
  e?: Event
  callback?:Function
}
