<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4><i class="bi bi-people-fill me-2" style="color: var(--primary-light);"></i>Clientes</h4>
      <button class="btn btn-primary-custom" @click="openModal()"><i class="bi bi-plus-lg me-1"></i> Nuevo</button>
    </div>
    <div class="search-box mb-3" style="max-width: 350px;"><i class="bi bi-search"></i><input type="text" class="form-control" placeholder="Buscar por nombre, apellido o CI/NIT..." v-model="search" /></div>
    <div class="table-dark-custom">
      <table class="table table-hover mb-0">
        <thead><tr><th>#</th><th>Nombre</th><th>Apellido</th><th>CI/NIT</th><th>Teléfono</th><th>Acciones</th></tr></thead>
        <tbody>
          <tr v-for="(item, i) in filtered" :key="item.id">
            <td>{{ i+1 }}</td><td class="fw-semibold">{{ item.nombre }}</td><td>{{ item.apellido }}</td><td>{{ item.ciNit || '-' }}</td><td>{{ item.telefono || '-' }}</td>
            <td><button class="btn btn-sm btn-outline-info me-1" @click="openModal(item)"><i class="bi bi-pencil"></i></button><button class="btn btn-sm btn-outline-danger" @click="remove(item.id)"><i class="bi bi-trash"></i></button></td>
          </tr>
          <tr v-if="filtered.length===0"><td colspan="6" class="text-center text-secondary py-4">No se encontraron clientes</td></tr>
        </tbody>
      </table>
    </div>
    <div class="modal fade" ref="modalRef" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title">{{ editing ? 'Editar' : 'Nuevo' }} Cliente</h5><button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button></div>
      <div class="modal-body"><div class="row g-3">
        <div class="col-md-6"><label class="form-label">Nombre</label><input class="form-control" v-model="form.nombre" required /></div>
        <div class="col-md-6"><label class="form-label">Apellido</label><input class="form-control" v-model="form.apellido" required /></div>
        <div class="col-md-4"><label class="form-label">CI/NIT</label><input class="form-control" v-model="form.ciNit" /></div>
        <div class="col-md-4"><label class="form-label">Teléfono</label><input class="form-control" v-model="form.telefono" /></div>
        <div class="col-md-4"><label class="form-label">Correo</label><input class="form-control" v-model="form.correo" /></div>
        <div class="col-12"><label class="form-label">Dirección</label><input class="form-control" v-model="form.direccion" /></div>
      </div></div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button><button class="btn btn-primary-custom" @click="save">{{ editing ? 'Actualizar' : 'Guardar' }}</button></div>
    </div></div></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import http from '@/plugins/axios'
import Swal from 'sweetalert2'
import { Modal } from 'bootstrap'
const items = ref<any[]>([]); const search = ref(''); const form = ref({ nombre: '', apellido: '', ciNit: '', telefono: '', correo: '', direccion: '' }); const editing = ref<number|null>(null); const modalRef = ref<HTMLElement>(); let bsModal: Modal
const filtered = computed(() => items.value.filter(i => `${i.nombre} ${i.apellido} ${i.ciNit || ''}`.toLowerCase().includes(search.value.toLowerCase())))
onMounted(async () => { bsModal = new Modal(modalRef.value!); await load() })
async function load() { items.value = (await http.get('clientes')).data }
function openModal(item?: any) { if (item) { editing.value = item.id; form.value = { nombre: item.nombre, apellido: item.apellido, ciNit: item.ciNit||'', telefono: item.telefono||'', correo: item.correo||'', direccion: item.direccion||'' } } else { editing.value = null; form.value = { nombre: '', apellido: '', ciNit: '', telefono: '', correo: '', direccion: '' } } bsModal.show() }
async function save() { try { if (editing.value) await http.patch(`clientes/${editing.value}`, form.value); else await http.post('clientes', form.value); bsModal.hide(); await load(); Swal.fire({ icon: 'success', title: editing.value ? 'Actualizado' : 'Creado', timer: 1500, showConfirmButton: false }) } catch (e: any) { Swal.fire({ icon: 'error', title: 'Error', text: e.response?.data?.message || 'Error' }) } }
async function remove(id: number) { const r = await Swal.fire({ title: '¿Eliminar?', icon: 'warning', showCancelButton: true, confirmButtonText: 'Sí' }); if (r.isConfirmed) { await http.delete(`clientes/${id}`); await load(); Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false }) } }
</script>
