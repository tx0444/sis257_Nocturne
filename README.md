# Nocturne: Cold Storage - Sistema de Gestión de Licorería

### Plataforma Integral de Administración, Ventas (POS) y E-commerce de Bebidas Premium

[![NestJS](https://img.shields.io/badge/NestJS-v11-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Vue](https://img.shields.io/badge/Vue.js-v3-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge&logo=typeorm&logoColor=white)](https://typeorm.io/)

---

Nocturne: Cold Storage es una solución de software empresarial monorepo diseñada específicamente para la comercialización y administración de licores premium. Combina una plataforma administrativa corporativa, un punto de venta ágil para tiendas físicas y un catálogo interactivo de lujo para clientes finales.

---

## Tabla de Contenidos

- [Acerca del Proyecto](#acerca-del-proyecto)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Funcionalidades por Rol](#funcionalidades-por-rol)
- [Módulos Especiales](#módulos-especiales)
- [Diseño y Tematización Dinámica](#diseño-y-tematización-dinámica)
- [Modelo de Datos y Relaciones](#modelo-de-datos-y-relaciones)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Configuración](#instalación-y-configuración)
- [Ejecución en Contenedores (Docker)](#ejecución-en-contenedores-docker)
- [Credenciales de Prueba](#credenciales-de-prueba)
- [Información Académica](#información-académica)

---

## Acerca del Proyecto

El sistema responde a las necesidades de digitalización de licorerías de alta gama, abordando:
- Control riguroso de inventario, stock mínimo y alertas automáticas de reposición.
- Agilidad en caja mediante interfaces optimizadas que permiten búsquedas instantáneas y cotizaciones rápidas.
- Canal de venta directa en línea, permitiendo a clientes consultar el catálogo, registrarse y realizar pedidos en tiempo real.
- Control interno integral, con bitácoras de auditoría inalterables sobre movimientos sensibles y restricción estricta de rutas por roles.

---

## Arquitectura del Proyecto

El sistema está estructurado bajo una arquitectura monolítica con separación de capas bien definidas:

- **Servidor Backend (NestJS 11 + TypeScript)**: Implementa la lógica de negocio estructurada en módulos, controladores, servicios y repositorios. La persistencia de datos se realiza a través de TypeORM sobre una base de datos PostgreSQL.
- **Cliente Frontend (Vue 3 + Vite + TypeScript)**: Desarrollado con Composition API, utilizando Pinia para el almacenamiento del estado y la sesión de usuario, Axios para las llamadas HTTP y Bootstrap 5 + CSS nativo para la interfaz de usuario de lujo.

```
┌─────────────────────────────────────────────────────────┐
│                    Cliente Frontend                     │
│               (Vue 3, Vite, Pinia, Axios)               │
└────────────────────────────┬────────────────────────────┘
                             │
                             │ Solicitudes REST API / JWT
                             ▼
┌─────────────────────────────────────────────────────────┐
│                    Servidor Backend                     │
│                (NestJS, Express, TypeORM)               │
└────────────────────────────┬────────────────────────────┘
                             │
                             │ Consultas SQL
                             ▼
┌─────────────────────────────────────────────────────────┐
│                   Base de Datos (DB)                    │
│                      (PostgreSQL)                       │
└─────────────────────────────────────────────────────────┘
```

---

## Funcionalidades por Rol

El sistema implementa un control de acceso basado en roles con vistas diferenciadas para garantizar la segregación de funciones:

### Administrador (ADMIN)
- Control total sobre los catálogos del sistema (productos, categorías, marcas y proveedores).
- Dashboard ejecutivo con métricas financieras consolidadas (ingresos totales, ticket promedio, valor de inventario).
- Generación de reportes dinámicos de ventas mensuales y volumen por categorías mediante gráficos interactivos.
- Módulo de auditoría centralizado para la monitorización de acciones del personal.
- Configuración global de promociones y descuentos aplicados a productos específicos.

### Vendedor (VENDEDOR)
- Punto de venta rápido (POS) optimizado para transacciones físicas.
- Buscador y visualizador instantáneo de stock y precios sin salir de la caja.
- Visualización de metas diarias de venta mediante widgets interactivos.
- Registro ágil de nuevos clientes en tienda.
- Historial personal de ventas realizadas durante el turno.

### Cliente (CLIENTE)
- Registro y autenticación autónoma en la plataforma e-commerce.
- Navegación del catálogo premium filtrado por marca y categoría.
- Carrito de compras persistente con validación automática de stock disponible en tiempo real.
- Confirmación de pedidos con selección de método de pago (Efectivo, Tarjeta, Transferencia/QR).
- Historial de pedidos personal detallado.

---

## Módulos Especiales

### Sistema de Promociones y Descuentos Dinámicos
- Los administradores pueden crear promociones con nombre, descripción, porcentaje de descuento y rango de fechas (Inicio y Fin).
- Los descuentos se aplican dinámicamente y se reflejan en tiempo real en la ficha del catálogo de cliente (mostrando el precio anterior tachado y la oferta actual) y en la pantalla de caja del vendedor.
- Los productos seleccionados se asocian de manera masiva o selectiva en la base de datos mediante un selector interactivo.

### Bitácora de Auditoría en Tiempo Real
- Cada alta, modificación o eliminación efectuada en las tablas críticas de Clientes y Ventas genera automáticamente un log de auditoría en el servidor.
- El log detalla: fecha, usuario que realizó la acción, ID del registro afectado, acción realizada (Crear, Editar, Eliminar) y los datos involucrados.
- El acceso a estos registros es exclusivo para usuarios con el rol ADMIN.

### Gestión Híbrida de Archivos Multimedia
- El sistema cuenta con soporte para añadir imágenes o videos a los licores y categorías.
- Permite ingresar URLs externas o subir archivos directamente desde la PC, guardándolos y sirviéndolos estáticamente desde el puerto de la aplicación.
- Cuenta con reproductores de video HTML5 interactivos integrados en el catálogo y vistas previas automáticas en hover.

---

## Diseño y Tematización Dinámica

El sistema cambia de apariencia y comportamiento visual de acuerdo con el perfil del usuario autenticado:

- **Tema de Lujo para Clientes (Catálogo Público)**: Estética premium de fondo oscuro profundo, detalles en dorado y tipografías elegantes, con un Video Hero interactivo a pantalla completa y sliders animados.
- **Tema Corporativo Claro de Administración**: Fondo gris claro, tarjetas de contenido blancas con sombras suaves y acentos dorados que evocan exclusividad y orden.
- **Tema de Productividad para Ventas (POS)**: Sidebar y acentos en tonos de azul profesional, orientados a reducir la fatiga visual del cajero y destacar botones críticos de registro.

---

## Modelo de Datos y Relaciones

El esquema de la base de datos relacional PostgreSQL consta de 15 tablas principales gestionadas a través del ORM TypeORM.

### Diagrama de Relaciones

```
                                 ┌───────────────┐
                                 │     roles     │
                                 └───────┬───────┘
                                         │ 1
                                         │
                                         │ N
┌───────────────┐                ┌───────▼───────┐
│   clientes    │                │   usuarios    │
└───────┬───────┘                └───────┬───────┘
        │ 1                              │ 1
        │                                │
        │                                ├─────────────────────────┐
        │ N                              │ N                       │ N
┌───────▼───────┐                ┌───────▼───────┐         ┌───────▼───────┐
│    ventas     │                │  auditorias   │         │    compras    │
└───────┬───────┘                └───────────────┘         └───────┬───────┘
        │ 1                                                        │ 1
        │                                                          │
        │ N                                                        │ N
┌───────▼───────┐                                          ┌───────▼───────┐
│detalles_venta │                                          │detalles_compra│
└───────┬───────┘                                          └───────┬───────┘
        │ N                                                        │ N
        │                                                          │
        └────────────────────────┬─────────────────────────────────┘
                                 │
                                 ▼
                         ┌───────────────┐
                         │   productos   │
                         └───────▲───────┘
                                 │ 1
                                 ├─────────────────────────┐
                                 │ 1                       │ 1
                         ┌───────┴───────┐         ┌───────┴───────┐
                         │  categorias   │         │    marcas     │
                         └───────▲───────┘         └───────────────┘
                                 │
                                 │ 1
                                 │
                                 │ N (opcional)
                         ┌───────┴───────┐
                         │  promociones  │
                         └───────────────┘
```

---

### Tablas y Atributos

#### 1. Rol (roles)
Representa los privilegios de los usuarios del sistema.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | PK, Autoincremental | Identificador único del rol |
| `nombre` | `VARCHAR(50)` | NOT NULL, UNIQUE | Nombre del rol (ADMIN, VENDEDOR, CLIENTE) |
| `descripcion` | `TEXT` | NULLABLE | Descripción de las responsabilidades y accesos |
| `created_at` | `TIMESTAMP` | NOT NULL, DEFAULT NOW | Fecha de creación del registro |

#### 2. Usuario (usuarios)
Cuentas de acceso para el personal administrativo, de ventas o para clientes registrados en la tienda en línea.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | PK, Autoincremental | Identificador único del usuario |
| `nombre` | `VARCHAR(100)` | NOT NULL | Nombre de pila |
| `apellido` | `VARCHAR(100)` | NOT NULL | Apellido |
| `correo` | `VARCHAR(100)` | NOT NULL, UNIQUE | Correo electrónico principal |
| `usuario` | `VARCHAR(50)` | NOT NULL, UNIQUE | Nombre de usuario para login |
| `password` | `VARCHAR(255)` | NOT NULL | Hash cifrado de la contraseña (Bcrypt) |
| `estado` | `BOOLEAN` | NOT NULL, DEFAULT true | Indica si el usuario está habilitado |
| `created_at` | `TIMESTAMP` | NOT NULL, DEFAULT NOW | Fecha de creación del usuario |
| `rol_id` | `INTEGER` | FK -> roles(id) | Relación con el rol del usuario |

#### 3. Cliente (clientes)
Información de contacto y facturación complementaria para las transacciones.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | PK, Autoincremental | Identificador del cliente |
| `nombre` | `VARCHAR(100)` | NOT NULL | Nombre o razón social |
| `apellido` | `VARCHAR(100)` | NOT NULL | Apellido |
| `ci_nit` | `VARCHAR(50)` | NULLABLE | Cédula de Identidad o NIT |
| `telefono` | `VARCHAR(20)` | NULLABLE | Teléfono celular o fijo |
| `correo` | `VARCHAR(100)` | NULLABLE | Correo electrónico de contacto |
| `direccion` | `VARCHAR(255)` | NULLABLE | Dirección física de entrega |
| `estado` | `BOOLEAN` | NOT NULL, DEFAULT true | Estado de registro del cliente |
| `created_at` | `TIMESTAMP` | NOT NULL, DEFAULT NOW | Fecha de registro |

#### 4. Categoría (categorias)
Clasificación comercial de los licores para organización del stock y filtrado de catálogo.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | PK, Autoincremental | Identificador de la categoría |
| `nombre` | `VARCHAR(100)` | NOT NULL | Nombre de la categoría (ej: Ron, Cerveza) |
| `descripcion` | `VARCHAR(255)` | NULLABLE | Reseña o descripción complementaria |
| `imagen` | `VARCHAR(500)` | NULLABLE | Enlace o ruta de la imagen representativa |
| `estado` | `BOOLEAN` | NOT NULL, DEFAULT true | Habilitación de la categoría |
| `created_at` | `TIMESTAMP` | NOT NULL, DEFAULT NOW | Fecha de registro |

#### 5. Marca (marcas)
Marcas comerciales a las que pertenecen los licores.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | PK, Autoincremental | Identificador de la marca |
| `nombre` | `VARCHAR(100)` | NOT NULL | Nombre de la marca (ej: Heineken, Jack Daniel's) |
| `pais_origen` | `VARCHAR(100)` | NULLABLE | País fabricante o procedencia |
| `estado` | `BOOLEAN` | NOT NULL, DEFAULT true | Estado activo de la marca |
| `created_at` | `TIMESTAMP` | NOT NULL, DEFAULT NOW | Fecha de creación |

#### 6. Proveedor (proveedores)
Empresas o distribuidoras que surten los licores para reabastecimiento de stock.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | PK, Autoincremental | Identificador del proveedor |
| `nombre` | `VARCHAR(150)` | NOT NULL | Razón social del proveedor |
| `nit` | `VARCHAR(50)` | NULLABLE | NIT del proveedor |
| `telefono` | `VARCHAR(20)` | NULLABLE | Número telefónico de contacto |
| `correo` | `VARCHAR(100)` | NULLABLE | Correo electrónico principal |
| `direccion` | `VARCHAR(255)` | NULLABLE | Dirección física de las oficinas |
| `estado` | `BOOLEAN` | NOT NULL, DEFAULT true | Indica si el proveedor está habilitado |
| `created_at` | `TIMESTAMP` | NOT NULL, DEFAULT NOW | Fecha de creación |

#### 7. Promoción (promociones)
Definición de descuentos estacionales que pueden aplicarse de manera masiva o individual.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | PK, Autoincremental | Identificador de la promoción |
| `nombre` | `VARCHAR(150)` | NOT NULL | Título o nombre de la promoción |
| `descripcion` | `VARCHAR(500)` | NULLABLE | Detalle de las condiciones de la oferta |
| `descuento` | `DECIMAL(5,2)` | NOT NULL, DEFAULT 0 | Porcentaje de descuento aplicado (ej: 10.00) |
| `fecha_inicio` | `TIMESTAMP` | NOT NULL | Inicio de vigencia |
| `fecha_fin` | `TIMESTAMP` | NOT NULL | Fin de vigencia |
| `estado` | `BOOLEAN` | NOT NULL, DEFAULT true | Habilitación manual |
| `created_at` | `TIMESTAMP` | NOT NULL, DEFAULT NOW | Fecha de creación del registro |

#### 8. Producto (productos)
Representación individual de cada licor disponible para la comercialización.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | PK, Autoincremental | Identificador del producto |
| `nombre` | `VARCHAR(200)` | NOT NULL | Nombre comercial completo de la bebida |
| `descripcion` | `VARCHAR(500)` | NULLABLE | Descripción del sabor, añejamiento u otros |
| `codigo` | `VARCHAR(50)` | NOT NULL, UNIQUE | Código único de control de barras |
| `precio_compra` | `DECIMAL(10,2)` | NOT NULL, DEFAULT 0 | Costo de adquisición unitario promedio |
| `precio_venta` | `DECIMAL(10,2)` | NOT NULL | Precio de venta base al cliente |
| `stock` | `INTEGER` | NOT NULL, DEFAULT 0 | Inventario de unidades físicas disponibles |
| `stock_minimo` | `INTEGER` | NOT NULL, DEFAULT 5 | Stock mínimo para alertas de escasez |
| `imagen` | `VARCHAR(500)` | NULLABLE | URL o ruta de archivo estático multimedia |
| `estado` | `BOOLEAN` | NOT NULL, DEFAULT true | Habilitado para compras y ventas |
| `created_at` | `TIMESTAMP` | NOT NULL, DEFAULT NOW | Fecha de registro del producto |
| `categoria_id` | `INTEGER` | FK -> categorias(id) | Categoría correspondiente |
| `marca_id` | `INTEGER` | FK -> marcas(id) | Marca fabricante |
| `proveedor_id` | `INTEGER` | FK -> proveedores(id) | Proveedor distribuidor habitual |
| `promocion_id` | `INTEGER` | FK -> promociones(id), NULL | Promoción activa (SET NULL al eliminar la promoción) |

#### 9. Compra (compras)
Registro acumulativo de reabastecimientos ingresados al almacén de la licorería.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | PK, Autoincremental | Identificador de la compra |
| `fecha` | `TIMESTAMP` | NOT NULL, DEFAULT NOW | Fecha y hora del reabastecimiento |
| `total` | `DECIMAL(12,2)` | NOT NULL, DEFAULT 0 | Monto total facturado por la adquisición |
| `created_at` | `TIMESTAMP` | NOT NULL, DEFAULT NOW | Registro del sistema |
| `proveedor_id` | `INTEGER` | FK -> proveedores(id) | Proveedor que surte la mercadería |
| `usuario_id` | `INTEGER` | FK -> usuarios(id) | Empleado administrador que registró el ingreso |

#### 10. Detalle de Compra (detalles_compra)
Desglose individualizado de cada producto incluido en un lote de compra.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | PK, Autoincremental | Identificador único del detalle |
| `cantidad` | `INTEGER` | NOT NULL | Unidades de botella adquiridas |
| `precio` | `DECIMAL(10,2)` | NOT NULL | Costo unitario acordado de compra |
| `subtotal` | `DECIMAL(12,2)` | NOT NULL | Operación de cantidad por precio |
| `compra_id` | `INTEGER` | FK -> compras(id) | Compra a la que pertenece |
| `producto_id` | `INTEGER` | FK -> productos(id) | Producto físico reabastecido |

#### 11. Venta (ventas)
Transacciones financieras cerradas de comercialización (mostrador o web).

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | PK, Autoincremental | Identificador único de la venta |
| `fecha` | `TIMESTAMP` | NOT NULL, DEFAULT NOW | Fecha y hora del cobro |
| `total` | `DECIMAL(12,2)` | NOT NULL, DEFAULT 0 | Importe total bruto a pagar |
| `created_at` | `TIMESTAMP` | NOT NULL, DEFAULT NOW | Auditoría de creación |
| `cliente_id` | `INTEGER` | FK -> clientes(id) | Cliente receptor |
| `usuario_id` | `INTEGER` | FK -> usuarios(id) | Empleado cajero o sistema web que tramitó el cobro |

#### 12. Detalle de Venta (detalles_venta)
Líneas de productos adquiridos en una orden de venta.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | PK, Autoincremental | Identificador único de la línea de detalle |
| `cantidad` | `INTEGER` | NOT NULL | Unidades de botellas vendidas |
| `precio` | `DECIMAL(10,2)` | NOT NULL | Precio de venta neto aplicado |
| `subtotal` | `DECIMAL(12,2)` | NOT NULL | Operación de cantidad por precio |
| `venta_id` | `INTEGER` | FK -> ventas(id) | Venta correspondiente |
| `producto_id` | `INTEGER` | FK -> productos(id) | Producto comercializado |

#### 13. Método de Pago (metodos_pago)
Tipos de pago autorizados en caja o portal web.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | PK, Autoincremental | Identificador único del método |
| `nombre` | `VARCHAR(50)` | NOT NULL | Nombre comercial (Efectivo, Tarjeta, QR) |
| `descripcion` | `VARCHAR(255)` | NULLABLE | Detalles del funcionamiento del método |

#### 14. Pago (pagos)
Registros de ingresos monetarios vinculados a las ventas.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | PK, Autoincremental | Identificador único del cobro |
| `monto` | `DECIMAL(12,2)` | NOT NULL | Suma liquidada |
| `fecha` | `TIMESTAMP` | NOT NULL, DEFAULT NOW | Fecha y hora del cobro |
| `venta_id` | `INTEGER` | FK -> ventas(id) | Venta amortizada |
| `metodo_pago_id` | `INTEGER` | FK -> metodos_pago(id) | Método de pago liquidado |

#### 15. Auditoría (auditorias)
Historial estricto de auditoría para la modificación de clientes y ventas.

| Campo | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | PK, Autoincremental | Identificador de log único |
| `fecha` | `TIMESTAMP` | NOT NULL, DEFAULT NOW | Fecha de ocurrencia de la modificación |
| `usuario_nombre` | `VARCHAR(255)` | NOT NULL | Nombre completo del operador ejecutor |
| `accion` | `VARCHAR(50)` | NOT NULL | Acción realizada (CREAR, EDITAR, ELIMINAR) |
| `tabla` | `VARCHAR(100)` | NOT NULL | Tabla del sistema modificada |
| `registro_id` | `INTEGER` | NULLABLE | Identificador numérico del registro modificado |
| `detalle` | `TEXT` | NULLABLE | Datos descriptivos completos de la mutación |
| `usuario_id` | `INTEGER` | FK -> usuarios(id), NULL | Relación opcional al usuario ejecutor (SET NULL en delete) |

---

## Estructura del Proyecto

```
sis257_nocturnecoldstorage/
├── backend_nocturnecoldstorage/              # Servidor API NestJS
│   ├── src/
│   │   ├── auditoria/                # Módulo de logs de auditoría
│   │   ├── auth/                     # Autenticación JWT y Guards de Rol
│   │   ├── categorias/               # Módulo de categorías de licores
│   │   ├── clientes/                 # Módulo de perfiles de clientes
│   │   ├── compras/                  # Registro de compras a proveedores
│   │   ├── marcas/                   # Gestión de marcas del catálogo
│   │   ├── productos/                # Gestión de stock e inventarios
│   │   ├── promociones/              # Motor de descuentos
│   │   ├── proveedores/              # Directorio de proveedores
│   │   ├── seeders/                  # Alimentación inicial de BD
│   │   ├── usuarios/                 # Gestión de cuentas de usuario
│   │   ├── ventas/                   # Registro de transacciones
│   │   ├── app.module.ts             # Módulo raíz
│   │   └── main.ts                   # Punto de entrada de la aplicación
│   ├── public/                       # Carpeta pública para multimedia subida
│   └── package.json                  # Scripts y dependencias del backend
│
├── frontend_nocturnecoldstorage/             # Cliente Web Vue 3
│   ├── src/
│   │   ├── assets/                   # Estilos CSS globales y variables de tema
│   │   ├── components/               # Layouts dinámicos por rol
│   │   ├── plugins/                  # Configuración de Axios
│   │   ├── router/                   # Manejo de rutas y Guards de seguridad
│   │   ├── stores/                   # Manejo de estado con Pinia (Auth)
│   │   ├── views/                    # Vistas CRUD y Dashboards especializados
│   │   ├── App.vue                   # Componente raíz
│   │   └── main.ts                   # Punto de entrada Vue
│   └── package.json                  # Scripts y dependencias del frontend
│
├── docker-compose.yml                # Configuración de despliegue en Docker
└── README.md                         # Documentación del proyecto
```

---

## Instalación y Configuración

### Requisitos Previos
- Node.js versión 18 o superior
- npm versión 9 o superior
- Base de datos PostgreSQL activa

### Configuración del Backend
1. Ingrese a la carpeta del backend:
   ```bash
   cd backend_nocturnecoldstorage
   ```
2. Instale las dependencias necesarias:
   ```bash
   npm install
   ```
3. Cree un archivo `.env` en la raíz de `backend_nocturnecoldstorage` basándose en el ejemplo disponible y configure sus variables de conexión a base de datos y clave secreta JWT:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=su_contraseña
   DB_NAME=sis257_nocturnecoldstorage
   JWT_SECRET=su_clave_secreta_jwt
   ```
4. Ejecute el seeder para poblar la base de datos con los datos iniciales y más de 50 licores premium reales:
   ```bash
   npm run seed
   ```
5. Inicie el servidor de desarrollo del backend:
   ```bash
   npm run start:dev
   ```

El servidor estará disponible en la dirección: **http://localhost:3000/api/v1**

### Configuración del Frontend
1. Ingrese a la carpeta del frontend en una nueva pestaña del terminal:
   ```bash
   cd frontend_nocturnecoldstorage
   ```
2. Instale las dependencias del cliente:
   ```bash
   npm install
   ```
3. Inicie el servidor de desarrollo del cliente:
   ```bash
   npm run dev
   ```

El cliente web estará disponible en la dirección: **http://localhost:5173**

---

## Ejecución en Contenedores (Docker)

El proyecto incluye soporte listo para desplegarse mediante Docker y Docker Compose.

1. Construya y levante los servicios (base de datos, backend y frontend) de manera consolidada desde la raíz del proyecto:
   ```bash
   docker-compose up --build
   ```

Esto orquestará los contenedores en los puertos expuestos estándar (`5173` para el cliente y `3000` para la API REST).

---

## Credenciales de Prueba

Para evaluar los diferentes paneles y comportamientos visuales del sistema, puede utilizar las siguientes credenciales preconfiguradas:

- **Perfil Administrador (ADMIN)**:
  - Usuario: `admin`
  - Contraseña: `admin123`
- **Perfil Vendedor (VENDEDOR)**:
  - Usuario: `vendedor1`
  - Contraseña: `vend123`
- **Perfil Cliente (CLIENTE)**:
  - Puede iniciar sesión registrándose libremente en el botón de registro de la barra de navegación del catálogo principal.

---

## Información Académica

- **Asignatura**: SIS257 — Desarrollo de Aplicaciones Internet II
- **Modalidad**: Proyecto Práctico
- **Proyecto**: Licorería "Nocturne: Cold Storage"
