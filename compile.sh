# Limpiar carpetas
# clear
echo Limpiando directorios de despliegue
echo ______________________________________

find . -type f -name "*.pyc" -delete
find . -type f -name "*.spec" -delete
find . -type d -name "__pycache__" -exec rm -r {} \;
find . -type d -name "node_modules" -exec rm -r {} \;
find . -type d -name "dist" -exec rm -r {} \;
rm -dirf dist/
rm -dirf __ui_/dist/
rm -dirf ./*.spec
rm -dirf /Applications/TunnManagment

# Crea carpeta en Aplicaciones
# clear
echo Creando directorio de la APP
echo ______________________________________

mkdir /Applications/TunnManagment
rm -r ./ui.tunnmanagment.munakdigital*.app
rm -r ./app*.zip

# Compilando grafica
# clear
echo Compilando grafica
echo ______________________________________


cd __ui_/
if [ -d "/node_modules" ]; then
    echo "Los modulos de NODEJS están instalados."
else
    npm i
fi
npm run build
cd ..
mv ./__ui_/dist/mac-arm64/ui.tunnmanagment.munakdigital.app ./
zip -r app.zip ui.tunnmanagment.munakdigital.app
rm -r ./ui.tunnmanagment.munakdigital.app



# Instalar dependencias
# python3 -m pip install -r ./requeriments.txt
# Compilar
# clear
echo Compilando console
echo ______________________________________

python3 -m PyInstaller --add-data "icon.png:." --add-data "app.zip:." --add-data "data.json:." --noconsole --onefile --hidden-import multiprocessing --collect-all multiprocessing  --hidden-import pync --collect-all pync --name=TunnManagment --icon=icon.ico init.py


# Instalar icono
# clear
echo Instalando icono
echo ______________________________________

cp ./icon.png ./dist/TunnManagment.app/Contents/Resources/icon-windowed.icns
# Se envia la compilacion a la carpeta de tunles
# clear
echo Instalando archivos
echo ______________________________________
cp -r dist/TunnManagment /Applications/TunnManagment/

# Limpiar archivos extra
# rm -drf Tuneles\ Claro.spec
# clear
echo Limpiando directorios de despliegue
echo ______________________________________

rm -drf __pycache__/
rm -drf build/
rm -drf dist/
rm -drf ./app*.zip
find . -type f -name "*.pyc" -delete
find . -type f -name "*.spec" -delete
find . -type d -name "__pycache__" -exec rm -r {} \;