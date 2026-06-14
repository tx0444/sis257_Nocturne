<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4><i class="bi bi-tags-fill me-2" style="color: var(--primary-light);"></i>Categorías</h4>
      <button class="btn btn-primary-custom" @click="openModal()"><i class="bi bi-plus-lg me-1"></i> Nueva</button>
    </div>
    <div class="search-box mb-3" style="max-width: 350px;">
      <i class="bi bi-search"></i>
      <input type="text" class="form-control" placeholder="Buscar categoría..." v-model="search" />
    </div>
    <div class="table-dark-custom">
      <table class="table table-hover mb-0">
        <thead><tr><th>#</th><th>Imagen</th><th>Nombre</th><th>Descripción</th><th>Estado</th><th>Acciones</th></tr></thead>
        <tbody>
          <tr v-for="(item, i) in filtered" :key="item.id">
            <td>{{ i + 1 }}</td>
            <td>
              <div class="category-thumb-container" style="width: 45px; height: 45px; border-radius: 8px; overflow: hidden; background: #111; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.05);">
                <img v-if="item.imagen" :src="getImageUrl(item.imagen)" :alt="item.nombre" style="width: 100%; height: 100%; object-fit: cover;" />
                <i v-else class="bi bi-tags text-secondary" style="font-size: 1.2rem;"></i>
              </div>
            </td>
            <td class="fw-semibold">{{ item.nombre }}</td>
            <td class="text-secondary">{{ item.descripcion || '-' }}</td>
            <td><span :class="item.estado ? 'badge badge-stock-ok' : 'badge badge-stock-low'">{{ item.estado ? 'Activo' : 'Inactivo' }}</span></td>
            <td>
              <button class="btn btn-sm btn-outline-info me-1" @click="openModal(item)"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-sm btn-outline-danger" @click="remove(item.id)"><i class="bi bi-trash"></i></button>
            </td>
          </tr>
          <tr v-if="filtered.length === 0"><td colspan="6" class="text-center text-secondary py-4">No se encontraron categorías</td></tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="modalCategoria" tabindex="-1" ref="modalRef">
      <div class="modal-dialog"><div class="modal-content">
        <div class="modal-header"><h5 class="modal-title">{{ editing ? 'Editar' : 'Nueva' }} Categoría</h5><button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button></div>
        <div class="modal-body">
          <div class="mb-3"><label class="form-label">Nombre</label><input class="form-control" v-model="form.nombre" required /></div>
          <div class="mb-3"><label class="form-label">Descripción</label><textarea class="form-control" v-model="form.descripcion" rows="2"></textarea></div>
          <div class="mb-3">
            <label class="form-label">Imagen de la Categoría</label>
            <div class="input-group">
              <input type="text" class="form-control" v-model="form.imagen" placeholder="URL de la imagen (ej: https://...)" />
              <input type="file" ref="fileInputRef" class="d-none" accept="image/*" @change="onFileSelected" />
              <button class="btn btn-outline-secondary text-white" type="button" @click="triggerFileInput" style="border: 1px solid var(--border-color); background: rgba(255,255,255,0.05);">
                <i class="bi bi-upload me-1"></i> Subir Imagen
              </button>
            </div>
            <small class="text-secondary mt-1 d-block">Puedes ingresar una URL de Internet o subir un archivo local.</small>
            
            <!-- Preview -->
            <div v-if="form.imagen" class="mt-3 position-relative d-inline-block" style="max-width: 150px;">
              <img :src="getImageUrl(form.imagen)" class="preview-asset rounded border border-secondary" style="width: 100%; object-fit: cover; height: 100px;" />
              <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 rounded-circle p-1 d-flex align-items-center justify-content-center" style="width: 24px; height: 24px; line-height: 1; z-index: 5;" @click="form.imagen = ''">
                <i class="bi bi-x" style="font-size: 1rem; color: #fff;"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button class="btn btn-primary-custom" @click="save">{{ editing ? 'Actualizar' : 'Guardar' }}</button>
        </div>
      </div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import http from '@/plugins/axios'
import Swal from 'sweetalert2'
import { getImageUrl } from '@/helpers'
import { Modal } from 'bootstrap'

const items = ref<any[]>([])
const search = ref('')
const form = ref({ nombre: '', descripcion: '', imagen: '' })
const editing = ref<number | null>(null)
const modalRef = ref<HTMLElement>()
const fileInputRef = ref<HTMLInputElement | null>(null)
let bsModal: Modal

const filtered = computed(() => items.value.filter(i => i.nombre.toLowerCase().includes(search.value.toLowerCase())))

onMounted(async () => {
  bsModal = new Modal(modalRef.value!)
  await load()
})

async function load() {
  const res = await http.get('categorias')
  items.value = res.data
}

function openModal(item?: any) {
  if (item) { 
    editing.value = item.id; 
    form.value = { 
      nombre: item.nombre, 
      descripcion: item.descripcion || '', 
      imagen: item.imagen || '' 
    } 
  }
  else { 
    editing.value = null; 
    form.value = { nombre: '', descripcion: '', imagen: '' } 
  }
  bsModal.show()
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
      const res = await http.post('productos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      form.value.imagen = res.data.url
    } catch (e) {
      Swal.fire({ icon: 'error', title: 'Error al subir', text: 'No se pudo subir la imagen de la categoría.' })
    }
  }
}

async function save() {
  try {
    if (editing.value) await http.patch(`categorias/${editing.value}`, form.value)
    else await http.post('categorias', form.value)
    bsModal.hide()
    await load()
    Swal.fire({ icon: 'success', title: editing.value ? 'Actualizado' : 'Creado', timer: 1500, showConfirmButton: false })
  } catch (e: any) {
    Swal.fire({ icon: 'error', title: 'Error', text: e.response?.data?.message || 'Error al guardar' })
  }
}

async function remove(id: number) {
  const result = await Swal.fire({ title: '¿Eliminar?', text: 'Esta acción no se puede deshacer', icon: 'warning', showCancelButton: true, confirmButtonText: 'Sí, eliminar' })
  if (result.isConfirmed) {
    await http.delete(`categorias/${id}`)
    await load()
    Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false })
  }
}
</script>
