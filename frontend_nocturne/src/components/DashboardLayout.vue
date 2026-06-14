<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ show: sidebarOpen }">
      <div class="sidebar-brand">
        <h4><img src="/logo_owl.png" alt="Nocturne Logo" style="height: 2.5em; width: auto; object-fit: contain; margin-right: 12px; border-radius: 50%;" /> NOCTURNE:COLD STORAGE</h4>
        <small>Sistema de Licorería</small>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section-title">Principal</div>
        <router-link to="/admin" class="nav-link" @click="sidebarOpen = false">
          <i class="bi bi-grid-1x2-fill"></i> Dashboard
        </router-link>

        <div class="nav-section-title">Inventario</div>
        <router-link v-if="authStore.isAdmin" to="/admin/categorias" class="nav-link" @click="sidebarOpen = false">
          <i class="bi bi-tags-fill"></i> Categorías
        </router-link>
        <router-link v-if="authStore.isAdmin" to="/admin/marcas" class="nav-link" @click="sidebarOpen = false">
          <i class="bi bi-bookmark-star-fill"></i> Marcas
        </router-link>
        <router-link to="/admin/productos" class="nav-link" @click="sidebarOpen = false">
          <i class="bi bi-box-seam-fill"></i> Productos
        </router-link>
        <router-link v-if="authStore.isAdmin" to="/admin/proveedores" class="nav-link" @click="sidebarOpen = false">
          <i class="bi bi-truck"></i> Proveedores
        </router-link>

        <div class="nav-section-title">Operaciones</div>
        <router-link to="/admin/ventas" class="nav-link" @click="sidebarOpen = false">
          <i class="bi bi-cart-check-fill"></i> Ventas
        </router-link>
        <router-link v-if="authStore.isAdmin" to="/admin/compras" class="nav-link" @click="sidebarOpen = false">
          <i class="bi bi-bag-plus-fill"></i> Compras
        </router-link>
        <router-link to="/admin/clientes" class="nav-link" @click="sidebarOpen = false">
          <i class="bi bi-people-fill"></i> Clientes
        </router-link>

        <div class="nav-section-title" v-if="authStore.isAdmin">Administración</div>
        <router-link v-if="authStore.isAdmin" to="/admin/auditoria" class="nav-link" @click="sidebarOpen = false">
          <i class="bi bi-journal-text"></i> Auditoría (Bitácora)
        </router-link>
        <router-link v-if="authStore.isAdmin" to="/admin/usuarios" class="nav-link" @click="sidebarOpen = false">
          <i class="bi bi-person-gear"></i> Usuarios
        </router-link>
      </nav>
    </aside>

    <!-- Main content -->
    <div class="main-content flex-grow-1">
      <header class="top-header">
        <button class="btn btn-sm btn-outline-secondary d-md-none" @click="sidebarOpen = !sidebarOpen">
          <i class="bi bi-list"></i>
        </button>
        <div class="d-flex align-items-center gap-2">
          <span class="text-secondary" style="font-size: 0.85rem;">
            <i class="bi bi-person-circle"></i> {{ authStore.fullName }}
          </span>
          <span class="badge text-uppercase" style="background: rgba(212,175,55,0.15); color: var(--primary); font-size: 0.7rem;">
            {{ authStore.user?.rol?.nombre }}
          </span>
          <button class="btn btn-sm btn-outline-danger ms-2" @click="handleLogout">
            <i class="bi bi-box-arrow-right"></i> Salir
          </button>
        </div>
      </header>
      <div class="content-area">
        <router-view />
      </div>
    </div>

    <!-- Backdrop for mobile -->
    <div v-if="sidebarOpen" class="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-md-none" style="z-index: 1035;" @click="sidebarOpen = false"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const sidebarOpen = ref(false)

function handleLogout() {
  authStore.logout()
}
</script>
