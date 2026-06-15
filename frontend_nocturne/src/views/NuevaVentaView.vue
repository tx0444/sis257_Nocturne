<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="mb-0" style="font-family:'Outfit',sans-serif; font-weight:800;">
          <i class="bi bi-cart-plus-fill me-2" style="color:var(--success);"></i>Nueva Venta
        </h4>
        <small class="text-secondary">Registrar una nueva transacción</small>
      </div>
      <router-link to="/admin/ventas" class="btn btn-sm" style="border:1px solid var(--border-color); color:var(--text-secondary); border-radius:8px;">
        <i class="bi bi-arrow-left me-1"></i> Volver
      </router-link>
    </div>

    <div class="row g-4">
      <!-- Left: Product selector + Client -->
      <div class="col-md-7">
        <!-- Cliente -->
        <div class="stat-card mb-3">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h6 class="mb-0 text-gold"><i class="bi bi-person-fill me-2"></i>Cliente</h6>
            <div class="form-check form-switch mb-0">
              <input class="form-check-input" type="checkbox" id="sinCliente" v-model="sinCliente" style="cursor:pointer;" />
              <label class="form-check-label text-secondary" for="sinCliente" style="font-size:0.8rem; cursor:pointer;">
                Cliente Ocasional
              </label>
            </div>
          </div>

          <div v-if="!sinCliente">
            <!-- Búsqueda en tiempo real -->
            <div class="d-flex gap-2 mb-2">
              <div class="search-box flex-grow-1 mb-0">
                <i class="bi bi-search"></i>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Buscar por nombre, apellido, teléfono o CI..."
                  v-model="clienteQuery"
                  @input="buscarCliente"
                />
              </div>
              <button type="button" class="btn btn-sm" style="border:1px solid var(--border-color); color:var(--primary); border-radius:8px; display:inline-flex; align-items:center; gap:0.25rem; background:rgba(212,175,55,0.05);" @click="openModalCliente">
                <i class="bi bi-person-plus-fill"></i>
                <span>Nuevo</span>
              </button>
            </div>
            <div v-if="clientesResultado.length > 0" class="glass-card p-2 mb-2" style="max-height:160px; overflow-y:auto;">
              <div
                v-for="c in clientesResultado"
                :key="c.id"
                class="d-flex justify-content-between align-items-center px-2 py-2 rounded"
                style="cursor:pointer; transition: background 0.15s;"
                :style="clienteId === c.id ? 'background:rgba(212,175,55,0.12);' : ''"
                @click="seleccionarCliente(c)"
                @mouseover="hoveredCliente = c.id"
                @mouseleave="hoveredCliente = null"
              >
                <div>
                  <div class="fw-semibold" style="font-size:0.875rem;">{{ c.nombre }} {{ c.apellido }}</div>
                  <small class="text-secondary">CI/NIT: {{ c.ciNit || '—' }} | Tel: {{ c.telefono || '—' }}</small>
                </div>
                <i v-if="clienteId === c.id" class="bi bi-check-circle-fill text-gold"></i>
              </div>
            </div>
            <div v-if="clienteSeleccionado" class="d-flex align-items-center gap-2 p-2 rounded" style="background:rgba(212,175,55,0.08); border:1px solid var(--border-color);">
              <i class="bi bi-person-check-fill text-gold"></i>
              <span style="font-size:0.875rem;"><strong>{{ clienteSeleccionado.nombre }} {{ clienteSeleccionado.apellido }}</strong></span>
              <button class="btn btn-sm ms-auto" style="color:var(--text-secondary); padding:0;" @click="limpiarCliente">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
          </div>
          <div v-else class="d-flex align-items-center gap-2 p-2 rounded" style="background:rgba(212,175,55,0.06); border:1px solid var(--border-color);">
            <i class="bi bi-person-fill text-secondary"></i>
            <span class="text-secondary" style="font-size:0.875rem;">Venta a <strong>Cliente Ocasional</strong> (NIT: 0) — sin registro de cliente</span>
          </div>
        </div>

        <!-- Tipo de Entrega & Delivery -->
        <div class="stat-card mb-3">
          <h6 class="mb-3 text-gold"><i class="bi bi-truck me-2"></i>Tipo de Entrega</h6>
          <div class="d-flex gap-3 mb-3">
            <div class="flex-grow-1">
              <input type="radio" class="btn-check" name="tipoEntrega" id="entregaTienda" value="Tienda" v-model="tipoEntrega" />
              <label class="btn btn-outline-custom w-100 py-2 d-flex align-items-center justify-content-center gap-2" for="entregaTienda" style="border-radius: 8px;">
                <i class="bi bi-shop"></i> Recoger en Tienda
              </label>
            </div>
            <div class="flex-grow-1">
              <input type="radio" class="btn-check" name="tipoEntrega" id="entregaDelivery" value="Delivery" v-model="tipoEntrega" />
              <label class="btn btn-outline-custom w-100 py-2 d-flex align-items-center justify-content-center gap-2" for="entregaDelivery" style="border-radius: 8px;">
                <i class="bi bi-geo-alt"></i> Delivery
              </label>
            </div>
          </div>

          <!-- Si selecciona Delivery solicitar Dirección, Referencia, Teléfono -->
          <div v-if="tipoEntrega === 'Delivery'" class="p-3 rounded border" style="background: rgba(22, 22, 22, 0.4); border-color: rgba(212,175,55,0.15) !important;">
            <div class="row g-2">
              <div class="col-12 mb-3">
                <label class="form-label mb-1" style="font-size: 0.75rem; color: var(--gold);"><i class="bi bi-map me-1"></i> Seleccionar Ubicación en el Mapa (Sucre)</label>
                <div id="map-pos" style="height: 220px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); z-index: 1;"></div>
                <small class="text-secondary" style="font-size: 0.7rem; display: block; margin-top: 4px;">Haz clic en el mapa de Sucre o arrastra el marcador para autocompletar la dirección exacta.</small>
              </div>
              <div class="col-12">
                <label class="form-label mb-1" style="font-size: 0.75rem;">Dirección *</label>
                <div class="input-group input-group-sm">
                  <input type="text" class="form-control form-control-sm" placeholder="Ej: Av. Las Americas #123" v-model="direccion" @keyup.enter="forwardGeocodePos" required />
                  <button class="btn btn-outline-secondary d-flex align-items-center gap-1" type="button" @click="forwardGeocodePos" title="Buscar dirección en el mapa">
                    <i class="bi bi-search"></i>
                    <span class="d-none d-md-inline">Buscar</span>
                  </button>
                </div>
                <small class="text-secondary" style="font-size: 0.68rem; display: block; margin-top: 2px;">Escribe una dirección y presiona Enter o clic en Buscar para ubicarla en el mapa.</small>
              </div>
              <div class="col-12">
                <label class="form-label mb-1" style="font-size: 0.75rem;">Referencia</label>
                <input type="text" class="form-control form-control-sm" placeholder="Ej: Portón dorado al lado de la farmacia" v-model="referencia" />
              </div>
              <div class="col-md-6">
                <label class="form-label mb-1" style="font-size: 0.75rem;">Teléfono de Contacto *</label>
                <input type="text" class="form-control form-control-sm" placeholder="Ej: 71234567" v-model="telefonoContacto" required />
              </div>
              <div class="col-md-6">
                <label class="form-label mb-1" style="font-size: 0.75rem;">Costo de Delivery (Bs.)</label>
                <input type="number" class="form-control form-control-sm" v-model.number="costoDelivery" min="0" step="0.5" />
              </div>
            </div>
          </div>
        </div>

        <!-- Selector de Productos -->
        <div class="stat-card">
          <h6 class="mb-3 text-gold"><i class="bi bi-search me-2"></i>Agregar Productos</h6>
          <div class="search-box mb-3">
            <i class="bi bi-search"></i>
            <input type="text" class="form-control" placeholder="Buscar producto por nombre o código..." v-model="searchProd" />
          </div>
          <div style="max-height: 320px; overflow-y: auto;">
            <div
              v-for="p in filteredProducts"
              :key="p.id"
              class="d-flex justify-content-between align-items-center py-2 px-2 rounded product-item-row"
              style="border-bottom: 1px solid var(--border-color); cursor: pointer; transition:background 0.15s;"
              @click="p.vendePorUnidad !== false ? addProduct(p, 'Unidad') : addProduct(p, 'Caja')"
            >
              <div>
                <div class="fw-semibold" style="font-size: 0.875rem;">{{ p.nombre }} <span class="text-secondary fw-normal" style="font-size:0.75rem;">({{ p.unidadMedida || 'Unidad' }})</span></div>
                <small class="text-secondary">{{ p.codigo }} | Stock: <span :class="p.stock <= p.stockMinimo ? 'text-danger' : 'text-success'">{{ formatStock(p.stock, p.unidadesPorCaja) }}</span></small>
              </div>
              <div class="text-end">
                <div class="d-flex align-items-center justify-content-end gap-2 mb-1" v-if="p.vendePorUnidad !== false">
                  <div class="text-end">
                    <small class="text-secondary d-block" style="font-size:0.7rem; line-height:1;">Unidad</small>
                    <template v-if="getActiveDiscount(p) > 0">
                      <span class="badge-promo-activa me-1">{{ getActiveDiscount(p) }}% DTO</span>
                      <div class="fw-bold" style="color:var(--success); font-size:0.875rem;">Bs. {{ getDiscountedPrice(p).toFixed(2) }}</div>
                    </template>
                    <template v-else>
                      <div class="fw-bold" style="color:var(--success); font-size:0.875rem;">Bs. {{ Number(p.precioVentaUnidad || p.precioVenta).toFixed(2) }}</div>
                    </template>
                  </div>
                  <button class="btn btn-sm" style="border:1px solid var(--border-color); color:var(--text-secondary); border-radius:6px; padding:2px 6px;" @click.stop="addProduct(p, 'Unidad')"><i class="bi bi-plus"></i></button>
                </div>
                
                <div class="d-flex align-items-center justify-content-end gap-2" v-if="p.vendePorCaja !== false && (p.precioVentaCaja || p.precioCaja)">
                  <div class="text-end">
                    <small class="text-secondary d-block" style="font-size:0.7rem; line-height:1;">Caja ({{p.unidadesPorCaja || 6}} un)</small>
                    <div class="fw-bold" style="color:var(--primary-light); font-size:0.875rem;">Bs. {{ Number(p.precioVentaCaja || p.precioCaja || (Number(p.precioVentaUnidad || p.precioVenta) * (p.unidadesPorCaja || 6))).toFixed(2) }}</div>
                  </div>
                  <button class="btn btn-sm" style="border:1px solid var(--border-color); color:var(--primary-light); border-radius:6px; padding:2px 6px;" @click.stop="addProduct(p, 'Caja')"><i class="bi bi-plus"></i></button>
                </div>
              </div>
            </div>
            <div v-if="filteredProducts.length === 0" class="text-center text-secondary py-4" style="font-size:0.875rem;">
              <i class="bi bi-search mb-2" style="font-size:1.5rem; display:block;"></i>
              Sin resultados para "{{ searchProd }}"
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Cart -->
      <div class="col-md-5">
        <div class="stat-card" style="position: sticky; top: 80px;">
          <h6 class="mb-3 text-gold"><i class="bi bi-receipt me-2"></i>Detalle de Venta</h6>

          <div v-if="cart.length === 0" class="text-center text-secondary py-5">
            <i class="bi bi-cart-x" style="font-size: 2.5rem; display:block; margin-bottom:0.5rem; opacity:0.3;"></i>
            <p class="mb-0" style="font-size:0.875rem;">Agrega productos al carrito</p>
          </div>

          <div v-for="(item, i) in cart" :key="i" class="d-flex justify-content-between align-items-center py-2" style="border-bottom: 1px solid rgba(212,175,55,0.08);">
            <div style="flex:1; min-width:0;">
              <div class="fw-semibold text-truncate" style="font-size:0.85rem;">{{ item.nombre }} <span class="text-secondary fw-normal" style="font-size:0.75rem;">({{ item.tipoVenta }})</span></div>
              <div class="d-flex align-items-center gap-2 mt-1">
                <button class="btn-qty" @click="item.cantidad > 1 ? item.cantidad-- : removeItem(i)">-</button>
                <span class="qty-display">{{ item.cantidad }}</span>
                <button class="btn-qty" @click="increaseQty(i)">+</button>
                <span class="text-secondary" style="font-size:0.78rem;">× Bs. {{ Number(item.precio).toFixed(2) }}</span>
                <span class="text-secondary" style="font-size:0.7rem;" v-if="item.tipoVenta === 'Caja'">(Bs. {{ (Number(item.precio) / item.factorUnidades).toFixed(2) }} c/u)</span>
              </div>
            </div>
            <div class="text-end ms-2">
              <span class="fw-bold" style="color:var(--primary-light);">Bs. {{ (item.cantidad * item.precio).toFixed(2) }}</span>
              <br>
              <button class="btn btn-sm" style="padding:0 5px; color:var(--danger); font-size:0.75rem;" @click="removeItem(i)"><i class="bi bi-x-lg"></i></button>
            </div>
          </div>

          <div v-if="cart.length > 0" class="mt-3 pt-3" style="border-top: 1px solid var(--border-color);">
            <!-- Total -->
            <div class="d-flex justify-content-between mb-3">
              <span class="fw-bold tracking-wide text-secondary" style="font-size:0.8rem; text-transform:uppercase;">Total</span>
              <span class="fw-bold" style="font-size:1.4rem; color:var(--primary); font-family:'Outfit',sans-serif;">Bs. {{ total.toFixed(2) }}</span>
            </div>

            <!-- Pago / Cambio -->
            <div class="row mb-3">
              <div class="col-6">
                <label class="form-label" style="font-size:0.8rem;">Monto Recibido</label>
                <div class="input-group input-group-sm">
                  <span class="input-group-text border-secondary bg-transparent text-secondary">Bs.</span>
                  <input type="number" class="form-control" v-model.number="montoRecibido" min="0" step="0.5" placeholder="0.00" />
                </div>
              </div>
              <div class="col-6">
                <label class="form-label" style="font-size:0.8rem;">Cambio</label>
                <div class="form-control form-control-sm d-flex align-items-center justify-content-end fw-bold" :class="cambio >= 0 ? 'text-success' : 'text-danger'" style="background:rgba(0,0,0,0.1); border-color:var(--border-color);">
                  Bs. {{ cambio.toFixed(2) }}
                </div>
              </div>
            </div>

            <!-- Método de Pago -->
            <div class="mb-3">
              <label class="form-label">Método de Pago</label>
              <select class="form-select" v-model="metodoPagoId">
                <option v-for="m in metodosPago" :key="m.id" :value="m.id">{{ m.nombre }}</option>
              </select>
            </div>

            <!-- QR placard presentation -->
            <div v-if="isQrSelected" class="mb-3 p-3 rounded text-center animate-fade-in" style="background: rgba(212, 175, 55, 0.05); border: 1px solid rgba(212, 175, 55, 0.15);">
              <label class="form-label text-gold d-block fw-bold mb-2">Escanea el QR para Pagar</label>
              <div class="bg-white p-2 rounded d-inline-block shadow-sm cursor-zoom-in" style="max-width:180px; cursor: zoom-in;" @click="openQrModal" title="Clic para agrandar">
                <img :src="staticQrUrl" class="w-100 rounded" style="max-height: 160px; object-fit: contain;" alt="QR de Pago" />
              </div>
              <p class="text-secondary small mt-2 mb-0">Monto exacto a transferir: <strong class="text-gold">Bs. {{ total.toFixed(2) }}</strong></p>
            </div>

            <!-- Comprobante QR (upload) -->
            <div v-if="isQrSelected" class="mb-3 animate-fade-in">
              <label class="form-label">Comprobante QR <span class="text-secondary" style="font-size:0.7rem; text-transform:none;">(opcional)</span></label>
              <div
                class="d-flex flex-column align-items-center justify-content-center p-3 rounded"
                style="border: 1px dashed var(--border-color); cursor:pointer; min-height:80px; transition:border-color 0.2s;"
                @click="triggerQrInput"
                @dragover.prevent
                @drop.prevent="onQrDrop"
                :style="qrFile ? 'border-color:var(--primary);' : ''"
              >
                <div v-if="!qrFile" class="text-center">
                  <i class="bi bi-qr-code-scan text-secondary" style="font-size:1.5rem;"></i>
                  <p class="text-secondary mb-0 mt-1" style="font-size:0.78rem;">Arrastre o haga clic para subir captura de pago</p>
                  <small class="text-secondary" style="font-size:0.68rem;">JPG, PNG, WEBP (máx 5MB)</small>
                </div>
                <div v-else class="d-flex align-items-center gap-2">
                  <img :src="qrPreview" alt="QR" style="height:60px; border-radius:6px; object-fit:cover;" />
                  <div>
                    <div style="font-size:0.78rem; font-weight:600;">{{ qrFile.name }}</div>
                    <button class="btn btn-sm text-danger p-0" style="font-size:0.72rem;" @click.stop="clearQr">
                      <i class="bi bi-trash3"></i> Eliminar
                    </button>
                  </div>
                </div>
                <input ref="qrInput" type="file" accept=".jpg,.jpeg,.png,.webp" class="d-none" @change="onQrSelect" />
              </div>
            </div>

            <!-- Botón registrar -->
            <button class="btn-primary-custom w-100 py-2 rounded" @click="registrarVenta" :disabled="processing" style="border:none; cursor:pointer;">
              <span v-if="processing"><i class="bi bi-arrow-repeat me-1" style="animation:spin 1s linear infinite;"></i> Procesando...</span>
              <span v-else><i class="bi bi-check-circle-fill me-1"></i> Registrar Venta</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para crear cliente -->
    <div class="modal fade" id="modalCliente" tabindex="-1" ref="modalClienteRef">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-gold"><i class="bi bi-person-plus-fill me-2"></i>Nuevo Cliente</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="guardarCliente">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Nombre *</label>
                  <input type="text" class="form-control" v-model="nuevoCliente.nombre" required />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Apellido *</label>
                  <input type="text" class="form-control" v-model="nuevoCliente.apellido" required />
                </div>
                <div class="col-12">
                  <label class="form-label">CI / NIT</label>
                  <input type="text" class="form-control" v-model="nuevoCliente.ciNit" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Teléfono</label>
                  <input type="text" class="form-control" v-model="nuevoCliente.telefono" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Correo Electrónico</label>
                  <input type="email" class="form-control" v-model="nuevoCliente.correo" />
                </div>
                <div class="col-12">
                  <label class="form-label">Dirección</label>
                  <input type="text" class="form-control" v-model="nuevoCliente.direccion" />
                </div>
              </div>
              <div class="mt-4 d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="modal" style="border-radius:6px;">Cancelar</button>
                <button type="submit" class="btn-primary-custom btn-sm" :disabled="guardandoCliente" style="border-radius:6px; border:none; padding:0.4rem 1rem;">
                  <span v-if="guardandoCliente"><i class="bi bi-arrow-repeat me-1" style="animation:spin 1s linear infinite;"></i> Guardando...</span>
                  <span v-else>Guardar Cliente</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para agrandar el QR -->
    <div class="modal fade" id="modalQr" tabindex="-1" ref="modalQrRef">
      <div class="modal-dialog modal-dialog-centered" style="max-width: 420px;">
        <div class="modal-content text-center">
          <div class="modal-header">
            <h5 class="modal-title text-gold w-100 text-center"><i class="bi bi-qr-code-scan me-2"></i>QR de Pago Ampliado</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4">
            <div class="bg-white p-3 rounded d-inline-block shadow-lg mb-3">
              <img :src="staticQrUrl" class="img-fluid rounded" style="max-height: 320px; object-fit: contain;" alt="QR de Pago Ampliado" />
            </div>
            <h4 class="text-gold fw-bold mb-2">Total: Bs. {{ total.toFixed(2) }}</h4>
            <p class="text-secondary small mb-0">Escanea este código QR para transferir el monto exacto de forma segura.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { Modal } from 'bootstrap'
