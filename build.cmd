setlocal enableextensions enabledelayedexpansion
echo off
call tsc
pushd dist

set modules=WidgetBase TEWidgets
set WidgetBase=Widget ParentWidget StructWidget ArrayWidget
set TEWidgets=String Number Boolean Enum Bitmask Struct Array

for %%i in (%modules%) do (
  echo %%i.js
  if exist "%%i.js" del "%%i.js"
  for %%j in (!%%i!) do type "%%i\%%j.js">>"%%i.js"
  rem rmdir "%%i" /s /q
)

popd
endlocal