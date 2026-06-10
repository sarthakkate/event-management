@echo off
REM Event Management System - Quick Setup Script for Windows
REM This script automates the initial setup process

echo.
echo ========================================
echo Event Management System - Setup Script
echo ========================================
echo.

REM Check Node.js
echo Checking for Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js not found. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js is installed

REM Check MongoDB
echo Checking for MongoDB...
mongod --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Warning: MongoDB not found. You can use MongoDB Atlas instead.
    set /p useAtlas="Do you want to use MongoDB Atlas (y/n)? "
    if /i not "%useAtlas%"=="y" (
        echo Please install MongoDB from https://www.mongodb.com/try/download/community
        pause
        exit /b 1
    )
)

REM Install dependencies
echo.
echo Installing server dependencies...
cd server
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)
echo Dependencies installed successfully

REM Create .env file
echo.
echo Creating .env file...
if not exist ".env" (
    copy .env.example .env
    echo .env file created. Please edit it with your configuration.
    pause
) else (
    echo .env file already exists
)

REM Summary
echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Edit server/.env with your configuration
echo 2. Start MongoDB (or use MongoDB Atlas)
echo 3. Run: npm start (in server directory)
echo 4. Open client/pages/index.html in your browser
echo.
echo For more information, see QUICK_START.md
echo.
pause
