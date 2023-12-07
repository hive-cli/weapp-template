export const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

/** 两位数字处理 */
export const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/** 手机号校验 */
export function isPhone(value) {
  if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) {
    return false
  } else {
    return true
  }
}

/**
 * 选择器获取
 * @param {*} component 父组件
 * @param {*} selector css 选择器
 */
export async function selectorQuery(component, selector) {
  return new Promise((resolve, reject) => {
    wx.getSystemInfo({
      success: res => {
        let scrollEl = wx.createSelectorQuery().in(component).select(selector)
        scrollEl
          .boundingClientRect(rect => {
            // let scrollViewH = res.windowHeight - rect.top;
            // this.setData({
            //   scrollViewH
            // })
            // console.log('rect:', rect)
            resolve({
              ...res,
              ...rect
            })
          })
          .exec()
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

export function setNavigationBackground(e, component) {
  if (e.scrollTop < 40) {
    component.navOpacity = 0
    if (component.navOpacity != 0) {
      component.setData({
        navBackground: `rgba(255, 255, 255, 0)`
      })
    }
  } else if (e.scrollTop >= 40) {
    if (component.navOpacity <= 1) {
      component.navOpacity = e.scrollTop / 100 - 0.4
    } else {
      component.navOpacity = 1
    }
    if (component.navOpacity <= 1) {
      component.setData({
        navBackground: `rgba(255, 255, 255, ${component.navOpacity})`
      })
    }
  }
}

/** 大写数字转换 */
export function toChinesNum(num) {
  let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  let unit = ['', '十', '百', '千', '万']
  num = parseInt(num)
  let getWan = temp => {
    let strArr = temp.toString().split('').reverse()
    let newNum = ''
    for (var i = 0; i < strArr.length; i++) {
      newNum =
        (i == 0 && strArr[i] == 0
          ? ''
          : i > 0 && strArr[i] == 0 && strArr[i - 1] == 0
            ? ''
            : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i])) + newNum
    }
    return newNum
  }
  let overWan = Math.floor(num / 10000)
  let noWan = num % 10000
  if (noWan.toString().length < 4) noWan = '0' + noWan
  return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
}

export function uuid() {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  var uuid = s.join('').replace('-', '')
  return uuid
}

/** 防抖 */
export function debounce(fn, delay = 1000) {
  let timer = null

  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}

/** 节流 */
export function throttle(fn, delay = 1000) {
  let timer = null
  return function () {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
      timer = null
    }, delay)
  }
}

//前一个数组是否包含后一个数组，只能判断 数字，或者字符串数组
export function isIncludeArray(array1, array2) {
  // console.log(array2, "array2array2array2");
  if (array2.length == 0) return false
  // 检查数组长度
  if (array1.length < array2.length) {
    return false
  }
  const set1 = new Set(array1)
  const set2 = new Set(array2)

  for (const item of set2) {
    if (!set1.has(item)) {
      return false
    }
  }
  return true
}
