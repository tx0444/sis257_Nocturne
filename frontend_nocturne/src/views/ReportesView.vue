<template>
  <div class="reportes-container animate-fade-in">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="mb-1 text-gold fw-bold">
          <i class="bi bi-file-earmark-pdf me-2"></i>Reportes & Facturas
        </h4>
        <p class="text-secondary mb-0">Genera reportes comerciales y facturas con calidad de impresión profesional</p>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="glass-card mb-4 p-2 d-flex gap-2">
      <button 
        class="btn btn-sm" 
        :class="activeTab === 'reportes' ? 'btn-primary-custom' : 'btn-outline-custom'" 
        @click="activeTab = 'reportes'"
        style="border:none;"
      >
        <i class="bi bi-bar-chart me-1"></i> Reportes del Sistema
      </button>
      <button 
        class="btn btn-sm" 
        :class="activeTab === 'facturas' ? 'btn-primary-custom' : 'btn-outline-custom'" 
        @click="activeTab = 'facturas'"
        style="border:none;"
      >
        <i class="bi bi-receipt-cutoff me-1"></i> Buscar Facturas / Recibos
      </button>
    </div>

    <!-- Tab 1: System Reports -->
    <div v-if="activeTab === 'reportes'" class="row g-4">
      <!-- Report Config Form -->
      <div class="col-md-4">
        <div class="stat-card">
          <h5 class="text-gold mb-3 fw-bold"><i class="bi bi-gear-fill me-1"></i>Configuración de Reporte</h5>
          
          <div class="mb-3">
            <label class="form-label text-secondary small">Tipo de Reporte *</label>
            <select class="form-select bg-dark-card" v-model="reportType" @change="onReportTypeChange">
              <option value="ventas">Ventas por Fecha</option>
              <option value="delivery">Ventas con Delivery</option>
              <option value="tienda">Ventas en Tienda</option>
              <option value="productos_mas_vendidos">Productos Más Vendidos (Top 10)</option>
              <option value="clientes_frecuentes">Clientes Frecuentes (Top 10)</option>
              <option value="compras">Compras del Mes</option>
              <option value="ganancias">Ganancias Estimadas</option>
              <option value="stock_bajo">Productos con Stock Bajo</option>
            </select>
          </div>

          <!-- Date Filters (only for relevant reports) -->
          <div v-if="showDateFilters" class="row g-2 mb-3">
            <div class="col-6">
              <label class="form-label text-secondary small">Fecha Inicio</label>
              <input type="date" class="form-control form-control-sm" v-model="filters.startDate" />
            </div>
            <div class="col-6">
              <label class="form-label text-secondary small">Fecha Fin</label>
              <input type="date" class="form-control form-control-sm" v-model="filters.endDate" />
            </div>
          </div>

          <button class="btn-primary-custom w-100 py-2 rounded border-0" @click="generateReport" :disabled="loading">
            <span v-if="loading"><i class="bi bi-arrow-repeat animate-spin me-1"></i> Generando...</span>
            <span v-else><i class="bi bi-play-fill me-1"></i> Generar Vista Previa</span>
          </button>
        </div>
      </div>

      <!-- Report View Area -->
      <div class="col-md-8">
        <div class="table-dark-custom printable-area">
          <div class="p-3 bg-dark-card border-bottom border-gold-trans d-flex justify-content-between align-items-center">
            <h6 class="mb-0 text-light fw-bold">Vista Previa de Reporte</h6>
            <button 
              v-if="reportData && reportData.length > 0" 
              class="btn btn-outline-custom btn-xs px-3 py-1"
              @click="printReport"
            >
              <i class="bi bi-printer me-1"></i> Imprimir / PDF
            </button>
          </div>

          <!-- Printable Wrapper -->
          <div class="p-4 bg-dark-card text-light print-invoice-card" id="printableReport">
            <div class="d-none print-header text-center mb-4">
              <h3 class="text-gold fw-bold m-0">NOCTURNE:COLD STORAGE</h3>
              <p class="small text-secondary mb-0">Sistema de Gestión de Bebidas</p>
              <h5 class="mt-2 text-light fw-bold text-uppercase">{{ getReportTitle() }}</h5>
              <small class="text-secondary" v-if="showDateFilters">Período: {{ filters.startDate }} al {{ filters.endDate }}</small>
            </div>

            <!-- Empty State -->
            <div v-if="!reportData" class="text-center py-5 text-secondary">
              <i class="bi bi-bar-chart-steps fs-1 d-block mb-2 opacity-50"></i>
              Configura y genera un reporte para visualizar la vista previa.
            </div>

            <!-- Empty Results -->
            <div v-else-if="reportData.length === 0" class="text-center py-5 text-secondary">
              <i class="bi bi-exclamation-triangle fs-1 d-block mb-2 text-warning"></i>
              No se encontraron registros para los filtros seleccionados.
            </div>

            <!-- Sales Report Table -->
            <table v-else class="table table-hover mb-0 text-light border border-secondary border-opacity-20">
              <thead class="bg-black">
                <tr v-if="reportType === 'ventas' || reportType === 'delivery' || reportType === 'tienda'">
                  <th>ID Venta</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Entrega</th>
                  <th>Método Pago</th>
                  <th class="text-end">Monto Total</th>
                </tr>
                <tr v-else-if="reportType === 'productos_mas_vendidos'">
                  <th>Código</th>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th class="text-center">Cant. Vendida</th>
                  <th class="text-end">Ventas Totales</th>
                </tr>
                <tr v-else-if="reportType === 'clientes_frecuentes'">
                  <th>Cliente</th>
                  <th>CI/NIT</th>
                  <th>Teléfono</th>
                  <th class="text-center">Compras</th>
                  <th class="text-end">Monto Gastado</th>
                </tr>
                <tr v-else-if="reportType === 'compras'">
                  <th>Compra</th>
                  <th>Proveedor</th>
                  <th>Fecha</th>
                  <th>Productos</th>
                  <th class="text-end">Total Compra</th>
                </tr>
                <tr v-else-if="reportType === 'ganancias'">
                  <th>Producto</th>
                  <th>Precio Compra</th>
                  <th>Precio Venta</th>
                  <th class="text-center">Vendidos</th>
                  <th class="text-end">Ganancia Estimada</th>
                </tr>
                <tr v-else-if="reportType === 'stock_bajo'">
                  <th>Código</th>
                  <th>Producto</th>
                  <th>Marca</th>
                  <th class="text-center">Stock Mín.</th>
                  <th class="text-center">Stock Actual</th>
                </tr>
              </thead>
              <tbody>
                <!-- Sales rows -->
                <template v-if="reportType === 'ventas' || reportType === 'delivery' || reportType === 'tienda'">
                  <tr v-for="v in reportData" :key="v.id">
                    <td><code>#{{ v.id }}</code></td>
                    <td>{{ v.cliente?.nombre }} {{ v.cliente?.apellido }}</td>
                    <td>{{ formatDate(v.fecha) }}</td>
                    <td>{{ v.tipoEntrega }}</td>
                    <td>{{ v.pagos?.[0]?.metodoPago?.nombre || 'Efectivo' }}</td>
                    <td class="text-end text-gold fw-bold">Bs. {{ Number(v.total).toFixed(2) }}</td>
                  </tr>
                  <!-- Report summary row -->
                  <tr class="bg-dark bg-opacity-50 font-weight-bold border-top border-gold-trans">
                    <td colspan="5" class="text-end text-secondary">Total Acumulado:</td>
                    <td class="text-end text-success fs-5">Bs. {{ totalSum.toFixed(2) }}</td>
                  </tr>
                </template>

                <!-- Products Top rows -->
                <template v-else-if="reportType === 'productos_mas_vendidos'">
                  <tr v-for="(p, idx) in reportData" :key="idx">
                    <td><code>{{ p.codigo }}</code></td>
                    <td>{{ p.nombre }}</td>
                    <td>{{ p.categoria }}</td>
                    <td class="text-center text-light font-weight-bold">{{ p.cantidadVendida }}</td>
                    <td class="text-end text-gold">Bs. {{ Number(p.ventasTotales).toFixed(2) }}</td>
                  </tr>
                </template>

                <!-- Clients Top rows -->
                <template v-else-if="reportType === 'clientes_frecuentes'">
                  <tr v-for="(c, idx) in reportData" :key="idx">
                    <td>{{ c.nombre }} {{ c.apellido }}</td>
                    <td>{{ c.ciNit }}</td>
                    <td>{{ c.telefono || '—' }}</td>
                    <td class="text-center font-weight-bold">{{ c.comprasCount }}</td>
                    <td class="text-end text-gold">Bs. {{ Number(c.montoGastado).toFixed(2) }}</td>
                  </tr>
                </template>

                <!-- Purchases rows -->
                <template v-else-if="reportType === 'compras'">
                  <tr v-for="c in reportData" :key="c.id">
                    <td><code>#{{ c.id }}</code></td>
                    <td>{{ c.proveedor?.nombre }}</td>
                    <td>{{ formatDate(c.fecha) }}</td>
                    <td>{{ c.detalles?.length || 0 }} ítems</td>
                    <td class="text-end text-gold fw-bold">Bs. {{ Number(c.total).toFixed(2) }}</td>
                  </tr>
                  <tr class="bg-dark bg-opacity-50 font-weight-bold border-top border-gold-trans">
                    <td colspan="4" class="text-end text-secondary">Total Gastado:</td>
                    <td class="text-end text-danger fs-5">Bs. {{ totalSum.toFixed(2) }}</td>
                  </tr>
                </template>

                <!-- Earnings rows -->
                <template v-else-if="reportType === 'ganancias'">
                  <tr v-for="(p, idx) in reportData" :key="idx">
                    <td>{{ p.nombre }}</td>
                    <td>Bs. {{ Number(p.precioCompra).toFixed(2) }}</td>
                    <td>Bs. {{ Number(p.precioVenta).toFixed(2) }}</td>
                    <td class="text-center">{{ p.vendidos }}</td>
                    <td class="text-end text-success fw-bold">Bs. {{ Number(p.ganancia).toFixed(2) }}</td>
                  </tr>
                  <tr class="bg-dark bg-opacity-50 font-weight-bold border-top border-gold-trans">
                    <td colspan="4" class="text-end text-secondary">Ganancia Total Estimada:</td>
                    <td class="text-end text-success fs-5">Bs. {{ totalSum.toFixed(2) }}</td>
                  </tr>
                </template>

                <!-- Low Stock rows -->
                <template v-else-if="reportType === 'stock_bajo'">
                  <tr v-for="p in reportData" :key="p.id">
                    <td><code>{{ p.codigo }}</code></td>
                    <td>{{ p.nombre }}</td>
                    <td>{{ p.marca?.nombre || '—' }}</td>
                    <td class="text-center">{{ formatStock(p.stockMinimo, p.unidadesPorCaja) }}</td>
                    <td class="text-center text-danger fw-bold">{{ formatStock(p.stock, p.unidadesPorCaja) }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab 2: Find & Print Invoices -->
    <div v-else class="row g-4">
      <div class="col-md-5">
        <div class="stat-card">
          <h5 class="text-gold mb-3 fw-bold"><i class="bi bi-search me-1"></i>Buscar Venta / Recibo</h5>
          <div class="search-box mb-3">
            <i class="bi bi-search"></i>
            <input 
              type="text" 
              class="form-control" 
              placeholder="Escribe ID del pedido o nombre cliente..." 
              v-model="invoiceSearchQuery" 
              @input="searchVentas"
            />
          </div>

          <div class="invoice-search-results" style="max-height: 380px; overflow-y: auto;">
            <div 
              v-for="v in filteredVentas" 
              :key="v.id"
              class="d-flex justify-content-between align-items-center p-2 mb-2 rounded border border-secondary cursor-pointer hover-dark"
              :class="{ 'border-primary bg-primary bg-opacity-10': selectedVenta && selectedVenta.id === v.id }"
              @click="selectVenta(v)"
            >
              <div>
                <div class="text-light fw-semibold small">Pedido #{{ v.id }}</div>
                <small class="text-secondary">{{ v.cliente?.nombre || 'Cliente' }} {{ v.cliente?.apellido || 'Ocasional' }}</small>
              </div>
              <div class="text-end">
                <span class="text-gold fw-bold small">Bs. {{ Number(v.total).toFixed(2) }}</span><br>
                <small class="text-secondary" style="font-size:0.7rem;">{{ new Date(v.fecha).toLocaleDateString('es-BO') }}</small>
              </div>
            </div>
            <div v-if="filteredVentas.length === 0" class="text-center text-secondary py-4 small">
              No se encontraron ventas para la búsqueda.
            </div>
          </div>
        </div>
      </div>

      <!-- Invoice Print Preview -->
      <div class="col-md-7">
        <div class="table-dark-custom">
          <div class="p-3 bg-dark-card border-bottom border-gold-trans d-flex justify-content-between align-items-center">
            <h6 class="mb-0 text-light fw-bold">Recibo de Venta (Factura)</h6>
            <button 
              v-if="selectedVenta" 
              class="btn btn-outline-custom btn-xs px-3 py-1"
              @click="printInvoice"
            >
              <i class="bi bi-printer me-1"></i> Imprimir Recibo
            </button>
          </div>

          <div class="p-4 bg-dark-card d-flex justify-content-center" style="min-height: 400px;">
            <div v-if="!selectedVenta" class="text-center py-5 text-secondary align-self-center">
              <i class="bi bi-receipt fs-1 d-block mb-2 opacity-50"></i>
              Selecciona una venta de la lista para previsualizar e imprimir su recibo.
            </div>

            <!-- Professional Luxury Invoice Design -->
            <div v-else class="print-invoice-card p-4 rounded text-dark bg-white shadow" id="printableInvoice" style="width: 100%; max-width: 500px; font-family: 'Inter', sans-serif;">
              <!-- Header -->
              <div class="d-flex justify-content-between border-bottom pb-3 mb-3 text-start" style="border-color: #D4AF37 !important;">
                <div class="logo-area">
                  <h3 class="fw-bold m-0 text-dark" style="font-family:'Outfit', sans-serif; letter-spacing: 0.5px; font-size: 1.4rem;">
                    <span style="color:#D4AF37;">LA</span> FORTALEZA
                  </h3>
                  <p class="text-secondary mb-0" style="font-size: 0.72rem; letter-spacing: 0.5px; line-height: 1.2;">TIENDA INTEGRAL DE BEBIDAS</p>
                  <p class="text-secondary mb-0" style="font-size: 0.65rem; line-height: 1.2;">Calle El Paraiso 123, Sucre - Bolivia</p>
                  <p class="text-secondary mb-0" style="font-size: 0.6rem; line-height: 1.2;">Tel: +591 75781303 • contacto@nocturnecoldstorage.com.bo</p>
                </div>
                <div class="invoice-details text-end">
                  <h5 class="fw-bold text-dark mb-1" style="font-size: 0.95rem;">FACTURA DE VENTA</h5>
                  <div class="small text-secondary" style="line-height: 1.3; font-size: 0.75rem;">
                    <div><strong>Nro. Venta:</strong> #{{ selectedVenta.id }}</div>
                    <div><strong>Fecha:</strong> {{ formatDate(selectedVenta.fecha) }}</div>
                    <div><strong>NIT:</strong> 257257257</div>
                  </div>
                </div>
              </div>

              <!-- Billing Info -->
              <div class="mb-3 small text-start">
                <span class="text-secondary text-uppercase fw-bold d-block mb-1" style="font-size: 0.65rem; letter-spacing: 0.5px;">Facturado A:</span>
                <div class="text-dark fw-bold" style="font-size: 0.9rem;">
                  {{ selectedVenta.cliente?.nombre || 'Cliente' }} {{ selectedVenta.cliente?.apellido || 'Ocasional' }}
                </div>
                <div class="text-secondary mt-1" style="font-size: 0.78rem; line-height: 1.3;">
                  <div v-if="selectedVenta.cliente?.ciNit"><strong>CI/NIT:</strong> {{ selectedVenta.cliente?.ciNit }}</div>
                  <div v-if="selectedVenta.cliente?.telefono"><strong>Teléfono:</strong> {{ selectedVenta.cliente?.telefono }}</div>
                  <div v-if="selectedVenta.tipoEntrega"><strong>Modalidad:</strong> {{ selectedVenta.tipoEntrega }}</div>
                  <div v-if="selectedVenta.pagos?.[0]?.metodoPago?.nombre"><strong>Método de Pago:</strong> {{ selectedVenta.pagos?.[0]?.metodoPago?.nombre }}</div>
                </div>
              </div>

              <!-- Product List Table -->
              <table class="table table-sm table-borderless small mb-3 border-top border-bottom py-2 align-middle text-start" style="border-color: #121212 !important;">
                <thead>
                  <tr class="border-bottom text-secondary" style="border-color: #121212 !important; font-size: 0.72rem;">
                    <th style="padding: 6px 4px; font-weight: 700;">Cant</th>
                    <th style="padding: 6px 4px; font-weight: 700;">Detalle del Producto</th>
                    <th style="padding: 6px 4px; font-weight: 700;" class="text-end">Subtotal</th>
                  </tr>
                </thead>
                <tbody class="text-dark" style="font-size: 0.78rem;">
                  <tr v-for="det in selectedVenta.detalles" :key="det.id" style="border-bottom: 1px solid #F3F4F6;">
                    <td style="padding: 6px 4px;">{{ det.cantidad }}</td>
                    <td style="padding: 6px 4px; max-width: 240px;" class="text-truncate">
                      <strong>{{ det.producto?.nombre }}</strong>
                      <span class="text-secondary d-block" style="font-size: 0.7rem;">Venta: {{ det.tipoVenta }}</span>
                    </td>
                    <td style="padding: 6px 4px;" class="text-end fw-semibold">Bs. {{ Number(det.subtotal).toFixed(2) }}</td>
                  </tr>
                  <!-- Delivery Cost if applies -->
                  <tr v-if="selectedVenta.delivery" style="border-bottom: 1px solid #F3F4F6;">
                    <td style="padding: 6px 4px;">1</td>
                    <td style="padding: 6px 4px;">
                      <strong>Servicio de Delivery</strong>
                      <span class="text-secondary d-block" style="font-size: 0.7rem;">Entrega a domicilio</span>
                    </td>
                    <td style="padding: 6px 4px;" class="text-end fw-semibold">Bs. {{ Number(selectedVenta.delivery.costoDelivery).toFixed(2) }}</td>
                  </tr>
                </tbody>
              </table>

              <!-- Bottom section (QR + Total) -->
              <div class="d-flex justify-content-between align-items-center mt-3">
                <div class="text-start">
                  <!-- QR Code Mockup -->
                  <img src="/qr/default-qr.png" alt="Verificación QR" style="width: 75px; height: 75px; border: 1px solid #E5E7EB; border-radius: 4px;" />
                </div>
                <div class="text-end">
                  <span class="text-secondary small d-block" style="font-size: 0.72rem;">Total a pagar:</span>
                  <div class="fw-bold text-dark" style="font-family:'Outfit', sans-serif; font-size: 1.3rem; line-height: 1.1;">
                    Bs. {{ calculateInvoiceTotal(selectedVenta).toFixed(2) }}
                  </div>
                  <small class="text-secondary d-block" style="font-size:0.65rem; margin-top: 4px;">Cajero: {{ selectedVenta.usuario?.nombre || 'Cajero' }}</small>
                </div>
              </div>

              <!-- Pie corporativo -->
              <div class="text-center mt-3 pt-3 border-top small text-secondary" style="border-color: #E5E7EB !important; font-size: 0.68rem; line-height: 1.4;">
                <p class="mb-1">"Donde cada compra te brinda confianza, seguridad y respaldo."</p>
                <div class="fw-bold text-dark" style="font-size: 0.7rem; letter-spacing: 0.5px;">NOCTURNE:COLD STORAGE — LICORES SELECCIONADOS</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import http from '@/plugins/axios'
import Swal from 'sweetalert2'

// State
const activeTab = ref('reportes')
const reportType = ref('ventas')
const loading = ref(false)
const reportData = ref<any[] | null>(null)
const showDateFilters = ref(true)

const filters = ref({
  startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().slice(0, 10),
  endDate: new Date().toISOString().slice(0, 10)
})

// Invoice search
const ventas = ref<any[]>([])
const invoiceSearchQuery = ref('')
const selectedVenta = ref<any>(null)

// Computed
const filteredVentas = computed(() => {
  if (!invoiceSearchQuery.value.trim()) return ventas.value
  const query = invoiceSearchQuery.value.toLowerCase()
  return ventas.value.filter(v => 
    String(v.id).includes(query) ||
    (v.cliente?.nombre && v.cliente.nombre.toLowerCase().includes(query)) ||
    (v.cliente?.apellido && v.cliente.apellido.toLowerCase().includes(query)) ||
    (v.cliente?.ciNit && v.cliente.ciNit.toLowerCase().includes(query))
  )
})

const totalSum = computed(() => {
  if (!reportData.value) return 0
  if (reportType.value === 'ganancias') {
    return reportData.value.reduce((s, item) => s + Number(item.ganancia), 0)
  }
  return reportData.value.reduce((s, item) => s + Number(item.total || item.ventasTotales || 0), 0)
})

// Methods
function onReportTypeChange() {
  // Hide date filters for reports that don't need them
  showDateFilters.value = !['productos_mas_vendidos', 'clientes_frecuentes', 'stock_bajo'].includes(reportType.value)
  reportData.value = null
}

function getReportTitle(): string {
  switch (reportType.value) {
    case 'ventas': return 'Reporte de Ventas por Fecha'
    case 'delivery': return 'Reporte de Ventas por Delivery'
    case 'tienda': return 'Reporte de Ventas en Tienda'
    case 'productos_mas_vendidos': return 'Top 10 Productos Más Vendidos'
    case 'clientes_frecuentes': return 'Top 10 Clientes Frecuentes'
    case 'compras': return 'Reporte de Compras del Período'
    case 'ganancias': return 'Ganancias Estimadas por Producto'
    case 'stock_bajo': return 'Productos con Alerta de Stock Bajo'
    default: return 'Reporte NOCTURNE:COLD STORAGE'
  }
}

async function generateReport() {
  loading.value = true
  reportData.value = null
  try {
    // We can execute dedicated endpoint calls or filter retrieved data directly in client-side
    // Let's implement robust client side processing based on live database queries
    if (reportType.value === 'ventas' || reportType.value === 'delivery' || reportType.value === 'tienda') {
      const res = await http.get('ventas')
      const allVentas = res.data
      
      const start = new Date(filters.value.startDate + 'T00:00:00')
      const end = new Date(filters.value.endDate + 'T23:59:59')
      
      reportData.value = allVentas.filter((v: any) => {
        const vDate = new Date(v.fecha)
        const inRange = vDate >= start && vDate <= end
        const isNotAnulada = v.estado !== 'Anulada'
        
        if (reportType.value === 'delivery') {
          return inRange && isNotAnulada && v.tipoEntrega === 'Delivery'
        }
        if (reportType.value === 'tienda') {
          return inRange && isNotAnulada && v.tipoEntrega === 'Tienda'
        }
        return inRange && isNotAnulada
      })
    } else if (reportType.value === 'productos_mas_vendidos') {
      const res = await http.get('ventas')
      const allVentas = res.data
      
      const counts: Record<number, { p: any; count: number; salesSum: number }> = {}
      for (const v of allVentas) {
        if (v.estado === 'Anulada') continue
        for (const det of v.detalles) {
          const pId = det.productoId
          if (!counts[pId]) {
            counts[pId] = { p: det.producto, count: 0, salesSum: 0 }
          }
          counts[pId].count += det.cantidad
          counts[pId].salesSum += Number(det.subtotal)
        }
      }
      
      const list = Object.values(counts)
        .map(item => ({
          codigo: item.p?.codigo || 'N/A',
          nombre: item.p?.nombre || 'Producto Desconocido',
          categoria: item.p?.categoria?.nombre || 'Bebidas',
          cantidadVendida: item.count,
          ventasTotales: item.salesSum
        }))
        .sort((a, b) => b.cantidadVendida - a.cantidadVendida)
        .slice(0, 10)
        
      reportData.value = list
    } else if (reportType.value === 'clientes_frecuentes') {
      const res = await http.get('ventas')
      const allVentas = res.data
      
      const clientMap: Record<number, { c: any; count: number; spendSum: number }> = {}
      for (const v of allVentas) {
        if (v.estado === 'Anulada' || !v.clienteId || v.cliente?.ciNit === '0') continue
        const cId = v.clienteId
        if (!clientMap[cId]) {
          clientMap[cId] = { c: v.cliente, count: 0, spendSum: 0 }
        }
        clientMap[cId].count++
        clientMap[cId].spendSum += Number(v.total)
      }
      
      const list = Object.values(clientMap)
        .map(item => ({
          nombre: item.c?.nombre || 'Cliente',
          apellido: item.c?.apellido || 'Ocasional',
          ciNit: item.c?.ciNit || '—',
          telefono: item.c?.telefono || '',
          comprasCount: item.count,
          montoGastado: item.spendSum
        }))
        .sort((a, b) => b.montoGastado - a.montoGastado)
        .slice(0, 10)
        
      reportData.value = list
    } else if (reportType.value === 'compras') {
      const res = await http.get('compras')
      const allCompras = res.data
      
      const start = new Date(filters.value.startDate + 'T00:00:00')
      const end = new Date(filters.value.endDate + 'T23:59:59')
      
      reportData.value = allCompras.filter((c: any) => {
        const cDate = new Date(c.fecha)
        return cDate >= start && cDate <= end
      })
    } else if (reportType.value === 'ganancias') {
      const [vRes, pRes] = await Promise.all([http.get('ventas'), http.get('productos')])
      const allVentas = vRes.data
      const allProds = pRes.data
      
      // Calculate sales quantities
      const soldQty: Record<number, number> = {}
      for (const v of allVentas) {
        if (v.estado === 'Anulada') continue
        for (const det of v.detalles) {
          soldQty[det.productoId] = (soldQty[det.productoId] || 0) + det.cantidad
        }
      }

      const list = allProds
        .map((p: any) => {
          const qty = soldQty[p.id] || 0
          const purchase = Number(p.precioCompra) || 0
          const sell = Number(p.precioVenta) || 0
          const unitProfit = sell - purchase
          return {
            nombre: p.nombre,
            precioCompra: purchase,
            precioVenta: sell,
            vendidos: qty,
            ganancia: qty * unitProfit
          }
        })
        .filter((item: any) => item.vendidos > 0)
        .sort((a: any, b: any) => b.ganancia - a.ganancia)

      reportData.value = list
    } else if (reportType.value === 'stock_bajo') {
      const res = await http.get('productos')
      reportData.value = res.data.filter((p: any) => p.stock <= p.stockMinimo && p.estado)
    }
  } catch (err) {
    console.error('Error generating report:', err)
  } finally {
    loading.value = false
  }
}

async function searchVentas() {
  // Exists in list anyway
}

async function fetchVentas() {
  try {
    const res = await http.get('ventas')
    ventas.value = res.data
  } catch (err) {
    console.error('Error fetching sales:', err)
  }
}

function selectVenta(v: any) {
  selectedVenta.value = v
}

function calculateInvoiceTotal(v: any): number {
  let sub = Number(v.total) || 0
  return sub
}

// Print logic using clean window printable popups
function printReport() {
  const printContents = document.getElementById('printableReport')?.innerHTML
  if (!printContents) return
  
  const popupWin = window.open('', '_blank', 'width=800,height=600')
  popupWin?.document.open()
  popupWin?.document.write(`
    <html>
      <head>
        <title>Reporte - NOCTURNE:COLD STORAGE</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
        <style>
          body { font-family: 'Outfit', sans-serif; padding: 20px; background-color: #fff; color: #000; }
          .text-gold { color: #d4af37 !important; }
          .print-header { display: block !important; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background-color: #000 !important; color: #fff !important; padding: 10px; font-size: 0.85rem; text-transform: uppercase; }
          td { padding: 10px; border-bottom: 1px solid #ddd; font-size: 0.85rem; }
          code { font-family: monospace; }
        </style>
      </head>
      <body onload="window.print();window.close()">
        <div class="print-header text-center mb-4">
          <h3 class="text-gold fw-bold m-0" style="color:#b89321 !important;">NOCTURNE:COLD STORAGE</h3>
          <p class="small text-secondary mb-0">Sistema de Gestión de Bebidas</p>
          <h4 class="mt-2 text-dark fw-bold text-uppercase">${getReportTitle()}</h4>
          <small class="text-muted">Generado el: ${new Date().toLocaleString('es-BO')}</small>
        </div>
        ${printContents}
      </body>
    </html>
  `)
  popupWin?.document.close()
}

function printInvoice() {
  const printContents = document.getElementById('printableInvoice')?.innerHTML
  if (!printContents) return

  const popupWin = window.open('', '_blank', 'width=800,height=800')
  popupWin?.document.open()
  popupWin?.document.write(`
    <html>
      <head>
        <title>Factura #${selectedVenta.value?.id} - NOCTURNE:COLD STORAGE</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@500;700;800&display=swap');
          @page { size: A4; margin: 15mm; }
          body { 
            font-family: 'Inter', sans-serif; 
            background: #fff; 
            color: #121212; 
            padding: 10px;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print-invoice-card { 
            border: none !important; 
            box-shadow: none !important; 
            padding: 0 !important; 
          }
          .table { 
            border-color: #121212 !important; 
          }
          .table th { 
            background-color: #121212 !important; 
            color: #D4AF37 !important; 
            font-weight: 700;
          }
          .table td { 
            border-bottom: 1px solid #E5E7EB !important; 
          }
          .text-gold { 
            color: #D4AF37 !important; 
          }
          .text-dark { 
            color: #121212 !important; 
          }
          img {
            filter: grayscale(0%) !important;
          }
        </style>
      </head>
      <body onload="window.print();window.close()">
        ${printContents}
      </body>
    </html>
  `)
  popupWin?.document.close()
}

// Helpers
function formatStock(stock: number, unidadesPorCaja: number) {
  const totalUnits = Number(stock || 0);
  const factor = Number(unidadesPorCaja || 6);
  const cajas = Math.floor(totalUnits / factor);
  const residuo = totalUnits % factor;
  
  if (cajas > 0 && residuo > 0) {
    return `${totalUnits} u (${cajas} c y ${residuo} u)`;
  } else if (cajas > 0) {
    return `${totalUnits} u (${cajas} c)`;
  } else {
    return `${totalUnits} u`;
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('es-BO', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

onMounted(() => {
  fetchVentas()
})
</script>

<style scoped>
.text-gold {
  color: var(--primary) !important;
}
.border-gold-trans {
  border-color: rgba(212, 175, 55, 0.2) !important;
}
.bg-dark-card {
  background-color: rgba(10, 10, 10, 0.4);
}
.btn-xs {
  padding: 4px 8px;
  font-size: 0.72rem;
}

.invoice-search-results {
  background: rgba(0,0,0,0.1);
  padding: 8px;
  border-radius: 8px;
}

.hover-dark:hover {
  background: rgba(255,255,255,0.03);
}

.print-invoice-card {
  border: 1px solid var(--border-color);
  border-radius: 12px;
}

.animate-spin {
  animation: spin 1.2s linear infinite;
}
@keyframes spin {
  100% { transform: rotate(360deg); }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Print CSS */
@media print {
  body {
    background: white !important;
    color: black !important;
  }
  .printable-area {
    border: none !important;
  }
}
</style>
