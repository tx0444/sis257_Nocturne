<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4><i class="bi bi-box-seam-fill me-2" style="color: var(--primary-light);"></i>Productos</h4>
      <button v-if="authStore.isAdmin" class="btn btn-primary-custom" @click="openModal()"><i class="bi bi-plus-lg me-1"></i> Nuevo</button>
    </div>
    <div class="search-box mb-3" style="max-width: 350px;"><i class="bi bi-search"></i><input type="text" class="form-control" placeholder="Buscar producto..." v-model="search" /></div>
    <div class="table-dark-custom">
      <table class="table table-hover mb-0">
        <thead><tr><th>#</th><th>Imagen</th><th>Código</th><th>Nombre</th><th>Categoría</th><th>Marca</th><th>P. Compra</th><th>P. Venta</th><th>Empaque</th><th>Stock</th><th v-if="authStore.isAdmin">Acciones</th></tr></thead>
        <tbody>
          <tr v-for="(p, i) in filtered" :key="p.id">
            <td>{{ i+1 }}</td>
            <td>
              <div class="product-thumb-container">
                <template v-if="p.imagen">
                  <video v-if="isVideoUrl(p.imagen)" :src="getImageUrl(p.imagen)" muted class="product-thumb" />
                  <img v-else :src="getImageUrl(p.imagen)" :alt="p.nombre" class="product-thumb" />
                </template>
                <span v-else class="product-thumb-fallback"><i class="bi bi-box-seam text-secondary"></i></span>
              </div>
            </td>
            <td><code>{{ p.codigo }}</code></td>
            <td class="fw-semibold">
              {{ p.nombre }}
              <div class="mt-1">
                <span v-if="p.vendePorUnidad" class="badge bg-success bg-opacity-10 text-success border border-success-subtle me-1" style="font-size: 0.65rem;">Unidad</span>
                <span v-if="p.vendePorCaja" class="badge bg-info bg-opacity-10 text-info border border-info-subtle" style="font-size: 0.65rem;">Caja</span>
              </div>
            </td>
            <td class="text-secondary">{{ p.categoria?.nombre || '-' }}</td>
            <td class="text-secondary">{{ p.marca?.nombre || '-' }}</td>
            <td>
              <div style="font-size: 0.85rem;">Bs. {{ Number(p.precioCompraUnidad || p.precioCompra).toFixed(2) }} <small class="text-secondary">(u)</small></div>
              <div v-if="p.vendePorCaja" class="text-secondary small">Bs. {{ Number(p.precioCompraCaja || (Number(p.precioCompra) * (p.unidadesPorCaja || 6))).toFixed(2) }} <small>(c)</small></div>
            </td>
            <td>
              <div style="font-size: 0.85rem;">Bs. {{ Number(p.precioVentaUnidad || p.precioVenta).toFixed(2) }} <small class="text-secondary">(u)</small></div>
              <div v-if="p.vendePorCaja" class="text-secondary small">Bs. {{ Number(p.precioVentaCaja || p.precioCaja || (Number(p.precioVenta) * (p.unidadesPorCaja || 6))).toFixed(2) }} <small>(c)</small></div>
            </td>
            <td>
              <span class="text-secondary" style="font-size: 0.85rem;">{{ p.unidadesPorCaja || 6 }} unidades</span>
            </td>
            <td>
              <span :class="Number(p.stock) <= Number(p.stockMinimo) ? 'badge badge-stock-low' : 'badge badge-stock-ok'">
                {{ formatStock(p.stock, p.unidadesPorCaja) }}
              </span>
            </td>
            <td v-if="authStore.isAdmin">
              <button class="btn btn-sm btn-outline-info me-1" @click="openModal(p)"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-sm btn-outline-danger" @click="remove(p.id)"><i class="bi bi-trash"></i></button>
            </td>
          </tr>
          <tr v-if="filtered.length===0"><td :colspan="authStore.isAdmin ? 11 : 10" class="text-center text-secondary py-4">No se encontraron productos</td></tr>
        </tbody>
      </table>
    </div>

    <div class="modal fade" ref="modalRef" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title">{{ editing ? 'Editar' : 'Nuevo' }} Producto</h5><button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button></div>
      <div class="modal-body"><div class="row g-3">
        <div class="col-md-8"><label class="form-label">Nombre</label><input class="form-control" v-model="form.nombre" required /></div>
        <div class="col-md-4"><label class="form-label">Código</label><input class="form-control" v-model="form.codigo" required /></div>
        <div class="col-12"><label class="form-label">Descripción</label><textarea class="form-control" v-model="form.descripcion" rows="2"></textarea></div>
        <div class="col-md-4"><label class="form-label">Categoría</label><select class="form-select" v-model="form.categoriaId"><option :value="null">Seleccione</option><option v-for="c in categorias" :key="c.id" :value="c.id">{{ c.nombre }}</option></select></div>
        <div class="col-md-4"><label class="form-label">Marca</label><select class="form-select" v-model="form.marcaId"><option :value="null">Seleccione</option><option v-for="m in marcas" :key="m.id" :value="m.id">{{ m.nombre }}</option></select></div>
        <div class="col-md-4"><label class="form-label">Proveedor</label><select class="form-select" v-model="form.proveedorId"><option :value="null">Seleccione</option><option v-for="p in proveedores" :key="p.id" :value="p.id">{{ p.nombre }}</option></select></div>
        <!-- Checkboxes for selling options -->
        <div class="col-12 border-bottom border-dark pb-2 mb-2">
          <label class="form-label d-block text-gold">Opciones de Venta/Empaque</label>
          <div class="d-flex gap-4">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="vendePorUnidad" v-model="form.vendePorUnidad" />
              <label class="form-check-label" for="vendePorUnidad">Permitir Venta por Unidad</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="vendePorCaja" v-model="form.vendePorCaja" />
              <label class="form-check-label" for="vendePorCaja">Permitir Venta por Caja</label>
            </div>
          </div>
        </div>

        <div class="col-md-4"><label class="form-label">Unidad de Medida</label><select class="form-select" v-model="form.unidadMedida"><option value="Unidad">Unidad</option><option value="Botella">Botella</option><option value="Lata">Lata</option><option value="Paquete">Paquete</option><option value="Caja">Caja</option></select></div>
        <div class="col-md-4"><label class="form-label">Unidades por Caja</label><input class="form-control" type="number" v-model.number="form.unidadesPorCaja" @input="updateBoxPrices" /></div>
        <div class="col-md-4">&nbsp;</div>

        <!-- Precios de Unidad -->
        <div class="col-md-6 border-end border-dark pe-3" v-if="form.vendePorUnidad">
          <h6 class="text-gold mb-2"><i class="bi bi-box-seam me-1"></i>Precios por Unidad</h6>
          <div class="row g-2">
            <div class="col-6">
              <label class="form-label small">P. Compra Unidad (Bs.)</label>
              <input class="form-control" type="number" step="0.01" v-model.number="form.precioCompraUnidad" @input="syncFromUnitPrices" />
            </div>
            <div class="col-6">
              <label class="form-label small">P. Venta Unidad (Bs.)</label>
              <input class="form-control" type="number" step="0.01" v-model.number="form.precioVentaUnidad" @input="syncFromUnitPrices" />
            </div>
          </div>
        </div>

        <!-- Precios de Caja -->
        <div class="col-md-6 ps-3" v-if="form.vendePorCaja">
          <h6 class="text-gold mb-2"><i class="bi bi-box me-1"></i>Precios por Caja</h6>
          <div class="row g-2">
            <div class="col-6">
              <label class="form-label small">P. Compra Caja (Bs.)</label>
              <input class="form-control" type="number" step="0.01" v-model.number="form.precioCompraCaja" />
            </div>
            <div class="col-6">
              <label class="form-label small">P. Venta Caja (Bs.)</label>
              <input class="form-control" type="number" step="0.01" v-model.number="form.precioVentaCaja" />
            </div>
          </div>
        </div>

        <div class="col-md-6"><label class="form-label">Stock Total (en Unidades)</label><input class="form-control" type="number" v-model.number="form.stock" /></div>
        <div class="col-md-6"><label class="form-label">Stock Mínimo (en Unidades)</label><input class="form-control" type="number" v-model.number="form.stockMinimo" /></div>
        <div class="col-12">
          <label class="form-label">Imagen o Video del Producto</label>
          <div class="input-group">
            <input type="text" class="form-control" v-model="form.imagen" placeholder="URL de Internet (ej. https://...)" />
            <input type="file" ref="fileInputRef" class="d-none" accept="image/*,video/*" @change="onFileSelected" />
            <button class="btn btn-outline-accent" type="button" @click="triggerFileInput">
              <i class="bi bi-upload me-1"></i> Cargar Imagen/Video
            </button>
          </div>
          <small class="text-secondary mt-1 d-block">Puedes ingresar una URL de Internet o subir un archivo de imagen/video local.</small>
          
          <!-- Vista previa de la imagen/video -->
          <div v-if="form.imagen" class="mt-3 position-relative d-inline-block" style="max-width: 180px;">
            <video v-if="isVideoUrl(form.imagen)" :src="getImageUrl(form.imagen)" controls class="preview-asset" />
            <img v-else :src="getImageUrl(form.imagen)" class="preview-asset" />
            <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 rounded-circle p-1 d-flex align-items-center justify-content-center" style="width: 24px; height: 24px; line-height: 1; z-index: 5;" @click="form.imagen = ''">
              <i class="bi bi-x" style="font-size: 1rem; color: #fff;"></i>
            </button>
          </div>
        </div>
      </div></div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button><button class="btn btn-primary-custom" @click="save">{{ editing ? 'Actualizar' : 'Guardar' }}</button></div>
    </div></div></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import http from '@/plugins/axios'
