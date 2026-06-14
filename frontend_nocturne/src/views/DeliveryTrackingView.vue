<template>
  <div class="delivery-container animate-fade-in">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="mb-1 text-gold fw-bold">
          <i class="bi bi-truck me-2"></i>Módulo de Delivery
        </h4>
        <p class="text-secondary mb-0">Seguimiento y control de despachos en tiempo real</p>
      </div>
      <button class="btn btn-outline-custom btn-sm" @click="fetchDeliveries" :disabled="loading">
        <i class="bi" :class="loading ? 'bi-arrow-repeat animate-spin' : 'bi-arrow-clockwise'"></i> Actualizar
      </button>
    </div>

    <!-- Summary Cards -->
    <div class="row g-3 mb-4">
      <div class="col-md-3">
        <div class="stat-card border-left-yellow">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div class="text-secondary small text-uppercase">Pendientes</div>
              <div class="fs-3 fw-bold text-light mt-1">{{ summary.pendiente }}</div>
            </div>
            <i class="bi bi-hourglass-split text-warning fs-1"></i>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card border-left-blue">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div class="text-secondary small text-uppercase">Preparando</div>
              <div class="fs-3 fw-bold text-light mt-1">{{ summary.preparando }}</div>
            </div>
            <i class="bi bi-box-seam text-info fs-1"></i>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card border-left-orange">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div class="text-secondary small text-uppercase">En Camino / Listos</div>
              <div class="fs-3 fw-bold text-light mt-1">{{ summary.enCamino + summary.listo }}</div>
            </div>
            <i class="bi bi-bicycle text-orange fs-1"></i>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="stat-card border-left-green">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <div class="text-secondary small text-uppercase">Entregados</div>
              <div class="fs-3 fw-bold text-light mt-1">{{ summary.entregado }}</div>
            </div>
            <i class="bi bi-check2-circle text-success fs-1"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="row g-4">
      <!-- Delivery List -->
      <div class="col-lg-8">
        <div class="table-dark-custom">
          <div class="p-3 bg-dark-card border-bottom border-gold-trans d-flex justify-content-between align-items-center">
            <h6 class="mb-0 text-light">Lista de Entregas</h6>
            <span class="badge bg-gold-trans text-gold">{{ filteredDeliveries.length }} pedidos</span>
          </div>

          <div class="table-responsive" style="max-height: 520px;">
            <table class="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Pedido</th>
                  <th>Cliente</th>
                  <th>Dirección</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="d in filteredDeliveries" 
                  :key="d.id"
                  @click="selectDelivery(d)"
                  :class="{ 'table-active-row': selectedDelivery && selectedDelivery.id === d.id }"
                  style="cursor: pointer;"
                >
                  <td><code>#{{ d.ventaId }}</code></td>
                  <td>
                    <div class="fw-semibold text-light">{{ d.venta?.cliente?.nombre || 'Cliente' }} {{ d.venta?.cliente?.apellido || 'Ocasional' }}</div>
                    <small class="text-secondary">{{ d.telefonoContacto }}</small>
                  </td>
                  <td>
                    <div class="text-truncate text-secondary" style="max-width: 180px;">{{ d.direccion }}</div>
                  </td>
                  <td><small>{{ formatDate(d.fechaCreacion) }}</small></td>
                  <td><span class="fw-semibold text-gold">Bs. {{ Number(d.venta?.total || 0).toFixed(2) }}</span></td>
                  <td>
                    <span class="badge font-weight-bold text-uppercase px-2 py-1" :class="getStateBadgeClass(d.estado)">
                      {{ d.estado }}
                    </span>
                  </td>
                </tr>
                <tr v-if="filteredDeliveries.length === 0">
                  <td colspan="6" class="text-center py-5 text-secondary">
                    <i class="bi bi-truck fs-1 d-block mb-2"></i>
                    No hay entregas registradas en este momento.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Tracking & Details Panel -->
      <div class="col-lg-4">
        <div class="stat-card" style="position: sticky; top: 80px; min-height: 480px;">
          <div v-if="!selectedDelivery" class="text-center py-5 text-secondary h-100 d-flex flex-column justify-content-center align-items-center">
            <i class="bi bi-info-circle fs-1 mb-2 opacity-50"></i>
            <p>Selecciona una entrega para ver el seguimiento y detalles.</p>
          </div>

          <div v-else>
            <div class="d-flex justify-content-between align-items-start border-bottom border-gold-trans pb-3 mb-3">
              <div>
                <h5 class="mb-0 text-light fw-bold">Pedido #{{ selectedDelivery.ventaId }}</h5>
                <small class="text-secondary">{{ formatDate(selectedDelivery.fechaCreacion) }}</small>
              </div>
              <span class="badge" :class="getStateBadgeClass(selectedDelivery.estado)">{{ selectedDelivery.estado }}</span>
            </div>

            <!-- Tracking Bar Section (PedidosYa Style) -->
            <div class="tracking-timeline-container mb-4">
              <h6 class="text-gold mb-3" style="font-size: 0.85rem;"><i class="bi bi-clock-history me-1"></i>Seguimiento Visual</h6>
              
              <!-- Timeline component -->
              <div class="tracking-timeline">
                <div 
                  class="timeline-item" 
                  v-for="step in timelineSteps" 
                  :key="step.status"
                  :class="getTimelineItemClass(step.status)"
                >
                  <div class="timeline-badge">
                    <i class="bi" :class="step.icon"></i>
                  </div>
                  <div class="timeline-content">
                    <div class="timeline-title">{{ step.label }}</div>
                    <small class="timeline-time text-secondary" v-if="getStepTime(step.status)">{{ getStepTime(step.status) }}</small>
                  </div>
                </div>
              </div>
            </div>

            <!-- Delivery Info -->
            <div class="glass-card p-3 mb-3" style="background: rgba(0,0,0,0.15);">
              <h6 class="text-gold mb-2" style="font-size: 0.85rem;"><i class="bi bi-geo-alt-fill me-1"></i>Detalles de Entrega</h6>
              <div class="small text-secondary mb-1"><strong>Dirección:</strong> {{ selectedDelivery.direccion }}</div>
              <div class="small text-secondary mb-1" v-if="selectedDelivery.referencia"><strong>Referencia:</strong> {{ selectedDelivery.referencia }}</div>
              <div class="small text-secondary mb-1"><strong>Teléfono:</strong> {{ selectedDelivery.telefonoContacto }}</div>
              <div class="small text-secondary mb-1"><strong>Costo Delivery:</strong> Bs. {{ Number(selectedDelivery.costoDelivery).toFixed(2) }}</div>
              
              <!-- Map showing the exact delivery pin -->
              <div v-if="selectedDelivery.latitud && selectedDelivery.longitud" class="mt-3">
                <div id="map-track" style="height: 180px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); z-index: 1;"></div>
              </div>
            </div>

            <!-- Order Products -->
            <div class="mb-4">
              <h6 class="text-gold mb-2" style="font-size: 0.85rem;"><i class="bi bi-receipt me-1"></i>Productos</h6>
              <div class="product-list-compact" style="max-height: 150px; overflow-y: auto;">
                <div v-for="det in selectedDelivery.venta?.detalles" :key="det.id" class="d-flex justify-content-between align-items-center py-1 border-bottom border-gold-trans border-opacity-10">
                  <div class="small text-secondary text-truncate" style="max-width: 200px;">
                    {{ det.cantidad }}x {{ det.producto?.nombre }}
                  </div>
                  <span class="small text-light">Bs. {{ Number(det.subtotal).toFixed(2) }}</span>
                </div>
              </div>
              <div class="d-flex justify-content-between mt-2 pt-2 border-top border-gold-trans font-weight-bold">
                <span class="small text-secondary">Total Venta:</span>
                <span class="text-light">Bs. {{ Number(selectedDelivery.venta?.total || 0).toFixed(2) }}</span>
              </div>
            </div>

            <!-- Action Buttons based on User Role -->
            <div class="d-flex flex-column gap-2" v-if="selectedDelivery.estado !== 'Entregado' && selectedDelivery.estado !== 'Cancelado'">
              <h6 class="text-secondary small uppercase mb-1">Acciones de Estado</h6>
              
              <!-- Flow control for admin/seller -->
              <div class="d-flex gap-2">
                <button 
                  v-if="selectedDelivery.estado === 'Pendiente'" 
                  class="btn btn-primary-custom flex-grow-1"
                  @click="updateStatus('Preparando')"
                >
                  <i class="bi bi-box-seam me-1"></i> Preparar Pedido
                </button>

                <button 
                  v-if="selectedDelivery.estado === 'Preparando'" 
                  class="btn btn-warning flex-grow-1 text-dark"
                  @click="updateStatus('Listo para Entrega')"
                >
                  <i class="bi bi-check-circle me-1"></i> Listo para Entrega
                </button>

                <button 
                  v-if="selectedDelivery.estado === 'Listo para Entrega'" 
                  class="btn btn-orange flex-grow-1 text-white"
                  @click="updateStatus('En Camino')"
                >
                  <i class="bi bi-bicycle me-1"></i> Enviar Pedido
                </button>

                <button 
                  v-if="selectedDelivery.estado === 'En Camino'" 
                  class="btn btn-success flex-grow-1"
                  @click="updateStatus('Entregado')"
                >
                  <i class="bi bi-check2-circle me-1"></i> Confirmar Entrega
                </button>
              </div>

              <!-- Cancel Button for Admin or Pending -->
              <button 
                class="btn btn-outline-danger btn-sm w-100"
                @click="updateStatus('Cancelado')"
              >
                <i class="bi bi-x-circle me-1"></i> Cancelar Delivery
              </button>
            </div>
            
            <div v-else class="text-center p-3 rounded" style="background: rgba(255,255,255,0.03);">
              <span class="text-secondary small">
                Este pedido ha finalizado con estado: <strong>{{ selectedDelivery.estado }}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import http from '@/plugins/axios'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// State
