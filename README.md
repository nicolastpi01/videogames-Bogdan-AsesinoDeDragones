# videogames-Bogdan-AsesinoDeDragones

Phaser + Brackets + webserver

Brackets 

Descargar brackets from http://brackets.io/
Instalar brackets dpkg -i Brackets.Release.1.10.64-bit.deb (el paquete descargado)
Verificar la instalación : dpkg -l | grep 'brackets' --> debe aparecer ii brackets
*Para ejecutar simplemente escribir brackets en la terminal

Webserver

install via npm:
npm install http-server -g
Server is in usr/bin/http-server
How to use:
https://www.npmjs.com/package/http-server

install node.js
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

download Phaser

clon from this repository https://github.com/photonstorm/phaser-ce/tree/v2.8.6


Testear server localmente:
desde terminal ingresar a la carpeta donde esta hellophaser, ejecutar http-server (levanta el servidor)
en browser: localhost:8080/index.html
