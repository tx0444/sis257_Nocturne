<template>
  <div class="container py-5">
    <h1 class="h3 font-serif text-white mb-4">Nocturne — modelo de negocio</h1>
    <div class="row g-4">
      <div class="col-lg-8">
        <div class="card card-nocturne p-4 mb-4">
          <h2 class="h6 text-gold text-uppercase small">Propuesta de valor</h2>
          <p class="text-secondary small mb-0">
            Nocturne es una licorería premium que combina venta física y digital de bebidas
            nacionales e importadas con una <strong class="text-white">bóveda virtual</strong>:
            el cliente puede custodiar botellas de inversión, consultar stock por lote y recibir
            promociones exclusivas. El diferencial es la <strong class="text-white">cadena de frío</strong>
            y la trazabilidad desde proveedor hasta factura.
          </p>
        </div>
        <div class="card card-nocturne p-4 mb-4">
          <h2 class="h6 text-gold text-uppercase small">Segmentos</h2>
          <ul class="small text-secondary mb-0">
            <li>Consumidor premium (catas, singanis y vinos de altura)</li>
            <li>Coleccionista / inversor (destilados de edición limitada)</li>
            <li>Eventos y catering (barras Nocturne)</li>
            <li>B2B — horeca y distribuidores locales</li>
          </ul>
        </div>
        <div class="card card-nocturne p-4">
          <h2 class="h6 text-gold text-uppercase small">Flujo operativo</h2>
          <ol class="small text-secondary mb-0">
            <li>Compra a proveedores (NIT, lotes, vencimientos)</li>
            <li>Ingreso a inventario con ubicación en bóveda climatizada</li>
            <li>Catálogo web y venta en tienda (efectivo, QR, tarjeta)</li>
            <li>Facturación y auditoría por roles (admin, vendedor, almacenero)</li>
          </ol>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card card-nocturne p-4">
          <h2 class="h6 text-gold text-uppercase small">Stack académico SIS257</h2>
          <ul class="list-unstyled small text-secondary mb-0">
            <li><i class="bi bi-database text-gold"></i> PostgreSQL — <code>sis257_nocturne</code></li>
            <li><i class="bi bi-server text-gold"></i> NestJS + JWT — <code>backend_nocturne</code></li>
            <li><i class="bi bi-window text-gold"></i> Vue + axios + Bootstrap — <code>frontend_nocturne</code></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
