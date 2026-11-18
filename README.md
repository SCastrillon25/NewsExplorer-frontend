# News Explorer – Frontend

Aplicación web desarrollada con **React** que permite buscar noticias, consultar resultados y guardar artículos favoritos mediante una cuenta de usuario.

## Descripción del proyecto

News Explorer es una aplicación que facilita la búsqueda de noticias a través de una interfaz intuitiva y adaptable a diferentes dispositivos.

Los usuarios pueden:
- Buscar noticias mediante palabras clave.
- Consultar los resultados de búsqueda.
- Visualizar información de cada artículo.
- Registrarse e iniciar sesión.
- Guardar artículos favoritos.
- Consultar y administrar sus noticias guardadas.
- Cerrar sesión de forma segura.

## Tecnologías utilizadas

- **HTML5**
- **CSS3**
- **JavaScript**
- **React**
- **Vite**
- **React Router DOM**
- **Fetch API**
- **ESLint**

## Estructura del proyecto

```text
fronted/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── page/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/SCastrillon25/NewsExplorer-frontend.git
```

### 2. Ingresar al proyecto

```bash
cd NewsExplorer-frontend
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en la dirección local que indique Vite, normalmente:

```text
http://localhost:5173/
```

## Backend

La aplicación se comunica con un backend desarrollado con Node.js, Express y MongoDB, mediante una API REST para gestionar usuarios y artículos guardados.

## Validación de código

Para ejecutar ESLint:

```bash
npx eslint .
```

## Autor

Desarrollado como parte del programa de formación en desarrollo web de **TripleTen**.

**Proyecto:** News Explorer – Sprint 20# News Explorer - Frontend
