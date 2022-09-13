// 参数：date 格式为yyyy-mm-dd的日期，如：2014-01-25

export const transferDate = (date: Date | string) => {
  return typeof date === 'string' ? new Date(date) : date
}

export const toMonthDay = (date: Date | string, symbol = '.') => {
  const transferDate =
    typeof date !== 'string' ? date : date ? new Date(date) : new Date()
  const month = String(transferDate.getMonth() + 1).padStart(2, '0')
  const day = String(transferDate.getDate()).padStart(2, '0')

  return [month, day].join(symbol)
}

export const toDate = (date: Date | string, symbol = '-') => {
  const transferDate =
    typeof date !== 'string' ? date : date ? new Date(date) : new Date()

  const year = transferDate.getFullYear()
  const month = String(transferDate.getMonth() + 1).padStart(2, '0')
  const day = String(transferDate.getDate()).padStart(2, '0')

  return [year, month, day].join(symbol)
}

export const getCurrentDate = (date: Date | string = '', symbol = '-') => {
  return toDate(date, symbol)
}

export const getPrevMonthDate = (date: Date | string, symbol = '-') => {
  const currentDate: Date = transferDate(date)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  let day: number | string = currentDate.getDate()

  let endYear = year
  let endMonth: number | string = month - 1

  if (endMonth == 0) {
    endYear -= 1
    endMonth = 12
  }

  const endDays = new Date(endYear, endMonth, 0).getDate()

  if (day > endDays) {
    day = endDays
  }

  day = String(day).padStart(2, '0')

  endMonth = String(endMonth).padStart(2, '0')

  return [endYear, endMonth, day].join(symbol)
}

export const getNextMonthDate = (date: Date | string, symbol = '-') => {
  const currentDate: Date = transferDate(date)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  let day: number | string = currentDate.getDate()

  let endYear = year
  let endMonth: number | string = month + 1

  if (endMonth == 13) {
    endYear += 1
    endMonth = 1
  }

  const endDays = new Date(endYear, endMonth, 0).getDate()

  if (day > endDays) {
    day = endDays
  }

  day = String(day).padStart(2, '0')

  endMonth = String(endMonth).padStart(2, '0')

  return [endYear, endMonth, day].join(symbol)
}

export const getDay = (date: Date | string, day: number, symbol = '-') => {
  const currentDate: Date = transferDate(date)
  currentDate.setDate(currentDate.getDate() + day)

  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const endDay = String(currentDate.getDate()).padStart(2, '0')

  return [year, month, endDay].join(symbol)
}

export const getPrevDayDate = (date: Date | string, symbol = '-') => {
  return getDay(date, -1, symbol)
}

export const getNextDayDate = (date: Date | string, symbol = '-') => {
  return getDay(date, 1, symbol)
}

export const getDiffDay = (
  startDate: Date | string,
  endDate: Date | string
) => {
  const currentStartDate: any = transferDate(startDate)
  const currentEndDate: any = transferDate(endDate)

  const diffMillisecond = currentEndDate - currentStartDate
  const dayMillisecond = 1000 * 60 * 60 * 24
  const days = parseInt(String(diffMillisecond / dayMillisecond))

  return days
}

export const getDays = (date: Date | string) => {
  return getDiffDay('1970-01-01', transferDate(date))
}
