# InventarioFrontend

Para ejecutar de manera adecuada el programa, primero se deberá constar con los recursos necesarios, como las tecnologías de .net C#, Angular y postgreSql. 
Como primera instancia, se debe crear la base de datos en postgre, se adjunta el cript necesario para su creación de base de datos y tablas necesarias:

-- Crear la base de datos
CREATE DATABASE cclinventario;

-- Conectarse a la base de datos recién creada
\c cclinventario

-- Crear la tabla de productos
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cantidad INTEGER NOT NULL DEFAULT 0
);

-- Insertar datos iniciales para pruebas
INSERT INTO productos (nombre, cantidad) VALUES 
('Laptop HP ProBook', 10),
('Monitor Dell 24"', 15),
('Teclado Logitech K380', 20),
('Mouse Inalámbrico HP', 25),
('Disco Duro SSD 500GB', 8),
('Memoria RAM 16GB', 12),
('Audífonos Sony', 5),
('Cámara Web Logitech', 7),
('Cable HDMI 2m', 30),
('Router TP-Link', 3);

-- Verificar que los datos se hayan insertado correctamente
SELECT * FROM productos;

Luego, se deben descargar el back y el front respectivamente desde los repositorios compartidos.
Con el id de preferencia (recomiendo Visual Studio y Visual Studio Code para back y front respectivamente), se abren los proyectos para visualizar las arquitecturas diseñadas.
Una vez se desee, se ejecutan los proyectos, primero el back (documentado con swagger para verificar endpoints) y luego el front. En el FrontEnd, en la ruta src/environments/environment.prod.ts se dejó una variable correspondiente al 
apiUrl, para que se apunte al back en el puerto deseado. 
Finalmente se ejecuta el Front, de manera que se pueda interactuar con la plataforma, si el navegador no abre inmediatamente, puede abrir la url que facilita la terminal, pero por
defecto, la ruta para el proyecto Angular es http://localhost:4200/.


Muchas gracias por probar el aplicativo.

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
