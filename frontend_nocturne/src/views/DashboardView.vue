<template>
  <div class="dashboard-switcher-wrapper">
    <AdminDashboardView v-if="authStore.isAdmin" />
    <VendedorDashboardView v-else />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import AdminDashboardView from './AdminDashboardView.vue'
import VendedorDashboardView from './VendedorDashboardView.vue'

const authStore = useAuthStore()
</script>

<style scoped>
.dashboard-switcher-wrapper {
  min-height: 100%;
}
</style>
