import config from '../config'
let baseURL = config.baseURL

export function request(
  {
    url,
    header = {
      'content-type': 'application/json'
    },
    data,
    timeout = 10 * 1000,
    method = 'POST',
    dataType = 'json'
  } = {},
  showLoading = false
) {
  let token = wx.getStorageSync('token')
  token && (header.Authorization = `Bearer ${token}`)
  if (showLoading) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
  }

  // const whiteList = ['/app/toManLogin', '/app/toForgetPw', '/app/toManVcLogin']
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + url,
      header,
      data,
      timeout,
      method,
      dataType,
      success: res => {
        if (res.statusCode == 200) {
          const { code, msg = '' } = res.data
          if (code == 200) {
            resolve(res.data.data)
            return
          }
          // if (!token && !whiteList.includes(url)) {
          // 	wx.redirectTo({
          // 		url: '/pages/login/pwd-login/index',
          // 	})
          // 	return
          // }
          if (code == 403 || code == 401) {
            wx.redirectTo({
              url: '/pages/login/pwd-login/index'
            })
            reject(res.data)
            return
          }
          if (code == 500) {
            wx.showToast({
              icon: 'none',
              title: msg,
              duration: 2000
            })
            reject(res.data)
            return
          }
          resolve(res.data)
        } else {
          reject(res.data)
        }
      },
      fail: err => {
        reject(err)
      },
      complete: () => {
        if (showLoading) {
          wx.hideLoading()
        }
      }
    })
  })
}
