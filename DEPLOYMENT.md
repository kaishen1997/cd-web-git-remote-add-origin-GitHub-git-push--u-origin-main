# Vercel 部署指南

本项目采用 Next.js 14 + Prisma + PostgreSQL 架构，支持在 Vercel 上一键部署。

## 1. 准备工作

*   **GitHub 账号**：将代码上传至您的 GitHub 仓库。
*   **Vercel 账号**：访问 [vercel.com](https://vercel.com) 并关联 GitHub。
*   **数据库**：准备一个 PostgreSQL 数据库（推荐使用 Vercel Postgres, Supabase 或 Neon）。
*   **Resend**：访问 [resend.com](https://resend.com) 获取 API Key，用于发送询盘邮件。

## 2. 部署步骤

### 第一步：关联仓库
1.  在 Vercel Dashboard 点击 **"Add New"** -> **"Project"**。
2.  选择您的 GitHub 仓库并点击 **"Import"**。

### 第二步：配置环境变量
在 "Environment Variables" 部分添加以下变量（参考 `web/.env.example`）：

| 变量名 | 说明 |
| :--- | :--- |
| `DATABASE_URL` | PostgreSQL 连接字符串 |
| `RESEND_API_KEY` | Resend API Key (以 `re_` 开头) |
| `ADMIN_EMAIL` | 接收询盘通知的邮箱（默认：sales@tqweighing.com） |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID (可选) |

### 第三步：部署
1.  点击 **"Deploy"**。
2.  Vercel 将自动执行 `npm run build`。

## 3. 初始化数据库 (Seed)

部署完成后，您需要填充初始产品数据：

1.  在本地终端进入 `web/` 目录。
2.  确保您的 `.env` 文件中有正确的 `DATABASE_URL`。
3.  运行以下命令：
    ```bash
    npx prisma db seed
    ```
    *或者在 Vercel 仪表板的 "Settings" -> "Functions" -> "Command Line" 中运行（如果支持）。*

## 4. 常见问题

*   **Prisma Client 未生成**：Vercel 部署脚本已包含自动生成。如果报错，请检查 `package.json` 中的 `postinstall` 钩子（建议添加 `"postinstall": "prisma generate"`）。
*   **数据库连接失败**：请确保数据库允许来自 Vercel 边缘节点的 IP 访问（或使用连接池）。

---
**项目状态：已达到「一键部署」标准。**
