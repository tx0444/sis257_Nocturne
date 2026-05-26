<template>
  <section class="hero-nocturne d-flex align-items-center">
    <div class="container py-5">
      <p class="text-uppercase small text-gold mb-2" style="letter-spacing: 0.3em">
        Licorería premium · Bóveda virtual
      </p>
      <h1 class="display-4 font-serif text-white mb-4" style="max-width: 18ch">
        Donde cada botella cuenta
      </h1>
      <p class="lead text-secondary mb-4" style="max-width: 42rem">
        Nocturne combina catálogo de destilados y vinos de colección, inventario con trazabilidad
        por lote, cadena de frío y ventas seguras para miembros élite.
      </p>
      <div class="d-flex flex-wrap gap-3">
        <router-link to="/catalogo" class="btn btn-gold px-4 py-2">Explorar catálogo</router-link>
        <router-link to="/nosotros" class="btn btn-outline-gold px-4 py-2">Modelo de negocio</router-link>
      </div>
    </div>
  </section>

  <section class="container py-5">
    <div class="row g-4 mb-4">
      <div class="col-md-4" v-for="feat in features" :key="feat.title">
          <div class="card card-nocturne h-100 p-4">
            <i :class="feat.icon" class="text-gold fs-3 mb-3"></i>
            <h2 class="h6 text-gold text-uppercase small">{{ feat.title }}</h2>
            <p class="small text-secondary mb-0">{{ feat.text }}</p>
          </div>
        </div>
    </div>

    <div class="d-flex justify-content-between align-items-end mb-3">
      <h2 class="h4 font-serif text-white mb-0">Destacados de bóveda</h2>
      <router-link to="/catalogo" class="small text-gold text-decoration-none">Ver todos</router-link>
    </div>

    <div v-if="loading" class="text-center py-5 text-secondary">Cargando catálogo…</div>
    <div v-else-if="error" class="alert alert-warning">{{ error }}</div>
    <div v-else class="row g-4">
      <div v-for="p in destacados" :key="p.id" class="col-sm-6 col-lg-4">
        <ProductCard :producto="p" @add="onAdd" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import { catalogApi } from '@/api/client';
import { useCart } from '@/composables/useCart';

const { add } = useCart();
const loading = ref(true);
const error = ref('');
const destacados = ref([]);

const features = [
  {
    icon: 'bi bi-shield-lock',
    title: 'Bóveda segura',
    text: 'Guarda tus destilados premium en custody climatizada. Cada botella está serializada y asegurada contra daños o deterioro.',
  },
  {
    icon: 'bi bi-thermometer-snow',
    title: 'Cadena de frío',
    text: 'Vinos espumantes y licores que requieren temperatura controlada. Desde la bodega hasta tu puerta, sin perder calidad.',
  },
  {
    icon: 'bi bi-receipt',
    title: 'Ventas trazables',
    text: 'Factura cada compra con inventario por lote. Responsabilidad y transparencia en cada transacción.',
  },
];

function onAdd(p) {
  add(p);
}

onMounted(async () => {
  try {
    const { data } = await catalogApi.productosActivos();
    destacados.value = data.slice(0, 3);
  } catch (e) {
    error.value =
      'No se pudo conectar al backend. Inicia backend_nocturne en el puerto 3000.';
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>
