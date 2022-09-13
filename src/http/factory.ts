import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import Qs from 'qs'

import { RequestWrapOption, RequestFactoryOption } from '@archType/index.ts'

// loading 控制器
import Timer from './timer'
import Download from '@archUtils/download'

import { responseStatusCode } from '@archConf/api'

// 默认不启用 cookie
// axios.defaults.withCredentials = true

// axios.defaults['routeChangeCancel'] = true

// const timer = new Timer()
const download = new Download()

// const retryDelay = 1000

const getRequestConfig = (
  accessToken?: string,
  accessTokenField?: string,
  pageField?: string,
  pageSizeField?: string,
  pageSize?: number
) => (method: string, url: string, param: {} | FormData, config: {}): {} => {
  const requestConfig = { url, method, ...config }

  switch (method) {
    case 'get':
      // 添加 token
      if (accessTokenField && accessToken) {
        param[accessTokenField] = accessToken
      }

      // 添加页码
      if (
        pageField &&
        pageSizeField &&
        pageSize &&
        param[pageField] !== undefined &&
        param[pageSizeField] === undefined
      ) {
        param[pageSizeField] = pageSize
      }

      requestConfig['params'] = param
      break
    case 'post':
      // 添加 token
      if (accessTokenField && accessToken) {
        if (param.constructor === FormData) {
          param.append(accessTokenField, accessToken)
        } else {
          param[accessTokenField] = accessToken
        }
      }

      requestConfig['data'] = param
      break
  }

  return requestConfig
}

const getPendingRequestKey = (config: AxiosRequestConfig): string => {
  return (
    config['similar'] ||
    config['url'] +
      '' +
      config['method'] +
      JSON.stringify(config['params'] || config['data'])
  )
}

const cancelLastCommonRequest = (
  config: AxiosRequestConfig,
  pendingRequest: {}[]
): AxiosRequestConfig => {
  // 如果一个项目里有多个不同baseURL的请求
  const requestMark = getPendingRequestKey(config)
  const repeatIndex: number[] = []
  // 找当前请求的标识是否存在 pendingRequest 中，即是否重复请求了
  pendingRequest.forEach((item: {}, i: number) => {
    item['name'] === requestMark && repeatIndex.push(i)
  })

  repeatIndex.forEach((i: number) => {
    // 取消上个重复的请求
    pendingRequest[i]['cancel']()
    // 删掉在pendingRequest中的请求标识
    pendingRequest.splice(i, 1)
  })

  // （重新）新建针对这次请求的axios的cancelToken标识
  const source = axios.CancelToken.source()
  config['cancelToken'] = source.token
  // 设置自定义配置requestMark项，主要用于响应拦截中
  config['requestMark'] = requestMark

  // 记录本次请求的标识
  pendingRequest.push({
    name: requestMark,
    cancel: source.cancel,
    // 可能会有优先级高于默认设置的routeChangeCancel项值
    routeChangeCancel: config['routeChangeCancel']
  })

  return config
}

const handleRequestByPost = (defaultContentType: {}) => (
  config: AxiosRequestConfig
) => {
  const data = config['data']
  let contentType = config['headers']['Content-Type']

  if (!contentType) {
    if (data && data.constructor === FormData) {
      contentType = 'multipart/form-data'
    } else {
      contentType = defaultContentType['post']
    }

    config['headers']['Content-Type'] = contentType
  }

  if (
    data &&
    typeof data !== 'string' &&
    data.constructor !== FormData &&
    contentType === 'application/x-www-form-urlencoded'
  ) {
    // 格式化模式有三种：indices、brackets、repeat
    config['data'] = Qs.stringify(data, { arrayFormat: 'repeat' })
  }
}

const handleRequestIntercept = (
  pendingRequest: {}[],
  defaultContentType: {},
  proxy: string
) => (config: AxiosRequestConfig): AxiosRequestConfig => {
  const url = config['url'] || ''
  config['method'] === 'post' && handleRequestByPost(defaultContentType)(config)

  // 开发阶段，避免超时重试 url 追加携带 proxy 前缀
  if (proxy && !new RegExp('^' + proxy).test(url)) {
    config['url'] = proxy + url
  }

  return cancelLastCommonRequest(config, pendingRequest)
}

