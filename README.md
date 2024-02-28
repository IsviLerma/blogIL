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

```sql
CREATE TABLE entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    publish_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

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