import http from '@/plugins/axios'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

// Data
const productos = ref<any[]>([])
const metodosPago = ref<any[]>([])
const searchProd = ref('')

// Cliente
const sinCliente = ref(false)
const clienteQuery = ref('')
const clientesResultado = ref<any[]>([])
const clienteSeleccionado = ref<any>(null)
const clienteId = ref<number | null>(null)
const hoveredCliente = ref<number | null>(null)

// Cart
const cart = ref<{ productoId: number; nombre: string; cantidad: number; precio: number; unidadMedida: string; tipoVenta: string; factorUnidades: number; stock: number }[]>([])
const metodoPagoId = ref<number | null>(null)

const tipoEntrega = ref('Tienda')
const direccion = ref('')
const referencia = ref('')
const telefonoContacto = ref('')
const costoDelivery = ref(10.00)

const posLat = ref<number>(-19.0429)
const posLng = ref<number>(-65.2554)
let posMapInstance: any = null
let posMarkerInstance: any = null
const montoRecibido = ref<number | ''>('')


// QR
const qrInput = ref<HTMLInputElement | null>(null)
const qrFile = ref<File | null>(null)
const qrPreview = ref<string>('')
const staticQrUrl = ref('/qr/default-qr.png')

const isQrSelected = computed(() => {
  const selected = metodosPago.value.find(m => m.id === metodoPagoId.value)
  return selected?.nombre?.toUpperCase() === 'QR'
})

