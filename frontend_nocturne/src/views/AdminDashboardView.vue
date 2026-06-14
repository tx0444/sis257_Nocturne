<template>
  <div class="admin-dashboard-container animate-fade-in">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="mb-1 text-gold fw-bold font-title">
          <img src="/logo_owl.png" alt="Nocturne Logo" style="height: 2.5em; width: auto; object-fit: contain; margin-right: 12px; border-radius: 50%;" />NOCTURNE:COLD STORAGE — Centro de Control
        </h4>
        <p class="text-secondary mb-0">Plataforma Ejecutiva de Análisis y Rendimiento Comercial</p>
      </div>
      <div class="time-badge">
        <i class="bi bi-clock-fill text-gold me-2"></i>
        <span>{{ currentTime }}</span>
      </div>
    </div>

    <!-- SKELETON LOADING STATE -->
    <div v-if="loading" class="row g-4 mb-4">
      <!-- 4 Stat Card Skeletons -->
      <div class="col-xl-3 col-md-6" v-for="n in 4" :key="'sk-stat-' + n">
        <div class="glass-card stat-card p-4">
          <div class="d-flex align-items-center gap-3">
            <div class="skeleton-shimmer" style="width: 50px; height: 50px; border-radius: 12px;"></div>
            <div class="flex-grow-1">
              <div class="skeleton-shimmer mb-2" style="width: 70%; height: 24px;"></div>
              <div class="skeleton-shimmer" style="width: 40%; height: 16px;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2 Detail Skeletons -->
      <div class="col-md-6">
        <div class="glass-card p-4" style="height: 380px;">
          <div class="skeleton-shimmer mb-3" style="width: 50%; height: 24px;"></div>
          <div class="skeleton-shimmer mb-3" style="width: 100%; height: 160px; border-radius: 12px;"></div>
          <div class="skeleton-shimmer mb-2" style="width: 90%; height: 20px;"></div>
          <div class="skeleton-shimmer" style="width: 70%; height: 20px;"></div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="glass-card p-4" style="height: 380px;">
          <div class="skeleton-shimmer mb-3" style="width: 50%; height: 24px;"></div>
          <div class="skeleton-shimmer mb-2" style="width: 100%; height: 45px;" v-for="x in 4" :key="x"></div>
        </div>
      </div>
    </div>

    <!-- MAIN DASHBOARD CONTENT -->
    <div v-else>
      <!-- First Row: Key Business Metrics (4 Executive Cards) -->
      <div class="row g-4 mb-4">
        <!-- Revenue Card -->
        <div class="col-xl-3 col-md-6">
          <div class="glass-card stat-card border-gold">
            <div class="d-flex align-items-center gap-3">
              <div class="stat-icon-wrapper bg-gold-trans">
                <i class="bi bi-currency-dollar text-gold animate-glow"></i>
              </div>
              <div>
                <div class="stat-value text-gold">Bs. {{ totalRevenue.toFixed(2) }}</div>
                <div class="stat-label">Total de Ingresos</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Daily Sales Card -->
        <div class="col-xl-3 col-md-6">
          <div class="glass-card stat-card">
            <div class="d-flex align-items-center gap-3">
              <div class="stat-icon-wrapper bg-success-trans">
                <i class="bi bi-cart-check-fill text-success"></i>
              </div>
              <div>
                <div class="stat-value">Bs. {{ dailyRevenue.toFixed(2) }}</div>
                <div class="stat-label">Ventas del Día</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Monthly Sales Card -->
        <div class="col-xl-3 col-md-6">
          <div class="glass-card stat-card">
            <div class="d-flex align-items-center gap-3">
              <div class="stat-icon-wrapper bg-info-trans">
                <i class="bi bi-calendar3 text-info"></i>
              </div>
              <div>
                <div class="stat-value">Bs. {{ monthlyRevenue.toFixed(2) }}</div>
                <div class="stat-label">Ventas del Mes</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Low Stock Alert Card -->
        <div class="col-xl-3 col-md-6">
          <div class="glass-card stat-card" :class="{ 'border-danger-subtle bg-danger-soft': lowStockCount > 0 }">
            <div class="d-flex align-items-center gap-3">
              <div class="stat-icon-wrapper" :class="lowStockCount > 0 ? 'bg-danger-trans text-danger animate-pulse-fast' : 'bg-secondary-trans text-secondary'">
                <i class="bi bi-exclamation-triangle-fill"></i>
              </div>
              <div>
                <div class="stat-value" :class="{ 'text-danger': lowStockCount > 0 }">{{ lowStockCount }}</div>
                <div class="stat-label">Productos con Stock Bajo</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Second Row: Monthly Sales and Delivery vs Tienda -->
      <div class="row g-4 mb-4">
        <!-- Monthly Sales Chart -->
        <div class="col-lg-8">
          <div class="glass-card p-4 h-100">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="text-gold fw-bold mb-0 font-title"><i class="bi bi-activity me-2"></i>Historial de Ventas Mensuales</h5>
              <span class="badge bg-gold-trans text-gold">Tendencia Mensual</span>
            </div>
            <div style="position: relative; height: 260px; width: 100%;">
              <canvas ref="salesChartCanvas"></canvas>
            </div>
          </div>
        </div>

        <!-- Tienda vs Delivery Chart -->
        <div class="col-lg-4">
          <div class="glass-card p-4 h-100">
            <h5 class="text-gold fw-bold mb-3 border-bottom pb-2 border-gold-trans font-title">
              <i class="bi bi-truck me-2"></i>Tienda vs Delivery
            </h5>
            <div style="position: relative; height: 220px; width: 100%;">
              <canvas ref="deliveryChartCanvas"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Third Row: Payment Methods & Critical Stock Alert -->
      <div class="row g-4 mb-4">
        <!-- Payment Methods Chart -->
        <div class="col-lg-4">
          <div class="glass-card p-4 h-100">
            <h5 class="text-gold fw-bold mb-3 border-bottom pb-2 border-gold-trans font-title">
              <i class="bi bi-credit-card-fill me-2"></i>Métodos de Pago
            </h5>
            <div style="position: relative; height: 220px; width: 100%;">
              <canvas ref="paymentsChartCanvas"></canvas>
            </div>
          </div>
        </div>

        <!-- Critical Stock Alert List -->
        <div class="col-lg-8">
          <div class="glass-card p-4 h-100">
            <div class="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2 border-gold-trans">
              <h5 class="text-gold fw-bold mb-0 font-title">
                <i class="bi bi-exclamation-octagon-fill me-2 text-danger animate-pulse-fast"></i>Alertas de Stock Crítico
              </h5>
              <span class="badge bg-danger bg-opacity-25 text-danger">{{ lowStockCount }} Productos</span>
            </div>
            <div class="table-responsive" style="max-height: 220px; overflow-y: auto;">
              <table class="table table-hover table-dark mb-0 align-middle text-start" style="--bs-table-bg: transparent; border-color: rgba(255, 255, 255, 0.05);">
                <thead>
                  <tr class="text-secondary" style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px;">
                    <th>Código</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Stock Act.</th>
                    <th>Stock Mín.</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody style="font-size: 0.85rem;">
                  <tr v-for="p in productosBajoStock" :key="p.id">
                    <td><code>{{ p.codigo }}</code></td>
                    <td class="fw-semibold text-light">{{ p.nombre }}</td>
                    <td class="text-secondary">{{ p.categoria?.nombre || 'General' }}</td>
                    <td>
                      <span class="badge bg-danger bg-opacity-20 text-danger fw-bold px-2 py-1">
                        {{ formatStock(p.stock, p.unidadesPorCaja) }}
                      </span>
                    </td>
                    <td class="text-secondary">{{ formatStock(p.stockMinimo, p.unidadesPorCaja) }}</td>
                    <td class="fw-bold text-gold">Bs. {{ Number(p.precioVentaUnidad || p.precioVenta).toFixed(2) }}</td>
                  </tr>
                  <tr v-if="productosBajoStock.length === 0">
                    <td colspan="6" class="text-center text-secondary py-4">
                      <i class="bi bi-check-circle-fill text-success me-2"></i>¡Todo el inventario tiene stock suficiente!
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Fourth Row: Popular Products & Quick Actions -->
      <div class="row g-4 mb-4">
        <!-- Popular Products -->
        <div class="col-lg-6">
          <div class="glass-card p-4 h-100">
            <h5 class="text-gold fw-bold mb-3 border-bottom pb-2 border-gold-trans font-title">
              <i class="bi bi-star-fill me-2"></i>Productos Más Vendidos
            </h5>
            <div class="popular-products-list">
              <div v-for="prod in topSellingProducts" :key="prod.name" class="popular-item mb-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <span class="fw-semibold text-light" style="font-size: 0.88rem;">{{ prod.name }}</span>
                  <span class="text-gold fw-bold" style="font-size: 0.85rem;">{{ prod.qty }} vendidas</span>
                </div>
                <div class="custom-progress-bar">
                  <div class="progress-fill" :style="{ width: prod.pct + '%', backgroundColor: '#D4AF37' }"></div>
                </div>
              </div>
              <div v-if="topSellingProducts.length === 0" class="text-center text-secondary py-5">
                No hay ventas registradas todavía.
              </div>
            </div>
          </div>
        </div>

        <!-- Exec Grid Shortcuts & Recent Clients -->
        <div class="col-lg-6">
          <div class="glass-card p-4 h-100">
            <h5 class="text-gold fw-bold mb-3 border-bottom pb-2 border-gold-trans font-title">
              <i class="bi bi-sliders me-2"></i>Controles del Centro de Negocio
            </h5>
            <div class="row g-3 mb-3">
              <div class="col-6">
                <router-link to="/admin/productos" class="shortcut-card bg-glass text-decoration-none">
                  <i class="bi bi-beer text-gold mb-1 fs-4"></i>
                  <span class="title" style="font-size: 0.8rem;">Licores</span>
                </router-link>
              </div>
              <div class="col-6">
                <router-link to="/admin/combos" class="shortcut-card bg-glass text-decoration-none">
                  <i class="bi bi-boxes text-gold mb-1 fs-4"></i>
                  <span class="title" style="font-size: 0.8rem;">Combos</span>
                </router-link>
              </div>
              <div class="col-6">
                <router-link to="/admin/compras/nueva" class="shortcut-card bg-glass text-decoration-none">
                  <i class="bi bi-bag-plus text-info mb-1 fs-4"></i>
                  <span class="title" style="font-size: 0.8rem;">Comprar Stock</span>
                </router-link>
              </div>
              <div class="col-6">
                <router-link to="/admin/caja" class="shortcut-card bg-glass text-decoration-none">
                  <i class="bi bi-cash-coin text-success mb-1 fs-4"></i>
                  <span class="title" style="font-size: 0.8rem;">Caja (Arqueo)</span>
                </router-link>
              </div>
            </div>

            <!-- New Clients Sub-list -->
            <div class="clients-list border-top pt-3 border-gold-trans">
              <h6 class="text-secondary text-uppercase fw-bold mb-2" style="font-size: 0.75rem; letter-spacing: 1px;">
                Clientes Recientes
              </h6>
              <div v-for="c in recentClients" :key="c.id" class="d-flex align-items-center justify-content-between py-1 border-bottom border-gold-trans">
                <div class="d-flex align-items-center gap-2">
                  <div class="avatar-small">
                    <i class="bi bi-person-fill text-gold" style="font-size: 0.8rem;"></i>
                  </div>
                  <div>
                    <div class="fw-semibold text-light" style="font-size: 0.8rem;">{{ c.nombre }} {{ c.apellido }}</div>
                    <small class="text-secondary" style="font-size: 0.65rem;">NIT/CI: {{ c.ciNit || 'Sin NIT' }}</small>
                  </div>
                </div>
                <span class="text-secondary" style="font-size: 0.7rem;">{{ formatTime(c.fechaCreacion) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import http from '@/plugins/axios'
import Chart from 'chart.js/auto'

const loading = ref(true)
const products = ref<any[]>([])
const sales = ref<any[]>([])
const clients = ref<any[]>([])
const productosBajoStock = ref<any[]>([])

// Chart.js Canvas Template References
const salesChartCanvas = ref<HTMLCanvasElement | null>(null)
const deliveryChartCanvas = ref<HTMLCanvasElement | null>(null)
const paymentsChartCanvas = ref<HTMLCanvasElement | null>(null)

let salesChart: any = null
let deliveryChart: any = null
let paymentsChart: any = null

const currentTime = ref('')
let timerInterval: any = null

function updateClock() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + 
                      ' - ' + 
                      now.toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'short' })
}

