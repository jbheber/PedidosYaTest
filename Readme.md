Pedidos Ya test

Dos aplicaciones separadas, una para front-end y otra para back-end

Applicación back-end desarrollada en Typescript, compilada a javascript y corre en Node.
La elección de Typescript para dessarrollar estas apps (Backend y frontend) fue para la reducción de los errores (y del ciclo de desarrollo para detectar errores) en el software.
El archivo gulpfile.js es el encargado de compilar el typescript a javascript.

Applicación fron-end desarrollada en Angular.
La elección de angular para desarrollar la applicación frontend es que es un framework gratuito y open source, que facilita la creación de web apps SPA.

Para correr las aplicaciones,

Pre: Colocar clientId & clientSecret para poder acceder a la API de PedidoYa
Archivo en .../Backend/server/config/appConfig.ts

1) Abrir 3 c terminales (consolas).
2) En la primera consola levantar el servido mongo
    a) cd hasta C:\Program Files\MongoDB\Server\3.2\bin>
    b) comando mongod
    -> Tutorial https://stackoverflow.com/questions/20796714/how-do-i-start-mongo-db-from-windows
3) En la segunda consola levantar la applicación servidor
    a) cd hasta .../Backend/
    b) npm install
    c) gulp build
    d) node dist/app.js
4) En la tercera consola levantar la applicación front-end
    a) cd hasta .../Frontend/client
    b) npm install
    c) ng serve

Puntos no ralizados
- Mostrar usuarios logueados
    Solución: mantener los usuarios en la base de datos, con un booleano que indique si estan o no activos. Al iniciar sesión se marcará al usuario como activo y al cerrar sesión se marcará como inactivo. Por si la sesión del usuario expira sin haber cerrado sesión, debe haber un proceso interno el cual chequea los usuarios inactivos dentro de un periodo de tiempo marcándolos como inactivos.