<template>
  <Teleport to="body">
    <div class="modal fade" id="modalCombo" tabindex="-1" ref="modalEl" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form @submit.prevent="handleSubmit" class="h-100 d-flex flex-column m-0">
          <!-- Modal Header -->
          <div class="modal-header d-flex justify-content-between align-items-center border-bottom border-gold-trans border-opacity-10 px-4 py-3">
            <h5 class="modal-title text-gold fw-bold m-0 d-flex align-items-center gap-2">
              <i class="bi" :class="isEdit ? 'bi-pencil-square' : 'bi-plus-circle-fill'"></i>
              <span>{{ isEdit ? 'Editar Combo' : 'Crear Combo' }}</span>
            </h5>
            <button type="button" class="btn-close-custom" @click="close" aria-label="Close">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="modal-body px-4 py-3">
            <div class="combo-form-grid">
              <!-- Left Column: Combo Info (60%) -->
              <div class="form-info-column">
                <div class="mb-3">
                  <label class="form-label text-secondary small fw-semibold">Nombre del Combo *</label>
                  <input 
                    type="text" 
                    class="combo-input" 
                    v-model="form.nombre" 
                    required 
                    placeholder="Ej: Combo Fiesta Imperial" 
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label text-secondary small fw-semibold">Descripción del Combo</label>
                  <textarea 
                    class="combo-textarea" 
                    v-model="form.descripcion" 
                    placeholder="Ej: Incluye 1 Botella de Ron Flor de Caña + 2 Coca Cola de 2L + Hielo gratis"
                  ></textarea>
                </div>

                <div class="row g-3 mb-3">
                  <div class="col-md-6">
                    <label class="form-label text-secondary small fw-semibold">Código *</label>
                    <input 
                      type="text" 
                      class="combo-input" 
                      v-model="form.codigo" 
                      required 
                      placeholder="Ej: COMB-001" 
                      :disabled="isEdit" 
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label text-secondary small fw-semibold">Precio Combo (Bs.) *</label>
                    <input 
                      type="number" 
                      class="combo-input text-success fw-bold" 
                      v-model.number="form.precioVenta" 
                      min="0" 
                      step="0.5" 
                      required 
                      placeholder="0.00" 
                    />
                  </div>
                </div>

                <div class="row g-3 mb-3">
                  <div class="col-md-6">
                    <label class="form-label text-secondary small fw-semibold">Costo Combo (Compra) *</label>
                    <input 
                      type="number" 
                      class="combo-input" 
                      v-model.number="form.precioCompra" 
                      min="0" 
                      step="0.5" 
                      required 
                      placeholder="0.00" 
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label text-secondary small fw-semibold">Stock Inicial</label>
                    <input 
                      type="number" 
                      class="combo-input" 
                      v-model.number="form.stock" 
                      min="0" 
                      placeholder="0" 
                    />
                  </div>
                </div>

                <div class="row g-3 mb-2">
                  <div class="col-md-6">
                    <label class="form-label text-secondary small fw-semibold">Stock Mínimo</label>
                    <input 
                      type="number" 
                      class="combo-input" 
                      v-model.number="form.stockMinimo" 
                      min="0" 
                      placeholder="2" 
                    />
                  </div>
                  <div class="col-md-6 d-flex align-items-center">
                    <div class="form-check form-switch mt-4 ps-5">
                      <input 
                        class="form-check-input custom-switch" 
                        type="checkbox" 
                        id="estadoCombo" 
                        v-model="form.estado" 
                      />
                      <label class="form-check-label text-light small fw-semibold ms-2" for="estadoCombo">
                        Combo Activo
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Column: Products in Combo (40%) -->
              <div class="form-products-column d-flex flex-column">
                <div class="right-header mb-3">
                  <h6 class="text-gold fw-bold mb-2 d-flex align-items-center">
                    <i class="bi bi-box-seam me-2"></i>
                    <span>Productos del Combo</span>
                  </h6>
                  <p class="text-secondary small mb-3">Añade los productos individuales que conforman este combo.</p>
                  
                  <div class="search-product-box position-relative">
                    <i class="bi bi-search search-icon"></i>
                    <input 
                      type="text" 
                      class="combo-input search-input-padding" 
                      placeholder="Buscar producto por nombre o código..." 
                      v-model="searchQuery"
                      @focus="showAddProductSearch = true"
                    />
                    <button 
                      v-if="searchQuery" 
                      type="button" 
                      class="btn-clear-search" 
                      @click="searchQuery = ''"
                    >
                      <i class="bi bi-x-circle-fill"></i>
                    </button>

                    <!-- Dropdown for search results -->
                    <div v-if="showAddProductSearch && filteredSearchProducts.length > 0" class="search-results-dropdown">
                      <div 
                        v-for="p in filteredSearchProducts" 
                        :key="p.id"
                        class="search-result-item"
                        @click="addComponent(p)"
                      >
                        <div class="result-details">
                          <span class="result-name">{{ p.nombre }}</span>
                          <span class="result-code text-secondary">{{ p.codigo }}</span>
                        </div>
                        <div class="result-meta text-end">
                          <span class="badge bg-gold-trans text-gold">Bs. {{ Number(p.precioVenta).toFixed(2) }}</span>
                          <small class="d-block text-secondary mt-1">Stock: {{ p.stock }} u</small>
                        </div>
                      </div>
                    </div>
                    <div v-else-if="showAddProductSearch && searchQuery.trim() !== ''" class="search-results-dropdown py-3 text-center text-secondary small">
                      No se encontraron productos coincidentes.
                    </div>
                  </div>
                </div>

                <!-- Products list -->
                <div class="selected-components-header text-secondary small fw-bold mb-2">
                  Lista de Componentes ({{ form.items.length }})
                </div>
                
                <div class="selected-components-container flex-grow-1">
                  <div 
                    v-for="(item, idx) in form.items" 
                    :key="item.productoId"
                    class="product-card-item"
                  >
                    <div class="product-card-info">
                      <span class="product-card-name" :title="item.nombre">{{ item.nombre }}</span>
                      <span class="product-card-price">Ref: Bs. {{ Number(item.precioVentaRef).toFixed(2) }}</span>
                    </div>
                    <div class="product-card-actions">
                      <div class="quantity-selector-container">
                        <span class="qty-label text-secondary">Cantidad:</span>
                        <div class="qty-input-wrapper">
                          <button type="button" class="qty-btn" @click="decrementQty(item)" :disabled="item.cantidad <= 1">
                            <i class="bi bi-minus"></i>
                          </button>
                          <input 
                            type="number" 
                            class="qty-input text-center" 
                            v-model.number="item.cantidad" 
                            min="1" 
                            @change="validateQty(item)"
                            required 
                          />
                          <button type="button" class="qty-btn" @click="incrementQty(item)">
                            <i class="bi bi-plus"></i>
                          </button>
                        </div>
                      </div>
                      <button type="button" class="btn-delete-item" @click="removeComponent(idx)" title="Eliminar del combo">
                        <i class="bi bi-trash3-fill"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div v-if="form.items.length === 0" class="empty-components-placeholder">
                    <i class="bi bi-gift fs-1 opacity-50 mb-2 text-gold"></i>
                    <div class="fw-semibold">Sin Productos Aún</div>
                    <div class="text-secondary small mt-1">Busca y agrega productos arriba para armar el combo.</div>
                  </div>
                </div>

                <!-- Summary section -->
                <div v-if="form.items.length > 0" class="combo-summary-box mt-3">
                  <div class="d-flex justify-content-between mb-2">
                    <span class="text-secondary small">Suma Individual:</span>
                    <span class="text-light fw-semibold small">Bs. {{ componentsTotalPrice.toFixed(2) }}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-secondary small">Precio Combo:</span>
                    <span class="text-success fw-bold fs-5">Bs. {{ Number(form.precioVenta || 0).toFixed(2) }}</span>
                  </div>
                  <div v-if="form.precioVenta && componentsTotalPrice > Number(form.precioVenta)" class="saving-badge mt-2">
                    <i class="bi bi-tag-fill me-1"></i> Ahorro de Bs. {{ (componentsTotalPrice - Number(form.precioVenta)).toFixed(2) }} ({{ ((componentsTotalPrice - Number(form.precioVenta)) / componentsTotalPrice * 100).toFixed(0) }}%)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="modal-footer border-top border-gold-trans border-opacity-10 px-4 py-3 d-flex justify-content-end gap-3">
            <button type="button" class="combo-btn combo-btn-secondary" @click="close">
              Cancelar
            </button>
            <button type="submit" class="combo-btn combo-btn-primary" :disabled="saving">
              <span v-if="saving" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              <i v-else class="bi bi-check-circle-fill"></i>
              Guardar Combo
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { Modal } from 'bootstrap'
import http from '@/plugins/axios'
import Swal from 'sweetalert2'

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['save', 'close'])

