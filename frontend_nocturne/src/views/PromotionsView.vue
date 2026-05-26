<template>
  <div class="container py-5">
    <h1 class="h3 font-serif text-white mb-2">Bóveda Nocturne</h1>
    <p class="text-secondary small mb-4"> colección exclusiva de destilados y vinos premium.</p>
    
    <div v-if="loading" class="text-center py-5 text-secondary">Cargando productos...</div>
    <div v-else-if="error" class="alert alert-warning">{{ error }}</div>
    <div v-else-if="productos.length === 0" class="text-center py-5 text-secondary">
      No hay productos registrados en la bóveda.
    </div>
    <div v-else class="row g-4">
      <div v-for="p in productos" :key="p.id" class="col-sm-6 col-lg-4">
        <ProductCard :producto="p" @add="onAdd" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import { catalogApi } from '@/api/client';
import { useCart } from '@/composables/useCart';

const { add } = useCart();
const loading = ref(true);
const error = ref('');
const productos = ref([]);

function onAdd(p) {
  add(p);
}

onMounted(async () => {
  try {
    const { data } = await catalogApi.productos();
    productos.value = data.filter(p => p.activo);
  } catch (e) {
    error.value = 'No se pudo cargar la bóveda.';
    console.error(e);
  } finally {
    loading.value = false;
  }
});
</script>