const handleResponseIntercept = (pendingRequest: {}[], timer: Timer) => <T>(
  response: T
): T => {
  timer.stop()

  // 根据请求拦截里设置的 requestMark 配置来寻找对应 pendingRequest 里对应的请求标识
  const markIndex = pendingRequest.findIndex(
    item => item['name'] === response['config']['requestMark']
  )
  // 找到了就删除该标识
  markIndex > -1 && pendingRequest.splice(markIndex, 1)

  return response
}

const retryByRequestTimeout = async (
  instance: AxiosInstance,
  retryCount: number,
  err: any
) => {
  const message = err.message
  const config = err.config

  if (!config) {
    return Promise.reject(new Error(message))
  }

  config.__retryCount = config.__retryCount || 0

  if (config.__retryCount >= retryCount) {
    return Promise.reject(new Error(message))
  }

  config.__retryCount += 1

  // 延时重试
  // await new Promise(resolve => {
  //   setTimeout(() => resolve(), retryDelay)
  // })

  return instance(config)
}

const interceptors = (
  timer: Timer,
  instance: AxiosInstance,
  proxy: string,
  pendingRequest: {}[],
  retryCount: number,
  defaultContentType: {}
) => {
  instance.interceptors.request.use(
    handleRequestIntercept(pendingRequest, defaultContentType, proxy),
    (error: any): any => {
      timer.stop()

      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    handleResponseIntercept(pendingRequest, timer),
    (err: any): any => {
      if (err && err.message && err.message.includes('timeout')) {
        return retryByRequestTimeout(instance, retryCount, err).catch(() =>
          timer.stop()
        )
      }

      timer.stop()

      const errConfig = {}
      const response = err.response

      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      if (response) {
        handleResponseIntercept(response.config, timer)

        // 设置返回的错误对象格式（按照自己项目实际需求）
        errConfig['code'] = response.code
        errConfig['data'] = response.data
      }

      // 如果是主动取消了请求，做个标识
      if (axios.isCancel(err)) {
        errConfig['selfCancel'] = true
      }

      // 其实还有一个情况, 在设置引发错误的请求时，error.message才是错误信息
      // 这个一般是脚本错误，项目提示也不应该提示脚本错误给用户看，一般都是自定义一些默认错误提示，如“创建成功！”
      // 所以这里不针对此情况做处理。
      return Promise.reject(
        errConfig['selfCancel'] ? 'Only execute the last request' : errConfig
      )
    }
  )
}

/**
 * 注意：默认启用 loading，并发多次请求只会显示一次 loading，只取第一个发起请求的 loading 配置，
 *    要更改 loading 配置，请在第一个请求 配置，也可以关闭默认 loading 控制，自己手动创建；
 *    如果想为每个请求设置不同的 loading，需要手动创建 Util_Loading 类实例；
 */

/**
 * 公共请求入口
 * @param {String} method 'get || post'
 * @param {String} url
 * @param {Object} param
 * @param {Object} other 用于传递在请求处理的数据，目前有自定义 loading 配置对象
 *                 loading 配置文档目录：src\utils\loading.ts
 * @return {Promise}
 */
const request = ({
  instance,
  getAccessToken,
  accessTokenField,
  pageField,
  pageSizeField,
  pageSize,
  timer
}: RequestWrapOption) => async (
  method: string,
  url: string,
  param = {},
  other = {}
) => {
  const configTimer = other['timer'] || {}
  const loading = other['loading'] || {}
  const config = other['config'] || {}
  const isExternalHandleRes = other['isExternalHandleRes'] || false
  timer.start(configTimer, loading)

  const requestConfig = getRequestConfig(
    getAccessToken && getAccessToken(),
    accessTokenField,
    pageField,
    pageSizeField,
    pageSize
  )(method, url, param, config)

  try {
    const res = await instance(requestConfig)

    const data = res['data']

    if (isExternalHandleRes) {
      return res
    }

    const responseStatusCodeConfig =
      responseStatusCode[data['code']] || responseStatusCode.default

    return responseStatusCodeConfig.cb(data['msg'], data)
  } catch (error) {
    throw new Error(error)
  }
}

const requestByGet = ({
  timer,
  instance,
  getAccessToken,
  accessTokenField,
  pageField,
  pageSizeField,
  pageSize
}: RequestWrapOption) => async (url: string, param = {}, other = {}) => {
  return await request({
    timer,
    instance,
    getAccessToken,
    accessTokenField,
    pageField,
    pageSizeField,
    pageSize
  })('get', url, param, other)
}

const requestByPost = ({
  timer,
  instance,
  getAccessToken,
  accessTokenField
}: RequestWrapOption) => async (url: string, param = {}, other = {}) => {
  return await request({ timer, instance, getAccessToken, accessTokenField })(
    'post',
    url,
    param,
    other
  )
}

/**
 * 公共请求文件入口
 * @param {String} method 'get || post'
 * @param {String} url
 * @param {Object} param
 * @param {Object} other 用于传递在请求处理的数据，目前有自定义 loading 配置对象，filenamePrefix 自定义文件名前缀
 *                 loading 配置文档目录：src\utils\loading.ts
 * @return {Promise}
 */
const requestFile = ({
  timer,
  instance,
  getAccessToken,
  accessTokenField
}: RequestWrapOption) => async (
  method: string,
  url: string,
  param = {},
  other = {}
) => {
  const configTimer = other['timer'] || {}
  const loading = other['loading'] || {}
  const config = other['config'] || {}
  const filenamePrefix = other['filenamePrefix'] || ''

  timer.start(configTimer, loading)

  const requestConfig = getRequestConfig(
    getAccessToken && getAccessToken(),
    accessTokenField
  )(method, url, param, config)

  /**
   * 使用axios下载excel文件解决乱码问题
   *  1. 须将axios 配置中的responseType设置为arraybuffer，这样就不会让表格出现乱码现象；
   *  2. 如果要动态设置文件名则需要让后台将名字设置到响应头中，否则将是一个乱码的文件名；
   *  3. 然后通过<a></a> 标签的特性来自动点击下载文件；
   *  4. 如果要兼容IE则需要利用navigator.msSaveOrOpenBlob方法；
   *  5. 兼容Firefox 须将<a></a> 标签添加到body中，最后再移除<a></a> 标签
   */
  requestConfig['responseType'] = 'arraybuffer'

  try {
    const res = await instance(requestConfig)

    // 内容部署
    const contentDisposition = res['headers']['content-disposition']

    if (!contentDisposition) {
      download.error(filenamePrefix)

      return
    }

    // 二进制流文件数据
    const blob = new Blob([res['data']])
    const filename =
      filenamePrefix + download.getFilenameSuffix(contentDisposition)

    download.download(blob, filename)
  } catch (error) {
    throw new Error(error)
  }
}

export default ({
  instance,
  proxy,
  getAccessToken,
  accessTokenField = 'access_token',
  retryCount = 5,
  defaultContentType = {
    post: 'application/x-www-form-urlencoded'
  },
  pageField = 'page',
  pageSizeField = 'page_size',
  pageSize = 10
}: RequestFactoryOption) => {
  const pendingRequest: {}[] = []
  const timer = new Timer()
  const commonOption = {
    instance,
    getAccessToken,
    accessTokenField,
    timer
  }

  interceptors(
    timer,
    instance,
    proxy,
    pendingRequest,
    retryCount,
    defaultContentType
  )

  return {
    pendingRequest,
    request: request({
      ...commonOption,
      pageField,
      pageSizeField,
      pageSize
    }),
    requestByGet: requestByGet({
      ...commonOption,
      pageField,
      pageSizeField,
      pageSize
    }),
    requestByPost: requestByPost({ ...commonOption }),
    requestFile: requestFile({ ...commonOption })
  }
}