async function loadStaticQrConfig() {
  try {
    const res = await fetch('/qr/config.json?t=' + Date.now())
    if (res.ok) {
      const data = await res.json()
      staticQrUrl.value = data.qrUrl || '/qr/default-qr.png'
    }
  } catch (e) {
    console.error('Error al cargar QR estático', e)
  }
}

function triggerQrInput() {
  qrInput.value?.click()
}

// Modal y Formulario de nuevo cliente
const modalClienteRef = ref<HTMLElement | null>(null)
let modalCliente: Modal | null = null

// Modal de QR Ampliado
const modalQrRef = ref<HTMLElement | null>(null)
let modalQr: Modal | null = null

function openQrModal() {
  modalQr?.show()
}

const nuevoCliente = ref({
  nombre: '',
  apellido: '',
  ciNit: '',
  telefono: '',
  correo: '',
  direccion: ''
})
const guardandoCliente = ref(false)

function openModalCliente() {
  nuevoCliente.value = {
    nombre: '',
    apellido: '',
    ciNit: '',
    telefono: '',
    correo: '',
    direccion: ''
  }
  modalCliente?.show()
}

async function guardarCliente() {
  const c = nuevoCliente.value
  if (!c.nombre.trim() || !c.apellido.trim()) {
    Swal.fire({ icon: 'warning', title: 'Campos obligatorios', text: 'Nombre y apellido son requeridos.' })
    return
  }
  guardandoCliente.value = true
  try {
    const res = await http.post('clientes', c)
    Swal.fire({
      icon: 'success',
      title: 'Cliente Creado',
      text: `${res.data.nombre} ${res.data.apellido} registrado exitosamente.`,
      timer: 1500,
      showConfirmButton: false
    })
    seleccionarCliente(res.data)
    modalCliente?.hide()
  } catch (error: any) {
    console.error('Error al registrar cliente:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'No se pudo crear el cliente.'
    })
  } finally {
    guardandoCliente.value = false
  }
}

