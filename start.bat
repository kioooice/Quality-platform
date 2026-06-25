@echo off
chcp 65001 >nul 2>&1
title AI质量管理系统
echo.
echo ========================================
echo    AI质量管理系统 - 脚本启动器
echo ========================================
echo.
echo  [1] 启动开发服务器 (npm run dev)
echo  [2] 生产构建 (npm run build)
echo  [3] 预览构建结果 (npm run preview)
echo  [4] 安装依赖 (npm install)
echo  [5] 代码检查 (npm run lint)
echo  [0] 退出
echo.
echo ========================================
echo.

:choice
set /p choice=请选择操作 [0-5]:

if "%choice%"=="1" goto dev
if "%choice%"=="2" goto build
if "%choice%"=="3" goto preview
if "%choice%"=="4" goto install
if "%choice%"=="5" goto lint
if "%choice%"=="0" goto exit
echo 无效选择，请重新输入
goto choice

:dev
echo.
echo 正在启动开发服务器...
echo 访问地址: http://localhost:5173
echo 按 Ctrl+C 停止服务器
echo.
call npm run dev
goto end

:build
echo.
echo 正在进行生产构建...
echo.
call npm run build
echo.
pause
goto end

:preview
echo.
echo 正在启动预览服务器...
echo 访问地址: http://localhost:4173
echo 按 Ctrl+C 停止服务器
echo.
call npm run preview
goto end

:install
echo.
echo 正在安装依赖...
echo.
call npm install
echo.
pause
goto end

:lint
echo.
echo 正在进行代码检查...
echo.
call npm run lint
echo.
pause
goto end

:exit
echo 再见!
exit /b 0

:end
exit /b 0