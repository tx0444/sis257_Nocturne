<template>
  <div class="vendedor-dashboard-container animate-fade-in">
    <!-- Header -->
    <div class="glass-card welcome-banner mb-4 border-blue">
      <div class="row align-items-center">
        <div class="col-md-8">
          <small class="text-blue text-uppercase fw-bold letter-spacing-2">Terminal de Ventas Activa</small>
          <h3 class="text-dark fw-bold mt-1">¡Hola, {{ authStore.fullName }}!</h3>
          <p class="text-secondary mb-0 italic-quote">
            "Brindemos una experiencia de compra premium y veloz hoy."
          </p>
        </div>
        <div class="col-md-4 text-md-end mt-3 mt-md-0">
          <div class="time-badge d-inline-flex bg-blue-trans">
            <i class="bi bi-clock-fill text-blue me-2"></i>
            <span>{{ currentTime }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- SKELETON LOADING STATE -->
    <div v-if="loading" class="row g-4 mb-4">
      <div class="col-md-4" v-for="n in 3" :key="'sk-pos-' + n">
        <div class="glass-card p-4" style="height: 250px;">
          <div class="skeleton-shimmer mb-3" style="width: 60%; height: 24px;"></div>
          <div class="skeleton-shimmer mb-2" style="width: 100%; height: 80px; border-radius: 12px;"></div>
          <div class="skeleton-shimmer" style="width: 40%; height: 20px;"></div>
        </div>
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <div v-else>
      <!-- Key POS Metrics -->
      <div class="row g-4 mb-4">
        <!-- Sales Quota Progress Gauge (SVG) -->
        <div class="col-lg-4 col-md-6">
          <div class="glass-card text-center d-flex flex-column align-items-center justify-content-center p-4 h-100">
            <h6 class="text-secondary text-uppercase fw-bold mb-3" style="font-size: 0.75rem; letter-spacing: 1px;">
              Meta de Ventas Diaria
            </h6>

            <!-- Circular SVG Ring -->
            <div class="position-relative d-inline-flex align-items-center justify-content-center mb-3">
              <svg class="progress-ring" width="130" height="130">
                <circle
                  class="progress-ring-circle-bg"
                  stroke="rgba(37, 99, 235, 0.08)"
                  stroke-width="8"
                  fill="transparent"
                  r="52"
                  cx="65"
                  cy="65"
                />
                <circle
                  class="progress-ring-circle"
                  :stroke="goalPercentage >= 100 ? '#22C55E' : '#2563EB'"
                  stroke-width="8"
                  :stroke-dasharray="strokeDasharray"
                  :stroke-dashoffset="strokeDashoffset"
                  stroke-linecap="round"
                  fill="transparent"
                  r="52"
                  cx="65"
                  cy="65"
                />
              </svg>
              <div class="position-absolute text-center">
                <span class="fs-4 fw-bold text-dark">{{ Math.round(goalPercentage) }}%</span>
                <br/>
                <small class="text-secondary" style="font-size: 0.65rem;">logrado</small>
              </div>
            </div>

            <div class="mb-1 text-blue fw-bold" style="font-size: 1.1rem;">
              Bs. {{ personalRevenueToday.toFixed(2) }} / Bs. {{ dailyGoal.toFixed(2) }}
            </div>
            <small class="text-secondary">Venta de hoy en mi sesión</small>
          </div>
        </div>

        <!-- POS Access Button & Shortcuts -->
        <div class="col-lg-4 col-md-6">
          <div class="glass-card p-4 d-flex flex-column justify-content-between h-100">
            <h6 class="text-secondary text-uppercase fw-bold mb-3" style="font-size: 0.75rem; letter-spacing: 1px;">
              Acción Rápida
            </h6>
            <router-link to="/vendedor/ventas/nueva" class="btn btn-pos-blue mb-3 text-decoration-none">
              <i class="bi bi-cart-plus-fill me-2 fs-4"></i>
              <div>
                <div class="fw-bold">NUEVA VENTA</div>
                <small class="text-white-50">Registrar Venta POS</small>
              </div>
            </router-link>
            <div class="row g-2">
              <div class="col-6">
                <router-link to="/vendedor/clientes" class="btn btn-outline-blue w-100 py-2">
                  <i class="bi bi-person-plus-fill d-block mb-1 fs-5"></i>
                  <small>Crear Cliente</small>
                </router-link>
              </div>
              <div class="col-6">
                <router-link to="/vendedor/ventas" class="btn btn-outline-blue w-100 py-2">
                  <i class="bi bi-receipt d-block mb-1 fs-5"></i>
                  <small>Ver Historial</small>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Shift Overview Stats -->
        <div class="col-lg-4 col-md-12">
          <div class="glass-card p-4 d-flex flex-column justify-content-between h-100">
            <h6 class="text-secondary text-uppercase fw-bold mb-3" style="font-size: 0.75rem; letter-spacing: 1px;">
              Resumen del Turno
            </h6>
            <div class="d-flex align-items-center justify-content-between py-2 border-bottom border-blue-trans">
              <span class="text-secondary"><i class="bi bi-cash-stack me-2"></i>Mis Ventas de Hoy</span>
              <span class="badge bg-blue-trans text-blue fw-bold">{{ personalSalesTodayCount }} ventas</span>
            </div>
            <div class="d-flex align-items-center justify-content-between py-2 border-bottom border-blue-trans">
              <span class="text-secondary"><i class="bi bi-box-seam me-2"></i>Productos con Bajo Stock</span>
              <span class="badge" :class="lowStockCount > 0 ? 'bg-danger-trans text-danger' : 'bg-success-trans text-success'">
                {{ lowStockCount }} licores
              </span>
            </div>
            <div class="d-flex align-items-center justify-content-between py-2">
              <span class="text-secondary"><i class="bi bi-people me-2"></i>Total Clientes</span>
              <span class="text-dark fw-bold">{{ totalClientsCount }}</span>
            </div>
            <div class="alert alert-blue-soft mt-2 mb-0 p-2 d-flex align-items-center gap-2">
              <i class="bi bi-info-circle-fill text-blue fs-5"></i>
              <small class="text-secondary" style="font-size: 0.72rem;">
                Solicita el NIT/CI del cliente antes de confirmar la venta en el POS.
              </small>
            </div>
          </div>
        </div>
      </div>

      <!-- Real-time Instant Price & Stock Finder Widget -->
      <div class="glass-card p-4 mb-4">
        <h5 class="text-blue fw-bold mb-3 border-bottom pb-2 border-blue-trans">
          <i class="bi bi-search me-2"></i>Buscador Instantáneo de Stock y Precios
        </h5>
        <div class="search-box position-relative mb-3">
          <i class="bi bi-search"></i>
          <input 
            type="text" 
            class="form-control" 
            placeholder="Escribe para buscar licor, código, marca..." 
            v-model="productQuery" 
          />
        </div>

        <div class="table-responsive search-results-container" v-if="productQuery.trim().length > 0">
          <table class="table table-hover mb-0">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Código</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio Venta</th>
                <th>Precio Caja</th>
                <th>Stock Disponible</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in searchedProducts" :key="p.id">
                <td>
                  <div class="thumb-wrapper">
                    <video v-if="isVideo(p.imagen)" :src="getImageUrl(p.imagen)" muted class="thumb-img" />
                    <img v-else :src="getImageUrl(p.imagen) || 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=100'" class="thumb-img" />
                  </div>
                </td>
                <td><code>{{ p.codigo }}</code></td>
                <td class="fw-semibold text-dark">{{ p.nombre }}</td>
                <td class="text-secondary">{{ p.categoria?.nombre || 'General' }}</td>
                 <td class="fw-bold text-blue">Bs. {{ Number(p.precioVentaUnidad || p.precioVenta).toFixed(2) }}</td>
                 <td class="text-secondary">
                   <span v-if="p.vendePorCaja !== false">Bs. {{ Number(p.precioVentaCaja || p.precioCaja || (Number(p.precioVentaUnidad || p.precioVenta) * (p.unidadesPorCaja || 6))).toFixed(2) }} <small>({{ p.unidadesPorCaja || 6 }}u)</small></span>
                   <span v-else>-</span>
                 </td>
                 <td>
                   <span :class="Number(p.stock) <= Number(p.stockMinimo) ? 'badge badge-stock-low' : 'badge badge-stock-ok'">
                     {{ formatStock(p.stock, p.unidadesPorCaja) }}
                   </span>
                 </td>
                <td>
                  <span v-if="Number(p.stock) === 0" class="text-danger fw-bold" style="font-size: 0.78rem;">Agotado</span>
                  <span v-else-if="Number(p.stock) <= Number(p.stockMinimo)" class="text-warning fw-bold" style="font-size: 0.78rem;">Stock Crítico</span>
                  <span v-else class="text-success fw-bold" style="font-size: 0.78rem;">Disponible</span>
                </td>
              </tr>
              <tr v-if="searchedProducts.length === 0">
                <td colspan="8" class="text-center text-secondary py-3">No se encontraron productos coincidentes</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-center text-secondary py-4 border border-dashed rounded border-blue-trans">
          <i class="bi bi-keyboard me-2"></i>Comienza a escribir para ver coincidencias de precios.
        </div>
      </div>

      <!-- Seller's Personal Recent Invoices -->
      <div class="glass-card p-4">
        <h5 class="text-blue fw-bold mb-3 border-bottom pb-2 border-blue-trans">
          <i class="bi bi-clock-history me-2"></i>Mis Ventas Recientes
        </h5>
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead>
              <tr>
                <th>Venta #</th>
                <th>Hora</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Métodos de Pago</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="v in myRecentSales" :key="v.id">
                <td>#{{ v.id }}</td>
                <td>{{ formatTime(v.fecha) }}</td>
                <td class="fw-semibold text-dark">{{ v.cliente?.nombre }} {{ v.cliente?.apellido }}</td>
                <td class="fw-bold text-success">Bs. {{ Number(v.total).toFixed(2) }}</td>
                <td>
                  <span 
                    v-for="p in v.pagos" 
                    :key="p.id" 
                    class="badge bg-secondary bg-opacity-10 text-secondary border border-secondary-subtle me-1 px-2"
                  >
                    {{ p.metodoPago?.nombre || 'Efectivo' }}
                  </span>
                </td>
              </tr>
              <tr v-if="myRecentSales.length === 0">
                <td colspan="5" class="text-center text-secondary py-4">Aún no has registrado ventas hoy</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import http from '@/plugins/axios'
import { getImageUrl } from '@/helpers'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const loading = ref(true)
const products = ref<any[]>([])
const sales = ref<any[]>([])
const clients = ref<any[]>([])
const productosBajoStock = ref<any[]>([])

const currentTime = ref('')
const productQuery = ref('')
let timerInterval: any = null

const dailyGoal = ref(2000) // Daily sales quota in Bs.

function updateClock() {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + 
                      ' - ' + 
                      now.toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'short' })
}

