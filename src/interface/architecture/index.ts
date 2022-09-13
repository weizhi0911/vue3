// 架构（不能删） - 接口声明入口，适用于 规约 class 类必须要实现接口中的内容
export interface Message {
  add: Function
  remove: Function
}

export interface Loading {
  open: Function
  close: Function
}

export interface Counter {
  count: number
  originalCount: number
  increase: Function
  decrease: Function
  reset: Function
  isRunning: Function
  isFinished: Function
}

export interface Download {
  download: Function
  error: Function
}
