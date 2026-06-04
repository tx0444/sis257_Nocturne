---
marp: true
theme: default
class: invert
paginate: true
---

# 🍷 NOCTURNE
### Licorería Premium & Virtual Cellar
**Materia:** SIS257 — Desarrollo de Aplicaciones Internet II
**Grupo:** Nocturne
**Integrantes:**
- [Nombre 1]
- [Nombre 2]
- [Nombre 3]

**Fecha:** 04/06/2026

---

# 1. Descripción del Negocio

**Nocturne** es una licorería premium orientada a bebidas de altura, destilados de colección y experiencias exclusivas. El nombre evoca la elegancia de la noche y la seguridad de una bóveda (virtual cellar) para botellas de alto valor.

### Modelo de Ingresos y Operación
- **Venta Retail E-Commerce:** Venta directa al consumidor mediante un catálogo web.
- **Suministro B2B (Mayorista):** Provisión para bares y hoteles.
- **Trazabilidad por Lote:** Cada producto tiene un lote único (ej. `NOC-L001`).
- **Cadena de Frío:** Alerta en el sistema para productos que requieren refrigeración.

---

# 2. Problemática

Las licorerías tradicionales enfrentan desafíos que limitan su crecimiento:

- **Quiebres de Stock:** Inventarios manuales generan faltantes al momento de vender.
- **Pérdidas por Vencimiento:** Productos sensibles (cervezas, cremas) caducan sin control o pierden la cadena de frío.
- **Falta de Trazabilidad:** Los clientes premium exigen saber el origen de las botellas costosas.
- **Ausencia de Canal Digital:** Depender solo de la tienda física reduce las ventas.

**Solución Nocturne:** Un sistema web (Vue.js + NestJS) con control de stock automático, alertas de vencimiento/frío, y un catálogo digital 24/7.

---

# 3. Diagrama Entidad-Relación

*(Nota para el grupo: Pegar aquí la imagen generada en DBeaver de la base de datos `sis257_nocturne`)*

![Diagrama ER](Pegar_Imagen_Aqui)

---

# 4. Enlaces y Datos de Acceso

### Repositorios GitHub
- **Backend:** `https://github.com/[Tu-Usuario]/backend_nocturne`
- **Frontend:** `https://github.com/[Tu-Usuario]/frontend_nocturne`

### Credenciales de Prueba (Login)
**Administrador (Control Total)**
- Email: `admin@nocturne.bo`
- Password: `Nocturne2026!`

**Vendedor (Solo ventas)**
- Email: `vendedor@nocturne.bo`
- Password: `Vendedor123!`

---

# 5. Capturas de Funcionamiento

*(Nota para el grupo: Pegar aquí 2 o 3 capturas del sistema mostrando la tienda de Vue.js y el proceso de hacer una compra o registrar una venta)*

![Captura Tienda Web](Pegar_Imagen_Aqui)
![Captura Venta / Backend](Pegar_Imagen_Aqui)