const processing = ref(false)

// Computed
const filteredProducts = computed(() =>
  productos.value.filter(p =>
    p.nombre.toLowerCase().includes(searchProd.value.toLowerCase()) ||
    p.codigo.toLowerCase().includes(searchProd.value.toLowerCase())
  )
)

const total = computed(() => {
  const baseTotal = cart.value.reduce((s, i) => s + i.cantidad * i.precio, 0)
  if (tipoEntrega.value === 'Delivery') {
    return baseTotal + (Number(costoDelivery.value) || 0)
  }
  return baseTotal
})
const cambio = computed(() => {
  const recibido = Number(montoRecibido.value) || 0
  if (recibido === 0) return 0
  return recibido - total.value
})

onMounted(async () => {
  const [p, m] = await Promise.all([http.get('productos'), http.get('metodos-pago')])
  productos.value = p.data
  metodosPago.value = m.data
  if (metodosPago.value.length) metodoPagoId.value = metodosPago.value[0].id

  await loadStaticQrConfig()

  if (modalClienteRef.value) {
    modalCliente = new Modal(modalClienteRef.value)
  }
  if (modalQrRef.value) {
    modalQr = new Modal(modalQrRef.value)
  }
})

// Cliente search
let searchTimeout: ReturnType<typeof setTimeout>
async function buscarCliente() {
  clearTimeout(searchTimeout)
  if (!clienteQuery.value.trim()) {
    clientesResultado.value = []
    return
  }
  searchTimeout = setTimeout(async () => {
    const res = await http.get(`clientes/buscar?q=${encodeURIComponent(clienteQuery.value)}`)
    clientesResultado.value = res.data
  }, 300)
}