import Swal from 'sweetalert2'
import { getImageUrl } from '@/helpers'
import { Modal } from 'bootstrap'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const items = ref<any[]>([]); const categorias = ref<any[]>([]); const marcas = ref<any[]>([]); const proveedores = ref<any[]>([])
const search = ref(''); const editing = ref<number|null>(null); const modalRef = ref<HTMLElement>(); let bsModal: Modal
const form = ref({ nombre: '', codigo: '', descripcion: '', precioCompra: 0, precioVenta: 0, stock: 0, stockMinimo: 5, unidadMedida: 'Unidad', vendePorUnidad: true, vendePorCaja: true, unidadesPorCaja: 6, precioCompraUnidad: 0, precioCompraCaja: 0, precioVentaUnidad: 0, precioVentaCaja: 0, precioCaja: null as number|null, imagen: '', categoriaId: null as number|null, marcaId: null as number|null, proveedorId: null as number|null })
const filtered = computed(() => items.value.filter(i => i.nombre.toLowerCase().includes(search.value.toLowerCase()) || i.codigo.toLowerCase().includes(search.value.toLowerCase())))

const fileInputRef = ref<HTMLInputElement | null>(null)

function isVideoUrl(url?: string) {
  if (!url) return false
  return url.match(/\.(mp4|webm|ogg|mov|avi)$/i) || url.includes('/videos/')
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

function updateBoxPrices() {
  const factor = Number(form.value.unidadesPorCaja || 6);
  if (form.value.precioCompraUnidad) {
    form.value.precioCompraCaja = Number((form.value.precioCompraUnidad * factor).toFixed(2));
  }
  if (form.value.precioVentaUnidad) {
    form.value.precioVentaCaja = Number((form.value.precioVentaUnidad * factor).toFixed(2));
  }
}

function syncFromUnitPrices() {
  updateBoxPrices();
}

function triggerFileInput() {
  fileInputRef.value?.click()
}

async function onFileSelected(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      const isVideo = file.type.startsWith('video/')
      Swal.fire({
        title: isVideo ? 'Subiendo video...' : 'Subiendo imagen...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      })
      
      const res = await http.post('productos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      form.value.imagen = res.data.url
      Swal.fire({
        icon: 'success',
        title: 'Imagen subida',
        timer: 1500,
        showConfirmButton: false
      })
    } catch (e: any) {
      console.error(e)
      Swal.fire({
        icon: 'error',
        title: 'Error al subir',
        text: e.response?.data?.message || 'Hubo un error al procesar el archivo.'
      })
    } finally {
      target.value = ''
    }
  }
}

onMounted(async () => {
  bsModal = new Modal(modalRef.value!)
  const [prods, cats, mrs, provs] = await Promise.all([http.get('productos'), http.get('categorias'), http.get('marcas'), http.get('proveedores')])
  items.value = prods.data; categorias.value = cats.data; marcas.value = mrs.data; proveedores.value = provs.data
})

async function load() { items.value = (await http.get('productos')).data }

function openModal(item?: any) {
  if (item) {
    editing.value = item.id;
    form.value = {
      nombre: item.nombre,
      codigo: item.codigo,
      descripcion: item.descripcion || '',
      precioCompra: Number(item.precioCompra),
      precioVenta: Number(item.precioVenta),
      stock: Number(item.stock),
      stockMinimo: Number(item.stockMinimo),
      unidadMedida: item.unidadMedida || 'Unidad',
      vendePorUnidad: item.vendePorUnidad !== undefined && item.vendePorUnidad !== null ? !!item.vendePorUnidad : true,
      vendePorCaja: item.vendePorCaja !== undefined && item.vendePorCaja !== null ? !!item.vendePorCaja : true,
      unidadesPorCaja: item.unidadesPorCaja !== undefined && item.unidadesPorCaja !== null ? Number(item.unidadesPorCaja) : 6,
      precioCompraUnidad: item.precioCompraUnidad !== undefined && item.precioCompraUnidad !== null ? Number(item.precioCompraUnidad) : Number(item.precioCompra),
      precioCompraCaja: item.precioCompraCaja !== undefined && item.precioCompraCaja !== null ? Number(item.precioCompraCaja) : Number(item.precioCompra) * 6,
      precioVentaUnidad: item.precioVentaUnidad !== undefined && item.precioVentaUnidad !== null ? Number(item.precioVentaUnidad) : Number(item.precioVenta),
      precioVentaCaja: item.precioVentaCaja !== undefined && item.precioVentaCaja !== null ? Number(item.precioVentaCaja) : Number(item.precioVenta) * 6,
      precioCaja: item.precioCaja ? Number(item.precioCaja) : null,
      imagen: item.imagen || '',
      categoriaId: item.categoriaId,
      marcaId: item.marcaId,
      proveedorId: item.proveedorId
    }
  } else {
    editing.value = null;
    form.value = {
      nombre: '',
      codigo: '',
      descripcion: '',
      precioCompra: 0,
      precioVenta: 0,
      stock: 0,
      stockMinimo: 5,
      unidadMedida: 'Unidad',
      vendePorUnidad: true,
      vendePorCaja: true,
      unidadesPorCaja: 6,
      precioCompraUnidad: 0,
      precioCompraCaja: 0,
      precioVentaUnidad: 0,
      precioVentaCaja: 0,
      precioCaja: null,
      imagen: '',
      categoriaId: null,
      marcaId: null,
      proveedorId: null
    }
  }
  bsModal.show()
}

async function save() {
  try {
    const payload = {
      ...form.value,
      precioCompra: Number(form.value.precioCompraUnidad || form.value.precioCompra),
      precioVenta: Number(form.value.precioVentaUnidad || form.value.precioVenta),
      stock: Number(form.value.stock),
      stockMinimo: Number(form.value.stockMinimo),
      vendePorUnidad: !!form.value.vendePorUnidad,
      vendePorCaja: !!form.value.vendePorCaja,
      unidadesPorCaja: Number(form.value.unidadesPorCaja || 6),
      precioCompraUnidad: Number(form.value.precioCompraUnidad),
      precioCompraCaja: Number(form.value.precioCompraCaja),
      precioVentaUnidad: Number(form.value.precioVentaUnidad),
      precioVentaCaja: Number(form.value.precioVentaCaja),
      precioCaja: Number(form.value.precioVentaCaja),
    };
    if (editing.value) {
      await http.patch(`productos/${editing.value}`, payload);
    } else {
      await http.post('productos', payload);
    }
    bsModal.hide();
    await load();
    Swal.fire({ icon: 'success', title: editing.value ? 'Actualizado' : 'Creado', timer: 1500, showConfirmButton: false });
  } catch (e: any) {
    Swal.fire({ icon: 'error', title: 'Error', text: Array.isArray(e.response?.data?.message) ? e.response.data.message.join(', ') : (e.response?.data?.message || 'Error') });
  }
}

async function remove(id: number) { const r = await Swal.fire({ title: '¿Eliminar?', icon: 'warning', showCancelButton: true, confirmButtonText: 'Sí' }); if (r.isConfirmed) { await http.delete(`productos/${id}`); await load(); Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false }) } }
</script>

<style scoped>
.product-thumb-container {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.product-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.product-thumb-fallback {
  font-size: 1.1rem;
}
.preview-asset {
  width: 180px;
  height: 140px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.1);
}
</style>