// Compute statistics
const totalRevenue = computed(() => sales.value.reduce((sum, item) => sum + Number(item.total), 0))

const dailyRevenue = computed(() => {
  const today = new Date().toDateString()
  return sales.value
    .filter(s => new Date(s.fecha).toDateString() === today)
    .reduce((sum, item) => sum + Number(item.total), 0)
})

const monthlyRevenue = computed(() => {
  const thisMonth = new Date().getMonth()
  const thisYear = new Date().getFullYear()
  return sales.value
    .filter(s => {
      const d = new Date(s.fecha)
      return d.getMonth() === thisMonth && d.getFullYear() === thisYear
    })
    .reduce((sum, item) => sum + Number(item.total), 0)
})

const lowStockCount = computed(() => productosBajoStock.value.length)

// Aggregate functions for Chart.js
function getMonthlySalesData() {
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  const now = new Date()
  const resultLabels: string[] = []
  const resultValues: number[] = []
  
  // Last 6 months
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    resultLabels.push(months[d.getMonth()])
    
    const sum = sales.value
      .filter(s => {
        const sDate = new Date(s.fecha)
        return sDate.getMonth() === d.getMonth() && sDate.getFullYear() === d.getFullYear()
      })
      .reduce((acc, s) => acc + Number(s.total), 0)
    resultValues.push(sum)
  }
  
  return { labels: resultLabels, values: resultValues }
}

