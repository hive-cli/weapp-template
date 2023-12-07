import { request } from '../utils/index'
import config from '../config'

var QQMapWX = require('../utils/qqmap-wx-jssdk.min')
var qqmapsdk = new QQMapWX({
  key: config.mapKey
})

export function GetWeixinLoginCode() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        if (res.code) {
          resolve(res.code)
        } else {
          reject()
        }
      }
    })
  })
}
async function fetchOpenId() {
  let code = await GetWeixinLoginCode()
  console.log('code:', code)
  return request({
    url: '/getOpenId.do?',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {
      wxCode: code,
      companyId: config.companyId
    }
  })
}

/** opneId 初始化 */
export function InitOpenId() {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    // let sessionId = wx.getStorageSync('SESSION_ID')
    let expiredTime = wx.getStorageSync('EXPIRED_TIME')
    let openId = wx.getStorageSync('OPEN_ID')
    if (openId && +new Date() - expiredTime <= config.expiredTimeout) {
      resolve()
    } else {
      try {
        let data = await fetchOpenId()
        // console.log('data:', data)
        const {
          obj: { openid: openId, session_key: sessionId }
        } = data
        if (openId) {
          let expiredTime = +new Date() + config.expiredTimeout
          wx.setStorageSync('OPEN_ID', openId)
          wx.setStorageSync('SESSION_ID', sessionId)
          wx.setStorageSync('EXPIRED_TIME', +expiredTime)
          resolve()
        } else {
          wx.showModal({
            title: '提示',
            content: '身份校验失败，请点击确定重新获取',
            success: async res => {
              if (res.confirm) {
                await this.initOpenId()
              } else if (res.cancel) {
                reject()
              }
            }
          })
        }
      } catch (e) {
        console.log('error', e)
      }
    }
  })
}

/** 精确定位 */
export function Location() {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'gcj02',
      // altitude: true,
      // isHighAccuracy: true,
      success: res => {
        // console.log(res, '************')
        let latitude = res.latitude
        let longitude = res.longitude
        resolve({
          latitude,
          longitude
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '定位失败，请开启定位'
        })
        reject(err)
      }
    })
  })
}

/**
 * 通用文件上传接口
 * @param {object} data 上传数据
 * @param {string} uploadUrl 上传路径
 */
export function UploadFile(data, uploadUrl = '/wechatUser/insertImage') {
  return new Promise((resolve, reject) => {
    const { filePath, name = 'file', url = `${config.baseURL}${uploadUrl}`, formData = {} } = data
    let token = wx.getStorageSync('token')
    let header = {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
    wx.uploadFile({
      header,
      filePath,
      name,
      url,
      formData,
      success: res => {
        if (res.statusCode == 200) {
          let data = JSON.parse(res.data)
          if (data.code == 200) {
            resolve(data.data)
          } else {
            wx.showToast({
              icon: 'none',
              title: data.msg,
              duration: 2000
            })
            reject(data)
          }
        } else {
          wx.showToast({
            icon: 'none',
            title: res.errMsg,
            duration: 2000
          })
          reject(res)
        }
      },
      fail: res => {
        reject(res)
      }
    })
  })
}

/**
 * 逆地理解析
 * @param {*} longitude
 * @param {*} latitude
 */
export function ReverseGeocoder(longitude, latitude) {
  return new Promise((resolve, reject) => {
    wx.showLoading()
    qqmapsdk.reverseGeocoder({
      location: {
        longitude,
        latitude
      },
      success(res) {
        wx.hideLoading()
        console.log('reverse:', res)
        if (res.status == 0) {
          resolve(res.result.address)
        } else {
          wx.showToast({
            title: res.message,
            mask: true,
            icon: 'none'
          })
          reject(res)
        }
      },
      fail(error) {
        wx.hideLoading()
        console.error(error)
        wx.showToast({
          title: '地理位置解析失败',
          mask: true,
          icon: 'none'
        })
        reject(error)
      }
    })
  })
}
