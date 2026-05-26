<template>
  <div class="container py-5" style="max-width: 600px">
    <div class="card card-nocturne p-4">
      <h1 class="h3 font-serif text-white mb-4">Mi Perfil</h1>

      <div v-if="successMsg" class="alert alert-success small">{{ successMsg }}</div>
      <div v-if="errorMsg" class="alert alert-danger small">{{ errorMsg }}</div>

      <form @submit.prevent="guardarCambios">
        <div class="mb-3">
          <label class="form-label small text-gold">Nombre completo</label>
          <input v-model.trim="form.nombre" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label small text-gold">Email</label>
          <input v-model.trim="form.email" type="email" class="form-control" required disabled />
          <div class="form-text text-secondary">El email no se puede cambiar.</div>
        </div>
        <div class="mb-3">
          <label class="form-label small text-gold">Dirección</label>
          <input v-model.trim="form.direccion" type="text" class="form-control" />
        </div>
        <div class="mb-4">
          <label class="form-label small text-gold">Teléfono</label>
          <input v-model.trim="form.telefono" type="text" class="form-control" />
        </div>
        
        <h4 class="h5 font-serif text-white mb-3 mt-4">Cambiar Contraseña</h4>
        <div class="mb-4">
          <label class="form-label small text-gold">Nueva Contraseña (dejar en blanco para mantener la actual)</label>
          <input v-model="form.password" type="password" class="form-control" />
        </div>

        <button class="btn btn-gold w-100" type="submit" :disabled="loading">
          {{ loading ? 'Guardando...' : 'Guardar Cambios' }}
        </button>
      </form>

      <h2 class="h4 font-serif text-white mb-3 mt-5 border-top border-secondary pt-4">Historial de Compras</h2>
      <div v-if="loadingHistory" class="text-secondary small">Cargando historial...</div>
      <div v-else-if="historial.length === 0" class="text-secondary small">No tienes compras registradas aún.</div>
      <div v-else class="table-responsive">
        <table class="table table-dark table-striped align-middle small">
          <thead>
            <tr class="text-gold">
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Detalle</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="venta in historial" :key="venta.id">
              <td>{{ new Date(venta.fechaHora).toLocaleDateString() }}</td>
              <td>Bs. {{ Number(venta.total).toFixed(2) }}</td>
              <td>{{ venta.estado }}</td>
              <td>
                <ul class="list-unstyled mb-0">
                  <li v-for="det in venta.detallesVentas" :key="det.id">
                    {{ det.cantidad }}x {{ det.producto?.nombre || 'Producto' }}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { clienteApi } from '@/api/client';

const { user, loadProfile } = useAuth();
const loading = ref(false);
const successMsg = ref('');
const errorMsg = ref('');

const historial = ref([]);
const loadingHistory = ref(false);

const form = reactive({
  nombre: '',
  email: '',
  direccion: '',
  telefono: '',
  password: '',
});

onMounted(async () => {
  if (user.value) {
    form.nombre = user.value.nombre || '';
    form.email = user.value.email || '';
    form.direccion = user.value.direccion || '';
    form.telefono = user.value.telefono || '';
    
    await cargarHistorial();
  }
});

async function cargarHistorial() {
  loadingHistory.value = true;
  try {
    const res = await clienteApi.misCompras();
    historial.value = res.data;
  } catch (e) {
    console.error('Error al cargar historial', e);
  } finally {
    loadingHistory.value = false;
  }
}

async function guardarCambios() {
  successMsg.value = '';
  errorMsg.value = '';
  loading.value = true;
  try {
    const payload = {
      nombre: form.nombre,
      direccion: form.direccion,
      telefono: form.telefono,
    };
    if (form.password) {
      payload.password = form.password;
    }
    
    await clienteApi.actualizar(user.value.id, payload);
    await loadProfile(); // Recargar datos locales
    successMsg.value = 'Perfil actualizado correctamente';
    form.password = '';
  } catch (e) {
    const message = e.response?.data?.message;
    errorMsg.value = Array.isArray(message) ? message.join(', ') : message || 'Error al actualizar perfil';
  } finally {
    loading.value = false;
  }
}
</script>
