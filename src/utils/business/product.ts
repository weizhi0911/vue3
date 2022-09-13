import {
  extendObjectByOrigin,
  extendObject,
  lineBreakToBrTag,
  urlToATag,
  decimalToBinaryToDecimals
} from '@globalUtils/lib'

export const transformObject = (
  product: {},
  transformObj?: {},
  extendObj?: {}
) => {
  const couponTotalCount = product['coupon_total'] || 0
  const couponSurplusCount = product['coupon_left'] || 0
  const couponReceiveCount =
    product['coupon_use'] !== undefined
      ? product['coupon_use']
      : couponTotalCount - couponSurplusCount

  const data = {
    product_id: product['product_id'] || '',
    activity_id: product['activity_id'] || '',
    source_id: product['source_id'] || '',
    seller_id: product['seller_id'] || '',

    taobaoUrl: product['product_url'] || '',
    // TODO: 字段名待后台返回
    tkyUrl: product['tkyUrl'] || '',

    // TODO: 字段名待后台返回
    month: product['month'] || '',

    today: product['today'] || '',
    mainImg: product['pic'] || '',
    marketingImg: product['marketing_image'] || '',
    title: product['title'] || '',
    postCouponPrice: product['final_price'] || 0,
    marketing: product['rate'] || 0,
    commissionRate: product['rate'] || 0,
    commission: product['commission_value'] || 0,
    coupon: product['coupon_value'] || 0,
    twoHourSale: product['two_hours_sale'] || product['two_hour_sale'] || 0,
    todaySale: product['day_sale'] || 0,
    monthSale: product['month_sale'] || 0,
    couponProgress: product['coupon_progress'] || '',
    originPrice: product['price'] || 0,
    discount: product['discount'] || 0,
    couponReceiveCount,
    couponSurplusCount,
    couponTotalCount,
    couponStartDate: product['coupon_from']
      ? String(product['coupon_from']).replace('-', '/')
      : '',
    couponEndDate: product['coupon_to']
      ? String(product['coupon_to']).replace('-', '/')
      : '',
    couponUrl: product['coupon_url'] || '',
    shopTitle: product['shop_name'] || '',
    shopIcons: decimalToBinaryToDecimals(product['property'] || 2) || [],
    shopScores: product['score'] ? getProductShopScores(product['score']) : [],
    guideCopywriting: product['content']
      ? urlToATag(lineBreakToBrTag(product['content']))
      : '',

    channelPropagation: product['chanel_propagation'] || '',
    sourceName: product['source_name'] || '',
    sourceTime: product['time'] || ''
  }

  transformObj && extendObjectByOrigin(data, transformObj, product)
  extendObj && extendObject(data, extendObj)

  return data
}

export const transform = (
  products: Array<object>,
  transformObj?: {},
  extendObj?: {}
) => {
  const result: {}[] = []

  products.forEach((item: {}) => {
    result.push(transformObject(item, transformObj, extendObj))
  })

  return result
}

export const getProductShopScores = (data: {}[]) => {
  const defaultShopScores = [
    {
      name: '如实描述',
      score: 0,
      rate: 0
    },
    {
      name: '服务态度',
      score: 0,
      rate: 0
    },
    {
      name: '发货速度',
      score: 0,
      rate: 0
    }
  ]

  return data.length ? data : defaultShopScores
}
