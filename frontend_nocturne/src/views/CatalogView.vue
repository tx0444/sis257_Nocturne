<template>
  <div class="container py-5">
    <header class="mb-4">
      <h1 class="h3 font-serif text-white">Catálogo Nocturne</h1>
      <p class="text-secondary small">Destilados, vinos, champagne, cervezas y singanis de altura.</p>
    </header>

    <div class="row g-3 mb-4">
      <div class="col-md-6">
        <input
          v-model="busqueda"
          type="search"
          class="form-control"
          placeholder="Buscar por nombre o código…"
          @keyup.enter="buscar"
        />
      </div>
      <div class="col-md-4">
        <select v-model="categoriaId" class="form-select" @change="filtrar">
          <option value="">Todas las categorías</option>
          <option v-for="c in categorias" :key="c.id" :value="c.id">{{ c.nombre }}</option>
        </select>
      </div>
      <div class="col-md-2">
        <button class="btn btn-gold w-100" type="button" @click="buscar">Buscar</button>
      </div>
    </div>

    <div v-if="loading" class="text-secondary">Cargando…</div>
    <div v-else-if="productos.length === 0" class="text-secondary">Sin resultados.</div>
    <div v-else class="row g-4">
      <div v-for="p in productos" :key="p.id" class="col-sm-6 col-lg-4 col-xl-3">
        <ProductCard :producto="p" @add="add" />
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
const productos = ref([]);
const categorias = ref([]);
const loading = ref(true);
const busqueda = ref('');
const categoriaId = ref('');

async function cargar() {
  loading.value = true;
  try {
    const { data } = await catalogApi.productosActivos();
    productos.value = data;
  } finally {
    loading.value = false;
  }
}

async function buscar() {
  loading.value = true;
  try {
    if (busqueda.value.trim()) {
      const { data } = await catalogApi.buscar(busqueda.value.trim());
      productos.value = data.filter((p) => p.activo);
    } else {
      await cargar();
    }
  } finally {
    loading.value = false;
  }
}

async function filtrar() {
  if (!categoriaId.value) {
    await cargar();
    return;
  }
  loading.value = true;
  try {
    const { data } = await catalogApi.porCategoria(categoriaId.value);
    productos.value = data.filter((p) => p.activo);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  const [cat] = await Promise.all([catalogApi.categorias(), cargar()]);
  categorias.value = cat.data;
});
</script>
