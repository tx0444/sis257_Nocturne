<template>
  <div class="promociones-view">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4>
        <i class="bi bi-percent me-2" style="color: var(--primary-light);"></i>
        Gestión de Promociones y Descuentos
      </h4>
      <button class="btn btn-primary-custom" @click="openModal()">
        <i class="bi bi-plus-lg me-1"></i> Nueva Promoción
      </button>
    </div>

    <!-- Search box -->
    <div class="search-box mb-3" style="max-width: 350px;">
      <i class="bi bi-search"></i>
      <input type="text" class="form-control" placeholder="Buscar promoción..." v-model="search" />
    </div>

    <!-- Table of Promotions -->
    <div class="table-dark-custom">
      <table class="table table-hover mb-0">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Descuento</th>
            <th>Vigencia</th>
            <th>Productos</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in filtered" :key="item.id">
            <td>{{ i + 1 }}</td>
            <td class="fw-semibold">
              {{ item.nombre }}
              <small class="text-secondary d-block" style="font-size: 0.75rem;">{{ item.descripcion || 'Sin descripción' }}</small>
            </td>
            <td class="fw-bold text-gold">{{ Number(item.descuento) }}% DTO</td>
            <td>
              <div style="font-size: 0.85rem;">
                <span class="text-success"><i class="bi bi-calendar-event me-1"></i>{{ formatDate(item.fechaInicio) }}</span>
                <br />
                <span class="text-danger"><i class="bi bi-calendar-x me-1"></i>{{ formatDate(item.fechaFin) }}</span>
              </div>
            </td>
            <td>
              <span class="badge bg-secondary bg-opacity-25 text-secondary border border-secondary-subtle">
                {{ item.productos?.length || 0 }} productos
              </span>
            </td>
              <span :class="getPromoStatusClass(item)" style="border-radius:6px; font-size:0.72rem; padding:4px 10px; font-weight:700;">
                <i :class="getPromoStatusIcon(item) + ' me-1'"></i>{{ getPromoStatusLabel(item) }}
              </span>
            <td>
              <button class="btn btn-sm btn-outline-info me-1" @click="openModal(item)">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-sm btn-outline-danger" @click="remove(item.id)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
          <tr v-if="filtered.length === 0">
            <td colspan="7" class="text-center text-secondary py-4">No se encontraron promociones</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create/Edit Modal -->
    <teleport to="body">
      <div class="modal fade" id="modalPromocion" tabindex="-1" ref="modalRef">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ editing ? 'Editar' : 'Nueva' }} Promoción</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div class="row g-3">
                <div class="col-md-8">
                  <label class="form-label">Nombre de la Promoción</label>
                  <input class="form-control" v-model="form.nombre" required placeholder="Ej: Black Friday, Descuento Navideño" />
                </div>
                <div class="col-md-4">
                  <label class="form-label">Porcentaje Descuento (%)</label>
                  <input class="form-control" type="number" min="1" max="100" v-model.number="form.descuento" required />
                </div>
                <div class="col-12">
                  <label class="form-label">Descripción</label>
                  <textarea class="form-control" v-model="form.descripcion" rows="2" placeholder="Detalle de la promoción..."></textarea>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Fecha Inicio</label>
                  <input class="form-control" type="datetime-local" v-model="form.fechaInicio" required />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Fecha Fin</label>
                  <input class="form-control" type="datetime-local" v-model="form.fechaFin" required />
                </div>
                <div class="col-12">
                  <div class="form-check form-switch mt-2">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" v-model="form.estado" />
                    <label class="form-check-input-label ms-2 fw-semibold" for="flexSwitchCheckDefault">Estado Activo</label>
                  </div>
                </div>

                <!-- Selection of Products -->
                <div class="col-12 border-top pt-3 mt-3" style="border-color: var(--border-color) !important;">
                  <h6 class="text-gold fw-bold mb-2"><i class="bi bi-box-seam me-1"></i> Productos en Promoción</h6>
                  
                  <div class="input-group mb-2">
                    <span class="input-group-text" style="background-color: var(--bg-dark); border-color: var(--border-color); color: var(--text-secondary);"><i class="bi bi-search"></i></span>
                    <input type="text" class="form-control" placeholder="Buscar licores para agregar..." v-model="productSearch" />
                  </div>

                  <div class="product-selection-list border rounded p-2" style="max-height: 250px; overflow-y: auto; border-color: var(--border-color) !important; background-color: var(--bg-dark);">
                    <div class="row g-2">
                      <div 
                        class="col-md-6" 
                        v-for="p in filteredProducts" 
                        :key="p.id"
                      >
                        <div class="form-check p-2 rounded border d-flex align-items-center gap-2" style="background: var(--bg-card); border-color: var(--border-color) !important;">
                          <input 
                            class="form-check-input ms-1" 
                            type="checkbox" 
                            :id="'prod-check-' + p.id" 
                            :value="p.id" 
                            v-model="form.productoIds" 
                          />
                          <label class="form-check-label ms-1 text-truncate flex-grow-1" :for="'prod-check-' + p.id" style="font-size: 0.88rem; cursor: pointer;">
                            <span class="fw-semibold" style="color: var(--text-primary);">{{ p.nombre }}</span>
                            <span class="text-secondary d-block" style="font-size: 0.75rem;">
                              {{ p.categoria?.nombre }} | Bs. {{ Number(p.precioVenta).toFixed(2) }}
                            </span>
                          </label>
                        </div>
                      </div>
                      <div v-if="filteredProducts.length === 0" class="col-12 text-center py-3 text-secondary">
                        No se encontraron productos coincidentes
                      </div>
                    </div>
                  </div>
                  <small class="text-secondary d-block mt-1">Los productos marcados se venderán con el descuento aplicado durante el periodo de vigencia.</small>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button class="btn btn-primary-custom" @click="save">{{ editing ? 'Actualizar' : 'Guardar' }}</button>
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import http from '@/plugins/axios'
import Swal from 'sweetalert2'
import { Modal } from 'bootstrap'

