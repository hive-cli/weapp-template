# 小程序原生基础模版

## 已整合功能

- 请求封装、api 分离、错误自动提示
- 定位、逆地理解析、openid 获取、文件上传等通用接口
- 精准数学计算库
- 开发模式切换、自动化发布
- 集成代码规范，自动检测

```bash
.
├── README.md
├── apis # 接口
│   ├── common.js # 通用接口
│   └── index.js
├── app.js
├── app.json
├── app.wxss
├── components # 组件库
├── config.js # 配置文件
├── pages
│   └── index
├── project.config.json
├── project.private.config.json
├── sitemap.json
└── utils
    ├── common.js
    ├── index.js
    ├── math.js # 精准计算
    ├── qqmap-wx-jssdk.min.js
    └── request.js # 请求封装
```
