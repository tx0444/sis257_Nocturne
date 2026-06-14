<template>
  <div class="caja-container animate-fade-in">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="mb-1 text-gold fw-bold">
          <i class="bi bi-cash-coin me-2"></i>Gestión de Caja (Arqueo)
        </h4>
        <p class="text-secondary mb-0">Control de apertura, transacciones y arqueo de turnos</p>
      </div>
      <button class="btn btn-outline-custom btn-sm" @click="checkActiveCaja" :disabled="loading">
        <i class="bi" :class="loading ? 'bi-arrow-repeat animate-spin' : 'bi-arrow-clockwise'"></i> Actualizar
      </button>
    </div>

    <div class="row g-4">
      <!-- Left: Active Shift Operations -->
      <div class="col-lg-5">
        <!-- Status Closed: Opening Form -->
        <div v-if="!activeCaja" class="stat-card">
          <h5 class="text-gold mb-3 fw-bold"><i class="bi bi-door-closed me-2"></i>Caja Cerrada</h5>
          <p class="text-secondary small mb-4">No tienes un turno de caja activo. Ingresa el monto en efectivo con el que inicias operaciones para abrir la caja.</p>
          
          <form @submit.prevent="abrirCaja">
            <div class="mb-3">
              <label class="form-label text-secondary">Monto Inicial en Efectivo (Bs.) *</label>
              <div class="input-group">
                <span class="input-group-text border-secondary bg-transparent text-secondary">Bs.</span>
                <input 
                  type="number" 
                  class="form-control text-light bg-dark-card border-secondary fs-5" 
                  v-model.number="formAbrir.montoInicial" 
                  min="0" 
                  step="0.5" 
                  required 
                  placeholder="0.00"
                />
              </div>
            </div>
            <button type="submit" class="btn-primary-custom w-100 py-2 rounded" :disabled="submitting">
              <span v-if="submitting"><i class="bi bi-arrow-repeat animate-spin me-1"></i> Abriendo...</span>
              <span v-else><i class="bi bi-door-open-fill me-1"></i> Abrir Turno de Caja</span>
            </button>
          </form>
        </div>

        <!-- Status Open: Summary & Closing Form -->
        <div v-else class="stat-card">
          <div class="d-flex justify-content-between align-items-center mb-3 border-bottom border-gold-trans pb-2">
            <h5 class="text-success mb-0 fw-bold"><i class="bi bi-door-open-fill me-2"></i>Caja Abierta</h5>
            <span class="badge bg-success bg-opacity-20 text-success border border-success-subtle">Activa</span>
          </div>

          <div class="glass-card p-3 mb-4" style="background: rgba(0,0,0,0.15);">
            <div class="d-flex flex-column gap-2 small">
              <div class="d-flex justify-content-between">
                <span class="text-secondary">Cajero:</span>
                <span class="text-light fw-semibold">{{ authStore.user?.nombre }} {{ authStore.user?.apellido }}</span>
              </div>
              <div class="d-flex justify-content-between">
                <span class="text-secondary">Apertura:</span>
                <span class="text-light">{{ formatDate(activeCaja.fechaApertura) }}</span>
              </div>
              <div class="d-flex justify-content-between">
                <span class="text-secondary">Efectivo Inicial:</span>
                <span class="text-gold fw-bold">Bs. {{ Number(activeCaja.montoInicial).toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <!-- Real-Time Metrics -->
          <h6 class="text-gold mb-3 fw-bold"><i class="bi bi-bar-chart-line me-1"></i>Resumen de Ventas del Turno</h6>
          <div class="d-flex flex-column gap-3 mb-4">
            <div class="d-flex justify-content-between align-items-center p-2 rounded" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color);">
              <div class="small text-secondary">Ventas Efectivo:</div>
              <div class="fw-bold text-light">Bs. {{ resumenActual.ventasEfectivo.toFixed(2) }}</div>
            </div>
            <div class="d-flex justify-content-between align-items-center p-2 rounded" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color);">
              <div class="small text-secondary">Ventas QR (Digital):</div>
              <div class="fw-bold text-light">Bs. {{ resumenActual.ventasQr.toFixed(2) }}</div>
            </div>
            <div class="d-flex justify-content-between align-items-center p-2 rounded" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color);">
              <div class="small text-secondary">Ventas Tarjeta:</div>
              <div class="fw-bold text-light">Bs. {{ resumenActual.ventasTarjeta.toFixed(2) }}</div>
            </div>
            <div class="d-flex justify-content-between align-items-center p-2 rounded border border-success-subtle bg-success bg-opacity-10">
              <div class="small text-success fw-bold">Total Esperado en Efectivo:</div>
              <div class="fw-extrabold text-success fs-5">Bs. {{ totalEfectivoEsperado.toFixed(2) }}</div>
            </div>
            <small class="text-secondary block" style="font-size:0.75rem;">* Total Esperado en Efectivo = Monto Inicial + Ventas en Efectivo.</small>
          </div>

          <!-- Closing Box Shift -->
          <h6 class="text-gold mb-3 fw-bold"><i class="bi bi-calculator me-1"></i>Cierre de Caja (Arqueo)</h6>
          <form @submit.prevent="cerrarCaja">
            <div class="mb-3">
              <label class="form-label text-secondary">Monto Real en Físico (Efectivo en Mano) *</label>
              <div class="input-group">
                <span class="input-group-text border-secondary bg-transparent text-secondary">Bs.</span>
                <input 
                  type="number" 
                  class="form-control text-light bg-dark-card border-secondary fs-5" 
                  v-model.number="formCerrar.montoFinal" 
                  min="0" 
                  step="0.5" 
                  required 
                  placeholder="Cuenta el efectivo en caja..."
                />
              </div>
            </div>

            <!-- Pre-calculate Difference Visually -->
            <div v-if="formCerrar.montoFinal !== ''" class="p-3 rounded mb-3 border text-center" :class="diferenciaCalculada === 0 ? 'bg-success bg-opacity-10 border-success' : diferenciaCalculada > 0 ? 'bg-info bg-opacity-10 border-info' : 'bg-danger bg-opacity-10 border-danger'">
              <div class="small text-secondary mb-1">Diferencia de Arqueo:</div>
              <div class="fs-4 fw-extrabold" :class="diferenciaCalculada === 0 ? 'text-success' : diferenciaCalculada > 0 ? 'text-info' : 'text-danger'">
                Bs. {{ diferenciaCalculada.toFixed(2) }}
              </div>
              <small class="d-block mt-1 text-secondary" style="font-size:0.75rem;">
                <span v-if="diferenciaCalculada === 0">✓ Caja cuadra perfectamente.</span>
                <span v-else-if="diferenciaCalculada > 0">Sobran Bs. {{ diferenciaCalculada.toFixed(2) }}</span>
                <span v-else>Faltan Bs. {{ Math.abs(diferenciaCalculada).toFixed(2) }}</span>
              </small>
            </div>

            <button type="submit" class="btn btn-danger w-100 py-2 rounded" :disabled="submitting">
              <span v-if="submitting"><i class="bi bi-arrow-repeat animate-spin me-1"></i> Procesando...</span>
              <span v-else><i class="bi bi-door-closed-fill me-1"></i> Realizar Cierre & Arqueo</span>
            </button>
          </form>
        </div>
      </div>

      <!-- Right: Shift History -->
      <div class="col-lg-7">
        <div class="table-dark-custom">
          <div class="p-3 bg-dark-card border-bottom border-gold-trans d-flex justify-content-between align-items-center">
            <h6 class="mb-0 text-light">Historial de Turnos de Caja</h6>
            <span class="badge bg-gold-trans text-gold">Historial</span>
          </div>

          <div class="table-responsive" style="max-height: 480px;">
            <table class="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Cajero</th>
                  <th>Apertura</th>
                  <th>Cierre</th>
                  <th>Inicial</th>
                  <th>Final</th>
                  <th>Efectivo/QR/Card</th>
                  <th>Diferencia</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="c in cajasHistory" :key="c.id">
                  <td>
                    <div class="fw-semibold text-light">{{ c.usuario?.nombre }}</div>
                    <small class="text-secondary">ID #{{ c.id }}</small>
                  </td>
                  <td><small>{{ formatDateShort(c.fechaApertura) }}</small></td>
                  <td><small>{{ c.fechaCierre ? formatDateShort(c.fechaCierre) : 'Abierta' }}</small></td>
                  <td>Bs. {{ Number(c.montoInicial).toFixed(2) }}</td>
                  <td>{{ c.montoFinal !== null ? `Bs. ${Number(c.montoFinal).toFixed(2)}` : '—' }}</td>
                  <td>
                    <div style="font-size: 0.72rem; line-height: 1.2;">
                      <span class="text-success">Ef: Bs. {{ Number(c.ventasEfectivo).toFixed(2) }}</span><br>
                      <span class="text-info">QR: Bs. {{ Number(c.ventasQr).toFixed(2) }}</span><br>
                      <span class="text-primary-light">Tj: Bs. {{ Number(c.ventasTarjeta).toFixed(2) }}</span>
                    </div>
                  </td>
                  <td>
                    <span 
                      v-if="c.estado === 'Cerrada'" 
                      class="badge px-2 py-1"
                      :class="Number(c.diferencia) === 0 ? 'bg-success' : Number(c.diferencia) > 0 ? 'bg-info' : 'bg-danger'"
                    >
                      Bs. {{ Number(c.diferencia).toFixed(2) }}
                    </span>
                    <span v-else class="text-success small">Abierta</span>
                  </td>
                </tr>
                <tr v-if="!authStore.isAdmin">
                  <td colspan="7" class="text-center py-5 text-secondary">
                    <i class="bi bi-lock-fill fs-1 d-block mb-2 text-gold"></i>
                    Historial disponible solo para administradores.
                  </td>
                </tr>
                <tr v-else-if="cajasHistory.length === 0">
                  <td colspan="7" class="text-center py-5 text-secondary">
                    <i class="bi bi-journal-x fs-1 d-block mb-2"></i>
                    No hay registros de caja anteriores.
                  </td>
                </tr>
              </tbody>
            </table>
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
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// State
const activeCaja = ref<any>(null)
const loading = ref(false)
const submitting = ref(false)
const cajasHistory = ref<any[]>([])

