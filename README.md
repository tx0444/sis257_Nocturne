<div align="center">

# 🍸 NOCTURNE: COLD STORAGE ❄️

### Sistema de Gestión de Inventario y Ventas para Licorerías Premium

[![NestJS](https://img.shields.io/badge/NestJS-v11-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge&logo=typeorm&logoColor=white)](https://typeorm.io/)
---

*Plataforma backend robusta diseñada para la comercialización de bebidas premium nacionales e importadas, con control estricto de stock y cadena de frío.*

</div>

---

## 📖 Tabla de Contenidos

- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Características Principales](#-características-principales)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [Modelo de Datos](#-modelo-de-datos)
- [Diagrama Entidad-Relación](#-diagrama-entidad-relación)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Roadmap](#-roadmap)
- [Autores](#-autores)

---

## 🏢 Acerca del Proyecto

**Nocturne: Cold Storage** nace como respuesta a la necesidad de digitalizar y optimizar la operación de licorerías de alta gama. En un mercado donde la calidad del producto depende directamente de su correcta conservación y trazabilidad, contar con un sistema integral de gestión resulta fundamental.

El sistema abarca todo el ciclo operativo del negocio: desde el registro de proveedores y la recepción de mercadería con control de lotes, hasta el punto de venta con facturación y múltiples métodos de pago. Todo esto respaldado por un sistema de roles que garantiza la seguridad y auditoría de cada operación.

### 🎯 Problema que Resuelve

| Problema | Solución |
|:---------|:---------|
| Control manual de inventario propenso a errores | Gestión digital con actualización en tiempo real |
| Falta de trazabilidad de lotes y vencimientos | Registro detallado por lote con alertas de caducidad |
| Productos que pierden calidad sin cadena de frío | Marcado explícito de productos que requieren refrigeración |
| Descontrol en ventas y facturación | Sistema de ventas con detalle, factura y múltiples métodos de pago |
| Acceso sin control al sistema | Autenticación con roles (Admin, Vendedor, Almacenero) |

---

## ✨ Características Principales

<table>
<tr>
<td width="50%">

### 📦 Gestión de Productos
- Catálogo completo de bebidas premium
- Clasificación por categorías personalizables
- Control de grado alcohólico y precios
- Identificación de productos con cadena de frío

</td>
<td width="50%">

### 🏭 Control de Inventario
- Stock en tiempo real por producto
- Trazabilidad por número de lote
- Control de fechas de vencimiento
- Ubicación por estante/almacén

</td>
</tr>
<tr>
<td width="50%">

### 🧾 Sistema de Ventas
- Registro de ventas con facturación
- Detalle línea por línea de cada venta
- Soporte para Efectivo, QR y Tarjeta
- Cálculo automático de totales y subtotales

</td>
<td width="50%">

### 🔐 Seguridad y Usuarios
- Autenticación por usuario y contraseña
- Roles diferenciados (Admin, Vendedor, Almacenero)
- Registro de último inicio de sesión
- Contraseñas almacenadas con hash

</td>
</tr>
</table>

---

## 🏛 Arquitectura del Sistema

El proyecto sigue la arquitectura modular de **NestJS**, aplicando principios de diseño **SOLID** y el patrón **Repository** para el acceso a datos:

```
┌─────────────────────────────────────────────────────────────────┐
│                        Cliente (REST API)                       │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP Requests
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Controllers (Controladores)                 │
│         Reciben las peticiones y validan los parámetros         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Services (Servicios)                       │
│            Lógica de negocio y reglas de operación              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Repositories (TypeORM)                       │
│              Acceso a datos y consultas a la BD                 │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     PostgreSQL Database                         │
│               Base de datos relacional del sistema              │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Modelo de Datos

### A. Producto

> Entidad central del sistema. Representa cada bebida disponible en el catálogo.

| Campo | Tipo | Restricciones | Descripción |
|:------|:-----|:-------------|:------------|
| `id` | `UUID` | PK, Auto-generado | Identificador único |
| `nombre` | `VARCHAR` | NOT NULL | Nombre comercial del producto |
| `grado_alcoholico` | `FLOAT` | ≥ 0 | Porcentaje de alcohol |
| `precio_venta` | `DECIMAL(10,2)` | NOT NULL, ≥ 0 | Precio de venta al público (Bs.) |
| `requiere_frio` | `BOOLEAN` | DEFAULT false | ¿Necesita cadena de frío? |
| `categoria_id` | `UUID` | FK → Category | Categoría a la que pertenece |
| `proveedor_id` | `UUID` | FK → Provider | Proveedor que lo suministra |

---

### B. Categoría

> Permite organizar los productos por tipo de bebida.

| Campo | Tipo | Restricciones | Descripción |
|:------|:-----|:-------------|:------------|
| `id` | `UUID` | PK, Auto-generado | Identificador único |
| `nombre` | `VARCHAR` | NOT NULL, UNIQUE | Nombre de la categoría |
| `descripcion` | `TEXT` | NULLABLE | Descripción detallada |
| `estado` | `BOOLEAN` | DEFAULT true | Activo / Inactivo |

> **Ejemplos de categorías:** Singanis, Vinos de Altura, Cervezas Artesanales, Whiskys, Mezcladores, Ron Premium

---

### C. Proveedor

> Gestiona la información de las empresas que suministran los productos.

| Campo | Tipo | Restricciones | Descripción |
|:------|:-----|:-------------|:------------|
| `id` | `UUID` | PK, Auto-generado | Identificador único |
| `razon_social` | `VARCHAR` | NOT NULL | Razón social o nombre de la empresa |
| `nit` | `VARCHAR` | NOT NULL, UNIQUE | Número de Identificación Tributaria |
| `contacto` | `VARCHAR` | NULLABLE | Nombre del agente comercial |
| `telefono` | `VARCHAR` | NOT NULL | Teléfono de contacto |
| `email` | `VARCHAR` | NULLABLE | Correo electrónico |
| `direccion` | `TEXT` | NULLABLE | Dirección física |

---

### D. Inventario

> Control de stock separado del producto, permitiendo manejar múltiples almacenes, lotes y fechas de vencimiento por separado.

| Campo | Tipo | Restricciones | Descripción |
|:------|:-----|:-------------|:------------|
| `id` | `UUID` | PK, Auto-generado | Identificador único |
| `producto_id` | `UUID` | FK → Product, NOT NULL | Producto al que pertenece este stock |
| `cantidad` | `INTEGER` | NOT NULL, ≥ 0 | Unidades disponibles |
| `lote` | `VARCHAR` | NOT NULL | Código de lote para trazabilidad |
| `fecha_vencimiento` | `DATE` | NULLABLE | Fecha de caducidad del lote |
| `ubicacion_estante` | `VARCHAR` | NULLABLE | Ubicación física (Ej: A3-E2) |

---

### E. Venta

> Registra cada transacción de venta realizada en la licorería.

| Campo | Tipo | Restricciones | Descripción |
|:------|:-----|:-------------|:------------|
| `id` | `UUID` | PK, Auto-generado | Identificador único |
| `fecha` | `TIMESTAMP` | NOT NULL, DEFAULT NOW | Fecha y hora de la venta |
| `nro_factura` | `VARCHAR` | NOT NULL, UNIQUE | Número de factura emitida |
| `total` | `DECIMAL(10,2)` | NOT NULL, ≥ 0 | Monto total de la venta (Bs.) |
| `metodo_pago` | `ENUM` | NOT NULL | Efectivo \| QR \| Tarjeta |
| `usuario_id` | `UUID` | FK → User, NOT NULL | Usuario que registró la venta |

---

### F. Detalle de Venta

> Línea individual dentro de una venta. Cada producto vendido genera un registro.

| Campo | Tipo | Restricciones | Descripción |
|:------|:-----|:-------------|:------------|
| `id` | `UUID` | PK, Auto-generado | Identificador único |
| `venta_id` | `UUID` | FK → Sale, NOT NULL | Venta a la que pertenece |
| `producto_id` | `UUID` | FK → Product, NOT NULL | Producto vendido |
| `cantidad` | `INTEGER` | NOT NULL, > 0 | Unidades vendidas |
| `precio_unitario` | `DECIMAL(10,2)` | NOT NULL | Precio al momento de la venta |
| `subtotal` | `DECIMAL(10,2)` | NOT NULL | cantidad × precio_unitario |

---

### G. Usuario

> Control de acceso al sistema con roles diferenciados para auditoría y seguridad.

| Campo | Tipo | Restricciones | Descripción |
|:------|:-----|:-------------|:------------|
| `id` | `UUID` | PK, Auto-generado | Identificador único |
| `username` | `VARCHAR` | NOT NULL, UNIQUE | Nombre de usuario |
| `password` | `VARCHAR` | NOT NULL | Contraseña (almacenada con bcrypt hash) |
| `nombre_completo` | `VARCHAR` | NOT NULL | Nombre completo del empleado |
| `rol` | `ENUM` | NOT NULL | Administrador \| Vendedor \| Almacenero |
| `ultimo_login` | `TIMESTAMP` | NULLABLE | Último inicio de sesión registrado |

---

## 🔗 Diagrama Entidad-Relación

```
                         ┌───────────────────┐
                         │    CATEGORIA      │
                         │───────────────────│
                         │ id          (PK)  │
                         │ nombre            │
                         │ descripcion       │
                         │ estado            │
                         └────────┬──────────┘
                                  │
                                  │ 1
                                  │
                                  │ N
┌───────────────────┐    ┌────────┴──────────┐    ┌───────────────────┐
│    PROVEEDOR      │    │     PRODUCTO      │    │    INVENTARIO     │
│───────────────────│    │───────────────────│    │───────────────────│
│ id          (PK)  │    │ id          (PK)  │    │ id          (PK)  │
│ razon_social      │ 1  │ nombre            │ 1  │ producto_id (FK)  │
│ nit               ├────┤ grado_alcoholico  ├────┤ cantidad          │
│ contacto          │    │ precio_venta      │    │ lote              │
│ telefono          │  N │ requiere_frio     │  N │ fecha_vencimiento │
│ email             │    │ categoria_id (FK) │    │ ubicacion_estante │
│ direccion         │    │ proveedor_id (FK) │    └───────────────────┘
└───────────────────┘    └────────┬──────────┘
                                  │
                                  │ 1
                                  │
                                  │ N
                          ┌───────┴───────────┐
                          │   DETALLEDEVENTA  │
                          │───────────────────│
                          │ id          (PK)  │
                          │ venta_id    (FK)  │
                          │ producto_id (FK)  │
                          │ cantidad          │
                          │ precio_unitario   │    ┌───────────────────┐
                          │ subtotal          │    │      USUARIO      │
                          └────────┬──────────┘    │───────────────────│
                                   │               │ id          (PK)  │
                                   │ N             │ username          │
                                   │               │ password          │
                                   │ 1             │ nombre_completo   │
                          ┌────────┴──────────┐ 1  │ rol               │
                          │      VENTA        ├────┤ ultimo_login      │
                          │───────────────────│  N └───────────────────┘
                          │ id          (PK)  │
                          │ fecha             │
                          │ nro_factura       │
                          │ total             │
                          │ metodo_pago       │
                          │ usuario_id  (FK)  │
                          └───────────────────┘
```

### Resumen de Relaciones

| Relación | Tipo | Descripción |
|:---------|:-----|:------------|
| Category → Product | 1:N | Una categoría agrupa muchos productos |
| Provider → Product | 1:N | Un proveedor suministra muchos productos |
| Product → Inventory | 1:N | Un producto puede tener múltiples registros de stock (lotes) |
| Product → SaleDetail | 1:N | Un producto puede aparecer en múltiples detalles de venta |
| Sale → SaleDetail | 1:N | Una venta contiene múltiples líneas de detalle |
| User → Sale | 1:N | Un usuario puede registrar múltiples ventas |

---

## 🛠 Tecnologías

<table>
<tr>
<th>Categoría</th>
<th>Tecnología</th>
<th>Versión</th>
<th>Propósito</th>
</tr>
<tr>
<td rowspan="2"><strong>🔧 Runtime</strong></td>
<td>Node.js</td>
<td>v18+</td>
<td>Entorno de ejecución JavaScript</td>
</tr>
<tr>
<td>TypeScript</td>
<td>v5.7</td>
<td>Superset tipado de JavaScript</td>
</tr>
<tr>
<td rowspan="1"><strong>🏗 Framework</strong></td>
<td>NestJS</td>
<td>v11</td>
<td>Framework backend progresivo para Node.js</td>
</tr>
<tr>
<td rowspan="2"><strong>💾 Base de Datos</strong></td>
<td>PostgreSQL</td>
<td>v15+</td>
<td>Sistema de gestión de base de datos relacional</td>
</tr>
<tr>
<td>TypeORM</td>
<td>—</td>
<td>ORM para mapeo objeto-relacional</td>
</tr>
<tr>
<td rowspan="2"><strong>🧪 Testing</strong></td>
<td>Jest</td>
<td>v30</td>
<td>Framework de pruebas unitarias</td>
</tr>
<tr>
<td>Supertest</td>
<td>v7</td>
<td>Pruebas de integración HTTP</td>
</tr>
<tr>
<td rowspan="2"><strong>📐 Calidad</strong></td>
<td>ESLint</td>
<td>v9</td>
<td>Linter para análisis estático de código</td>
</tr>
<tr>
<td>Prettier</td>
<td>v3</td>
<td>Formateador de código</td>
</tr>
</table>

---

## 🚀 Instalación

### Requisitos Previos

```
✅ Node.js v18 o superior
✅ npm v9 o superior
✅ PostgreSQL v15 o superior (para producción)
✅ Git
```

### Paso a Paso

```bash
# 1️⃣ Clonar el repositorio
git clone https://github.com/<tu-usuario>/Nocturne_cold_storage.git

# 2️⃣ Ingresar al directorio del proyecto
cd Nocturne_cold_storage

# 3️⃣ Instalar las dependencias
npm install

# 4️⃣ Ejecutar en modo desarrollo
npm run start:dev
```

> 📡 La API estará disponible en **http://localhost:3000**

---

## 📜 Scripts Disponibles

| Script | Comando | Descripción |
|:-------|:--------|:------------|
| 🔨 Build | `npm run build` | Compila el proyecto TypeScript |
| 🚀 Start | `npm run start` | Inicia el servidor en modo producción |
| 🔄 Dev | `npm run start:dev` | Inicia con hot-reload (desarrollo) |
| 🐛 Debug | `npm run start:debug` | Inicia con depurador adjunto |
| 🧪 Test | `npm run test` | Ejecuta las pruebas unitarias |
| 🧪 Test Watch | `npm run test:watch` | Pruebas en modo observación |
| 📊 Coverage | `npm run test:cov` | Genera reporte de cobertura |
| 🧹 Lint | `npm run lint` | Analiza y corrige el código |
| 🎨 Format | `npm run format` | Formatea el código con Prettier |

---

## 📁 Estructura del Proyecto

```
nocturne-cold-storage/
│
├── 📂 src/                          # Código fuente principal
│   ├── 📄 main.ts                   # Punto de entrada de la aplicación
│   ├── 📄 app.module.ts             # Módulo raíz
│   ├── 📄 app.controller.ts         # Controlador principal
│   ├── 📄 app.controller.spec.ts    # Tests del controlador
│   └── 📄 app.service.ts            # Servicio principal
│
├── 📂 test/                         # Pruebas end-to-end
│
├── 📄 package.json                  # Dependencias y scripts
├── 📄 tsconfig.json                 # Configuración TypeScript
├── 📄 tsconfig.build.json           # Config TS para compilación
├── 📄 nest-cli.json                 # Configuración NestJS CLI
├── 📄 eslint.config.mjs             # Configuración ESLint
├── 📄 .prettierrc                   # Configuración Prettier
├── 📄 .gitignore                    # Archivos ignorados por Git
└── 📄 README.md                     # Documentación del proyecto
```

---

## 🗺 Roadmap

- [x] 📋 Creación del repositorio en GitHub con README.md inicial
- [x] 📝 Definición de entidades y campos tentativos
- [x] 🏗 Creación del proyecto backend con NestJS
- [x] 📊 Consolidación de entidades en la documentación
- [ ] 💾 Configuración de PostgreSQL y TypeORM
- [ ] 🔧 Implementación de módulos CRUD para cada entidad
- [ ] 🔐 Sistema de autenticación y autorización (JWT)
- [ ] 📖 Documentación de API con Swagger/OpenAPI
- [ ] 🧪 Pruebas unitarias y de integración
- [ ] 🚀 Despliegue en producción

---

## 👥 Autores

| Rol | Nombre |
|:----|:-------|
| 📚 Materia | SIS257 — Desarrollo de Aplicaciones Int/internet II |
| 🏫 Modalidad | Trabajo Práctico de Grupos |

---

<div align="center">

**Nocturne: Cold Storage** — *Donde cada botella cuenta.* 🍷

</div>
