@echo off
title Urban Transport Intelligence System (UTIS) - Government Platform Launcher
color 0B

echo ===============================================================================
echo       URBAN TRANSPORT INTELLIGENCE SYSTEM (UTIS) - SIH 2026
echo       Ministry of Housing and Urban Affairs ^| Government of India
echo ===============================================================================
echo.

set "PATH=c:\Users\DELL\dashboard\.tools\node;%PATH%"

echo [*] Starting Backend REST API Server on http://localhost:5000...
start "UTIS Backend API (Port 5000)" /B node c:\Users\DELL\dashboard\backend\server.js

timeout /t 2 /nobreak >nul

echo [*] Starting Vite React + TypeScript Frontend on http://localhost:5173...
start "UTIS Frontend Web Portal" cmd /c "cd /d c:\Users\DELL\dashboard\frontend && npm run dev -- --host 127.0.0.1 --port 5173"

timeout /t 3 /nobreak >nul

echo [*] Launching Web Browser at http://127.0.0.1:5173...
start http://127.0.0.1:5173

echo.
echo [OK] Platform is running!
echo Press any key to close this launcher window (services keep running in background).
pause >nul
