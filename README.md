# Dreams - 梦境分析应用

## 项目介绍
Dreams 是一个基于 Vue 3 和 OpenAI 技术的梦境分析应用。它提供了一个直观的界面，帮助用户记录、分析和探索他们的梦境体验。

## 主要功能
- 梦境记录与分析
- 梦境图库浏览
- 详细的梦境解析
- 梦境列表管理

## 技术栈
- Vue 3 - 渐进式 JavaScript 框架
- Vite - 下一代前端构建工具
- Vue Router - 官方路由管理器
- TailwindCSS - 实用优先的 CSS 框架
- OpenAI API - AI 驱动的内容分析

## 项目结构
```
src/
  ├── components/      # 可复用组件
  │   ├── Dream.vue
  │   └── Navigation.vue
  ├── views/           # 页面组件
  │   ├── Home.vue
  │   ├── DreamAnalysis.vue
  │   ├── DreamDetail.vue
  │   ├── DreamGallery.vue
  │   └── DreamList.vue
  ├── router/          # 路由配置
  ├── App.vue          # 根组件
  └── main.js          # 应用入口
```

## 快速开始

### 安装依赖
```bash
yarn install
```

### 开发环境运行
```bash
yarn dev
```

### 构建生产版本
```bash
yarn build
```

### 预览生产构建
```bash
yarn preview
```

## 环境要求
- Node.js 22.0 或更高版本

## 贡献指南
欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 许可证
MIT License