<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4><i class="bi bi-person-gear me-2" style="color: var(--primary-light);"></i>Usuarios</h4>
      <button class="btn btn-primary-custom" @click="openModal()"><i class="bi bi-plus-lg me-1"></i> Nuevo</button>
    </div>
    <div class="table-dark-custom">
      <table class="table table-hover mb-0">
        <thead><tr><th>#</th><th>Nombre</th><th>Apellido</th><th>Usuario</th><th>Correo</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr></thead>
        <tbody>
          <tr v-for="(u, i) in items" :key="u.id">
            <td>{{ i+1 }}</td><td class="fw-semibold">{{ u.nombre }}</td><td>{{ u.apellido }}</td><td><code>{{ u.usuario }}</code></td><td class="text-secondary">{{ u.correo }}</td>
            <td><span class="badge" style="background: rgba(124,58,237,0.2); color: var(--primary-light);">{{ u.rol?.nombre }}</span></td>
            <td><span :class="u.estado ? 'badge badge-stock-ok' : 'badge badge-stock-low'">{{ u.estado ? 'Activo' : 'Inactivo' }}</span></td>
            <td><button class="btn btn-sm btn-outline-info me-1" @click="openModal(u)"><i class="bi bi-pencil"></i></button><button class="btn btn-sm btn-outline-danger" @click="remove(u.id)"><i class="bi bi-trash"></i></button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal fade" ref="modalRef" tabindex="-1"><div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title">{{ editing ? 'Editar' : 'Nuevo' }} Usuario</h5><button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button></div>
      <div class="modal-body"><div class="row g-3">
        <div class="col-md-6"><label class="form-label">Nombre</label><input class="form-control" v-model="form.nombre" required /></div>
        <div class="col-md-6"><label class="form-label">Apellido</label><input class="form-control" v-model="form.apellido" required /></div>
        <div class="col-md-6"><label class="form-label">Usuario</label><input class="form-control" v-model="form.usuario" required /></div>
        <div class="col-md-6"><label class="form-label">Correo</label><input class="form-control" v-model="form.correo" type="email" required /></div>
        <div class="col-md-6"><label class="form-label">Contraseña {{ editing ? '(dejar vacío para no cambiar)' : '' }}</label><input class="form-control" v-model="form.password" type="password" :required="!editing" /></div>
        <div class="col-md-6"><label class="form-label">Rol</label><select class="form-select" v-model="form.rolId" required><option v-for="r in roles" :key="r.id" :value="r.id">{{ r.nombre }}</option></select></div>
      </div></div>
      <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button><button class="btn btn-primary-custom" @click="save">{{ editing ? 'Actualizar' : 'Guardar' }}</button></div>
    </div></div></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import http from '@/plugins/axios'
import Swal from 'sweetalert2'
import { Modal } from 'bootstrap'
const items = ref<any[]>([]); const roles = ref<any[]>([]); const editing = ref<number|null>(null); const modalRef = ref<HTMLElement>(); let bsModal: Modal
const form = ref({ nombre: '', apellido: '', usuario: '', correo: '', password: '', rolId: 1 })
onMounted(async () => { bsModal = new Modal(modalRef.value!); const [u, r] = await Promise.all([http.get('usuarios'), http.get('roles')]); items.value = u.data; roles.value = r.data })
async function load() { items.value = (await http.get('usuarios')).data }
function openModal(item?: any) { if (item) { editing.value = item.id; form.value = { nombre: item.nombre, apellido: item.apellido, usuario: item.usuario, correo: item.correo, password: '', rolId: item.rolId } } else { editing.value = null; form.value = { nombre: '', apellido: '', usuario: '', correo: '', password: '', rolId: 1 } } bsModal.show() }
async function save() {
  try { const data: any = { ...form.value }; if (editing.value && !data.password) delete data.password
    if (editing.value) await http.patch(`usuarios/${editing.value}`, data); else await http.post('usuarios', data)
    bsModal.hide(); await load(); Swal.fire({ icon: 'success', title: editing.value ? 'Actualizado' : 'Creado', timer: 1500, showConfirmButton: false })
  } catch (e: any) { Swal.fire({ icon: 'error', title: 'Error', text: e.response?.data?.message || 'Error' }) }
}
async function remove(id: number) { const r = await Swal.fire({ title: '¿Eliminar?', icon: 'warning', showCancelButton: true, confirmButtonText: 'Sí' }); if (r.isConfirmed) { await http.delete(`usuarios/${id}`); await load(); Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false }) } }
</script>
