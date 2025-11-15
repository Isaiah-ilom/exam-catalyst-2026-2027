@echo off
echo ========================================
echo Installing CBT Practice Dependencies
echo ========================================
echo.

echo Checking if Node.js is installed...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js first:
    echo 1. Go to https://nodejs.org/
    echo 2. Download and install the LTS version
    echo 3. Restart your computer
    echo 4. Run this script again
    echo.
    pause
    exit /b 1
)

echo Node.js is installed!
node --version
npm --version
echo.

echo Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
echo Backend dependencies installed successfully!
echo.

echo Installing frontend dependencies...
cd ..\frontend
call npm install
if errorlevel 1 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
echo Frontend dependencies installed successfully!
echo.

cd ..
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Run "start-backend.bat" in one terminal
echo 2. Run "start-frontend.bat" in another terminal
echo 3. Open http://localhost:3000 in your browser
echo.
pause
