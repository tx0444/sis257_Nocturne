<template>
  <div class="auditoria-container animate-fade-in">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="mb-1 text-gold fw-bold">
          <i class="bi bi-journal-text me-2"></i>Auditoría (Bitácora del Sistema)
        </h4>
        <p class="text-secondary mb-0">Monitoreo de creación, edición y eliminación en Ventas y Clientes</p>
      </div>
      <button class="btn btn-outline-custom btn-sm" @click="fetchLogs" :disabled="loading">
        <i class="bi" :class="loading ? 'bi-arrow-repeat animate-spin' : 'bi-arrow-clockwise'"></i> Actualizar
      </button>
    </div>

    <!-- Filters Section -->
    <div class="glass-card mb-4 p-3">
      <div class="row g-3">
        <!-- Text Search -->
        <div class="col-md-4">
          <label class="form-label">Buscar en Detalle o Usuario</label>
          <div class="search-box">
            <i class="bi bi-search"></i>
            <input 
              type="text" 
              class="form-control" 
              placeholder="Nombre, usuario, código, total..." 
              v-model="filters.search" 
            />
          </div>
        </div>

        <!-- Filter by Module (Tabla) -->
        <div class="col-md-3">
          <label class="form-label">Módulo / Tabla</label>
          <select class="form-select" v-model="filters.tabla">
            <option value="">Todos los módulos</option>
            <option value="VENTAS">Ventas</option>
            <option value="CLIENTES">Clientes</option>
          </select>
        </div>

        <!-- Filter by Action -->
        <div class="col-md-3">
          <label class="form-label">Acción / Operación</label>
          <select class="form-select" v-model="filters.accion">
            <option value="">Todas las operaciones</option>
            <option value="CREAR">Creación (CREAR)</option>
            <option value="EDITAR">Modificación (EDITAR)</option>
            <option value="ELIMINAR">Eliminación (ELIMINAR)</option>
          </select>
        </div>

        <!-- Clear Button -->
        <div class="col-md-2 d-flex align-items-end">
          <button class="btn btn-outline-danger w-100 py-2" @click="resetFilters">
            <i class="bi bi-eraser-fill me-1"></i> Limpiar
          </button>
        </div>
      </div>
    </div>

    <!-- Logs Table -->
    <div class="table-dark-custom">
      <div class="p-3 bg-dark-card border-bottom border-gold-trans d-flex justify-content-between align-items-center">
        <h6 class="mb-0 text-light">
          Registros Encontrados: <strong class="text-gold">{{ filteredLogs.length }}</strong>
        </h6>
        <span class="badge bg-gold-trans text-gold" style="font-size: 0.72rem;">Solo lectura</span>
      </div>
      
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th>Fecha y Hora</th>
              <th>Vendedor / Ejecutor</th>
              <th>Operación</th>
              <th>Módulo</th>
              <th>ID Reg.</th>
              <th>Detalle del Registro</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in paginatedLogs" :key="log.id">
              <td class="text-nowrap">{{ formatDate(log.fechaCreacion) }}</td>
              <td class="fw-semibold text-light">
                <i class="bi bi-person-badge text-gold me-2"></i>{{ log.usuarioNombre }}
              </td>
              <td>
                <span class="badge font-weight-bold text-uppercase px-3 py-1" :class="getActionBadgeClass(log.accion)">
                  {{ log.accion }}
                </span>
              </td>
              <td>
                <span class="badge bg-secondary bg-opacity-20 text-light border border-secondary-subtle px-2 py-1">
                  {{ log.tabla }}
                </span>
              </td>
              <td><code>#{{ log.registroId }}</code></td>
              <td class="text-secondary log-detail-text">{{ log.detalle }}</td>
            </tr>
            <tr v-if="filteredLogs.length === 0">
              <td colspan="6" class="text-center text-secondary py-5">
                <i class="bi bi-file-earmark-bar-graph fs-2 d-block mb-2"></i>
                No se encontraron registros de auditoría que coincidan con los filtros.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div class="p-3 border-top border-gold-trans d-flex flex-wrap justify-content-between align-items-center gap-2" v-if="filteredLogs.length > 0">
        <small class="text-secondary">
          Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredLogs.length) }} de {{ filteredLogs.length }}
        </small>
        
        <nav>
          <ul class="pagination pagination-sm mb-0">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" href="#" @click.prevent="currentPage--">Anterior</a>
            </li>
            <li 
              class="page-item" 
              v-for="page in totalPages" 
              :key="page" 
              :class="{ active: currentPage === page }"
            >
              <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }">
              <a class="page-link" href="#" @click.prevent="currentPage++">Siguiente</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import http from '@/plugins/axios'

