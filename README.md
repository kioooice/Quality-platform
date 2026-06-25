# 电镀AI质量管理与异常追溯系统

企业级质量管理模拟系统 MVP。基于真实工业质量管理场景构建的完整平台骨架，当前阶段使用模拟业务数据，暂不接入真实数据库、后端服务和 AI 模型。

## 技术栈

- React 19 + TypeScript
- Vite 8
- Ant Design 6
- React Router 7

## 系统页面

| 页面 | 路由 | 说明 |
|------|------|------|
| 质量驾驶舱 | `/` | 统计概览、质量趋势、最近事件、系统状态 |
| 产品中心 | `/products` | 产品列表管理、合格率统计 |
| 检测中心 | `/inspection` | 检测任务列表、进度跟踪、AI 检测结果 |
| 质量事件 | `/events` | 质量事件上报与处理、事件时间线 |
| AI分析 | `/ai-analysis` | AI 模型管理、分析结果展示 |
| 案例中心 | `/cases` | 质量案例库、热门案例、经验总结 |
| 报告中心 | `/reports` | 质量报告生成与下载 |
| 系统管理 | `/system` | 用户管理、系统日志、系统配置 |

## 本地启动

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:5173

### 其他命令

```bash
npm run build    # 生产构建
npm run preview  # 预览构建结果
npm run lint     # 代码检查
```

### Windows 脚本启动器

双击 `start.bat` 可通过菜单选择以上操作。

## 项目结构

```
src/
├── layouts/        # 布局组件
│   └── MainLayout.tsx
├── pages/          # 页面组件
│   ├── Dashboard.tsx
│   ├── Products.tsx
│   ├── Inspection.tsx
│   ├── Events.tsx
│   ├── AIAnalysis.tsx
│   ├── Cases.tsx
│   ├── Reports.tsx
│   └── System.tsx
├── routes/         # 路由配置
│   └── index.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## 当前阶段说明

- 所有页面均可浏览，含模拟业务数据
- 统一导航布局，支持侧边栏折叠
- 不含登录、权限、数据库、后端接口
- 后续迭代将逐步接入真实业务逻辑
