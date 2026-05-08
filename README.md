# Nocturne: Cold Storage - Backend Data Model

Este documento describe las entidades y el modelo de datos actual encontrados en el backend del proyecto.

## Entidades Actuales

### 1. Factura (`Factura`)
Representa el documento fiscal o comprobante de venta emitido a los clientes.
- **Relaciones principales:** 
  - Pertenece a una `Venta`
  - Pertenece a un `Cliente`
  - Es generada por un `Usuario` (ej. cajero o sistema)
  - Puede estar relacionada con otra `Factura` (ej. Notas de crédito/débito)
- **Campos importantes:**
  - `numeroFactura`, `numeroConsecutivo`: Identificadores únicos del documento.
  - `tipo`: Enum (`factura`, `nota_credito`, `nota_debito`, `ticket`, `cotizacion`).
  - `estado`: Enum (`borrador`, `emitida`, `anulada`, `rechazada`, `validada`).
  - `origen`: Enum (`venta`, `devolucion`, `ajuste`, `cotizacion`).
  - `nombreCliente`, `nitCliente`, `direccionCliente`: Datos capturados al momento de facturar.
  - `subtotal`, `descuento`, `impuesto`, `total`: Cálculos financieros.
  - *Soporte para Facturación Electrónica* (`cufe`, `qrCode`, etc.).

### 2. Detalle de Factura (`DetalleFactura`)
Representa cada línea de ítem dentro de una factura.
- **Relaciones principales:**
  - Pertenece a una `Factura`.
  - Referencia a un `Producto`.
- **Campos importantes:**
  - `descripcion`, `referencia`: Datos del producto vendido.
  - `cantidad`, `precioUnitario`, `descuento`.
  - `subtotal`, `impuesto`, `total`: Cálculos específicos por línea.

### 3. Método de Pago (`MetodoPago`)
Catálogo de las formas de pago aceptadas en la licorería (tanto en tienda como online).
- **Campos importantes:**
  - `nombre`: Nombre legible (ej. "Tarjeta de Crédito").
  - `tipo`: Enum (`efectivo`, `tarjeta_debito`, `qr`, `contra_entrega`, etc.).
  - `comisionPorcentaje`, `comisionFija`: Para calcular recargos (si aplican).
  - `requiereVerificacion`: Si el pago necesita ser aprobado por un administrador.
  - `estado`: `activo` o `inactivo`.

---
*Nota: El archivo de factura hace referencia a las entidades `Venta`, `Cliente`, `Usuario` y `Producto`. Estas forman la base completa del ecosistema del sistema.*
