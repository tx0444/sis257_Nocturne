<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4><i class="bi bi-truck me-2" style="color: var(--primary-light);"></i>Proveedores</h4>
      <button class="btn btn-primary-custom" @click="openModal()"><i class="bi bi-plus-lg me-1"></i> Nuevo</button>
    </div>
    <div class="search-box mb-3" style="max-width: 350px;"><i class="bi bi-search"></i><input type="text" class="form-control" placeholder="Buscar proveedor..." v-model="search" /></div>
    <div class="table-dark-custom">
      <table class="table table-hover mb-0">
        <thead><tr><th>#</th><th>Nombre</th><th>NIT</th><th>Teléfono</th><th>Correo</th><th>Estado</th><th>Acciones</th></tr></thead>
        <tbody>
          <tr v-for="(item, i) in filtered" :key="item.id">
            <td>{{ i+1 }}</td><td class="fw-semibold">{{ item.nombre }}</td><td>{{ item.nit || '-' }}</td><td>{{ item.telefono || '-' }}</td><td class="text-secondary">{{ item.correo || '-' }}</td>
            <td><span :class="item.estado ? 'badge badge-stock-ok' : 'badge badge-stock-low'">{{ item.estado ? 'Activo' : 'Inactivo' }}</span></td>
            <td><button class="btn btn-sm btn-outline-info me-1" @click="openModal(item)"><i class="bi bi-pencil"></i></button><button class="btn btn-sm btn-outline-danger" @click="remove(item.id)"><i class="bi bi-trash"></i></button></td>
          </tr>
          <tr v-if="filtered.length===0"><td colspan="7" class="text-center text-secondary py-4">No se encontraron proveedores</td></tr>
        </tbody>
      </table>
    </div>
    <div class="modal fade" ref="modalRef" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title">{{ editing ? 'Editar' : 'Nuevo' }} Proveedor</h5><button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <div class="row g-3">
          <div class="col-md-6"><label class="form-label">Nombre</label><input class="form-control" v-model="form.nombre" required /></div>
          <div class="col-md-6"><label class="form-label">NIT</label><input class="form-control" v-model="form.nit" /></div>
          <div class="col-md-6"><label class="form-label">Teléfono</label><input class="form-control" v-model="form.telefono" /></div>
          <div class="col-md-6"><label class="form-label">Correo</label><input class="form-control" v-model="form.correo" type="email" /></div>
          <div class="col-12"><label class="form-label">Dirección</label><input class="form-control" v-model="form.direccion" /></div>
        </div>
      </div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button><button class="btn btn-primary-custom" @click="save">{{ editing ? 'Actualizar' : 'Guardar' }}</button></div>
    </div></div></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import http from '@/plugins/axios'
import Swal from 'sweetalert2'
import { Modal } from 'bootstrap'

const items = ref<any[]>([])
const search = ref('')
const form = ref({ nombre: '', nit: '', telefono: '', correo: '', direccion: '' })
const editing = ref<number|null>(null)
const modalRef = ref<HTMLElement>()
let bsModal: Modal
const filtered = computed(() => items.value.filter(i => i.nombre.toLowerCase().includes(search.value.toLowerCase())))
onMounted(async () => { bsModal = new Modal(modalRef.value!); await load() })
async function load() { items.value = (await http.get('proveedores')).data }
function openModal(item?: any) {
  if (item) { editing.value = item.id; form.value = { nombre: item.nombre, nit: item.nit||'', telefono: item.telefono||'', correo: item.correo||'', direccion: item.direccion||'' } }
  else { editing.value = null; form.value = { nombre: '', nit: '', telefono: '', correo: '', direccion: '' } }
  bsModal.show()
}
async function save() {
  try { if (editing.value) await http.patch(`proveedores/${editing.value}`, form.value); else await http.post('proveedores', form.value); bsModal.hide(); await load(); Swal.fire({ icon: 'success', title: editing.value ? 'Actualizado' : 'Creado', timer: 1500, showConfirmButton: false }) }
  catch (e: any) { Swal.fire({ icon: 'error', title: 'Error', text: e.response?.data?.message || 'Error' }) }
}
async function remove(id: number) { const r = await Swal.fire({ title: '¿Eliminar?', icon: 'warning', showCancelButton: true, confirmButtonText: 'Sí' }); if (r.isConfirmed) { await http.delete(`proveedores/${id}`); await load(); Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false }) } }
</script>