const deliveries = ref<any[]>([])
const loading = ref(false)
const selectedDelivery = ref<any>(null)
let trackingMapInstance: any = null
let trackingMarkerInstance: any = null

// Timeline steps
const timelineSteps = [
  { status: 'Pendiente', label: 'Pedido Recibido', icon: 'bi-receipt' },
  { status: 'Preparando', label: 'Preparando', icon: 'bi-box-seam' },
  { status: 'Listo para Entrega', label: 'Listo para Entrega', icon: 'bi-check-circle' },
  { status: 'En Camino', label: 'En Camino', icon: 'bi-bicycle' },
  { status: 'Entregado', label: 'Entregado', icon: 'bi-check2-circle' }
]

// Computed filtering based on role / status
const filteredDeliveries = computed(() => {
  // If seller (Vendedor), show deliveries that are not delivered/cancelled or show all
  // The request says: "Panel Vendedor: Mis Entregas. Panel Administrador: Delivery"
  // Both can view and manage, let's keep it complete
  return deliveries.value
})

const summary = computed(() => {
  const sum = { pendiente: 0, preparando: 0, listo: 0, enCamino: 0, entregado: 0, cancelado: 0 }
  deliveries.value.forEach(d => {
    if (d.estado === 'Pendiente') sum.pendiente++
    else if (d.estado === 'Preparando') sum.preparando++
    else if (d.estado === 'Listo para Entrega') sum.listo++
    else if (d.estado === 'En Camino') sum.enCamino++
    else if (d.estado === 'Entregado') sum.entregado++
    else if (d.estado === 'Cancelado') sum.cancelado++
  })
  return sum
})

