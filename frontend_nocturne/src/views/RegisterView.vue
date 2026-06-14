<template>
  <div class="login-container py-5">
    <div class="login-card" style="max-width: 520px;">
      <div class="text-center mb-4">
        <img src="/logo_owl.png" alt="Nocturne Logo" style="height: 2.5em; width: auto; object-fit: contain; margin-right: 12px; border-radius: 50%;" />
        <h3 class="mt-2 text-white fw-bold">CREAR CUENTA</h3>
        <p class="text-secondary" style="font-size: 0.8rem;">Regístrate para poder usar el Carrito de Compras</p>
      </div>

      <form @submit.prevent="onRegister">
        <div class="row g-2 mb-3">
          <div class="col-6">
            <label class="form-label">Nombre</label>
            <input type="text" class="form-control" v-model="form.nombre" placeholder="Juan" required />
          </div>
          <div class="col-6">
            <label class="form-label">Apellido</label>
            <input type="text" class="form-control" v-model="form.apellido" placeholder="Pérez" required />
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Correo Electrónico</label>
          <input type="email" class="form-control" v-model="form.correo" placeholder="juan@email.com" required />
        </div>

        <div class="row g-2 mb-3">
          <div class="col-6">
            <label class="form-label">Usuario</label>
            <input type="text" class="form-control" v-model="form.usuario" placeholder="jperez" required />
          </div>
          <div class="col-6">
            <label class="form-label">Contraseña</label>
            <input type="password" class="form-control" v-model="form.password" placeholder="Mínimo 4 caracteres" required minlength="4" />
          </div>
        </div>

        <!-- Optional fields to complete Cliente profile -->
        <div class="row g-2 mb-3">
          <div class="col-6">
            <label class="form-label">CI / NIT <span class="text-secondary opacity-50">(Opcional)</span></label>
            <input type="text" class="form-control" v-model="form.ciNit" placeholder="1234567" />
          </div>
          <div class="col-6">
            <label class="form-label">Teléfono <span class="text-secondary opacity-50">(Opcional)</span></label>
            <input type="text" class="form-control" v-model="form.telefono" placeholder="71234567" />
          </div>
        </div>

        <div class="mb-4">
          <label class="form-label">Dirección de Entrega <span class="text-secondary opacity-50">(Opcional)</span></label>
          <input type="text" class="form-control" v-model="form.direccion" placeholder="Calle Falsa #123" />
        </div>

        <p v-if="errorMsg" class="text-danger text-center mb-3" style="font-size: 0.85rem;">
          <i class="bi bi-exclamation-circle"></i> {{ errorMsg }}
        </p>

        <button type="submit" class="btn btn-primary-custom w-100 py-2" :disabled="loading">
          <span v-if="loading"><i class="bi bi-arrow-repeat spin"></i> Registrando...</span>
          <span v-else><i class="bi bi-person-plus-fill"></i> Registrarme y Comprar</span>
        </button>
      </form>

      <div class="text-center mt-3">
        <router-link to="/login" class="text-accent" style="font-size: 0.85rem; text-decoration: none; font-weight: 600;">
          ¿Ya tienes cuenta? Inicia sesión aquí
        </router-link>
      </div>

      <div class="text-center mt-2">
        <router-link to="/" class="text-secondary" style="font-size: 0.8rem; text-decoration: none;">
          <i class="bi bi-arrow-left"></i> Volver al Catálogo
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import http from '@/plugins/axios'
import Swal from 'sweetalert2'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  nombre: '',
  apellido: '',
  correo: '',
  usuario: '',
  password: '',
  ciNit: '',
  telefono: '',
  direccion: '',
})

const loading = ref(false)
const errorMsg = ref('')

async function onRegister() {
  loading.value = true
  errorMsg.value = ''
  
  try {
    const response = await http.post('auth/register', form.value)
    const data = response.data
    
    // Set state in Auth Store directly, identical to login
    authStore.token = data.access_token
    authStore.user = {
      id: data.id,
      nombre: data.nombre,
      apellido: data.apellido,
      correo: data.correo,
      usuario: data.usuario,
      rol: data.rol,
    }
    
    localStorage.setItem('token', data.access_token || '')
    localStorage.setItem('user', JSON.stringify(authStore.user))
    
    await Swal.fire({
      icon: 'success',
      title: '¡Cuenta creada!',
      text: 'Tu registro ha sido exitoso. Bienvenido a NOCTURNE:COLD STORAGE.',
      timer: 2000,
      showConfirmButton: false
    })
    
    router.push('/')
  } catch (e: any) {
    console.error(e)
    errorMsg.value = e.response?.data?.message || 'Error al registrar usuario'
  } finally {
    loading.value = false
  }
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
