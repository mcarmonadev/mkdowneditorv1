# mkdowneditorv1
MarkDown Editor V1
Editor de MarkDown Versiòn 1.0.0 


### Tecnologias empleadas:

Desarrollo implementado sobre ReactJS en front, y ExpressJs en backend, con SqlLite

### Entorno de ejecucion:

Por defecto servidor front corre en puerto 3002 (http://localhost:3002)
BackEnd corre en puerto 8000 (http://localhost:8000)

Habilitado proxy para peticiones */api, redirecionaro al puerto 8000 desde el 3002, para evitar inconvenientes de CORS

Base de datos stand alone en sqlite

### Instalacion:

descargue el repositorio mediante el git clone https://github.com/mcarmonadev/mkdowneditorv1.git

##Front:
Posicionese dentro de la carpeta 'mkdowneditorv1', e installe en npm, mediante comando 'npm install', esto instalarà dependencias del lado 
# Obervacion: si ud no tiene webpack instalado en su ambiente local, entonces es posible que deba instalarlo npm 'install -g webpack'

##Backend:
Ubicarse dentro del directirio 'ServBackEnd' e instalar dependencias con el comando 'npm install'


### Inicializaciòn de BD:
Primero posiciònese en el directorio de la aplicaciòn backend 'ServBackEnd' y levante la aplicaciòn tipeando el comando 'npm start'
La consola mostrarà el puerto de escucha para la ejecuciòn actual 'Server running on port 8000'

Para inicializar la BD de SqlLite, una vez levantada la aplicaciòn Backend, invoque a la pàgina de inicializaciòn:
http://localhost:8000/initbd

Esto crearà el archivo de BD SqlLite, una vez ejecutada la pàgina de incializaciòn, se crarà el archivo
ServBackEnd\db.sqlite y se le agregaràn registros de emeplo para datos de ejemplo

##Levantar Front:
Posicionese en la raís del proyecto y ejecute el siguiente comando 'npm start'
Esto arrancará la aplicación, del lado front, con un servidor estático, tras lo cual darà un aviso de todo OK: 'Compiled successfully.'

Con esto listo para entrar en el sitio, por la url
http://localhost:3002

### Servicios API

Los servicios son los siguientes:
GET - ttp://localhost:3002/api/files  - Obtener el liestado de archivos
GET - ttp://localhost:3002/api/files/filebyname/:fileName   - obtener un archivo por el nombre (validar si el nombre está ocupado)
PUT - ttp://localhost:3002/api/file     -  agregar nuevo file 
POST - ttp://localhost:3002/api/file    -  update file
GET - ttp://localhost:3002/api/file/delete/:idFile     -  delete file

## Servicios API Ud si desea puede cambiar los puertos, revisando la configuraciòn
## Muchos aspectos se habrìa podido mejorar, pero el tiempo apremia, por lo tanto esta versiòn queda congelada asi

## Para resetear datos, detenga el backend, y elimine el archivo bd.sqlite, e invoque la pagina de inicializaciòn de bd

## Dado el uso excesivo de hooks, refs, y anidamientos, habria sido màs práctico el uso del patrón FLUX, implementando con REDUX
Por esta versiòn, eso no ha sido posible.

#### Importante!: El renderizado de Markdown, se realiza al momento de Visualizar un archivo en lista y al momento de guardar mediante el botòn SAVE.

## Screenshot de la aplicaciòn:
https://github.com/mcarmonadev/mkdowneditorv1/blob/master/MarkDown_ScreenShot.png








