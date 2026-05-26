<template>
  <div v-if="show" class="modal-backdrop-nocturne" @click.self="close">
    <div class="card card-nocturne p-4 modal-content-nocturne" style="max-width: 400px; width: 100%;">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="font-serif text-gold mb-0">{{ isRegister ? 'Crear cuenta' : 'Iniciar sesión' }}</h4>
        <button class="btn-close btn-close-white" @click="close"></button>
      </div>

      <div v-if="error" class="alert alert-danger small">{{ error }}</div>

      <form @submit.prevent="onSubmit">
        <div v-if="isRegister" class="mb-3">
          <label class="form-label small text-gold">Nombre completo</label>
          <input v-model.trim="form.nombre" type="text" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label small text-gold">Email</label>
          <input v-model.trim="form.email" type="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label small text-gold">Contraseña</label>
          <input v-model="form.password" type="password" class="form-control" required />
        </div>
        <div v-if="isRegister" class="mb-3">
          <label class="form-label small text-gold">Dirección (Opcional)</label>
          <input v-model.trim="form.direccion" type="text" class="form-control" />
        </div>
        <div v-if="isRegister" class="mb-4">
          <label class="form-label small text-gold">Teléfono (Opcional)</label>
          <input v-model.trim="form.telefono" type="text" class="form-control" />
        </div>

        <button class="btn btn-gold w-100 mb-3" type="submit" :disabled="loading">
          {{ loading ? 'Procesando...' : (isRegister ? 'Registrarse' : 'Entrar') }}
        </button>

        <p class="text-center small text-secondary mb-0">
          {{ isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?' }}
          <a href="#" class="text-gold text-decoration-none" @click.prevent="toggleMode">
            {{ isRegister ? 'Inicia sesión' : 'Crea una' }}
          </a>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useAuth } from '@/composables/useAuth';

const props = defineProps({ show: Boolean });
const emit = defineEmits(['close', 'success']);
const { loginClient, registerClient } = useAuth();

const isRegister = ref(false);
const loading = ref(false);
const error = ref('');

const form = reactive({
  nombre: '',
  email: '',
  password: '',
  direccion: '',
  telefono: '',
});

function close() {
  emit('close');
}

function toggleMode() {
  isRegister.value = !isRegister.value;
  error.value = '';
}

async function onSubmit() {
  error.value = '';
  loading.value = true;
  try {
    if (isRegister.value) {
      await registerClient({ ...form });
    } else {
      await loginClient(form.email, form.password);
    }
    emit('success');
    close();
  } catch (e) {
    const message = e.response?.data?.message;
    error.value = Array.isArray(message) ? message.join(', ') : message || 'Error al autenticar';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.modal-backdrop-nocturne {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  backdrop-filter: blur(5px);
}
.modal-content-nocturne {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  animation: modalIn 0.3s ease-out forwards;
}
@keyframes modalIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
