@echo off
echo ========================================
echo Starting CBT Practice Frontend
echo ========================================
echo.

node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please run "install-dependencies.bat" first
    pause
    exit /b 1
)

cd frontend

if not exist "node_modules" (
    echo ERROR: Dependencies not installed!
    echo Please run "install-dependencies.bat" first
    pause
    exit /b 1
)

echo Starting frontend server...
echo Browser will open automatically at http://localhost:3000
echo.
echo Keep this window open!
echo Press Ctrl+C to stop the server
echo.

npm start
