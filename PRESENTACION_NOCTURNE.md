# Presentación — Nocturne (Licorería Premium)

**Materia:** SIS257 — Desarrollo de Aplicaciones Int/internet II  
**Base de datos:** `sis257_nocturne`  
**Backend:** `backend_nocturne` (NestJS + PostgreSQL + JWT)  
**Frontend:** `frontend_nocturne` (Vue.js + axios + Bootstrap)

---

## 1. Nombre y concepto del negocio

**Nocturne** es una licorería premium orientada a bebidas de altura, destilados de colección y experiencias de cata. El nombre evoca exclusividad nocturna y custodia en bóveda (cold storage / virtual cellar).

## 2. Problema del mercado

- Inventario manual en licorerías tradicionales genera quiebres de stock y pérdida por vencimiento.
- Productos sensibles (vinos, champagne, singanis) requieren **cadena de frío** sin un sistema que lo marque y controle.
- Clientes premium demandan trazabilidad (lote, origen) y canal digital además de tienda física.

## 3. Solución (nuestro sistema)

| Módulo | Función |
|--------|---------|
| Catálogo web | Vue + API pública de productos y categorías |
| Inventario por lote | Stock, vencimiento, observaciones de bóveda |
| Ventas y facturación | Registro de ventas, detalle, métodos de pago |
| Usuarios y roles | Admin, vendedor, cliente — JWT |
| Promociones | Descuentos por categoría (ej. Singanis) |
| Bóveda (roadmap) | Custodia virtual de botellas de inversión |

## 4. Modelo de ingresos

1. **Margen en venta retail** de botellas (precio compra vs precio venta).  
2. **Membresía / eventos** — catas y promociones “Invite Only”.  
3. **Servicios B2B** — suministro a bares y hoteles con facturación.  
4. **Comisiones** por productos de terceros en consignación (futuro).

## 5. Ventaja competitiva

- Trazabilidad por **número de lote** (`NOC-…`).  
- Flag **requiere frío** en productos sensibles.  
- Marca unificada **Nocturne** (incl. cerveza de casa).  
- Stack académico completo y documentado (Swagger, PostgreSQL).

## 6. Diagrama de contexto (simplificado)

```
Cliente Web (Vue) ──axios──► API NestJS (JWT) ──► PostgreSQL sis257_nocturne
                                    │
                            Personal tienda (admin/vendedor)
```

## 7. Demo en clase

1. Crear BD y usuario PostgreSQL según `.env`.  
2. `cd backend_nocturne && npm install && npm run start:dev`  
3. `cd frontend_nocturne && npm install && npm run dev`  
4. Abrir http://localhost:5173 — catálogo.  
5. Login admin: `admin@nocturne.bo` / `Nocturne2026!` — panel.  
6. Swagger: http://localhost:3000/api/docs  

## 8. Conclusión

Nocturne digitaliza la operación de una licorería premium con enfoque en **calidad, frío y exclusividad**, alineado al trabajo práctico SIS257 con nomenclatura de grupo y stack obligatorio.

---

*Subir este documento (o exportar a PDF/Google Slides) a Classroom con el nombre del negocio: **Nocturne**.*
