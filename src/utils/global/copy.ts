import ClipboardJS from 'clipboard'
import Message from '@archUtils/message'
import { CopyOption } from '@globalType/index'
import { Copy as InterfaceCopy } from '@bizInterface/index'

const message = new Message()

export default class Copy implements InterfaceCopy {
  clipboard: ClipboardJS

  constructor(selector: string | HTMLElement, option?: CopyOption) {
    const config = option ? option['config'] : undefined
    const successMsg = option ? option['successMsg'] : undefined
    const errorMsg = option ? option['errorMsg'] : undefined
    const e = option ? option['e'] : undefined
    const callback = option ? option['callback'] : undefined

    this.clipboard = new ClipboardJS(selector, config)

    successMsg === undefined
      ? this.success('复制成功', callback)
      : this.success(successMsg, callback)

    errorMsg === undefined ? this.error() : this.error(errorMsg)

    if (e && e.target) {
      e.target['click']()
    }
  }

  success(msg?: string, callback?: Function): void {
    this.clipboard.on('success', (e: Event): void => {
      callback && callback()

      message.success({ msg, offset: 450 })
      this.clear(e)
    })
  }

  error(
    msg = '由于您的浏览器不兼容或当前网速较慢，复制失败，请手动复制或更换主流浏览器！'
  ): void {
    this.clipboard.on('error', (e: Event): void => {
      msg && message.error({ msg, offset: 450 })
      this.clear(e)
    })
  }

  clear(e: {}): void {
    e['clearSelection']()
    this.clipboard.destroy()
  }
}
