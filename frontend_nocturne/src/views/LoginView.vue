<template>
  <div class="login-container">
    <div class="login-card">
      <div class="text-center mb-4">
        <img src="/logo_owl.png" alt="Nocturne Logo" style="height: 2.5em; width: auto; object-fit: contain; margin-right: 12px; border-radius: 50%;" />
        <h3 class="mt-2" style="color: var(--accent); font-weight: 800; letter-spacing: 1px;">NOCTURNE:COLD STORAGE</h3>
        <p class="text-secondary" style="font-size: 0.8rem;">Sistema de Gestión de Licorería</p>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="mb-3">
          <label class="form-label">Usuario</label>
          <div class="input-group">
            <span class="input-group-text" style="background: var(--bg-dark); border-color: var(--border-color); color: var(--text-secondary);">
              <i class="bi bi-person"></i>
            </span>
            <input type="text" class="form-control" v-model="usuario" placeholder="Ingrese su usuario" required />
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Contraseña</label>
          <div class="input-group">
            <span class="input-group-text" style="background: var(--bg-dark); border-color: var(--border-color); color: var(--text-secondary);">
              <i class="bi bi-lock"></i>
            </span>
            <input type="password" class="form-control" v-model="clave" placeholder="Ingrese su contraseña" required />
          </div>
        </div>

        <p v-if="error" class="text-danger text-center" style="font-size: 0.85rem;">
          <i class="bi bi-exclamation-circle"></i> Usuario y/o contraseña incorrectos
        </p>

        <button type="submit" class="btn btn-primary-custom w-100 py-2 mt-2" :disabled="loading">
          <span v-if="loading"><i class="bi bi-arrow-repeat spin"></i> Verificando...</span>
          <span v-else><i class="bi bi-box-arrow-in-right"></i> Ingresar</span>
        </button>
      </form>

      <div class="text-center mt-3">
        <router-link to="/register" class="text-accent" style="font-size: 0.85rem; text-decoration: none; font-weight: 600;">
          ¿No tienes una cuenta? Regístrate aquí
        </router-link>
      </div>

      <div class="text-center mt-2">
        <router-link to="/" class="text-secondary" style="font-size: 0.8rem; text-decoration: none;">
          <i class="bi bi-arrow-left"></i> Volver al Catálogo
        </router-link>
      </div>

      <div class="text-center mt-4 pt-3" style="border-top: 1px solid var(--border-color);">
        <small class="text-secondary"><img src="/logo_owl.png" alt="Nocturne Logo" style="height: 2.5em; width: auto; object-fit: contain; margin-right: 12px; border-radius: 50%;" /> SIS257 - Proyecto Académico</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const usuario = ref('')
const clave = ref('')
const error = ref(false)
const loading = ref(false)
const authStore = useAuthStore()

function onSubmit() {
  error.value = false
  loading.value = true
  authStore.login(usuario.value, clave.value)
    .catch(() => {
      error.value = true
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<style scoped>
.spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
