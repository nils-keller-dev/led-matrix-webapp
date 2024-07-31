@echo off
setlocal

set BUILD_DIR=dist
set PI_USER=admin
set PI_HOST=192.168.178.43
set PI_TARGET_DIR=/home/admin/led-matrix-application/led_matrix_application/webapp
set PSCP_PATH=pscp -i "C:\.ssh\LED.ppk"
set PLINK_PATH=plink -i "C:\.ssh\LED.ppk"
set DELETE_OLD_FILES=1

:argloop
if "%~1"=="" goto endargs
if "%~1"=="--no-delete" set DELETE_OLD_FILES=0 & shift & goto argloop
shift
goto argloop
:endargs

echo Building the project...
call npm run build
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

echo.

if %DELETE_OLD_FILES%==1 (
    echo Deleting old files on Raspberry Pi...
    echo y | %PLINK_PATH% -ssh %PI_USER%@%PI_HOST% "rm -rf %PI_TARGET_DIR%/*"
    if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%
    echo Done.
) else (
    echo Skipping deletion of old files.
)

echo.
echo Transferring files to Raspberry Pi...
%PSCP_PATH% -r %BUILD_DIR%\* %PI_USER%@%PI_HOST%:%PI_TARGET_DIR%
if %ERRORLEVEL% neq 0 exit /b %ERRORLEVEL%

echo.
echo Deployment completed successfully.

endlocal
