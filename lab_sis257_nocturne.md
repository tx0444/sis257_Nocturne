# SIS257 — Nocturne: Licorería Digital Suite

**Materia:** SIS257 — Desarrollo de Aplicaciones Internet II
**Grupo:** Nocturne
**Integrantes:** [Nombres del grupo]
**Fecha:** 2026
**Base de datos:** `sis257_nocturne`
**Backend:** `backend_nocturne` (NestJS + PostgreSQL + JWT)
**Frontend:** `frontend_nocturne` (Vue.js + axios + Bootstrap)

---

# 1. CARÁTULA

```
╔══════════════════════════════════════════════════════════════════════╗
║                                                                      ║
║                    🍷  N O C T U R N E  🍷                          ║
║                 Licorería Digital Suite                              ║
║                                                                      ║
║          SIS257 — Desarrollo de Aplicaciones Internet II            ║
║                                                                      ║
║                    [Nombre del Grupo]                               ║
║                    [Integrante 1] | [Integrante 2]                  ║
║                         La Paz, Bolivia                             ║
║                           2026                                       ║
╚══════════════════════════════════════════════════════════════════════╝
```

---

# 2. DESCRIPCIÓN DEL NEGOCIO

## Nombre del Negocio: **Nocturne**

**Nocturne** es una licorería premium orientada a:
- Bebidas de altura (whiskies, rones añejos, gins artesanales)
- Destilados de colección
- Vinos con trazabilidad por lote
- Singanis y productos andinos
- Cerveza de marca propia (Nocturne Dark)

## Modelo de Negocio

| Fuente de ingresos | Descripción |
|---|---|
| Venta retail | Margen en botella retail vs. precio de compra |
| Membresía / Eventos | Catasprivadas y promociones "Invite Only" |
| Suministro B2B | Bebidas para bares y hoteles con facturación formal |
| Cadena de frío | Flag `requiere_frio` para productos sensibles |
| Bóveda virtual | Gestión de botellas en custodia (roadmap) |

## Diferenciadores

- Trazabilidad por **número de lote** (`NOC-XXXX-YY`)
- Flag **`requiere_frio`** para productos que necesitan cadena de frío
- Inventario por **lotes** con fecha de vencimiento
- Catálogo digital + panel admin + reportes

---

# 3. PROBLEMÁTICA

## Problema del mercado

1. **Quiebres de stock** — Inventario manual genera faltantes y sobre-stock.
2. **Pérdida por vencimiento** — Productos sensibles (vinos, champagne, singanis) caducan sin control.
3. **Falta de trazabilidad** — Clientes premium demandan información de origen y lote.
4. **Canal digital ausente** — Competidores solo operan en tienda física.
5. **Sin reportes financieros** — Dificultad para conocer el rendimiento real por período.

## Solución propuesta

| Problema | Solución en Nocturne |
|---|---|
| Quiebres de stock | Inventario por lote con sincronización automática |
| Vencimiento | Fechas de expiración y alertas en BD |
| Trazabilidad | Lote + origen + proveedor vinculados al producto |
| Canal digital | Catálogo Vue.js público + dashboard admin |
| Reportes | Módulo de reportes con dashboard en tiempo real |

---

# 4. DIAGRAMA ENTIDAD-RELACIÓN (DBeaver)

> **NOTA:** Este diagrama fue generado directamente desde DBeaver usando la conexión a la base de datos `sis257_nocturne`.
>
> Para generarlo:
> 1. Abrir DBeaver → Nueva conexión → PostgreSQL (localhost:5432 / sis257_nocturne)
> 2. Ir a la pestaña "Diagramas" → Nuevo diagrama ER
> 3. Seleccionar todas las tablas del esquema
> 4. Exportar como imagen PNG para la presentación

## Esquema de tablas principales

```
┌─────────────────┐       ┌──────────────────┐       ┌─────────────────┐
│   CATEGORIAS    │       │    PRODUCTOS      │       │   INVENTARIOS   │
├─────────────────┤       ├──────────────────┤       ├─────────────────┤
│ id (PK)         │◄──────│ categoria_id(FK) │       │ id (PK)         │
│ nombre          │       │ id (PK)           │──────►│ producto_id(FK) │
│ estado          │       │ nombre            │       │ cantidad_stock  │
└─────────────────┘       │ precio_compra    │       │ lote            │
                           │ precio_venta     │       │ fecha_vencimiento│
                           │ requiere_frio    │       │ observaciones   │
                           │ activo           │       └─────────────────┘
                           └──────────────────┘
                                   │
                                   │ 1:N
                                   ▼
                           ┌─────────────────┐       ┌──────────────────┐
                           │  DETALLES_VENTA  │◄─────│      VENTAS       │
├──────────────────────────┤ cantidad        │       ├──────────────────┤
│      USUARIOS            │ subtotal         │       │ id (PK)          │
├──────────────────────────┤ precio_unitario │       │ numero_factura   │
│ id (PK)                  └─────────────────┘       │ total            │
│ nombre                   │ 1:N                  │ cliente_id (FK) │
│ email                    ▼                       │ usuario_id (FK) │
│ password_hash           ┌──────────────────┐       │ metodo_pago      │
│ rol_id (FK)             │    CLIENTES      │       │ estado           │
└─────────────────────────├──────────────────┤       │ fecha_venta      │
        │                 │ id (PK)          │       └──────────────────┘
        │                 │ nombre           │
        │                 │ telefono         │       ┌──────────────────┐
        │                 │ email            │       │    ROLES         │
        └────────────►    │ direccion        │       ├──────────────────┤
                         └──────────────────┘       │ id (PK)         │
                                                   │ nombre          │
                                                   │ permisos        │
                                                   └──────────────────┘

┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│   PROVEEDORES     │   │   PROMOCIONES     │   │   BOVEDAS        │
├──────────────────┤   ├──────────────────┤   ├──────────────────┤
│ id (PK)           │   │ id (PK)          │   │ id (PK)          │
│ nombre            │   │ nombre           │   │ nombre           │
│ nit               │   │ categoria_id    │   │ ubicacion        │
│ telefono          │   │ descuento_pct    │   │ capacidad        │
│ email             │   │ fecha_inicio     │   │ condicion_frio   │
│direccion          │   │ fecha_fin        │   └──────────────────┘
└──────────────────┘   └──────────────────┘
```