const resumenActual = ref({
  ventasEfectivo: 0,
  ventasQr: 0,
  ventasTarjeta: 0,
  totalVentas: 0
})

const formAbrir = ref({
  montoInicial: '' as number | ''
})

const formCerrar = ref({
  montoFinal: '' as number | ''
})

// Computed values
const totalEfectivoEsperado = computed(() => {
  if (!activeCaja.value) return 0
  return Number(activeCaja.value.montoInicial) + resumenActual.value.ventasEfectivo
})

const diferenciaCalculada = computed(() => {
  const final = Number(formCerrar.value.montoFinal) || 0
  return final - totalEfectivoEsperado.value
})

// Methods
async function checkActiveCaja() {
  loading.value = true
  try {
    const res = await http.get('cajas/active')
    activeCaja.value = res.data

    if (activeCaja.value) {
      const resResumen = await http.get('cajas/active/resumen')
      resumenActual.value = resResumen.data
    } else {
      resumenActual.value = { ventasEfectivo: 0, ventasQr: 0, ventasTarjeta: 0, totalVentas: 0 }
    }
    await fetchHistory()
  } catch (error) {
    console.error('Error checking active caja:', error)
  } finally {
    loading.value = false
  }
}

async function fetchHistory() {
  if (!authStore.isAdmin) return
  try {
    const res = await http.get('cajas')
    cajasHistory.value = res.data
  } catch (error) {
    console.error('Error fetching cajas history:', error)
  }
}

