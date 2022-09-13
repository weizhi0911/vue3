// 业务接口声明入口，适用于 规约 class 类必须要实现接口中的内容
export interface Copy {
  success: Function
  error: Function
  clear: Function
}

export interface Scroll {
  getWidth: Function
  close: Function
  open: Function
  top: Function
  topHandle: Function
}