// Methods
async function fetchDeliveries() {
  loading.value = true
  try {
    const res = await http.get('deliveries')
    deliveries.value = res.data
    
    // Sync currently selected delivery
    if (selectedDelivery.value) {
      const updated = res.data.find((d: any) => d.id === selectedDelivery.value.id)
      if (updated) selectedDelivery.value = updated
    }
  } catch (error) {
    console.error('Error fetching deliveries:', error)
  } finally {
    loading.value = false
  }
}

function selectDelivery(d: any) {
  selectedDelivery.value = d
}

async function updateStatus(estado: string) {
  if (!selectedDelivery.value) return
  
  // Confirm actions for critical statuses
  if (estado === 'Cancelado') {
    const confirm = await Swal.fire({
      title: '¿Anular delivery?',
      text: 'Esta acción cancelará el envío y anulará la venta correspondiente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener'
    })
    if (!confirm.isConfirmed) return
  }

  try {
    const res = await http.patch(`deliveries/${selectedDelivery.value.id}/estado`, { estado })
    
    Swal.fire({
      icon: 'success',
      title: 'Estado Actualizado',
      text: `El pedido ahora está: ${estado}`,
      timer: 1500,
      showConfirmButton: false
    })

    // Refresh data
    await fetchDeliveries()
  } catch (error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'No se pudo actualizar el estado.'
    })
  }
}