function seleccionarCliente(c: any) {
  clienteSeleccionado.value = c
  clienteId.value = c.id
  clientesResultado.value = []
  clienteQuery.value = ''
}

function limpiarCliente() {
  clienteSeleccionado.value = null
  clienteId.value = null
  clienteQuery.value = ''
}

// Promo helpers
function getActiveDiscount(p: any): number {
  if (!p?.promocion?.estado) return 0
  const now = new Date()
  const start = new Date(p.promocion.fechaInicio)
  const end = new Date(p.promocion.fechaFin)
  return now >= start && now <= end ? Number(p.promocion.descuento) : 0
}

function getDiscountedPrice(p: any): number {
  const d = getActiveDiscount(p)
  const basePrice = Number(p.precioVentaUnidad || p.precioVenta || 0)
  return d > 0 ? basePrice * (1 - d / 100) : basePrice
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

// Cart
function addProduct(p: any, tipoVenta: string = 'Unidad') {
  const existing = cart.value.find(i => i.productoId === p.id && i.tipoVenta === tipoVenta)
  const factor = tipoVenta === 'Caja' ? (p.unidadesPorCaja || 6) : 1
  
  const currentTotalInCart = cart.value.filter(i => i.productoId === p.id).reduce((s, i) => s + (i.cantidad * i.factorUnidades), 0)

  if (currentTotalInCart + factor > p.stock) {
    Swal.fire({ icon: 'warning', title: 'Límite alcanzado', text: `No hay más stock disponible de ${p.nombre}.` })
    return
  }

  if (existing) {
    existing.cantidad++
  } else {
    let precio = getDiscountedPrice(p)
    if (tipoVenta === 'Caja') {
       const discount = getActiveDiscount(p)
       const baseCaja = Number(p.precioVentaCaja || p.precioCaja || (Number(p.precioVentaUnidad || p.precioVenta) * (p.unidadesPorCaja || 6)))
       precio = discount > 0 ? baseCaja * (1 - discount / 100) : baseCaja
    }

    cart.value.push({ 
      productoId: p.id, 
      nombre: p.nombre, 
      cantidad: 1, 
      precio: precio, 
      unidadMedida: p.unidadMedida,
      tipoVenta: tipoVenta,
      factorUnidades: factor,
      stock: p.stock
    })
  }
}

function removeItem(i: number) { cart.value.splice(i, 1) }

function increaseQty(idx: number) {
  const item = cart.value[idx]
  const currentTotalInCart = cart.value.filter(i => i.productoId === item.productoId).reduce((s, i) => s + (i.cantidad * i.factorUnidades), 0)

  if (currentTotalInCart + item.factorUnidades <= item.stock) {
    item.cantidad++
  } else {
    Swal.fire({ icon: 'warning', title: 'Límite alcanzado', text: 'No hay más stock disponible para este producto.' })
  }
}

// QR
function onQrSelect(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) setQrFile(file)
}

