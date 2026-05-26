import { ref, computed } from 'vue';

const STORAGE_KEY = 'nocturne_cart';

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

const items = ref(loadCart());

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value));
}

export function useCart() {
  const count = computed(() =>
    items.value.reduce((sum, i) => sum + i.cantidad, 0),
  );

  const total = computed(() =>
    items.value.reduce((sum, i) => sum + Number(i.precio) * i.cantidad, 0),
  );

  function add(producto, cantidad = 1) {
    const existing = items.value.find((i) => i.id === producto.id);
    if (existing) {
      existing.cantidad += cantidad;
    } else {
      items.value.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagenUrl: producto.imagenUrl,
        stock: producto.stock,
        cantidad,
      });
    }
    persist();
  }

  function updateQty(id, cantidad) {
    const item = items.value.find((i) => i.id === id);
    if (!item) return;
    if (cantidad <= 0) {
      remove(id);
    } else {
      item.cantidad = cantidad;
      persist();
    }
  }

  function remove(id) {
    items.value = items.value.filter((i) => i.id !== id);
    persist();
  }

  function clear() {
    items.value = [];
    persist();
  }

  return { items, count, total, add, updateQty, remove, clear };
}
