# Node Functions

## 概述

EdgeOne Node Functions 后端代码。

## 路由映射

根据 EdgeOne Node Functions 的路由规则，以下路由将被映射：

| 文件路径 | 访问路径 |
|---------|---------|
| `/node-functions/express/[[default]].js` | `/express/` |
| `/node-functions/test.js` | `/test` |

## 环境变量

确保设置以下环境变量：

- `DATABASE_URL` - 数据库连接字符串
- `SILICONFLOW_API_KEY` - SiliconFlow API 密钥
- `SM_MS_TOKEN` - SM.MS 图床服务令牌
- `CLERK_SECRET_KEY` - Clerk 认证密钥

## 部署说明

1. 确保所有依赖项已安装在 `client/package.json` 中
2. 设置必要的环境变量
3. 将代码推送到 Git 仓库
4. EdgeOne Pages 将自动构建和部署 Node Functions

## 注意事项

- 所有 Express 路由都集中在 `[[default]].js` 文件中
- 文件上传使用内存存储，适合 EdgeOne 环境
- 认证使用 Clerk 中间件
- 数据库使用 Neon PostgreSQL
- 图像处理使用 SM.MS 图床服务
