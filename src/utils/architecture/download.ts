import { Download as InterfaceDownload } from '@archInterface/index'
import Message from '@archUtils/message'
const message = new Message()
const isIEBrowser = (): boolean =>
  typeof window.navigator.msSaveOrOpenBlob === 'function'

export default class Download implements InterfaceDownload {
  error(filenamePrefix = ''): Error {
    const msg = filenamePrefix + ' 导出 excel 错误，请联系管理人员，谢谢!'

    message.error(msg)

    throw new Error(msg)
  }

  getFilenameSuffix(contentDisposition: string): string {
    return contentDisposition.length >= 2
      ? contentDisposition.split('=')[1]
      : ''
  }

  forIEBrowser(blob: Blob, filename: string): void {
    window.navigator.msSaveOrOpenBlob(blob, filename)
  }

  forMainstreamBrowser(blob: Blob, filename: string): void {
    // 链接对象地址
    const objectUrl = (window.URL || window.webkitURL).createObjectURL(blob)
    // 使用 a 标签进行下载
    const a = document.createElement('a')

    // 默认隐藏
    a.style.display = 'none'
    // 下载链接
    a.href = objectUrl
    // 下载后文件名
    a.download = filename

    // 添加到 body 标签中
    document.body.appendChild(a)

    // 程序触发 a 标签点击事件，进行下载
    a.click()

    // 下载完成移除 a 标签
    document.body.removeChild(a)
    // 只要映射存在，Blob 就不能进行垃圾回收，因此一旦不再需要引用，就必须小心撤销 URL，释放掉 blob 对象。
    window.URL.revokeObjectURL(objectUrl)
  }

  download(blob: Blob, filename: string): void {
    isIEBrowser()
      ? this.forIEBrowser(blob, filename)
      : this.forMainstreamBrowser(blob, filename)
  }
}
