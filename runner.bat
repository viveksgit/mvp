@echo off
cls
Set Sleep=0
:start
if %Sleep% == 10 ( goto end )
echo This is a loop
call npm test
Set /A Sleep+=1
echo %Sleep%
goto start
:end
echo "am 10 now"
pause