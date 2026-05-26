<template>
  <div class="container py-5" style="max-width: 420px">
    <div class="card card-nocturne p-4">
      <h1 class="h4 font-display text-gold text-center mb-1">NOCTURNE</h1>
      <p class="text-center text-secondary small mb-4">Acceso al panel administrativo</p>

      <div v-if="error" class="alert alert-danger small">{{ error }}</div>

      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label class="form-label small text-gold">Email</label>
          <input v-model.trim="email" type="email" class="form-control" required />
        </div>
        <div class="mb-4">
          <label class="form-label small text-gold">Contrasena</label>
          <input v-model="password" type="password" class="form-control" required />
        </div>
        <button class="btn btn-gold w-100" type="submit" :disabled="loading">
          {{ loading ? 'Entrando...' : 'Iniciar sesion' }}
        </button>
      </form>

      <p class="small text-secondary mt-4 mb-0 text-center">
        Demo admin: <code>admin@nocturne.bo</code> / <code>Nocturne2026!</code>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const email = ref('admin@nocturne.bo');
const password = ref('Nocturne2026!');
const error = ref('');
const loading = ref(false);
const { login } = useAuth();
const router = useRouter();
const route = useRoute();

async function onSubmit() {
  error.value = '';
  loading.value = true;
  try {
    await login(email.value, password.value);
    const redirect = route.query.redirect || '/panel';
    router.push(String(redirect));
  } catch (e) {
    const message = e.response?.data?.message;
    error.value = Array.isArray(message) ? message.join(', ') : message || 'Credenciales invalidas';
  } finally {
    loading.value = false;
  }
}
</script>
