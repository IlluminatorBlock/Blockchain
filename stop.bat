@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

:: Print header
echo ===================================
echo    Stop All Running Processes
echo ===================================
echo.

:: Stop Ganache
echo [1/3] Stopping Ganache...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :7545') do (
    echo Found Ganache process with PID %%a
    taskkill /PID %%a /F
)

:: Stop Node processes (Truffle and Frontend)
echo [2/3] Stopping Node processes...
taskkill /F /IM node.exe

:: Stop Python processes (Backend Django)
echo [3/3] Stopping Python processes...
taskkill /F /IM python.exe

echo.
echo ===================================
echo    All Processes Have Been Stopped
echo ===================================
echo.

pause