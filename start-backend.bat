@echo off
echo ========================================
echo Starting CBT Practice Backend Server
echo ========================================
echo.

node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please run "install-dependencies.bat" first
    pause
    exit /b 1
)

cd backend

if not exist "node_modules" (
    echo ERROR: Dependencies not installed!
    echo Please run "install-dependencies.bat" first
    pause
    exit /b 1
)

echo Starting backend server on port 5000...
echo.
echo Keep this window open!
echo Press Ctrl+C to stop the server
echo.

npm start
