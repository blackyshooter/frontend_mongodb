# ReservaMaster - Frontend

Frontend de **ReservaMaster**, una aplicación web desarrollada con **React + Vite** para la gestión de reservas y usuarios.

Este repositorio corresponde únicamente a la parte visual del sistema. El proyecto fue dividido en dos repositorios independientes:

* **Frontend:** interfaz web desarrollada con React.
* **Backend:** API REST desarrollada con Node.js, Express y MongoDB.

La aplicación permite consultar, crear y eliminar reservas, además de gestionar usuarios mediante autenticación con token JWT.

## Demo

Aplicación desplegada en Vercel:

https://frontend-mongodb-blush.vercel.app

## Descripción del proyecto

**ReservaMaster** es un sistema web simple para administrar reservas. El frontend consume una API externa encargada de conectarse con MongoDB y exponer los endpoints necesarios para trabajar con reservas y usuarios.

Desde la interfaz se puede:

* Visualizar reservas registradas.
* Crear nuevas reservas.
* Eliminar reservas existentes.
* Visualizar usuarios.
* Crear usuarios autenticados.
* Iniciar sesión mediante correo y contraseña.
* Guardar el token de sesión en el navegador.
* Consumir rutas protegidas enviando el token JWT al backend.

## Tecnologías utilizadas

* React
* Vite
* JavaScript
* TailwindCSS
* HTML
* CSS
* Fetch API
* LocalStorage
* Vercel

## Estructura general del frontend

```bash
frontend_mongodb/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ReservasView.jsx
│   │   ├── UsuariosView.jsx
│   │   └── Table.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── endpoints.md
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## Módulos principales

### App.jsx

Archivo principal de la aplicación.

Se encarga de:

* Controlar la vista activa entre reservas y usuarios.
* Manejar el inicio de sesión.
* Guardar el token JWT en `localStorage`.
* Cerrar sesión eliminando el token almacenado.
* Mostrar el estado de autenticación del usuario.
* Renderizar los componentes principales de reservas y usuarios.

La aplicación consume el backend desde la siguiente URL:

```js
const API_URL = "https://clase38-mongodb.vercel.app";
```

## ReservasView.jsx

Componente encargado de la gestión visual de reservas.

Sus principales responsabilidades son:

* Obtener la lista de reservas desde el backend.
* Mostrar las reservas en una tabla.
* Crear nuevas reservas.
* Eliminar reservas existentes.
* Enviar el token JWT en las peticiones protegidas.

Endpoint utilizado:

```bash
GET    /reservas
POST   /reservas
DELETE /reservas/:id
```

Campos utilizados para crear una reserva:

* Lugar
* Solicitante
* Fecha de inicio
* Fecha de fin

## UsuariosView.jsx

Componente encargado de la gestión visual de usuarios.

Sus principales responsabilidades son:

* Obtener la lista de usuarios desde el backend.
* Mostrar usuarios registrados.
* Crear nuevos usuarios.
* Eliminar usuarios.
* Validar que exista una sesión activa antes de crear usuarios.

Endpoints utilizados:

```bash
GET    /usuarios
POST   /usuarios
DELETE /usuarios/:id
POST   /usuarios/login
```

Campos utilizados para crear un usuario:

* Nombre
* Correo
* Clave

## Table.jsx

Componente reutilizable para mostrar información en formato de tabla.

Este componente permite:

* Recibir datos dinámicos.
* Recibir columnas configurables.
* Mostrar acciones por registro.
* Eliminar registros.
* Abrir un modal para crear nuevos registros.
* Reutilizar la misma tabla para reservas y usuarios.

Gracias a este componente, el frontend evita duplicar código entre las pantallas principales.

## Autenticación

El sistema permite iniciar sesión mediante correo y contraseña.

Cuando el usuario inicia sesión correctamente, el backend devuelve un token JWT. Ese token se guarda en el navegador usando `localStorage`.

```js
localStorage.setItem("token", data.token);
```

Luego, el token se utiliza en las peticiones protegidas enviándolo en el header `Authorization`:

```js
Authorization: `Bearer ${token}`
```

Para cerrar sesión, se elimina el token almacenado:

```js
localStorage.removeItem("token");
```

## Backend consumido

El frontend se conecta con una API REST externa publicada en:

```bash
https://clase38-mongodb.vercel.app
```

El backend está desarrollado con:

* Node.js
* Express
* MongoDB
* JWT
* CORS

Rutas principales del backend:

```bash
/reservas
/usuarios
/usuarios/login
```

## Instalación del proyecto

Clonar el repositorio:

```bash
git clone https://github.com/blackyshooter/frontend_mongodb.git
```

Ingresar al proyecto:

```bash
cd frontend_mongodb
```

Instalar dependencias:

```bash
npm install
```

Ejecutar en modo desarrollo:

```bash
npm run dev
```

Luego abrir el navegador en la URL indicada por Vite, normalmente:

```bash
http://localhost:5173
```

## Scripts disponibles

```bash
npm run dev
```

Ejecuta el proyecto en modo desarrollo.

```bash
npm run build
```

Genera la versión de producción.

```bash
npm run preview
```

Permite previsualizar localmente la versión compilada.

```bash
npm run lint
```

Ejecuta ESLint para revisar el código.

## Flujo básico de uso

1. El usuario ingresa a la aplicación.
2. Puede visualizar las reservas cargadas.
3. Puede iniciar sesión desde el modal de login.
4. Al iniciar sesión correctamente, el sistema guarda el token JWT.
5. Con el token activo, puede realizar acciones protegidas.
6. Puede cambiar entre la vista de reservas y la vista de usuarios.
7. Puede cerrar sesión eliminando el token del navegador.

## Características principales

* Separación entre frontend y backend.
* Consumo de API REST.
* Autenticación con JWT.
* Persistencia de sesión mediante `localStorage`.
* Componentes reutilizables.
* Interfaz responsive con TailwindCSS.
* Despliegue en Vercel.
* Código organizado por componentes.

## Objetivo académico / técnico

Este proyecto fue desarrollado con el objetivo de practicar una arquitectura fullstack separada, dividiendo el sistema en dos partes:

* Un backend encargado de la lógica, rutas, autenticación y conexión con MongoDB.
* Un frontend encargado de la experiencia visual, consumo de servicios y manejo de interacción del usuario.

La separación en dos repositorios permite trabajar de forma más ordenada, facilitando el despliegue independiente de cada parte del sistema.

## Autor

Desarrollado por **blackyshooter**.

Repositorio del frontend:

```bash
https://github.com/blackyshooter/frontend_mongodb
```