function onQrDrop(e: DragEvent) {
  const file = e.dataTransfer?.files?.[0]
  if (file) setQrFile(file)
}

function setQrFile(file: File) {
  qrFile.value = file
  qrPreview.value = URL.createObjectURL(file)
}

function clearQr() {
  qrFile.value = null
  qrPreview.value = ''
  if (qrInput.value) qrInput.value.value = ''
}

onUnmounted(() => {
  destroyPosMap()
  modalCliente?.hide()
  modalQr?.hide()
})

watch(tipoEntrega, (newVal) => {
  if (newVal === 'Delivery') {
    nextTick(() => {
      initPosMap()
    })
  } else {
    destroyPosMap()
  }
})

function initPosMap() {
  const el = document.getElementById('map-pos')
  if (!el || posMapInstance) return

  const defaultIcon = (window as any).L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })

  posMapInstance = (window as any).L.map('map-pos', {
    zoomControl: true,
    attributionControl: false
  }).setView([posLat.value, posLng.value], 14);

  (window as any).L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(posMapInstance)

  posMarkerInstance = (window as any).L.marker([posLat.value, posLng.value], {
    draggable: true,
    icon: defaultIcon
  }).addTo(posMapInstance)

  posMarkerInstance.on('dragend', async () => {
    const latLng = posMarkerInstance.getLatLng()
    posLat.value = latLng.lat
    posLng.value = latLng.lng
    await updatePosAddressFromCoords(latLng.lat, latLng.lng)
  })

  posMapInstance.on('click', async (e: any) => {
    const latLng = e.latlng
    posMarkerInstance.setLatLng(latLng)
    posLat.value = latLng.lat
    posLng.value = latLng.lng
    await updatePosAddressFromCoords(latLng.lat, latLng.lng)
  })
  
  setTimeout(() => {
    if (posMapInstance) posMapInstance.invalidateSize()
  }, 300)
}