const modalEl = ref<HTMLElement | null>(null)
let modalInstance: Modal | null = null

const form = ref({
  id: null as number | null,
  nombre: '',
  descripcion: '',
  codigo: '',
  precioVenta: '' as number | '',
  precioCompra: '' as number | '',
  stock: 20,
  stockMinimo: 2,
  estado: true,
  items: [] as { productoId: number; nombre: string; cantidad: number; precioVentaRef: number }[]
})

const allProducts = ref<any[]>([])
const searchQuery = ref('')
const showAddProductSearch = ref(false)
const saving = ref(false)

// Computed property to calculate total individual price
const componentsTotalPrice = computed(() => {
  return form.value.items.reduce((sum, item) => sum + (item.cantidad * item.precioVentaRef), 0)
})

// Filter search products
const filteredSearchProducts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) {
    return allProducts.value.filter(p => !p.esCombo).slice(0, 5)
  }
  return allProducts.value.filter(p => 
    !p.esCombo && 
    (p.nombre.toLowerCase().includes(query) || 
     p.codigo.toLowerCase().includes(query))
  )
})

// Click outside handling for product search dropdown
function handleDocumentClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (target && !target.closest('.search-product-box')) {
    showAddProductSearch.value = false
  }
}

// Fetch all products to act as options
async function fetchAllProducts() {
  try {
    const res = await http.get('productos')
    allProducts.value = res.data
  } catch (error) {
    console.error('Error fetching products inside combo modal:', error)
  }
}

