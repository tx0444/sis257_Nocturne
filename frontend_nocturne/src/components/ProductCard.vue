<template>
  <div class="card card-nocturne h-100">
    <img
      :src="producto.imagenUrl || placeholder"
      class="card-img-top"
      :alt="producto.nombre"
    />
    <div class="card-body d-flex flex-column">
      <span v-if="producto.stock <= 5" class="badge badge-cold align-self-start mb-2">
        <i class="bi bi-exclamation-circle"></i> Stock limitado
      </span>
      <h3 class="h6 font-serif text-white">{{ producto.nombre }}</h3>
      <p class="small text-secondary flex-grow-1">
        {{ producto.categoria?.nombre || 'Licores premium' }} - {{ producto.stock }} unidades
      </p>
      <p class="text-gold fw-semibold mb-3">Bs. {{ formatPrice(producto.precio) }}</p>
      <div class="d-flex gap-2">
        <router-link
          :to="{ name: 'producto', params: { id: producto.id } }"
          class="btn btn-outline-gold btn-sm flex-grow-1"
        >
          Ver
        </router-link>
        <button
          class="btn btn-gold btn-sm"
          type="button"
          :disabled="producto.stock <= 0"
          @click="$emit('add', producto)"
        >
          <i class="bi bi-plus-lg"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  producto: { type: Object, required: true },
});
defineEmits(['add']);

const placeholder =
  'https://images.unsplash.com/photo-1569529465841-dfecdabdb3ce?w=400';

function formatPrice(v) {
  return Number(v || 0).toFixed(2);
}
</script>
