@echo off

:: Limpiar la consola
cls

:: Limpiar carpetas
rd /s /q dist
rd /s /q *.spec
rd /s /q "C:\Program Files\TunnManagment"

:: Crear carpeta en Program Files
mkdir "C:\Program Files\TunnManagment"

rd /s /q .\ui.tunnmanagment.munakdigital.app
del .\app.zip

cd __ui_
start /wait npm i
start /wait npm run build
cd ..
powershell Compress-Archive -Path .\__ui_\dist\win-unpacked\* -DestinationPath .\app.zip


:: Instalar dependencias (comando deshabilitado en el script)
:: python -m pip install -r .\requeriments.txt

:: Compilar
python3.11.exe -m PyInstaller --add-data "icon.png;." --add-data "app.zip;." --add-data "data.json;." --onefile --hidden-import multiprocessing --collect-all multiprocessing --hidden-import pync --collect-all pync --name TunnManagment --icon icon.ico init.py

:: Instalar icono
copy .\icon.png .\dist\TunnManagment\Resources\icon-windowed.ico

:: Enviar la compilación a la carpeta de tunneles
xcopy /E /I .\dist\TunnManagment.exe "C:\Program Files\TunnManagment\"

:: Limpiar archivos extra
:: rd /s /q Tuneles^ Claro.spec
rd /s /q __pycache__
rd /s /q build
rd /s /q dist
del .\app.zip
