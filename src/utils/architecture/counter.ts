import { Counter as InterfaceCounter } from '@archInterface/index'

export default class Counter implements InterfaceCounter {
  count: number
  originalCount: number

  constructor(count = 0) {
    this.count = count
    this.originalCount = count
  }

  increase(): void {
    this.count++
  }

  decrease(): void {
    this.count--
  }

  reset() {
    this.count = this.originalCount
  }

  isRunning() {
    return this.count !== this.originalCount
  }

  isFinished() {
    return this.count === this.originalCount
  }
}