// Timeline helpers
function getTimelineItemClass(stepStatus: string): string {
  if (!selectedDelivery.value) return 'status-grey'
  if (selectedDelivery.value.estado === 'Cancelado') {
    return 'status-red'
  }

  const order = ['Pendiente', 'Preparando', 'Listo para Entrega', 'En Camino', 'Entregado']
  const currentIndex = order.indexOf(selectedDelivery.value.estado)
  const stepIndex = order.indexOf(stepStatus)

  if (stepIndex === currentIndex) {
    // Current step
    switch (stepStatus) {
      case 'Pendiente': return 'status-yellow active'
      case 'Preparando': return 'status-blue active'
      case 'Listo para Entrega': return 'status-orange active'
      case 'En Camino': return 'status-green active'
      case 'Entregado': return 'status-green active'
      default: return 'status-grey'
    }
  } else if (stepIndex < currentIndex) {
    // Completed step
    return 'status-completed'
  } else {
    // Future step
    return 'status-grey'
  }
}

function getStepTime(stepStatus: string): string | null {
  if (!selectedDelivery.value) return null
  if (stepStatus === 'Pendiente') {
    return formatTime(selectedDelivery.value.fechaCreacion)
  }
  if (stepStatus === 'Entregado' && selectedDelivery.value.fechaEntrega) {
    return formatTime(selectedDelivery.value.fechaEntrega)
  }
  // Other timestamps could be tracked, but using modification dates is fine
  if (stepStatus === selectedDelivery.value.estado) {
    return formatTime(selectedDelivery.value.fechaModificacion)
  }
  return null
}

// Format utilities
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-BO', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString('es-BO', {
    hour: '2-digit', minute: '2-digit'
  })
}

function getStateBadgeClass(status: string) {
  switch (status) {
    case 'Pendiente': return 'bg-warning bg-opacity-20 text-warning border border-warning-subtle'
    case 'Preparando': return 'bg-info bg-opacity-20 text-info border border-info-subtle'
    case 'Listo para Entrega': return 'bg-orange-trans text-orange border border-orange-trans'
    case 'En Camino': return 'bg-primary bg-opacity-20 text-primary-light border border-primary-subtle'
    case 'Entregado': return 'bg-success bg-opacity-20 text-success border border-success-subtle'
    case 'Cancelado': return 'bg-danger bg-opacity-20 text-danger border border-danger-subtle'
    default: return 'bg-secondary text-light'
  }
}

watch(selectedDelivery, (newVal) => {
  if (newVal && newVal.latitud && newVal.longitud) {
    nextTick(() => {
      initTrackingMap(Number(newVal.latitud), Number(newVal.longitud), newVal.direccion)
    })
  } else {
    destroyTrackingMap()
  }
})

onUnmounted(() => {
  destroyTrackingMap()
})

