/*
  注意：http请求的 other 参数中 loading 配置 对应 open 方法的 config 配置

  使用方式：
    调用：
      var loading = new Loading(className)

      参数：
        className  String   自定义 loading 类名，更改 loading 样式

    方法：
      open(config)      // 开启loading

        参数
          config:   Object   // 配置对象
            {
              mountDom     HTMLElement   挂载 loading 父元素，默认是document.body, 适用于指定父元素中添加 loading
              type   String        loading 类型，默认是 'default' 全屏大loading， 'small' 为小 loading
              className   String   loading 样式类名，默认是 ''，内部已做了默认样式，可传递 className 自定义样式
              msg    String        loading 提示消息，默认是 '数据加载中，请稍后...'
            }

      close(mountDom)      // 关闭loading
        参数
          mountDom     HTMLElement   挂载 loading 父元素，默认是document.body, 适用于指定父元素中删除 loading

  实现方式：
    通过 css animation

  example: 想在某一个 mountDom 中使用 loading，注意：如果是一进入页面就要显示 loading，必须在 mounted 钩子中调用，否则取不到 dom

    html: <div ref="product"><div>

    js:
      mounted: function() {
        获取要挂载 loading 的 dom元素
        var productDom = this.$refs.product

        初始化一个 loading
        var loading = new Loading()

        可能是发起请求或者等待操作
        loading.open({
          mountDom: productDom, // 挂载 loading 的 dom元素
          type: 'small' // 使用小 loading
        })

        request().then(function() {
          loading.close(mountDom)
        })
      }
 */
import { LoadingConfig } from '@archType/index'
import { Loading as InterfaceLoading } from '@archInterface/index'

export default class Loading implements InterfaceLoading {
  defaultMountDom: HTMLElement
  mountDom: HTMLElement
  id: string

  constructor() {
    this.defaultMountDom = document.body
    this.mountDom = this.defaultMountDom
    this.id = 'g-loading-wrap'
  }

  open(config?: LoadingConfig): void {
    const { mountDom, id, type = 'small', className = '', msg = '' } =
      config || {}
    if (mountDom) {
      this.mountDom = mountDom
    }

    if (!this.mountDom) {
      console.error('open: not found loading mountDom')
      return
    }

    const dom = document.createElement('div')
    let generateDomFn: Function
    let normalClassName = ''

    if (type !== 'default' && this[type]) {
      generateDomFn = this[type]
      normalClassName += 'g-poa-center'
    } else {
      generateDomFn = this.default
      normalClassName += 'g-mask fixed'
    }

    dom.className = normalClassName + ' ' + className

    if (id) {
      this.id = id
    }

    dom.id = this.id

    const element = generateDomFn(msg)

    if (typeof element === 'string') {
      dom.innerHTML = element
    } else {
      dom.appendChild(element)
    }

    this.mountDom.appendChild(dom)
  }

  close(): void {
    if (!this.mountDom) {
      console.error('close: not found loading mountDom')
      return
    }

    const dom = document.getElementById(this.id)

    dom && this.mountDom && this.mountDom.removeChild(dom as HTMLElement)

    if (this.mountDom !== this.defaultMountDom) {
      this.mountDom = this.defaultMountDom
    }
  }

  default(msg = ''): string {
    return (
      '<div class="g-loading g-poa-center">' +
      '<div class="g-loading-outer g-spin-right"></div>' +
      '<div class="g-loading-inner g-spin-left"></div>' +
      (msg ? '<p class="g-loading-msg">' + msg + '</p>' : '') +
      '</div>'
    )
  }

  small(msg = '') {
    let liDomStr = ''
    for (let i = 0; i < 12; i++) {
      liDomStr += '<li class="g-spinner"></li>'
    }

    return (
      '<div class="g-loading-spinner">' +
      '<ul class="g-loading-spinner-list">' +
      liDomStr +
      '</ul>' +
      (msg ? '<p class="g-loading-spinner-msg">' + msg + '</p>' : '') +
      '</div>'
    )
  }

  gif() {
    const img = document.createElement('img')
    img.src = require('@archImg/loading.gif')
    return img
  }
}
