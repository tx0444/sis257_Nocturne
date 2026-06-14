<template>
  <div class="d-flex min-vh-100" style="background: var(--bg-dark);">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ show: sidebarOpen }">
      <div class="sidebar-brand">
        <div class="d-flex align-items-center justify-content-center gap-2 mb-1">
          <i class="bi bi-cart-fill text-gold" style="font-size: 1.4rem;"></i>
          <h4 class="mb-0" style="font-family:'Outfit',sans-serif; font-size:1.1rem; font-weight:800; color:var(--primary); letter-spacing:1.5px;">NOCTURNE:COLD STORAGE</h4>
        </div>
        <small class="tracking-widest" style="color:var(--text-secondary);">Punto de Venta</small>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section-title">Operaciones</div>
        <router-link to="/vendedor/dashboard" class="nav-link" @click="sidebarOpen = false">
          <i class="bi bi-grid-1x2-fill"></i> Dashboard
        </router-link>
        <router-link to="/vendedor/caja" class="nav-link" @click="sidebarOpen = false">
          <i class="bi bi-cash-coin"></i> Caja (Arqueo)
        </router-link>
        <router-link to="/vendedor/ventas/nueva" class="nav-link nav-link-pos" @click="sidebarOpen = false">
          <i class="bi bi-cart-plus-fill"></i> Nueva Venta
        </router-link>
        <router-link to="/vendedor/ventas" class="nav-link" @click="sidebarOpen = false">
          <i class="bi bi-receipt"></i> Mis Ventas
        </router-link>
        <router-link to="/vendedor/delivery" class="nav-link" @click="sidebarOpen = false">
          <i class="bi bi-geo-alt-fill"></i> Mis Entregas (Delivery)
        </router-link>

        <div class="nav-section-title">Catálogo</div>
        <router-link to="/vendedor/productos" class="nav-link" @click="sidebarOpen = false">
          <i class="bi bi-box-seam-fill"></i> Productos
        </router-link>
        <router-link to="/vendedor/clientes" class="nav-link" @click="sidebarOpen = false">
          <i class="bi bi-people-fill"></i> Clientes
        </router-link>

        <div class="nav-section-title">Usuario</div>
        <router-link to="/vendedor/perfil" class="nav-link" @click="sidebarOpen = false">
          <i class="bi bi-person-circle"></i> Mi Perfil
        </router-link>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="main-content flex-grow-1">
      <header class="top-header">
        <button class="btn btn-sm d-md-none" style="border: 1px solid var(--border-color); color: var(--text-secondary);" @click="sidebarOpen = !sidebarOpen">
          <i class="bi bi-list"></i>
        </button>
        <span class="d-none d-md-block" style="font-size:0.75rem; color:var(--text-secondary);">
          Bienvenido, <strong class="text-gold">{{ authStore.fullName }}</strong>
        </span>
        <div class="d-flex align-items-center gap-2 ms-auto">
          <span class="badge bg-gold-trans text-gold text-uppercase" style="letter-spacing:1px; font-size:0.65rem;">
            <i class="bi bi-person-badge-fill me-1"></i>{{ authStore.user?.rol?.nombre }}
          </span>
          <button class="btn btn-sm" style="border:1px solid rgba(239,68,68,0.3); color:#ef4444; border-radius:8px;" @click="handleLogout">
            <i class="bi bi-box-arrow-right me-1"></i> Salir
          </button>
        </div>
      </header>
      <div class="content-area flex-grow-1">
        <router-view />
      </div>
      <!-- Footer del Sistema -->
      <footer class="system-footer text-center py-3 border-top" style="border-color: var(--border-color) !important; background-color: var(--bg-card); font-size: 0.72rem; color: var(--text-secondary);">
        <div class="container-fluid">
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
            <span>&copy; 2026 NOCTURNE:COLD STORAGE. Todos los derechos reservados.</span>
            <span>
              <i class="bi bi-geo-alt-fill text-gold me-1"></i>Calle El Paraiso 123, Sucre - Bolivia &nbsp;|&nbsp;
              <i class="bi bi-telephone-fill text-gold me-1"></i>+591 75781303 &nbsp;|&nbsp;
              <i class="bi bi-envelope-fill text-gold me-1"></i>contacto@lafortaleza.com.bo
            </span>
          </div>
        </div>
      </footer>
    </div>

    <!-- Mobile Backdrop -->
    <div
      v-if="sidebarOpen"
      class="position-fixed top-0 start-0 w-100 h-100 d-md-none"
      style="background:rgba(0,0,0,0.7); z-index:1035; backdrop-filter:blur(4px);"
      @click="sidebarOpen = false"
    ></div>
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

<style scoped>
/* ── POS Action Highlight ── */
.sidebar-nav .nav-link-pos {
  background: rgba(212,175,55,0.10);
  margin: 0.25rem 0.75rem;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  border-left: 3px solid var(--primary);
  color: var(--primary-light);
  font-weight: 600;
}

.sidebar-nav .nav-link-pos:hover {
  background: rgba(212,175,55,0.18);
  box-shadow: 0 4px 12px rgba(212,175,55,0.15);
}
</style>
