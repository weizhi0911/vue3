/* eslint-disable */
const isIEBrowser = (): boolean =>
  typeof window.navigator.msSaveOrOpenBlob === 'function'

const isIncludeCrossbarChar = (val: any): boolean => String(val).includes('-')

const isInteger = (val: any): boolean =>
  isPositiveNumber(val) && Number.isSafeInteger(val)

const isPositiveNumber = (val: any): boolean =>
  !isIncludeCrossbarChar(val) &&
  typeof val === 'number' &&
  !isNaN(val) &&
  val >= 0

const isPercent = (val: any): boolean =>
  isPositiveNumber(val) && val >= 0 && val <= 100

const isNullObject = (val: {}): boolean => JSON.stringify(val) === '{}'

const isMobile = (val: any): boolean => /^1[3456789]\d{9}$/.test(val)

const isEmail = (val: any): boolean =>
  /^[\w.-]+@([a-zA-Z\d-]+\.)+[a-zA-Z\d]{2,4}$/.test(val)

const isAliPayAccount = (val: any): boolean => isMobile(val) || isEmail(val)

const isIPhone = (): boolean => /iphone/gi.test(window.navigator.userAgent)

const isIPhoneX = (): boolean => isIPhone() && window.screen.height >= 812

const isIOS = () =>
  /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(window.navigator.userAgent)

const isAndroid = (): boolean =>
  window.navigator.userAgent.includes('Android') ||
  window.navigator.userAgent.includes('Linux')

const isUrl = (val: any): boolean =>
  /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/i.test(
    val
  )

const isPhone = (val: any): boolean =>
  /^((\d{8})|(\d{3, 4})-(\d{7,8})|(\d{3, 4})-(\d{7,8})-(\d{1, 4})|(\d{7,8})-(\d{1, 4}))$/.test(
    val
  )

const isPositiveInt = (val: any): boolean => /^[1-9]\d*$/.test(val)

const isNonnegativeInt = (val: any): boolean => /^[1-9]\d*|0$/.test(val)

const isFloat = (val: any): boolean =>
  /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(val)

const isFloatFixedTwo = (val: any): boolean => /^\d+(\.\d{1,2})?$/.test(val)

const isPostcode = (val: any): boolean => /^[1-9]\d{5}(?!\d)$/.test(val)

const isLetterOrNum = (val: any): boolean => /^[a-zA-Z\d]+$/.test(val)

const isRoom = (val: any): boolean =>
  /^[\u4e00-\u9fa5_a-zA-Z1-9_][\u4e00-\u9fa5_a-zA-Z0-9_]{0,10}$/.test(val)

const isIDCard = (val: any): boolean => /^\d{15}|\d{18}$/.test(val)

export {
  isIEBrowser,
  isIncludeCrossbarChar,
  isInteger,
  isPositiveNumber,
  isPercent,
  isNullObject,
  isMobile,
  isEmail,
  isAliPayAccount,
  isIPhone,
  isIPhoneX,
  isIOS,
  isAndroid,
  isUrl,
  isPhone,
  isPositiveInt,
  isNonnegativeInt,
  isFloat,
  isFloatFixedTwo,
  isPostcode,
  isLetterOrNum,
  isRoom,
  isIDCard
}
/* eslint-enable */