interface AuditLog {
  id: number
  fechaCreacion: string
  usuarioNombre: string
  accion: 'CREAR' | 'EDITAR' | 'ELIMINAR'
  tabla: 'VENTAS' | 'CLIENTES'
  registroId: number
  detalle: string
}

const logs = ref<AuditLog[]>([])
const loading = ref(false)
const currentPage = ref(1)
const itemsPerPage = ref(15)

const filters = ref({
  search: '',
  tabla: '',
  accion: ''
})

async function fetchLogs() {
  loading.value = true
  try {
    const res = await http.get('auditorias')
    logs.value = res.data
    currentPage.value = 1
  } catch (error) {
    console.error('Error fetching audit logs:', error)
  } finally {
    loading.value = false
  }
}

function resetFilters() {
  filters.value = {
    search: '',
    tabla: '',
    accion: ''
  }
  currentPage.value = 1
}

const filteredLogs = computed(() => {
  return logs.value.filter(log => {
    const matchesTabla = !filters.value.tabla || log.tabla === filters.value.tabla
    const matchesAccion = !filters.value.accion || log.accion === filters.value.accion
    
    const query = filters.value.search.toLowerCase()
    const matchesSearch = !query || 
      log.usuarioNombre.toLowerCase().includes(query) ||
      log.detalle.toLowerCase().includes(query) ||
      String(log.registroId).includes(query) ||
      log.accion.toLowerCase().includes(query)
      
    return matchesTabla && matchesAccion && matchesSearch
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredLogs.value.length / itemsPerPage.value) || 1
})

const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredLogs.value.slice(start, end)
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('es-BO', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

function getActionBadgeClass(action: string) {
  switch (action) {
    case 'CREAR':
      return 'bg-success bg-opacity-20 text-success border border-success-subtle'
    case 'EDITAR':
      return 'bg-warning bg-opacity-20 text-warning border border-warning-subtle'
    case 'ELIMINAR':
      return 'bg-danger bg-opacity-20 text-danger border border-danger-subtle'
    default:
      return 'bg-secondary bg-opacity-20 text-secondary'
  }
}

onMounted(() => {
  fetchLogs()
})
</script>

<style scoped>
.text-gold {
  color: var(--primary) !important;
}
.border-gold-trans {
  border-color: rgba(212, 175, 55, 0.2) !important;
}

.glass-card {
  background: rgba(22, 22, 22, 0.8);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  backdrop-filter: blur(12px);
}

.btn-outline-custom {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  border-radius: 8px;
  transition: all 0.2s ease;
}
.btn-outline-custom:hover {
  background: rgba(212, 175, 55, 0.08);
  border-color: var(--primary);
  color: var(--primary-light);
}

.bg-dark-card {
  background-color: rgba(10, 10, 10, 0.4);
}

.log-detail-text {
  font-family: inherit;
  font-size: 0.85rem;
  max-width: 450px;
  white-space: normal;
  word-break: break-word;
}

/* Pagination Overrides */
.pagination {
  gap: 4px;
}
.page-link {
  background-color: var(--bg-card) !important;
  border-color: var(--border-color) !important;
  color: var(--text-secondary) !important;
  border-radius: 6px;
  padding: 0.35rem 0.75rem;
}
.page-link:hover {
  background-color: rgba(212, 175, 55, 0.1) !important;
  border-color: var(--primary) !important;
  color: var(--primary-light) !important;
}
.page-item.active .page-link {
  background: linear-gradient(135deg, var(--primary) 0%, #b89321 100%) !important;
  border-color: var(--primary) !important;
  color: #fff !important;
}
.page-item.disabled .page-link {
  opacity: 0.4;
  cursor: not-allowed;
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-spin {
  animation: spin 1.2s linear infinite;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