interface PromocionForm {
  nombre: string
  descripcion: string
  descuento: number
  fechaInicio: string
  fechaFin: string
  estado: boolean
  productoIds: number[]
}

const items = ref<any[]>([])
const products = ref<any[]>([])
const search = ref('')
const productSearch = ref('')
const editing = ref<number | null>(null)
const modalRef = ref<HTMLElement>()
let bsModal: Modal

const form = ref<PromocionForm>({
  nombre: '',
  descripcion: '',
  descuento: 10,
  fechaInicio: '',
  fechaFin: '',
  estado: true,
  productoIds: []
})

const filtered = computed(() => {
  if (!search.value.trim()) return items.value
  const query = search.value.toLowerCase()
  return items.value.filter(i => 
    i.nombre.toLowerCase().includes(query) || 
    (i.descripcion && i.descripcion.toLowerCase().includes(query))
  )
})

const filteredProducts = computed(() => {
  if (!productSearch.value.trim()) return products.value
  const query = productSearch.value.toLowerCase()
  return products.value.filter(p => 
    p.nombre.toLowerCase().includes(query) || 
    p.codigo.toLowerCase().includes(query) ||
    (p.categoria?.nombre && p.categoria.nombre.toLowerCase().includes(query))
  )
})

onMounted(async () => {
  bsModal = new Modal(modalRef.value!)
  await Promise.all([loadPromotions(), loadProducts()])
})

async function loadPromotions() {
  try {
    const res = await http.get('promociones')
    items.value = res.data
  } catch (error) {
    console.error('Error al cargar promociones', error)
  }
}

async function loadProducts() {
  try {
    const res = await http.get('productos')
    products.value = res.data
  } catch (error) {
    console.error('Error al cargar productos', error)
  }
}

function formatDate(dateStr: string) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleString('es-BO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getPromoStatusLabel(promo: any) {
  if (!promo.estado) return 'Inactivo'
  const now = new Date()
  const start = new Date(promo.fechaInicio)
  const end = new Date(promo.fechaFin)
  if (now < start) return 'Programado'
  if (now > end) return 'Expirado'
  return 'ACTIVA'
}

function getPromoStatusIcon(promo: any) {
  const s = getPromoStatusLabel(promo)
  if (s === 'ACTIVA') return 'bi bi-lightning-fill'
  if (s === 'Programado') return 'bi bi-clock'
  if (s === 'Expirado') return 'bi bi-calendar-x'
  return 'bi bi-dash-circle'
}

