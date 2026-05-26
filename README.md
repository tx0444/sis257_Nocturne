# Nocturne — Licorería Premium (SIS257)

Sistema full-stack para la licorería **Nocturne**: catálogo, inventario por lote, ventas, JWT y tienda web.

Adaptado desde el proyecto heladería hacia licorería, usando el prototipo **Nocturne Virtual Cellar** como referencia de marca (bóveda, oro sobre negro, cadena de frío).

## Estructura (requisitos del curso)

| Elemento | Valor |
|----------|--------|
| Base de datos | PostgreSQL **`sis257_nocturne`** |
| Backend | **`backend_nocturne`** — NestJS + TypeORM + JWT |
| Frontend | **`frontend_nocturne`** — Vue 3 + axios + Bootstrap 5 |

> Nota: existe una copia anterior `backend_NocturneTx` (carpeta bloqueada por el IDE). Usa **`backend_nocturne`** como directorio oficial; puedes eliminar la carpeta antigua cuando cierres Cursor.

## Variables de entorno (backend)

Archivo `backend_nocturne/.env`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=usr_nocturnetx
DB_PASSWORD=123456
DB_NAME=sis257_nocturne
JWT_SECRET=nocturne-jwt-secret-change-in-production-2026
```

## PostgreSQL — preparación

```sql
CREATE USER usr_nocturnetx WITH PASSWORD '123456';
CREATE DATABASE sis257_nocturne OWNER usr_nocturnetx;
GRANT ALL PRIVILEGES ON DATABASE sis257_nocturne TO usr_nocturnetx;
```

## Arranque rápido

```bash
# Terminal 1 — API
cd backend_nocturne
npm install
npm run start:dev

# Terminal 2 — Tienda Vue
cd frontend_nocturne
npm install
npm run dev
```

- **Tienda:** http://localhost:5173  
- **API:** http://localhost:3000/api  
- **Swagger:** http://localhost:3000/api/docs  

### Usuario demo (seed automático)

- Email: `admin@nocturne.bo`  
- Contraseña: `Nocturne2026!`  

## Presentación Classroom

Ver **[PRESENTACION_NOCTURNE.md](./PRESENTACION_NOCTURNE.md)** — modelo de negocio listo para exportar a PDF/Slides.

## Comparación con heladería original

| Heladería | Nocturne (licorería) |
|-----------|----------------------|
| Helados, sabores | Bebidas, grado alcohólico |
| Empleados | Usuarios con roles (admin/vendedor) |
| Stock simple | Inventario por lote + frío |
| React frontend | **Vue** + Bootstrap (requisito) |

---

**Nocturne** — *Donde cada botella cuenta.*
