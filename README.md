# README del Backend (Servidor)

## Nombre del Proyecto
Blog App Backend

## Descripción
Este es el backend (servidor) de una aplicación de blog simple. Proporciona endpoints para gestionar entradas de blog, como la obtención de todas las entradas, la obtención de detalles de una entrada por ID y la creación de nuevas entradas.

## Tecnologías Utilizadas
1. Node.js
2. Express.js
3. MySQL (o tu base de datos preferida)
4. Cors
5. Body-parser

## Instalación
1. Clona este repositorio.
2. Navega al directorio del proyecto del backend.
3. Ejecuta npm install para instalar las dependencias.
4. Configura la base de datos en server.js proporcionando los detalles de conexión.
5. Ejecuta npm start para iniciar el servidor.

```bash
npm start
```

## Configuración de la Base de Datos
Asegúrate de tener una base de datos MySQL con una tabla llamada entries. Puedes usar el siguiente SQL para crearla:

1. Crear la base de datos.
```sql
CREATE DATABASE IF NOT EXISTS `blog_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `blog_db`;
```
2. Crear la tabla de entradas.
```sql
CREATE TABLE IF NOT EXISTS `entries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `publish_date` date NOT NULL DEFAULT curdate(),
  `content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```
3. Insertar registros de prueba para visualización en sistema (Estos registros son solo para prueba de funcionamiento).
```sql
INSERT INTO `entries` (`id`, `title`, `author`, `publish_date`, `content`) VALUES
	(1, 'Entrada 1', 'Isvi Lerma', '2022-03-01', 'Uno  Uno  Uno  Uno  Uno  Uno  Uno  Uno  Uno  Uno Uno  Uno  Uno  Uno  Uno  Uno  Uno  Uno  Uno  Uno '),
	(2, 'Entrada 2', 'Mizraim Rosas', '2022-03-02', 'Dos Dos Dos Dos Dos Dos Dos Dos Dos Dos Dos Dos Dos Dos Dos Dos Dos Dos Dos Dos '),
	(3, 'Entrada 3', 'Lorem', '2022-03-03', 'Tres Tres Tres Tres Tres Tres Tres Tres Tres Tres Tres Tres Tres Tres Tres Tres Tres Tres Tres Tres '),
	(4, 'Entrada 4', 'Steve Jobs', '2022-03-03', 'Cuatro Cuatro Cuatro Cuatro Cuatro Cuatro Cuatro Cuatro Cuatro Cuatro Cuatro Cuatro Cuatro Cuatro '),
	(7, 'Entrada 5', 'Bill', '2024-02-28', 'Cinco Cinco Cinco Cinco Cinco Cinco Cinco Cinco Cinco Cinco Cinco Cinco Cinco Cinco Cinco Cinco '),
	(9, 'Entrada 6', 'Mark', '2024-02-28', 'Seis Seis Seis Seis Seis Seis Seis Seis Seis Seis Seis Seis Seis Seis Seis Seis Seis Seis Seis Seis Seis ');
```

## Importar base de datos
Para una importación rápida de la base de datos, es posible descargar el archivo el cual contiene el script necesario en la carpeta "database".

## Endpoints
```bash
GET /entries: Obtiene todas las entradas de blog.
```
```bash
GET /entries/:id: Obtiene detalles de una entrada por ID.
```
```bash
POST /entries: Crea una nueva entrada de blog.
```

# README del Frontend (Cliente)

## Nombre del Proyecto
Blog App Frontend

## Descripción
Este es el frontend (cliente) de una aplicación de blog simple. Permite a los usuarios ver todas las entradas de blog, buscar entradas, crear nuevas entradas y ver detalles de una entrada específica.

## Tecnologías Utilizadas
1. React
2. Material-UI
3. Axios

## Instalación
1. Clona este repositorio.
2. Navega al directorio del proyecto del frontend.
3. Ejecuta npm install para instalar las dependencias.
4. Configura la URL del backend en BlogList.js para que coincida con la URL donde se ejecuta el backend.

```js
const apiUrl = 'http://localhost:3001'; // Cambia esta URL según la configuración de tu servidor backend
```

Ejecuta npm start para iniciar la aplicación.

```bash
npm start
```

## Uso
La aplicación estará disponible en http://localhost:3000.
Puedes ver las entradas de blog, buscar, crear nuevas entradas y ver detalles haciendo clic en "Seguir leyendo".