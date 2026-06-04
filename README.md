<div align="center">
  <h1>🍷 Nocturne — Licorería Premium 🍾</h1>
  <p><strong>Sistema Avanzado de Gestión de Inventario, Ventas y E-Commerce (SIS257)</strong></p>
  
  [![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
  [![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D)](https://vuejs.org/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)
</div>

<hr />

## 📖 Descripción del Proyecto

**Nocturne Virtual Cellar** es un sistema full-stack desarrollado para la gestión integral de una licorería de alto nivel. Ofrece una solución completa que abarca desde un **catálogo de productos y e-commerce** para clientes, hasta un robusto sistema administrativo que maneja el **inventario por lotes, ventas y cadena de frío**, todo bajo estrictos estándares de seguridad mediante **autenticación JWT y roles de usuario**.

Inspirado en la elegancia, la marca Nocturne refleja una bóveda virtual donde prima la estética *oro sobre negro* y la trazabilidad exhaustiva (cada botella cuenta).

---

## 🚀 Características Principales

*   🔒 **Autenticación y Autorización**: Sistema seguro mediante JWT (JSON Web Tokens) con separación de roles (Administrador, Vendedor, Cliente).
*   📦 **Gestión de Inventario Avanzada**: Trazabilidad de productos por lotes, control de fechas de vencimiento, grado alcohólico y mantenimiento de cadena de frío.
*   🛒 **Tienda Virtual (E-Commerce)**: Interfaz de cliente atractiva y responsiva con catálogo de licores y carrito de compras.
*   💳 **Módulo de Ventas**: Registro y seguimiento completo del historial de transacciones.
*   📄 **API Documentada**: Documentación interactiva de la API REST generada automáticamente con Swagger UI.

---

## 💻 Tecnologías Utilizadas

| Capa | Tecnología |
| :--- | :--- |
| **Base de Datos** | PostgreSQL (`sis257_nocturne`) |
| **Backend (API)** | NestJS, TypeORM, JWT, Swagger |
| **Frontend (Tienda)**| Vue 3, Axios, Bootstrap 5, Vite |

> **Nota sobre el Repositorio:** Usa la carpeta **`backend_nocturne`** como directorio principal para la API. (Existe una carpeta bloqueada por el IDE llamada `backend_NocturneTx` que debe ser ignorada/eliminada).

---

## ⚙️ Requisitos Previos

*   [Node.js](https://nodejs.org/) (v18+)
*   [PostgreSQL](https://www.postgresql.org/) (v14+)
*   Git

---

## 🛠️ Instalación y Configuración

### 1. Configuración de Base de Datos (PostgreSQL)

Ejecuta el siguiente script SQL para preparar la base de datos y el usuario:

```sql
CREATE USER usr_nocturnetx WITH PASSWORD '123456';
CREATE DATABASE sis257_nocturne OWNER usr_nocturnetx;
GRANT ALL PRIVILEGES ON DATABASE sis257_nocturne TO usr_nocturnetx;
```

### 2. Configuración del Backend

Dirígete a la carpeta del backend, configura las variables de entorno y ejecuta el servidor:

```bash
# Entrar al directorio
cd backend_nocturne

# Instalar dependencias
npm install

# Crear el archivo .env (ver Variables de Entorno) y arrancar en modo desarrollo
npm run start:dev
```

**Archivo `backend_nocturne/.env`**
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=usr_nocturnetx
DB_PASSWORD=123456
DB_NAME=sis257_nocturne
JWT_SECRET=nocturne-jwt-secret-change-in-production-2026
FRONTEND_URL=http://localhost:5173
```

### 3. Configuración del Frontend

Abre otra terminal para el cliente web:

```bash
# Entrar al directorio
cd frontend_nocturne

# Instalar dependencias
npm install

# Levantar el servidor de desarrollo Vite
npm run dev
```

---

## 🌐 Endpoints y Rutas Principales

Una vez que ambos servicios estén corriendo, puedes acceder a:

*   📱 **Tienda Web (Frontend):** [http://localhost:5173](http://localhost:5173)
*   🔌 **API Base (Backend):** [http://localhost:3000/api](http://localhost:3000/api)
*   📚 **Documentación Swagger:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs) *(¡NUEVO!)*

### 👤 Usuario Demo (Seed Automático)
*   **Email:** `admin@nocturne.bo`
*   **Contraseña:** `Nocturne2026!`

---

## 📊 Presentación y Modelo de Negocio

Para revisar el modelo de negocio, reglas del sistema y enfoque académico del proyecto, consulta el documento:
👉 **[PRESENTACION_NOCTURNE.md](./PRESENTACION_NOCTURNE.md)** (Listo para exportar a PDF/Slides).

---
<div align="center">
  <p><strong>Nocturne</strong> — <em>Donde cada botella cuenta.</em></p>
  <p>Desarrollado para el módulo SIS257 (2026)</p>
</div>
