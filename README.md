# AI Tools Platform

基于 Next.js 的全栈 AI 工具平台，支持中英文国际化，集成多种 AI 功能模块。

## 🖼️ 项目展示
![AI Tools Platform Demo](public/image2.png)

![AI Tools Platform](public/image.png)

## ✨ 功能特性

### AI 工具
- **博客标题生成器** - AI 生成吸引人的博客标题，支持多种分类
- **AI 图像生成** - 根据文字描述创建精美图片，支持多种艺术风格
- **背景移除** - 自动移除图片背景，支持透明背景输出
- **物体移除** - 从图片中智能移除不需要的物体
- **简历审查** - AI 驱动的简历反馈和建议，支持多语言
- **文章写作** - 生成结构良好的高质量文章，支持多种长度
- **社区分享** - 创作内容社区分享和互动，支持点赞功能

### 系统特性
- **国际化支持** - 中英文界面切换，动态语言包加载
- **用户认证** - 基于 Clerk 的安全认证系统，支持免费/高级用户差异化功能
- **数据管理** - 个人创作内容存储和管理，支持公开/私有设置
- **智能缓存** - 基于 React Query 的状态管理，提供智能缓存和自动重试
- **文件处理** - 支持多种文件格式上传和处理
- **图床服务** - 集成 Cloudinary 图床，自动上传和 CDN 分发

## 🛠️ 技术栈

### 前端技术
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- React Query
- Clerk (身份认证)

### 后端技术
- Express.js
- Neon PostgreSQL
- Dify Workflows
- Cloudinary

### 开发工具
- Biome
- Husky
- TypeScript

## 📦 快速开始

### 克隆项目
```bash
git clone https://github.com/FunEnn/AITools.git
cd AITools
```

### 安装依赖
```bash
npm install
```

### 配置环境变量
创建 `.env` 文件并添加：

```env
# Clerk 身份认证
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# API 配置
NEXT_PUBLIC_BASE_URL=http://localhost:8088/express/api

# Neon PostgreSQL数据库
DATABASE_URL=your_database_url

# AI 服务
SILICONFLOW_API_KEY=your_siliconflow_api_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 启动开发服务器
```bash
# 标准 Next.js 开发
npm run dev

# EdgeOne Pages 开发
edgeone pages dev
```

### 构建项目
```bash
npm run build
npm start
```

## 📝 开发说明

### 核心功能
- **AI 工具模块**: 文章写作、图像生成、背景移除、简历审查
- **社区功能**: 创作分享、点赞互动、公开作品展示
- **用户系统**: 注册登录、权限控制、使用次数管理
- **国际化**: 中英文切换、动态语言包加载

### 部署支持
- 支持 EdgeOne Pages 部署