// Form methods
function incrementQty(item: any) {
  item.cantidad++
}

function decrementQty(item: any) {
  if (item.cantidad > 1) {
    item.cantidad--
  }
}

function validateQty(item: any) {
  if (typeof item.cantidad !== 'number' || isNaN(item.cantidad) || item.cantidad < 1) {
    item.cantidad = 1
  } else {
    item.cantidad = Math.floor(item.cantidad)
  }
}

function addComponent(p: any) {
  const exists = form.value.items.find(i => i.productoId === p.id)
  if (exists) {
    exists.cantidad++
  } else {
    form.value.items.push({
      productoId: p.id,
      nombre: p.nombre,
      cantidad: 1,
      precioVentaRef: Number(p.precioVenta)
    })
  }
  searchQuery.value = ''
  showAddProductSearch.value = false
}

function removeComponent(idx: number) {
  form.value.items.splice(idx, 1)
}

// Modal open/close actions
async function open(comboData?: any) {
  showAddProductSearch.value = false
  searchQuery.value = ''
  
  if (comboData) {
    form.value = {
      id: comboData.id,
      nombre: comboData.nombre,
      descripcion: comboData.descripcion || '',
      codigo: comboData.codigo,
      precioVenta: Number(comboData.precioVenta),
      precioCompra: Number(comboData.precioCompra),
      stock: comboData.stock,
      stockMinimo: comboData.stockMinimo,
      estado: comboData.estado,
      items: []
    }
    
    try {
      const res = await http.get(`productos/${comboData.id}/combo-items`)
      form.value.items = res.data.map((i: any) => ({
        productoId: i.productoId,
        nombre: i.producto?.nombre || 'Producto Componente',
        cantidad: i.cantidad,
        precioVentaRef: Number(i.producto?.precioVenta || 0)
      }))
    } catch (err) {
      console.error('Error loading combo items:', err)
    }
  } else {
    form.value = {
      id: null,
      nombre: '',
      descripcion: '',
      codigo: '',
      precioVenta: '',
      precioCompra: '',
      stock: 20,
      stockMinimo: 2,
      estado: true,
      items: []
    }
  }
  
  // Refetch products list to ensure sync with stock/new items
  await fetchAllProducts()
  
  modalInstance?.show()
}