---

# 5. ENLACES Y DATOS DE ACCESO

## Repositorios GitHub

| Componente | Enlace |
|---|---|
| Backend | `https://github.com/[tu-user]/[repo-backend]` |
| Frontend | `https://github.com/[tu-user]/[repo-frontend]` |

## URLs de acceso

| Servicio | URL | Notas |
|---|---|---|
| Frontend (local) | `http://localhost:5173` | Vite dev server |
| API (local) | `http://localhost:3000/api/v1` | NestJS |
| Swagger | `http://localhost:3000/api/docs` | Documentación interactive |

## Credenciales

| Rol | Usuario | Contraseña | Nivel de acceso |
|---|---|---|---|
| **Admin** | `admin@nocturne.bo` | `Nocturne2026!` | Full (dashboard completo + CRUD) |
| **Vendedor** | `vendedor@nocturne.bo` | `Vendedor123!` | Panel de ventas (solo crear venta) |

> ⚠️ **IMPORTANTE:** Cambiar las contraseñas antes de cualquier entrega pública.

## Datos de conexión PostgreSQL

```
Host:     localhost
Port:     5432
Base:     sis257_nocturne
User:     usr_nocturnetx
Password: 123456
```

---

# 6. CAPTURAS DE FUNCIONAMIENTO

## 6.1 Backend — Swagger API

> Captura: `http://localhost:3000/api/docs` mostrando endpoints autenticados y públicos.

```
✅ GET  /api/v1/categorias         — Lista de categorías (público)
✅ GET  /api/v1/productos          — Catálogo de productos (público)
✅ POST /api/v1/auth/login        — Login JWT
✅ GET  /api/v1/ventas            — Registro de ventas (protegido)
✅ POST /api/v1/ventas            — Crear venta nueva (protegido)
✅ GET  /api/v1/reportes/dashboard/hoy — Dashboard del día (protegido)
✅ GET  /api/v1/carrito           — Carrito de compras (token anónimo)
✅ POST /api/v1/carrito/checkout — Finalizar compra (protegido)
```

## 6.2 Frontend — Catálogo público

> Captura: `http://localhost:5173` navegando categorías y productos.

- Página principal con grid de productos
- Filtro por categoría
- Detalle de producto con imagen y precio
- Carrito persistente (localStorage)
- Checkout con métodos de pago múltiples

## 6.3 Frontend — Panel Admin (Admin/Bendedor)

> Captura: `http://localhost:5173/admin` o `/login`

- Login con JWT (usuario + contraseña)
- Dashboard con métricas de ventas
- CRUD de productos (crear/editar/eliminar)
- Registro de ventas manuales
- Reportes: calendario, resumen por día, productos más vendidos
- Gestión de usuarios y roles

## 6.4 Flow: Compra completa

```
1. Cliente abre http://localhost:5173
2. Navega catálogo → selecciona productos
3. Agrega al carrito (carrito anónimo UUID)
4. Checkout → selecciona método de pago (EFECTIVO / TARJETA / QR / TRANSFERENCIA)
5. Sistema crea VENTA en BD → descuenta stock de INVENTARIO
6. Cliente recibe confirmación con número de factura
7. Admin ve la venta en dashboard en tiempo real
8. Stock actualizado automáticamente
```

---

# 7. STACK TECNOLÓGICO

| Capa | Tecnología | Justificación |
|---|---|---|
| Base de datos | PostgreSQL `sis257_nocturne` | Requisito del curso |
| Backend | NestJS + TypeORM + JWT | Requisito del curso |
| Frontend | Vue 3 + axios + Bootstrap 5 | Requisito del curso |
| API docs | Swagger (`/api/docs`) | Documentación auto-generada |
| Seguridad | Helmet + rate-limit + cookie-parser | Buenas prácticas |
| Reportes | Módulo reportes (dashboard + calendario + exportación) | Funcionalidad clave |

---

# 8. COMMITS Y COLABORACIÓN

> Verificar que el historial de commits refleje contribuciones de todos los integrantes.

```bash
# Ver commits por autor
git log --format="%ae | %s" | sort | uniq -c | sort -rn
```

Los commits deben ser:
- Frecuentes y descriptivos
- De **todos los integrantes** del grupo
- Con mensajes descriptivos (`feat:`, `fix:`, `docs:`)

---

*Documento generado para la entrega SIS257 — Grupo Nocturne*
*Nocturne: Donde cada botella cuenta.*
