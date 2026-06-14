<template>
  <div class="combos-container animate-fade-in">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="mb-1 text-gold fw-bold">
          <i class="bi bi-gift me-2"></i>Gestión de Combos
        </h4>
        <p class="text-secondary mb-0">Configura paquetes promocionales de múltiples productos con precios especiales</p>
      </div>
      <button class="btn-primary-custom btn-sm rounded px-3 py-2 border-0" @click="openModalCreate">
        <i class="bi bi-plus-circle-fill me-1"></i> Crear Combo
      </button>
    </div>

    <!-- Combos Grid -->
    <div class="row g-4">
      <div v-for="c in combos" :key="c.id" class="col-md-6 col-lg-4">
        <div class="stat-card combo-card h-100 d-flex flex-column justify-content-between">
          <div>
            <div class="d-flex justify-content-between align-items-start mb-2">
              <span class="badge bg-gold-trans text-gold" style="font-size: 0.72rem;">Combo #{{ c.codigo }}</span>
              <span class="badge" :class="c.estado ? 'bg-success bg-opacity-20 text-success border border-success-subtle' : 'bg-secondary text-secondary'">
                {{ c.estado ? 'Activo' : 'Inactivo' }}
              </span>
            </div>
            
            <h5 class="text-light fw-bold mb-1">{{ c.nombre }}</h5>
            <p class="text-secondary small mb-3 combo-desc">{{ c.descripcion || 'Sin descripción' }}</p>

            <!-- Components List -->
            <div class="mb-3">
              <div class="text-secondary mb-1 fw-semibold" style="font-size:0.75rem;">Productos en el combo:</div>
              <div class="combo-components-list">
                <div v-if="c.itemsLoading" class="text-secondary small py-2">
                  <i class="bi bi-arrow-repeat animate-spin me-1"></i> Cargando componentes...
                </div>
                <div 
                  v-else 
                  v-for="item in c.items" 
                  :key="item.id" 
                  class="d-flex justify-content-between align-items-center py-1 border-bottom border-gold-trans border-opacity-10"
                >
                  <span class="small text-secondary text-truncate" style="max-width:180px;">
                    {{ item.cantidad }}x {{ item.producto?.nombre }}
                  </span>
                  <span class="small text-secondary">Stock: {{ formatStock(item.producto?.stock, item.producto?.unidadesPorCaja) }}</span>
                </div>
                <div v-if="!c.itemsLoading && (!c.items || c.items.length === 0)" class="text-warning small py-1">
                  ⚠️ No tiene productos asociados.
                </div>
              </div>
            </div>
          </div>

          <div class="pt-3 border-top border-gold-trans">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <small class="text-secondary d-block" style="font-size:0.7rem;">Precio Combo</small>
                <span class="fs-4 fw-bold text-success">Bs. {{ Number(c.precioVenta).toFixed(2) }}</span>
              </div>
              <div>
                <small class="text-secondary d-block" style="font-size:0.7rem;">Stock Combos</small>
                <span class="fw-semibold text-light">{{ c.stock }} unidades</span>
              </div>
            </div>
            
            <div class="d-flex gap-2">
              <button class="btn btn-outline-custom btn-sm flex-grow-1" @click="openModalEdit(c)">
                <i class="bi bi-pencil-square"></i> Editar
              </button>
              <button class="btn btn-outline-danger btn-sm px-2" @click="eliminarCombo(c)">
                <i class="bi bi-trash3"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="combos.length === 0" class="col-12 text-center py-5 text-secondary">
        <i class="bi bi-gift fs-1 d-block mb-2"></i>
        No hay combos creados en este momento. ¡Crea el primero haciendo clic en "Crear Combo"!
      </div>
    </div>

    <!-- Modals -->
    <CreateComboModal ref="createComboModalRef" @success="fetchCombos" />
    <EditComboModal ref="editComboModalRef" @success="fetchCombos" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import http from '@/plugins/axios'
import Swal from 'sweetalert2'
import CreateComboModal from '@/components/CreateComboModal.vue'
import EditComboModal from '@/components/EditComboModal.vue'

// State
const combos = ref<any[]>([])
const loading = ref(false)

const createComboModalRef = ref<InstanceType<typeof CreateComboModal> | null>(null)
const editComboModalRef = ref<InstanceType<typeof EditComboModal> | null>(null)

// Methods
async function fetchCombos() {
  loading.value = true
  try {
    const res = await http.get('productos')
    const prods = res.data
    combos.value = prods.filter((p: any) => p.esCombo)
    
    // Fetch components for each combo asynchronously
    for (const combo of combos.value) {
      combo.itemsLoading = true
      try {
        const itemsRes = await http.get(`productos/${combo.id}/combo-items`)
        combo.items = itemsRes.data
      } catch (err) {
        console.error(`Error loading items for combo ${combo.id}:`, err)
      } finally {
        combo.itemsLoading = false
      }
    }
  } catch (error) {
    console.error('Error loading combos:', error)
  } finally {
    loading.value = false
  }
}

function openModalCreate() {
  createComboModalRef.value?.open()
}

function openModalEdit(combo: any) {
  editComboModalRef.value?.open(combo)
}

async function eliminarCombo(combo: any) {
  const confirm = await Swal.fire({
    title: '¿Eliminar Combo?',
    text: `¿Estás seguro de que deseas eliminar el combo "${combo.nombre}"? Esto no afectará a los productos individuales.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  })
  
  if (!confirm.isConfirmed) return
  
  try {
    await http.delete(`productos/${combo.id}`)
    Swal.fire({ 
      icon: 'success', 
      title: 'Combo Eliminado', 
      text: 'El combo fue eliminado del catálogo.', 
      timer: 1500, 
      showConfirmButton: false 
    })
    await fetchCombos()
  } catch (error: any) {
    Swal.fire({ 
      icon: 'error', 
      title: 'Error', 
      text: error.response?.data?.message || 'No se pudo eliminar el combo.' 
    })
  }
}

function formatStock(stock: number, unidadesPorCaja: number) {
  const totalUnits = Number(stock || 0)
  const factor = Number(unidadesPorCaja || 6)
  const cajas = Math.floor(totalUnits / factor)
  const residuo = totalUnits % factor
  
  if (cajas > 0 && residuo > 0) {
    return `${totalUnits} u (${cajas} c y ${residuo} u)`
  } else if (cajas > 0) {
    return `${totalUnits} u (${cajas} c)`
  } else {
    return `${totalUnits} u`
  }
}

onMounted(() => {
  fetchCombos()
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

.combo-card {
  transition: all 0.25s ease;
  border: 1px solid var(--border-color);
}
.combo-card:hover {
  transform: translateY(-4px);
  border-color: var(--primary);
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.15);
}

.combo-desc {
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.combo-components-list {
  background: rgba(0,0,0,0.1);
  border-radius: 8px;
  padding: 8px;
  max-height: 120px;
  overflow-y: auto;
}

.hover-dark:hover {
  background: rgba(255,255,255,0.05);
}

.btn-xs {
  padding: 2px 6px;
  font-size: 0.72rem;
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
