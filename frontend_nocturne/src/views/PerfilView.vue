<template>
  <div class="perfil-view animate-fade-in">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="mb-1 text-gold fw-bold"><i class="bi bi-person-circle me-2"></i>Mi Perfil</h4>
        <p class="text-secondary mb-0">Detalles de la cuenta del usuario actual</p>
      </div>
    </div>

    <div class="glass-card p-4" style="max-width: 500px;" v-if="authStore.user">
      <div class="text-center mb-4">
        <div class="avatar-large mb-3">
          <i class="bi bi-person-fill text-gold fs-1"></i>
        </div>
        <h5 class="fw-bold text-light mb-0">{{ authStore.fullName }}</h5>
        <span class="badge bg-gold-trans text-gold mt-1 text-uppercase">{{ authStore.user.rol?.nombre }}</span>
      </div>

      <div class="border-top border-gold-trans pt-3">
        <div class="d-flex justify-content-between py-2 border-bottom border-gold-trans">
          <span class="text-secondary">Nombre de Usuario:</span>
          <span class="text-light fw-semibold">@{{ authStore.user.usuario }}</span>
        </div>
        <div class="d-flex justify-content-between py-2 border-bottom border-gold-trans">
          <span class="text-secondary">Correo Electrónico:</span>
          <span class="text-light">{{ authStore.user.correo }}</span>
        </div>
        <div class="d-flex justify-content-between py-2">
          <span class="text-secondary">Estado de Cuenta:</span>
          <span class="text-success fw-bold"><i class="bi bi-check-circle-fill me-1"></i>Activo</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<style scoped>
.text-gold {
  color: var(--primary) !important;
}
.border-gold-trans {
  border-color: rgba(212, 175, 55, 0.15) !important;
}
.bg-gold-trans {
  background: rgba(212, 175, 55, 0.1) !important;
}
.glass-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}
.avatar-large {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.1);
  border: 2px solid var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
</style>
