<template>
  <div class="container py-5">
    <div v-if="loading" class="text-secondary">Cargando producto...</div>
    <div v-else-if="!producto" class="alert alert-warning">Producto no encontrado.</div>
    <div v-else class="row g-5">
      <div class="col-lg-6">
        <img
          :src="producto.imagenUrl || placeholder"
          class="img-fluid w-100"
          :alt="producto.nombre"
          style="max-height: 480px; object-fit: cover"
        />
      </div>
      <div class="col-lg-6">
        <p class="text-gold small text-uppercase mb-1">
          {{ producto.categoria?.nombre || 'Licoreria premium' }}
        </p>
        <h1 class="h2 font-serif text-white">{{ producto.nombre }}</h1>
        <p class="text-secondary">{{ producto.descripcion }}</p>
        <ul class="list-unstyled small text-secondary">
          <li>
            <strong class="text-gold">Stock boveda:</strong> {{ producto.stock }} unidades
          </li>
          <li>
            <strong class="text-gold">Estado:</strong>
            {{ producto.activo ? 'Disponible' : 'Inactivo' }}
          </li>
        </ul>
        <p class="display-6 text-gold">Bs. {{ formatPrice(producto.precio) }}</p>
        <div class="d-flex align-items-center gap-3 mb-4">
          <input
            v-model.number="qty"
            type="number"
            min="1"
            :max="producto.stock"
            class="form-control w-auto"
            style="width: 5rem"
          />
          <button
            class="btn btn-gold px-4"
            type="button"
            :disabled="producto.stock <= 0"
            @click="onAdd"
          >
            Anadir al carrito
          </button>
        </div>
        <router-link to="/catalogo" class="small text-gold">Volver al catalogo</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { catalogApi } from '@/api/client';
import { useCart } from '@/composables/useCart';

const props = defineProps({ id: { type: [String, Number], required: true } });
const { add } = useCart();
const producto = ref(null);
const loading = ref(true);
const qty = ref(1);
const placeholder = 'https://images.unsplash.com/photo-1569529465841-dfecdabdb3ce?w=600';

function formatPrice(v) {
  return Number(v || 0).toFixed(2);
}

function onAdd() {
  const cantidad = Math.min(Math.max(Number(qty.value) || 1, 1), producto.value.stock);
  add(producto.value, cantidad);
}

onMounted(async () => {
  try {
    const { data } = await catalogApi.producto(props.id);
    producto.value = data;
  } finally {
    loading.value = false;
  }
});
</script>