function destroyPosMap() {
  if (posMapInstance) {
    posMapInstance.remove()
    posMapInstance = null
    posMarkerInstance = null
  }
}

async function updatePosAddressFromCoords(lat: number, lng: number) {
  const address = await reverseGeocode(lat, lng)
  if (address) {
    direccion.value = address
  }
}

async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`, {
      headers: {
        'Accept-Language': 'es',
        'User-Agent': 'Nocturne/1.0'
      }
    })
    if (res.ok) {
      const data = await res.json()
      return data.display_name || null
    }
  } catch (e) {
    console.error('Error reverse geocoding:', e)
  }
  return null
}

async function forwardGeocodePos() {
  const query = direccion.value.trim()
  if (!query || query.length < 3) return
  try {
    const searchQuery = query.toLowerCase().includes('sucre') ? query : `${query}, Sucre, Bolivia`
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&viewbox=-65.35,-19.12,-65.18,-18.97&bounded=1&limit=1`, {
      headers: {
        'Accept-Language': 'es',
        'User-Agent': 'Nocturne/1.0'
      }
    })
    if (res.ok) {
      const data = await res.json()
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat)
        const lng = parseFloat(data[0].lon)
        posLat.value = lat
        posLng.value = lng
        if (posMarkerInstance) posMarkerInstance.setLatLng([lat, lng])
        if (posMapInstance) posMapInstance.setView([lat, lng], 16)
        direccion.value = data[0].display_name
      } else {
        // Fallback: unbounded search appending Sucre
        const res2 = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`, {
          headers: {
            'Accept-Language': 'es',
            'User-Agent': 'Nocturne/1.0'
          }
        })
        if (res2.ok) {
          const data2 = await res2.json()
          if (data2.length > 0) {
            const lat = parseFloat(data2[0].lat)
            const lng = parseFloat(data2[0].lon)
            posLat.value = lat
            posLng.value = lng
            if (posMarkerInstance) posMarkerInstance.setLatLng([lat, lng])
            if (posMapInstance) posMapInstance.setView([lat, lng], 16)
            direccion.value = data2[0].display_name
          }
        }
      }
    }
  } catch (e) {
    console.error('Error forward geocoding:', e)
  }
}

async function registrarVenta() {
  if (!cart.value.length) return
  processing.value = true
  
  if (tipoEntrega.value === 'Delivery') {
    if (!direccion.value.trim() || !telefonoContacto.value.trim()) {
      Swal.fire({ icon: 'warning', title: 'Campos requeridos', text: 'Para envíos por delivery, la dirección y el teléfono de contacto son obligatorios.' })
      processing.value = false
      return
    }
  }

  try {
    let comprobanteQr: string | undefined = undefined

    // Subir QR si existe
    if (qrFile.value) {
      const formData = new FormData()
      formData.append('file', qrFile.value)
      const uploadRes = await http.post('ventas/upload-comprobante', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      comprobanteQr = uploadRes.data.url
    }

    await http.post('ventas', {
      clienteId: sinCliente.value ? undefined : (clienteId.value || undefined),
      usuarioId: authStore.user?.id,
      comprobanteQr,
      tipoEntrega: tipoEntrega.value,
      direccion: tipoEntrega.value === 'Delivery' ? direccion.value.trim() : undefined,
      referencia: tipoEntrega.value === 'Delivery' ? referencia.value.trim() : undefined,
      telefonoContacto: tipoEntrega.value === 'Delivery' ? telefonoContacto.value.trim() : undefined,
      costoDelivery: tipoEntrega.value === 'Delivery' ? Number(costoDelivery.value) || 0 : undefined,
      latitud: tipoEntrega.value === 'Delivery' ? posLat.value : undefined,
      longitud: tipoEntrega.value === 'Delivery' ? posLng.value : undefined,
      detalles: cart.value.map(i => ({ productoId: i.productoId, cantidad: i.cantidad, precio: i.precio, tipoVenta: i.tipoVenta })),
      pagos: [{ metodoPagoId: metodoPagoId.value, monto: total.value, montoRecibido: Number(montoRecibido.value) || total.value, cambio: cambio.value > 0 ? cambio.value : 0 }],
    })

    await Swal.fire({
      icon: 'success',
      title: '¡Venta registrada!',
      html: `<strong>Total: Bs. ${total.value.toFixed(2)}</strong>${sinCliente.value ? '<br><small>Registrada como Cliente Ocasional</small>' : ''}${Number(montoRecibido.value) > 0 ? `<br><small>Cambio devuelto: Bs. ${cambio.value.toFixed(2)}</small>` : ''}`,
      timer: 2500,
      showConfirmButton: false,
    })

    // Reset values
    cart.value = []
    sinCliente.value = false
    limpiarCliente()
    tipoEntrega.value = 'Tienda'
    direccion.value = ''
    referencia.value = ''
    telefonoContacto.value = ''
    costoDelivery.value = 10.00
    montoRecibido.value = ''
    clearQr()

    const backPath = authStore.user?.rol?.nombre === 'VENDEDOR' ? '/vendedor/ventas' : '/admin/ventas'
    router.push(backPath)
  } catch (e: any) {
    Swal.fire({ icon: 'error', title: 'Error', text: e.response?.data?.message || 'Error al registrar venta' })
  } finally {
    processing.value = false
  }
}
</script>

<style scoped>
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.product-item-row:hover {
  background: rgba(212, 175, 55, 0.05) !important;
}
</style>
