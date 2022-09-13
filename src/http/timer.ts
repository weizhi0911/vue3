import Counter from '@archUtils/counter'
import Loading from '@archUtils/loading'

export default class Timer {
  counter: Counter
  loading: Loading
  timer: any
  startTime = 0
  timeout = 0
  customTimeout = 0
  hide = false
  hideCounter = new Counter()

  constructor(timeout = 300) {
    this.counter = new Counter()
    this.loading = new Loading()

    this.timeout = timeout
    this.customTimeout = timeout
  }

  start(timer: {}, loading: {}): void {
    if (timer['hide']) {
      this.hideCounter.increase()

      if (!this.hide) {
        this.hide = true
      }

      return
    }

    if (timer['timeout']) {
      this.timeout = timer['timeout']
    }

    if (this.counter.isFinished()) {
      this.startTime = new Date().getTime()

      this.timer = setTimeout(() => this.loading.open(loading), this.timeout)
    }

    this.counter.increase()
  }

  stop(): void {
    if (this.hide) {
      this.hideCounter.decrease()

      if (this.hideCounter.isFinished()) {
        this.hide = false
      }
      return
    }

    this.counter.decrease()

    if (this.counter.isFinished()) {
      this.isTimeout() && this.loading.close()

      clearInterval(this.timer)
    }
  }

  isTimeout(): boolean {
    return new Date().getTime() - this.startTime > this.timeout
  }
}
