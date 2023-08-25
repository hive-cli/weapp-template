const config = {
  dev: {
    appId: 'wxc67e31d5905b2b74',
    companyId: 100,
    baseURL: 'https://gzzj.hivery.cn/test-api/grain/api/mobile',
    staticPath: 'https://gzzj.hivery.cn/fileUploadPath/statics/', // 静态资源
    apiKey: 'hwxa9b1d4b71c3de897hive164897aij', // 微信商户平台api密钥
    mapKey: 'CIJBZ-WSGKG-WFXQW-QBAC3-CFGBS-4TBIF', // 腾讯地图key
    expiredTimeout: 1 * 24 * 60 * 60 * 1000,
    paySignKey: 'hwxa9b1d4b71c3de897hive164897aij'
  },
  prod: {
    appId: 'wxc67e31d5905b2b74',
    companyId: 100,
    baseURL: 'https://gzzj.hivery.cn/prod-api/grain/api/mobile',
    staticPath: 'https://gzzj.hivery.cn/fileUploadPath/statics/', //静态资源
    apiKey: 'hwxa9b1d4b71c3de897hive164897aij', // 微信商户平台api密钥
    mapKey: 'CIJBZ-WSGKG-WFXQW-QBAC3-CFGBS-4TBIF', // 腾讯地图key
    expiredTimeout: 1 * 24 * 60 * 60 * 1000,
    paySignKey: 'hwxa9b1d4b71c3de897hive164897aij'
  }
}
const {
  miniProgram: { envVersion }
} = wx.getAccountInfoSync()
let currentConfig = config.dev
switch (envVersion) {
  case 'release':
    currentConfig = config.prod
    break
  case 'develop':
  case 'trial':
  default:
    currentConfig = config.dev
    break
}
export default currentConfig