function close() {
  modalInstance?.hide()
}

function cleanupBackdrop() {
  const backdrops = document.querySelectorAll('.modal-backdrop')
  backdrops.forEach(el => el.remove())
  document.body.classList.remove('modal-open')
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

// Save trigger
async function handleSubmit() {
  if (form.value.items.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Combo vacío',
      text: 'Debes agregar al menos un producto al combo.'
    })
    return
  }

  const firstItem = form.value.items[0]
  const firstProduct = allProducts.value.find(p => p.id === firstItem.productoId)
  
  const payload = {
    nombre: form.value.nombre,
    descripcion: form.value.descripcion,
    codigo: form.value.codigo,
    precioVenta: Number(form.value.precioVenta),
    precioCompra: Number(form.value.precioCompra),
    stock: form.value.stock,
    stockMinimo: form.value.stockMinimo,
    estado: form.value.estado,
    esCombo: true,
    categoriaId: firstProduct?.categoriaId || null,
    marcaId: firstProduct?.marcaId || null,
    proveedorId: firstProduct?.proveedorId || null,
    items: form.value.items.map(i => ({ productoId: i.productoId, cantidad: i.cantidad }))
  }

  saving.value = true
  emit('save', {
    id: form.value.id,
    payload,
    done: () => {
      saving.value = false
      close()
    },
    fail: () => {
      saving.value = false
    }
  })
}

onMounted(() => {
  if (modalEl.value) {
    modalInstance = new Modal(modalEl.value, {
      backdrop: 'static',
      keyboard: true
    })
    modalEl.value.addEventListener('hidden.bs.modal', cleanupBackdrop)
  }
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  if (modalEl.value) {
    modalEl.value.removeEventListener('hidden.bs.modal', cleanupBackdrop)
  }
  document.removeEventListener('click', handleDocumentClick)
})

defineExpose({
  open,
  close
})
</script>

<style scoped>
.text-gold {
  color: var(--primary) !important;
}

.border-gold-trans {
  border-color: rgba(212, 175, 55, 0.2) !important;
}

/* Modal styling overrides to lock view in screen and verify z-index/opacity */
.modal {
  z-index: 1050 !important;
  opacity: 1 !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  filter: none !important;
}

.modal-dialog {
  max-width: 950px;
  width: 90%;
  margin: 1.75rem auto;
  z-index: 1055 !important;
}

.modal-content {
  background-color: #121212 !important; /* solid corporate black background */
  border: 1px solid var(--primary) !important; /* corporate gold border */
  border-radius: 16px !important;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.65) !important; /* premium depth shadow */
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 1 !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  filter: none !important;
}

.modal-body {
  overflow-y: auto;
  flex: 1;
}

/* Base close button */
.btn-close-custom {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 1.25rem;
  cursor: pointer;
  transition: color 0.2s, transform 0.2s;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-close-custom:hover {
  color: #ffffff;
  transform: scale(1.1);
}

/* Grid layout rules */
.combo-form-grid {
  display: grid;
  grid-template-columns: 60% 40%;
  gap: 24px;
}

@media (max-width: 992px) {
  .combo-form-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

/* Premium Inputs and Textarea styling */
.combo-input {
  height: 48px !important;
  border-radius: 12px !important;
  padding: 12px 16px !important;
  font-size: 14px !important;
  width: 100% !important;
  background-color: var(--bg-input) !important;
  border: 1px solid var(--border-color) !important;
  color: var(--text-primary) !important;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.combo-input:focus {
  border-color: var(--primary) !important;
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15) !important;
  outline: none;
}

.combo-textarea {
  min-height: 120px !important;
  resize: vertical !important;
  border-radius: 12px !important;
  padding: 12px 16px !important;
  font-size: 14px !important;
  width: 100% !important;
  background-color: var(--bg-input) !important;
  border: 1px solid var(--border-color) !important;
  color: var(--text-primary) !important;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.combo-textarea:focus {
  border-color: var(--primary) !important;
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15) !important;
  outline: none;
}

/* Custom Bootstrap switch styles */
.custom-switch {
  cursor: pointer;
  width: 2.8em !important;
  height: 1.4em !important;
  background-color: var(--bg-input) !important;
  border-color: var(--border-color) !important;
}

.custom-switch:checked {
  background-color: var(--primary) !important;
  border-color: var(--primary) !important;
}

/* Component cards list */
.selected-components-container {
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  padding: 12px;
  min-height: 180px;
  max-height: 250px;
  overflow-y: auto;
}

.product-card-item {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: border-color 0.2s, background-color 0.2s;
}

.product-card-item:hover {
  border-color: rgba(212, 175, 55, 0.3);
  background: rgba(255, 255, 255, 0.04);
}

.product-card-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.product-card-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
}

.product-card-price {
  font-size: 11px;
  color: var(--text-secondary);
  white-space: nowrap;
}

.product-card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  padding-top: 8px;
  margin-top: 4px;
}

