# AI Tools Platform

A Next.js-based AI tools platform with internationalization support for English and Chinese.

## ✨ 功能特性

### AI 工具
- **博客标题生成器** - AI 生成吸引人的博客标题
- **AI 图像生成** - 根据文字描述创建精美图片，支持多种艺术风格
- **背景移除** - 自动移除图片背景，支持透明背景输出
- **物体移除** - 从图片中智能移除不需要的物体
- **简历审查** - AI 驱动的简历反馈和建议
- **文章写作** - 生成结构良好的高质量文章
- **社区分享** - 创作内容社区分享和互动

### 系统特性
- **国际化支持** - 中英文界面切换
- **用户认证** - 基于 Clerk 的安全认证系统
- **数据管理** - 个人创作内容存储和管理

## 🛠️ 技术栈

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Express.js
- Clerk
- Neon PostgreSQL
- SiliconFlow API

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
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_BASE_URL=http://localhost:8088/express/api
DATABASE_URL=your_database_url
SILICONFLOW_API_KEY=your_siliconflow_api_key
SM_MS_TOKEN=your_sm_ms_token
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

- 使用 Next.js 作为全栈框架
- 使用 TypeScript 进行类型检查
- 使用 Tailwind CSS 进行样式管理
- 支持 EdgeOne Pages 部署
