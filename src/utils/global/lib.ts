export function removeDomByClassName(className: string): void {
  className = className
    .replace(/\s{2,}/g, ' ')
    .split(' ')
    .join('.')

  if (className[0] !== '.') {
    className = '.' + className
  }

  const doms = [...document.querySelectorAll(className)]

  doms.forEach(dom => dom.parentElement && dom.parentElement.removeChild(dom))
}

export const extendObject = (output: {}, input: {}): {} => {
  for (const key in input) {
    output[key] = input[key]
  }

  return output
}

export const extendObjectByOrigin = (output: {}, input: {}, origin: {}): {} => {
  for (const key in input) {
    output[input[key]] = origin[key]
  }

  return output
}

export const filterObjectKeys = (obj: {}, filters: string[]): {} => {
  const result = {}

  for (const key in obj) {
    if (filters.indexOf(key) === -1) {
      result[key] = obj[key]
    }
  }

  return result
}

export const toDecimal = (value: number, bit = 1, rate = 100): string => {
  if (value >= 0 && value < 1) {
    return '0.' + ''.padEnd(bit, '0')
  }

  const ret = String(value / rate).split('.')
  const intPrice = Number(ret[0])
  let decimalPrice = ret[1] || ''
  const decimalPriceLen = decimalPrice.length

  if (decimalPriceLen > bit) {
    decimalPrice = decimalPrice.slice(0, bit)
  } else if (decimalPriceLen < bit) {
    decimalPrice = decimalPrice.padEnd(bit, '0')
  }

  return intPrice + '.' + decimalPrice
}

export const lineBreakToBrTag = (str: string, symbol = '<br>'): string =>
  str.replace(/\r|\n|\r\n/gi, symbol)

export const replaceBreak = (str: string, symbol = ''): string =>
  str.replace(
    /^(\s*(<br\s*\/?>|\r\n|\n\r|\r|\n)\s*)*|(\s*(<br\s*\/?>|\r\n|\n\r|\r|\n)\s*)*$/gi,
    symbol
  )

/* eslint-disable */
export const urlToATag = (str: string, target = '_blank'): string =>
  str.replace(
    /((http|ftp|https):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/gi,
    (url, ...args) => {
      return args[0]
        ? '<a href="' + url + '" target="' + target + '">' + url + '</a>'
        : url
    }
  )
/* eslint-enable */

export const strReverse = (str: string) =>
  str
    .split('')
    .reverse()
    .join('')

export const decimalToBinaryToDecimals = (num: number | string): number[] => {
  const binaryNum = Number(num).toString(2)
  const len = binaryNum.length
  const result = []

  for (let i = 0; i < len; i++) {
    binaryNum[i] === '1' && result.push(Math.pow(2, len - 1 - i))
  }

  return result.reverse()
}

export const cloneJSON = <T>(data: T): T => JSON.parse(JSON.stringify(data))

export const equalJSON = (a: {} | [], b: {} | []): boolean =>
  JSON.stringify(a) === JSON.stringify(b)

export const getPascalName = (name: string): string => {
  const names = name.split('-')
  let retName = ''

  names.forEach((name: string) => {
    retName += name[0].toUpperCase() + name.slice(1)
  })

  return retName
}