// Stats computations
const totalProductsCount = computed(() => products.value.length)
const totalClientsCount = computed(() => clients.value.length)
const lowStockCount = computed(() => productosBajoStock.value.length)

// Filter sales made today by currently logged in seller
const mySalesToday = computed(() => {
  const today = new Date().toDateString()
  return sales.value.filter(s => {
    const matchesUser = s.usuario?.id === authStore.user?.id
    const matchesDate = new Date(s.fecha).toDateString() === today
    return matchesUser && matchesDate
  })
})

const personalRevenueToday = computed(() => {
  return mySalesToday.value.reduce((sum, s) => sum + Number(s.total), 0)
})

const personalSalesTodayCount = computed(() => mySalesToday.value.length)

const goalPercentage = computed(() => {
  const pct = (personalRevenueToday.value / dailyGoal.value) * 100
  return isNaN(pct) ? 0 : Math.min(pct, 100)
})

// Circular progress gauge variables
const radius = 52
const strokeDasharray = 2 * Math.PI * radius // 326.7
const strokeDashoffset = computed(() => {
  const progress = goalPercentage.value / 100
  return strokeDasharray * (1 - progress)
})

// Search Products
const searchedProducts = computed(() => {
  if (!productQuery.value.trim()) return []
  const query = productQuery.value.toLowerCase()
  return products.value.filter(p => {
    return p.nombre.toLowerCase().includes(query) ||
           p.codigo.toLowerCase().includes(query) ||
           (p.categoria?.nombre || '').toLowerCase().includes(query) ||
           (p.marca?.nombre || '').toLowerCase().includes(query)
  }).slice(0, 8)
})

