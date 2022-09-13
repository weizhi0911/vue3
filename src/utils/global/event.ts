type Target = Function | object

function extendTimer(target: Target, type = 'timeout'): Target {
  if (!target['timer']) {
    target['timer'] = 0
  }

  if (target['cancel']) {
    return target
  }

  const config = {
    timeout: {
      setTimer: 'setTimeout',
      cancel: 'clearTimeout'
    },
    interval: {
      setTimer: 'setInterval',
      cancel: 'clearInterval'
    }
  }

  target['cancel'] = function() {
    const fnName = (config[type] && config[type].cancel) as string

    if (window[fnName]) {
      window[fnName](target['timer'])
      target['timer'] = 0
    }
  }

  target['setTimer'] = function(timeout: number, callback?: Function) {
    const fnName = (config[type] && config[type].setTimer) as string

    target['cancel']()

    if (window[fnName]) {
      target['timer'] = window[fnName](() => {
        target['cancel']()
        callback && callback()
      }, timeout)
    }
  }

  return target
}

// 合并防抖和节流，推荐使用
// 解决防抖在超时时间内连续触发无法执行回调函数，
// 节流在超时时间内触发过后即使有更改也不再执行
export function debounceThrottle(key?: string) {
  if (key && !debounceThrottle.timer[key]) {
    debounceThrottle.timer[key] = []
  }

  return function(fn: Function, timeout = 1000, immediate = true) {
    let lastTime = 0

    function later(...args: []) {
      lastTime = Date.now()
      fn.apply(this, args)
    }

    function handler(...args: []) {
      const isCooling = Date.now() - lastTime < timeout

      if (immediate && !isCooling) {
        handler['cancel']()
        later.apply(this, args)
        return
      }

      handler['setTimer'](timeout, () => later.apply(this, args))
    }

    extendTimer(handler)

    if (key && debounceThrottle.timer[key]) {
      debounceThrottle.timer[key].push(handler['cancel'])
    }

    return handler
  }
}

debounceThrottle.timer = {}
debounceThrottle.cancel = function(key: string) {
  const timer = debounceThrottle.timer

  if (timer[key]) {
    timer[key].forEach(function(cancel: Function) {
      cancel()
    })

    delete timer[key]
  }
}

// 防抖控制函数执行次数，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
export const debounce = function(
  fn: Function,
  timeout = 1000,
  immediate = true
) {
  function handler(...args: any[]) {
    if (immediate) {
      !handler['timer'] && fn.apply(this, args)

      handler['setTimer'](timeout)
      return
    }

    handler['setTimer'](timeout, () => fn.apply(this, args))
  }

  extendTimer(handler)

  return handler
}

// 节流控制函数执行频率，就是指连续触发事件，但是在 n 秒中只执行一次函数
export const throttle = function(
  fn: Function,
  timeout = 1000,
  immediate = true
) {
  let lastTime = 0

  function handler(...args: any[]) {
    if (immediate) {
      const now = Date.now()

      if (now - lastTime > timeout) {
        lastTime = now
        fn.apply(this, args)
      }

      return
    }

    if (!handler['timer']) {
      handler['setTimer'](timeout, () => fn.apply(this, args))
    }
  }

  extendTimer(handler)

  return handler
}
