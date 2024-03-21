@echo off
setlocal

set BUILD_DIR=dist
set PI_USER=admin
set PI_HOST=192.168.178.43
set PI_TARGET_DIR=/home/admin/rpi-led-matrix-application/webapp
set PSCP_PATH=pscp -i "C:\.ssh\LED.ppk"
set PLINK_PATH=plink -i "C:\.ssh\LED.ppk"

echo Building the project...
call npm run build
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

echo.
echo Deleting old files on Raspberry Pi...
echo y | %PLINK_PATH% -ssh %PI_USER%@%PI_HOST% "rm -rf %PI_TARGET_DIR%/*"
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%
echo Done.

echo.
echo Transferring files to Raspberry Pi...
%PSCP_PATH% -r %BUILD_DIR%\* %PI_USER%@%PI_HOST%:%PI_TARGET_DIR%
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

echo.
echo Deployment completed successfully.

endlocal
