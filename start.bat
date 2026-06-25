@echo off
title AI Quality System

:menu
cls
echo.
echo ========================================
echo    AI Quality System - Launcher
echo ========================================
echo.
echo  [1] Dev Server   (npm run dev)
echo  [2] Build        (npm run build)
echo  [3] Preview      (npm run preview)
echo  [4] Install      (npm install)
echo  [5] Lint         (npm run lint)
echo  [0] Exit
echo.
echo ========================================
echo.

set /p choice=Select [0-5]:

if "%choice%"=="1" goto dev
if "%choice%"=="2" goto build
if "%choice%"=="3" goto preview
if "%choice%"=="4" goto install
if "%choice%"=="5" goto lint
if "%choice%"=="0" goto exit
echo Invalid choice
pause
goto menu

:dev
echo.
echo Starting dev server...
echo URL: http://localhost:5173
echo Press Ctrl+C to stop
echo.
call npm run dev
pause
goto menu

:build
echo.
echo Building...
echo.
call npm run build
echo.
pause
goto menu

:preview
echo.
echo Starting preview server...
echo URL: http://localhost:4173
echo Press Ctrl+C to stop
echo.
call npm run preview
pause
goto menu

:install
echo.
echo Installing dependencies...
echo.
call npm install
echo.
pause
goto menu

:lint
echo.
echo Running lint...
echo.
call npm run lint
echo.
pause
goto menu

:exit
echo Bye!
pause
exit