.quantity-selector-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.qty-label {
  font-size: 11px;
}

.qty-input-wrapper {
  display: flex;
  align-items: center;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  height: 32px;
}

.qty-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  width: 28px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s, color 0.2s;
}

.qty-btn:hover:not(:disabled) {
  background-color: var(--bg-hover);
  color: #ffffff;
}

.qty-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.qty-input {
  background: transparent;
  border: none;
  color: var(--text-primary);
  width: 36px;
  height: 100%;
  font-size: 13px;
  font-weight: 600;
  -moz-appearance: textfield;
}

.qty-input::-webkit-outer-spin-button,
.qty-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.btn-delete-item {
  background: transparent;
  border: none;
  color: var(--danger);
  cursor: pointer;
  transition: color 0.2s, transform 0.2s;
  padding: 6px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-delete-item:hover {
  color: #ff6b6b;
  background-color: rgba(239, 68, 68, 0.1);
  transform: scale(1.05);
}

.empty-components-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 150px;
  text-align: center;
  color: var(--text-secondary);
}

/* Real-time search design */
.search-input-padding {
  padding-left: 40px !important;
  padding-right: 40px !important;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  font-size: 14px;
}

.btn-clear-search {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 14px;
  padding: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.btn-clear-search:hover {
  color: #ffffff;
}

.search-results-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  max-height: 180px;
  overflow-y: auto;
  z-index: 1060;
  box-shadow: 0 8px 24px rgba(0,0,0,0.5);
  padding: 6px 0;
}

.search-result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.search-result-item:hover {
  background-color: var(--bg-hover);
}

.result-details {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.result-name {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.result-code {
  font-size: 11px;
}

.result-meta {
  flex-shrink: 0;
}

.bg-gold-trans {
  background: rgba(212, 175, 55, 0.1);
}

/* Summary Box */
.combo-summary-box {
  background: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  padding: 12px 16px;
}

.saving-badge {
  background-color: rgba(34, 197, 94, 0.12);
  color: var(--success);
  font-size: 11px;
  font-weight: 600;
  border-radius: 8px;
  padding: 6px 12px;
  display: inline-flex;
  align-items: center;
}

/* Premium buttons styling */
.combo-btn {
  height: 44px !important;
  min-width: 140px !important;
  border-radius: 12px !important;
  font-weight: 600 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  padding: 0 16px !important;
  font-size: 14px !important;
  transition: all 0.2s ease;
}

.combo-btn-primary {
  background-color: var(--primary) !important;
  color: #000000 !important;
  border: none !important;
}

.combo-btn-primary:hover {
  background-color: var(--primary-hover) !important;
  transform: translateY(-1px);
}

.combo-btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.combo-btn-secondary {
  background-color: transparent !important;
  color: var(--text-secondary) !important;
  border: 1px solid var(--border-color) !important;
}

.combo-btn-secondary:hover {
  color: #ffffff !important;
  border-color: var(--text-secondary) !important;
  background-color: rgba(255, 255, 255, 0.05) !important;
}
</style>