async function abrirCaja() {
  if (formAbrir.value.montoInicial === '') return
  submitting.value = true
  try {
    const res = await http.post('cajas/abrir', {
      montoInicial: Number(formAbrir.value.montoInicial)
    })
    
    Swal.fire({
      icon: 'success',
      title: '¡Caja Abierta!',
      text: `Operación iniciada con Bs. ${Number(formAbrir.value.montoInicial).toFixed(2)}`,
      timer: 1800,
      showConfirmButton: false
    })

    formAbrir.value.montoInicial = ''
    await checkActiveCaja()
  } catch (error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'No se pudo abrir la caja.'
    })
  } finally {
    submitting.value = false
  }
}

async function cerrarCaja() {
  if (formCerrar.value.montoFinal === '') return
  
  const confirm = await Swal.fire({
    title: '¿Confirmar Arqueo & Cierre?',
    text: `Se registrará un arqueo final en físico de Bs. ${Number(formCerrar.value.montoFinal).toFixed(2)}. Diferencia: Bs. ${diferenciaCalculada.value.toFixed(2)}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, cerrar caja',
    cancelButtonText: 'No, revisar'
  })
  
  if (!confirm.isConfirmed) return

  submitting.value = true
  try {
    await http.post('cajas/cerrar', {
      montoFinal: Number(formCerrar.value.montoFinal)
    })
    
    Swal.fire({
      icon: 'success',
      title: '¡Caja Cerrada Exitosamente!',
      html: `<strong>Arqueo finalizado.</strong><br>Diferencia registrada: Bs. ${diferenciaCalculada.value.toFixed(2)}`,
      timer: 3000,
      showConfirmButton: true
    })

    formCerrar.value.montoFinal = ''
    await checkActiveCaja()
  } catch (error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'No se pudo cerrar la caja.'
    })
  } finally {
    submitting.value = false
  }
}

// Helpers
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('es-BO', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

function formatDateShort(dateStr: string) {
  return new Date(dateStr).toLocaleString('es-BO', {
    day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
  })
}

onMounted(() => {
  checkActiveCaja()
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
.fw-extrabold {
  font-weight: 800;
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
</style>