// Vendedor's recent sales
const myRecentSales = computed(() => {
  return [...sales.value]
    .filter(s => s.usuario?.id === authStore.user?.id)
    .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
    .slice(0, 6)
})

function isVideo(url?: string) {
  if (!url) return false
  return url.match(/\.(mp4|webm|ogg|mov|avi)$/i) || url.includes('/videos/')
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' })
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
    console.error('Error fetching seller dashboard info:', error)
  } finally {
    // POS loading delay
    setTimeout(() => {
      loading.value = false
    }, 700)
  }
})

onUnmounted(() => {
  clearInterval(timerInterval)
})
</script>

<style scoped>
.text-blue {
  color: var(--primary) !important;
}
.border-blue-trans {
  border-color: rgba(37, 99, 235, 0.1) !important;
}

.bg-blue-trans {
  background: rgba(37, 99, 235, 0.08) !important;
}
.bg-success-trans {
  background: rgba(34, 197, 94, 0.1) !important;
}
.bg-danger-trans {
  background: rgba(239, 68, 68, 0.1) !important;
}

.welcome-banner {
  background: linear-gradient(135deg, #ffffff 0%, #eff6ff 100%);
  padding: 1.75rem 2rem;
}

.letter-spacing-2 {
  letter-spacing: 2px;
}
.italic-quote {
  font-style: italic;
}

.time-badge {
  padding: 0.5rem 1.25rem;
  border-radius: 50px;
  font-size: 0.82rem;
  color: var(--primary);
  font-weight: 600;
  align-items: center;
}

.glass-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 18px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.01), 0 10px 15px -3px rgba(37, 99, 235, 0.03);
}

.border-blue {
  border-color: rgba(37, 99, 235, 0.25) !important;
}

/* SVG Circular progress */
.progress-ring {
  transform: rotate(-90deg);
}
.progress-ring-circle {
  transition: stroke-dashoffset 0.6s ease;
}

/* POS Giant Button */
.btn-pos-blue {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: #fff;
  border: none;
  border-radius: 14px;
  padding: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-weight: 600;
  text-align: left;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(37, 99, 235, 0.2);
}
.btn-pos-blue:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
}

.btn-outline-blue {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  border-radius: 10px;
  transition: all 0.2s ease;
}
.btn-outline-blue:hover {
  background: rgba(37, 99, 235, 0.06);
  border-color: var(--primary);
  color: var(--primary);
}

.alert-blue-soft {
  background: rgba(37, 99, 235, 0.04);
  border: 1px solid rgba(37, 99, 235, 0.1);
  border-radius: 10px;
  color: var(--text-secondary);
}

/* Search results container */
.search-results-container {
  max-height: 380px;
  overflow-y: auto;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: rgba(255, 255, 255, 0.5);
}

.border-dashed {
  border-style: dashed !important;
}

.thumb-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  overflow: hidden;
  background: #000;
}
.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
