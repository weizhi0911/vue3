import { Scroll as InterfaceScroll } from '@bizInterface/index'
import Counter from '@archUtils/counter'

const className = ' g-oh'
const counter = new Counter()

export default class Scroll implements InterfaceScroll {
  dom: HTMLElement

  constructor(dom = document.documentElement) {
    this.dom = dom
  }

  getWidth() {
    const el = document.createElement('div')
    const styles = {
      width: '100px',
      height: '100px',
      overflowY: 'scroll'
    }

    for (const i in styles) {
      el.style[i] = styles[i]
    }

    document.body.appendChild(el)

    const scrollBarWidth = el.offsetWidth - el.clientWidth

    document.body.removeChild(el)

    return scrollBarWidth
  }

  hasScrollV() {
    return (
      this.getAttrVal('scrollHeight') >
      (window.innerHeight || this.getAttrVal('clientHeight'))
    )
  }

  hasScrollH() {
    return (
      this.getAttrVal('scrollWidth') >
      (window.innerWidth || this.getAttrVal('clientWidth'))
    )
  }

  setMarginRight() {
    this.dom.style.marginRight = this.getWidth() + 'px'
  }

  resetMarginRight() {
    this.dom.style.marginRight = '0'
  }

  open() {
    if (counter.isFinished()) {
      this.dom.className += className

      this.setMarginRight()
    }

    counter.increase()
  }

  close() {
    counter.decrease()

    if (counter.isFinished()) {
      document.documentElement.className = document.documentElement.className.replace(
        className,
        ''
      )

      this.resetMarginRight()
    }
  }

  top(dom: HTMLElement, top: number, minScrollHeight: number) {
    window.addEventListener(
      'scroll',
      function handler() {
        this.topHandle(dom, top, minScrollHeight)

        window.removeEventListener('scroll', handler)
      }.bind(this)
    )
  }

  topHandle(dom: HTMLElement, top: number, minScrollHeight: number) {
    const scrollTop = window.pageYOffset || this.getScrollTop()
    const className = ' g-pof-top'
    const canScrollHeight =
      this.getAttrVal('scrollHeight') - this.getAttrVal('clientHeight')

    if (scrollTop > top && canScrollHeight > minScrollHeight) {
      if (!dom.className.includes(className)) {
        dom.className += className
      }

      return
    }

    dom.className = dom.className.replace(className, '')
  }

  isScrollBottom(increment = 0, elem?: HTMLElement): boolean {
    return (
      this.getAttrVal('scrollHeight', elem) - this.getScrollTop(elem) <=
      this.getAttrVal('clientHeight', elem) + increment
    )
  }

  async request(fn: Function, target?: HTMLElement): Promise<void> {
    const scrollTop = this.getScrollTop(target)

    await fn()

    this.setScrollTop(scrollTop, target)
  }

  getAttrVal(name: string, elem?: HTMLElement) {
    if (elem) {
      return elem[name]
    }

    return document.documentElement[name] > document.body[name]
      ? document.documentElement[name]
      : document.body[name]
  }

  getScrollTop(elem?: HTMLElement): number {
    return elem ? elem.scrollTop : this.getAttrVal('scrollTop')
  }

  setScrollTop(scrollTop: number, elem?: HTMLElement): void {
    if (elem) {
      elem.scrollTop = scrollTop
    } else {
      document.documentElement.scrollTop = document.body.scrollTop = scrollTop
    }
  }
}
