<template>
  <div class="container py-5">
    <h1 class="h3 font-serif text-white mb-4">Compra Nocturne</h1>

    <div v-if="items.length === 0 && !venta" class="text-secondary">
      Tu carrito esta vacio.
      <router-link to="/catalogo" class="text-gold">Ir al catalogo</router-link>
    </div>

    <div v-if="venta" class="alert alert-success">
      <h4 class="alert-heading font-serif">¡Su compra fue exitosa!</h4>
      <p>Pronto llegará su pedido.</p>
      <hr>
      <p class="mb-0">Código de venta: #{{ venta.id }} | Total facturado: Bs. {{ fmt(venta.total) }}</p>
    </div>

    <div v-if="items.length > 0" class="row g-4">
      <div class="col-lg-7">
        <div class="table-responsive">
          <table class="table table-dark table-borderless align-middle">
            <thead>
              <tr class="text-gold small text-uppercase">
                <th>Producto</th>
                <th>Precio</th>
                <th>Cant.</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>{{ item.nombre }}</td>
                <td>Bs. {{ fmt(item.precio) }}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    :max="item.stock"
                    class="form-control form-control-sm"
                    style="width: 4.5rem"
                    :value="item.cantidad"
                    @change="updateQty(item.id, +$event.target.value)"
                  />
                </td>
                <td>Bs. {{ fmt(item.precio * item.cantidad) }}</td>
                <td>
                  <button class="btn btn-sm btn-outline-danger" type="button" @click="remove(item.id)">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-between align-items-center border-top border-secondary pt-3">
          <p class="h5 text-gold mb-0">Total: Bs. {{ fmt(total) }}</p>
          <button class="btn btn-outline-gold btn-sm" type="button" @click="clear">Vaciar</button>
        </div>
      </div>

      <div class="col-lg-5">
        <form class="card card-nocturne p-4" @submit.prevent="handleSubmitAttempt">
          <h2 class="h5 font-serif text-white mb-3">Datos de entrega y pago</h2>

          <div v-if="error" class="alert alert-danger small">{{ error }}</div>

          <div class="mb-3">
            <label class="form-label small text-gold">Direccion de entrega</label>
            <input v-model.trim="form.direccionEntrega" class="form-control" required maxlength="200" />
          </div>
          <div class="mb-3">
            <label class="form-label small text-gold">Metodo de pago</label>
            <select v-model="form.metodoPago" class="form-select">
              <option value="qr">QR</option>
              <option value="debito">Tarjeta de debito</option>
            </select>
          </div>

          <div v-if="form.metodoPago === 'debito'" class="border-top border-secondary pt-3">
            <div class="mb-3">
              <label class="form-label small text-gold">Numero de tarjeta</label>
              <input v-model.trim="form.datosTarjeta.numeroTarjeta" class="form-control" maxlength="20" />
            </div>
            <div class="mb-3">
              <label class="form-label small text-gold">Titular</label>
              <input v-model.trim="form.datosTarjeta.nombreTitular" class="form-control" maxlength="100" />
            </div>
            <div class="mb-3">
              <label class="form-label small text-gold">CVV</label>
              <input v-model.trim="form.datosTarjeta.cvv" class="form-control" maxlength="4" />
            </div>
          </div>

          <button class="btn btn-gold w-100 mt-2" type="submit" :disabled="loading">
            {{ loading ? 'Procesando...' : 'Confirmar compra' }}
          </button>
        </form>
      </div>
    </div>
    
    <ClientAuthModal :show="showAuthModal" @close="showAuthModal = false" @success="onAuthSuccess" />
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from 'vue';
import { cartApi, refreshCsrf } from '@/api/client';
import { useCart } from '@/composables/useCart';
import { useAuth } from '@/composables/useAuth';
import ClientAuthModal from '@/components/ClientAuthModal.vue';

const { items, total, updateQty, remove, clear } = useCart();
const { user, isLoggedIn } = useAuth();
const loading = ref(false);
const error = ref('');
const venta = ref(null);
const showAuthModal = ref(false);
const pendingSubmit = ref(false);

const form = reactive({
  direccionEntrega: '',
  metodoPago: 'qr',
  datosTarjeta: {
    numeroTarjeta: '4111111111111111',
    nombreTitular: '',
    cvv: '123',
  },
});

function syncUserData() {
  if (isLoggedIn.value && user.value) {
    form.direccionEntrega = user.value.direccion || '';
  }
}

onMounted(() => {
  syncUserData();
});

watch(isLoggedIn, () => {
  syncUserData();
});

function fmt(n) {
  return Number(n || 0).toFixed(2);
}

function tempClientId() {
  const key = 'nocturne_cliente_temp_id';
  const current = localStorage.getItem(key);
  if (current) return current;
  const created = `web-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  localStorage.setItem(key, created);
  return created;
}

function handleSubmitAttempt() {
  if (!isLoggedIn.value) {
    pendingSubmit.value = true;
    showAuthModal.value = true;
  } else {
    confirmarCompra();
  }
}

function onAuthSuccess() {
  showAuthModal.value = false;
  if (pendingSubmit.value) {
    pendingSubmit.value = false;
    // Auto sync ya ocurrió por el watch(isLoggedIn), esperamos un poco y enviamos
    setTimeout(() => {
      confirmarCompra();
    }, 100);
  }
}

async function confirmarCompra() {
  error.value = '';
  venta.value = null;
  loading.value = true;
  try {
    await refreshCsrf();
    const carrito = await cartApi.crearCarrito(tempClientId());

    for (const item of items.value) {
      await cartApi.agregarItem({
        carritoId: carrito.data.id,
        productoId: item.id,
        cantidad: item.cantidad,
        subtotal: Number((item.precio * item.cantidad).toFixed(2)),
      });
    }

    const payload = {
      carritoId: carrito.data.id,
      metodoPago: form.metodoPago,
      direccionEntrega: form.direccionEntrega,
      clienteId: user.value?.id ?? null,
    };

    if (form.metodoPago === 'debito') {
      payload.datosTarjeta = { ...form.datosTarjeta };
    }

    const response = await cartApi.checkout(payload);
    venta.value = response.data;
    clear();
  } catch (e) {
    const message = e.response?.data?.message;
    error.value = Array.isArray(message) ? message.join(', ') : message || 'No se pudo registrar la compra';
  } finally {
    loading.value = false;
  }
}
</script>
