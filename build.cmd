@echo off
setlocal enableextensions enabledelayedexpansion
call tsc

pushd dist\WidgetBase
copy /y /b Widget.js + ParentWidget.js + StructWidget.js + ArrayWidget.js ..\WidgetBase.js
popd

pushd dist\TEWidgets
copy /y /b String.js + Number.js + Boolean.js + Enum.js + Bitmask.js + Struct.js + Array.js ..\TEWidgets.js
popd

endlocal