function initTrackingMap(lat: number, lng: number, address: string) {
  const el = document.getElementById('map-track')
  if (!el) return

  if (trackingMapInstance) {
    trackingMapInstance.setView([lat, lng], 15)
    if (trackingMarkerInstance) {
      trackingMarkerInstance.setLatLng([lat, lng])
      trackingMarkerInstance.setPopupContent(address)
    }
    return
  }

  const defaultIcon = (window as any).L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })

  trackingMapInstance = (window as any).L.map('map-track', {
    zoomControl: true,
    attributionControl: false
  }).setView([lat, lng], 15)

  (window as any).L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(trackingMapInstance)

  trackingMarkerInstance = (window as any).L.marker([lat, lng], {
    icon: defaultIcon
  }).addTo(trackingMapInstance)
    .bindPopup(address)
    .openPopup()

  setTimeout(() => {
    if (trackingMapInstance) trackingMapInstance.invalidateSize()
  }, 300)
}

function destroyTrackingMap() {
  if (trackingMapInstance) {
    trackingMapInstance.remove()
    trackingMapInstance = null
    trackingMarkerInstance = null
  }
}

onMounted(() => {
  fetchDeliveries()
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

.text-orange {
  color: #fd7e14 !important;
}
.bg-orange-trans {
  background-color: rgba(253, 126, 20, 0.2) !important;
}
.border-orange-trans {
  border-color: rgba(253, 126, 20, 0.3) !important;
}
.btn-orange {
  background-color: #fd7e14;
  border-color: #fd7e14;
}
.btn-orange:hover {
  background-color: #e86b0a;
  border-color: #e86b0a;
}

.border-left-yellow { border-left: 4px solid #ffc107; }
.border-left-blue { border-left: 4px solid #0dcaf0; }
.border-left-orange { border-left: 4px solid #fd7e14; }
.border-left-green { border-left: 4px solid #198754; }

.table-active-row {
  background: rgba(212, 175, 55, 0.08) !important;
}

/* Timeline Custom Styles (PedidosYa Style) */
.tracking-timeline {
  position: relative;
  padding-left: 30px;
  margin-top: 15px;
}
.tracking-timeline::before {
  content: '';
  position: absolute;
  top: 5px;
  bottom: 5px;
  left: 11px;
  width: 2px;
  background: rgba(255, 255, 255, 0.1);
}

.timeline-item {
  position: relative;
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-badge {
  position: absolute;
  left: -30px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #333;
  border: 2px solid #555;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: all 0.3s ease;
}
.timeline-badge i {
  font-size: 0.75rem;
  color: #888;
}

.timeline-content {
  flex: 1;
}
.timeline-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: #aaa;
  transition: color 0.3s ease;
}
.timeline-time {
  font-size: 0.72rem;
}

/* Status colors and timeline connections */
.status-completed .timeline-badge {
  background: var(--primary);
  border-color: var(--primary);
}
.status-completed .timeline-badge i {
  color: #fff;
}
.status-completed .timeline-title {
  color: #fff;
}

.status-yellow.active .timeline-badge {
  background: #ffc107;
  border-color: #ffc107;
  box-shadow: 0 0 10px rgba(255, 193, 7, 0.5);
}
.status-yellow.active .timeline-badge i { color: #000; }
.status-yellow.active .timeline-title { color: #ffc107; font-weight: 700; }

.status-blue.active .timeline-badge {
  background: #0dcaf0;
  border-color: #0dcaf0;
  box-shadow: 0 0 10px rgba(13, 202, 240, 0.5);
}
.status-blue.active .timeline-badge i { color: #000; }
.status-blue.active .timeline-title { color: #0dcaf0; font-weight: 700; }

.status-orange.active .timeline-badge {
  background: #fd7e14;
  border-color: #fd7e14;
  box-shadow: 0 0 10px rgba(253, 126, 20, 0.5);
}
.status-orange.active .timeline-badge i { color: #fff; }
.status-orange.active .timeline-title { color: #fd7e14; font-weight: 700; }

.status-green.active .timeline-badge {
  background: #198754;
  border-color: #198754;
  box-shadow: 0 0 10px rgba(25, 135, 84, 0.5);
}
.status-green.active .timeline-badge i { color: #fff; }
.status-green.active .timeline-title { color: #198754; font-weight: 700; }

.status-red .timeline-badge {
  background: #dc3545;
  border-color: #dc3545;
}
.status-red .timeline-badge i { color: #fff; }
.status-red .timeline-title { color: #dc3545; }

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
</style>