function getDeliveryVsTiendaData() {
  let tienda = 0
  let delivery = 0
  sales.value.forEach(s => {
    if (s.tipoEntrega === 'DELIVERY') {
      delivery += Number(s.total)
    } else {
      tienda += Number(s.total)
    }
  })
  return { tienda, delivery }
}

function getPaymentMethodsData() {
  const map: Record<string, number> = {}
  sales.value.forEach(s => {
    if (s.pagos && s.pagos.length > 0) {
      s.pagos.forEach((p: any) => {
        const method = p.metodoPago?.nombre || 'Efectivo'
        map[method] = (map[method] || 0) + Number(p.monto)
      })
    } else {
      map['Efectivo'] = (map['Efectivo'] || 0) + Number(s.total)
    }
  })
  
  return {
    labels: Object.keys(map).length > 0 ? Object.keys(map) : ['Efectivo'],
    values: Object.keys(map).length > 0 ? Object.values(map) : [1]
  }
}

function renderCharts() {
  if (salesChart) salesChart.destroy()
  if (deliveryChart) deliveryChart.destroy()
  if (paymentsChart) paymentsChart.destroy()

  // 1. Sales by Month Line Chart
  if (salesChartCanvas.value) {
    const mData = getMonthlySalesData()
    salesChart = new Chart(salesChartCanvas.value, {
      type: 'line',
      data: {
        labels: mData.labels,
        datasets: [{
          label: 'Ventas (Bs.)',
          data: mData.values,
          borderColor: '#D4AF37',
          backgroundColor: 'rgba(212, 175, 55, 0.15)',
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: '#D4AF37',
          pointBorderColor: '#121212',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#888' }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#888' }
          }
        }
      }
    })
  }

  // 2. Delivery vs Tienda Doughnut Chart
  if (deliveryChartCanvas.value) {
    const dData = getDeliveryVsTiendaData()
    deliveryChart = new Chart(deliveryChartCanvas.value, {
      type: 'doughnut',
      data: {
        labels: ['Tienda', 'Delivery'],
        datasets: [{
          data: [dData.tienda, dData.delivery],
          backgroundColor: ['#D4AF37', '#3b82f6'],
          borderWidth: 2,
          borderColor: '#1e1e1e'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#aaa', font: { size: 11 } }
          }
        }
      }
    })
  }

  // 3. Payment Methods Pie Chart
  if (paymentsChartCanvas.value) {
    const pData = getPaymentMethodsData()
    paymentsChart = new Chart(paymentsChartCanvas.value, {
      type: 'pie',
      data: {
        labels: pData.labels,
        datasets: [{
          data: pData.values,
          backgroundColor: ['#D4AF37', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'],
          borderWidth: 2,
          borderColor: '#1e1e1e'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#aaa', font: { size: 11 } }
          }
        }
      }
    })
  }
}

// Popular products computation
const topSellingProducts = computed(() => {
  const map: Record<string, number> = {}
  sales.value.forEach(s => {
    if (s.detalles) {
      s.detalles.forEach((d: any) => {
        const name = d.producto?.nombre || 'Producto'
        map[name] = (map[name] || 0) + Number(d.cantidad)
      })
    }
  })
  
  const sorted = Object.entries(map)
    .map(([name, qty]) => ({ name, qty, pct: 0 }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5)
    
  const maxQty = sorted[0]?.qty || 1
  sorted.forEach(item => {
    item.pct = Math.round((item.qty / maxQty) * 100)
  })
  return sorted
})

// Recent Clients
const recentClients = computed(() => {
  return [...clients.value]
    .sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime())
    .slice(0, 5)
})

function formatTime(dateStr: string) {
  if (!dateStr) return 'Reciente'
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-BO', { day: '2-digit', month: 'short' })
}

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

onMounted(async () => {
  updateClock()
  timerInterval = setInterval(updateClock, 1000)

  try {
    const [pRes, sRes, cRes, bsRes] = await Promise.all([
      http.get('productos'),
      http.get('ventas'),
      http.get('clientes'),
      http.get('productos/bajo-stock')
    ])
    products.value = pRes.data
    sales.value = sRes.data
    clients.value = cRes.data
    productosBajoStock.value = bsRes.data
  } catch (error) {
    console.error('Error fetching dashboard info:', error)
  } finally {
    // Elegant luxury delay for skeleton loader
    setTimeout(async () => {
      loading.value = false
      await nextTick()
      renderCharts()
    }, 800)
  }
})

onUnmounted(() => {
  clearInterval(timerInterval)
  if (salesChart) salesChart.destroy()
  if (deliveryChart) deliveryChart.destroy()
  if (paymentsChart) paymentsChart.destroy()
})
</script>

<style scoped>
.font-title {
  font-family: 'Outfit', sans-serif;
  letter-spacing: 0.5px;
}

.text-gold {
  color: var(--primary) !important;
}
.border-gold-trans {
  border-color: rgba(212, 175, 55, 0.15) !important;
}

.bg-gold-trans {
  background: rgba(212, 175, 55, 0.1) !important;
}
.bg-success-trans {
  background: rgba(25, 135, 84, 0.1) !important;
}
.bg-info-trans {
  background: rgba(13, 202, 240, 0.1) !important;
}
.bg-danger-trans {
  background: rgba(220, 53, 69, 0.1) !important;
}
.bg-secondary-trans {
  background: rgba(108, 117, 125, 0.1) !important;
}
.bg-danger-soft {
  background-color: rgba(220, 53, 69, 0.02) !important;
}

/* Luxury Multi-layer Shadows */
.glass-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 
              0 10px 15px -3px rgba(0, 0, 0, 0.03), 
              0 20px 25px -5px rgba(0, 0, 0, 0.03);
  padding: 1.5rem;
  transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.border-gold {
  border-color: rgba(212, 175, 55, 0.35) !important;
}

.time-badge {
  background: rgba(212, 175, 55, 0.08);
  border: 1px solid rgba(212, 175, 55, 0.18);
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  font-size: 0.82rem;
  color: var(--text-primary);
  font-weight: 500;
  display: flex;
  align-items: center;
}

.stat-card {
  padding: 1.75rem 1.5rem;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(212, 175, 55, 0.05) !important;
}

.stat-icon-wrapper {
  width: 54px;
  height: 54px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
}

.stat-value {
  font-family: 'Outfit', sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-top: 1px;
}

/* SVG Chart Local styles */
.chart-container-svg {
  width: 100%;
  height: 220px;
  margin-top: 1rem;
}
.svg-chart {
  width: 100%;
  height: 100%;
}
.chart-point-ripple {
  animation: pulseRipple 2s infinite ease-out;
  transform-origin: center;
}
@keyframes pulseRipple {
  0% { transform: scale(0.6); opacity: 0.8; }
  100% { transform: scale(1.6); opacity: 0; }
}

.chart-tooltip {
  background: var(--secondary);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.1);
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.custom-progress-bar {
  background: rgba(0, 0, 0, 0.04);
  height: 8px;
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 0.8s ease-in-out;
}

.shortcut-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: rgba(0, 0, 0, 0.01);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
}
.shortcut-card:hover {
  background: #F3E5AB; /* Custom cream hover tint */
  border-color: var(--primary);
  transform: translateY(-2px);
}
.shortcut-card:hover i,
.shortcut-card:hover .title {
  color: #9e7d11 !important;
}
.shortcut-card .title {
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.88rem;
  margin-top: 4px;
}
.shortcut-card .subtitle {
  color: var(--text-secondary);
  font-size: 0.75rem;
  margin-top: 2px;
}

.avatar-small {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.08);
  border: 1px solid rgba(212, 175, 55, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

.animate-glow {
  animation: glowGold 3s infinite ease-in-out;
}
@keyframes glowGold {
  0% { filter: drop-shadow(0 0 1px rgba(212, 175, 55, 0)); }
  50% { filter: drop-shadow(0 0 4px rgba(212, 175, 55, 0.8)); }
  100% { filter: drop-shadow(0 0 1px rgba(212, 175, 55, 0)); }
}

.animate-pulse-fast {
  animation: pulsePulse 1.2s infinite ease-in-out;
}
@keyframes pulsePulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.08); }
  100% { transform: scale(1); }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