function getPromoStatusClass(promo: any) {
  const status = getPromoStatusLabel(promo)
  if (status === 'ACTIVA') return 'badge-promo-activa'
  if (status === 'Programado') return 'badge bg-info-trans text-blue fw-bold'
  if (status === 'Expirado') return 'badge bg-danger-trans text-danger fw-bold'
  return 'badge bg-secondary-trans text-secondary'
}

function openModal(item?: any) {
  productSearch.value = ''
  if (item) {
    editing.value = item.id
    
    // Format dates to datetime-local input format (YYYY-MM-DDTHH:MM)
    const startStr = item.fechaInicio ? new Date(item.fechaInicio).toISOString().slice(0, 16) : ''
    const endStr = item.fechaFin ? new Date(item.fechaFin).toISOString().slice(0, 16) : ''

    form.value = {
      nombre: item.nombre,
      descripcion: item.descripcion || '',
      descuento: Number(item.descuento),
      fechaInicio: startStr,
      fechaFin: endStr,
      estado: !!item.estado,
      productoIds: item.productos ? item.productos.map((p: any) => p.id) : []
    }
  } else {
    editing.value = null
    // Set default dates: start now, end in 7 days
    const now = new Date()
    const future = new Date()
    future.setDate(now.getDate() + 7)

    form.value = {
      nombre: '',
      descripcion: '',
      descuento: 10,
      fechaInicio: now.toISOString().slice(0, 16),
      fechaFin: future.toISOString().slice(0, 16),
      estado: true,
      productoIds: []
    }
  }
  bsModal.show()
}

async function save() {
  if (!form.value.nombre.trim()) {
    return Swal.fire({ icon: 'warning', title: 'Campo requerido', text: 'El nombre es obligatorio.' })
  }
  if (!form.value.fechaInicio || !form.value.fechaFin) {
    return Swal.fire({ icon: 'warning', title: 'Campo requerido', text: 'Las fechas de inicio y fin son obligatorias.' })
  }
  if (new Date(form.value.fechaInicio) >= new Date(form.value.fechaFin)) {
    return Swal.fire({ icon: 'warning', title: 'Fechas incorrectas', text: 'La fecha de fin debe ser posterior a la fecha de inicio.' })
  }
  if (form.value.descuento < 1 || form.value.descuento > 100) {
    return Swal.fire({ icon: 'warning', title: 'Descuento inválido', text: 'El descuento debe estar entre 1% y 100%.' })
  }

  try {
    const payload = {
      ...form.value,
      // Convert back to standard ISO string
      fechaInicio: new Date(form.value.fechaInicio).toISOString(),
      fechaFin: new Date(form.value.fechaFin).toISOString()
    }

    if (editing.value) {
      await http.patch(`promociones/${editing.value}`, payload)
    } else {
      await http.post('promociones', payload)
    }
    
    bsModal.hide()
    setTimeout(() => {
      document.querySelectorAll('.modal-backdrop').forEach(el => el.remove())
      document.body.classList.remove('modal-open')
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }, 350)
    await loadPromotions()
    await loadProducts()
    Swal.fire({ icon: 'success', title: editing.value ? 'Actualizado' : 'Creado', timer: 1500, showConfirmButton: false })
  } catch (error: any) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'Error al guardar la promoción.'
    })
  }
}

async function remove(id: number) {
  const result = await Swal.fire({
    title: '¿Eliminar promoción?',
    text: 'Esta acción no se puede deshacer. Los productos relacionados perderán el descuento.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  })

  if (result.isConfirmed) {
    try {
      await http.delete(`promociones/${id}`)
      await loadPromotions()
      await loadProducts()
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false })
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo eliminar la promoción.' })
    }
  }
}
</script>

<style scoped>
.promociones-view {
  animation: fadeIn 0.4s ease-out forwards;
}

.product-selection-list {
  border-color: var(--border-color) !important;
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
  background: rgba(34, 197, 94, 0.1) !important;
}
.bg-info-trans {
  background: rgba(37, 99, 235, 0.1) !important;
}
.bg-danger-trans {
  background: rgba(239, 68, 68, 0.1) !important;
}
.bg-secondary-trans {
  background: rgba(108, 117, 125, 0.1) !important;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
