@echo off
SETLOCAL ENABLEDELAYEDEXPANSION

:: Set the title for the terminal window
title Voting System Startup

:: Print banner
echo ===================================
echo    Voting System Startup Script
echo ===================================
echo.

:: Step 1: Start Ganache on port 7545
echo [1/4] Starting Ganache...
start /B ganache-cli -i 5777 -p 7545
echo Waiting for Ganache to initialize...
timeout /t 7 /nobreak >nul

:: Step 2: Run Truffle commands
echo [2/4] Deploying smart contracts with Truffle...
cd Truffle
call truffle migrate --network development
if %ERRORLEVEL% neq 0 (
    echo Error: Truffle migration failed
    pause
    exit /b 1
)
cd ..

:: Step 3: Start Backend
echo [3/4] Starting Backend server...
cd Backend
if not exist "venv\Scripts\activate.bat" (
    echo Error: Virtual environment not found. Please create it first.
    pause
    exit /b 1
)
call venv\Scripts\activate.bat
cd voting_backend
start /B cmd /k python manage.py runserver
cd ..\..
timeout /t 10 /nobreak >nul

:: Step 4: Start Frontend
echo [4/4] Starting Frontend development server...
cd Frontend\voting_run
call npm run dev
timeout /t 10 /nobreak >nul

echo.
echo ===================================
echo    All services are now running
echo ===================================
echo.
echo Ganache: http://localhost:7545
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo.
