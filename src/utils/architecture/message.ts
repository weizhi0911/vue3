import { MessageOption } from '@archType/index'
import { Message as InterfaceMessage } from '@archInterface/index'

const extendObject = (output: {}, input: {}): {} => {
  for (const key in input) {
    output[key] = input[key]
  }

  return output
}

export default class Message implements InterfaceMessage {
  static list: string[] = []

  timer!: number
  containerWrapId = 'g-message-wrap'
  containerClassName = 'g-message'

  success(option: MessageOption | string): void {
    this.add(option, 'success', '')
  }

  error(option: MessageOption | string): void {
    this.add(option, 'error', '')
  }

  warning(option: MessageOption | string): void {
    this.add(option, 'warning')
  }

  info(option: MessageOption | string): void {
    this.add(option, 'info')
  }

  add(
    option: MessageOption | string,
    className = 'info',
    iconChar = 'i'
  ): void {
    const extendOption = this.getExtendOption(option)
    const msg = extendOption['msg']

    if (Message.list.includes(msg)) {
      window.clearTimeout(this.timer)

      this.openTimer(extendOption)
      return
    }

    Message.list.push(msg)

    const extendClassName = `g-fade-in-top ${this.containerClassName} ${className}`
    const container = document.createElement('div')
    let containerWrap = this.getContainerWrapDom()

    container.setAttribute('msg', msg)

    if (containerWrap === null) {
      containerWrap = document.createElement('div')
      containerWrap.id = this.containerWrapId
      containerWrap.style.top = (option['offset'] || 150) + 'px'
      document.body.appendChild(containerWrap)
    }

    container.className = extendClassName
    container.innerHTML = this.generate(extendOption, iconChar)

    containerWrap.appendChild(container)

    this.openTimer(extendOption)
  }

  getContainerWrapDom() {
    return document.getElementById(this.containerWrapId)
  }

  openTimer(extendOption: {}) {
    if (extendOption['autoClose']) {
      this.timer = window.setTimeout(
        () => this.remove(),
        extendOption['timeout']
      )
    }
  }

  remove(removeAll = false, size = 1): void {
    const containerWrap = this.getContainerWrapDom()

    if (!containerWrap) {
      throw new Error('您还未创建提示')
    }

    if (removeAll) {
      Message.list = []

      containerWrap.parentElement &&
        containerWrap.parentElement.removeChild(containerWrap)

      return
    }

    const messages = Array.from(
      containerWrap.getElementsByClassName(this.containerClassName)
    )

    for (let i = 0; i < size; i++) {
      const message = messages[0]

      if (message) {
        const currMsg = message.getAttribute('msg')

        Message.list = Message.list.filter((msg: string) => msg !== currMsg)

        containerWrap.removeChild(message)
      }
    }

    if (!containerWrap.hasChildNodes() && containerWrap.parentElement) {
      containerWrap.parentElement.removeChild(containerWrap)
    }
  }

  getExtendOption(option: MessageOption | string = {}): {} {
    const defaultOption: MessageOption = {
      msg: '',
      timeout: 2000,
      openIcon: true,
      openClose: false,
      autoClose: true,
      offset: option['offset']
    }

    if (typeof option === 'string') {
      defaultOption['msg'] = option
    } else {
      extendObject(defaultOption, option)
    }

    return defaultOption
  }

  generate(
    { msg, openIcon, openClose }: MessageOption,
    iconChar = 'i'
  ): string {
    const iconDom = '<i class="icon">' + iconChar + '</i>'
    const msgDom = '<span>' + msg + '</span>'
    const closeDom =
      '<span class="close" onclick="this.parentElement.parentElement.removeChild(this.parentElement)">×</span>'

    let content = ''

    if (openIcon) {
      content += iconDom
    }

    content += msgDom

    if (openClose) {
      content += closeDom
    }

    return content
  }
}
