<template>
  <nav class="navbar navbar-expand-lg navbar-dark navbar-nocturne sticky-top">
    <div class="container">
      <router-link class="navbar-brand font-display text-gold fs-5" to="/">
        NOCTURNE
      </router-link>
      <button
        class="navbar-toggler border-secondary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMain"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navMain" class="collapse navbar-collapse">
        <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/catalogo">Catálogo</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/promociones">Exclusivos</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/nosotros">Bóveda</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link position-relative" to="/carrito">
              <i class="bi bi-bag"></i>
              <span
                v-if="count > 0"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark"
              >
                {{ count }}
              </span>
            </router-link>
          </li>
          <li v-if="isAdmin" class="nav-item">
            <router-link class="nav-link" to="/panel">Panel</router-link>
          </li>
          <li v-if="isClient" class="nav-item">
            <router-link class="nav-link" to="/perfil">Mi Perfil</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="!isLoggedIn" class="nav-link" to="/login">Acceso</router-link>
            <button v-else class="btn btn-sm btn-outline-gold" type="button" @click="onLogout">
              Salir
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useCart } from '@/composables/useCart';
import { useAuth } from '@/composables/useAuth';

const { count } = useCart();
const { isLoggedIn, isAdmin, isClient, logout } = useAuth();
const router = useRouter();

async function onLogout() {
  await logout();
  router.push('/');
}
</script>
