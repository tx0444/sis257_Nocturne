<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4><i class="bi bi-bag-plus-fill me-2" style="color: var(--info);"></i>Compras</h4>
      <router-link to="/admin/compras/nueva" class="btn btn-primary-custom"><i class="bi bi-plus-lg me-1"></i> Nueva Compra</router-link>
    </div>
    <div class="table-dark-custom">
      <table class="table table-hover mb-0">
        <thead><tr><th>#</th><th>Fecha</th><th>Proveedor</th><th>Usuario</th><th>Total</th><th>Detalles</th></tr></thead>
        <tbody>
          <tr v-for="(c, i) in items" :key="c.id">
            <td>{{ c.id }}</td>
            <td>{{ new Date(c.fecha).toLocaleString('es-BO') }}</td>
            <td class="fw-semibold">{{ c.proveedor?.nombre }}</td>
            <td class="text-secondary">{{ c.usuario?.nombre }}</td>
            <td class="fw-bold" style="color: var(--info);">Bs. {{ Number(c.total).toFixed(2) }}</td>
            <td><button class="btn btn-sm btn-outline-info" @click="showDetail(c)"><i class="bi bi-eye"></i> Ver</button></td>
          </tr>
          <tr v-if="items.length===0"><td colspan="6" class="text-center text-secondary py-4">No hay compras registradas</td></tr>
        </tbody>
      </table>
    </div>

    <div class="modal fade" ref="detailModalRef" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title">Detalle de Compra #{{ selectedCompra?.id }}</h5><button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button></div>
      <div class="modal-body" v-if="selectedCompra">
        <div class="row mb-3">
          <div class="col-md-4"><small class="text-secondary">Proveedor:</small><br/><strong>{{ selectedCompra.proveedor?.nombre }}</strong></div>
          <div class="col-md-4"><small class="text-secondary">Fecha:</small><br/><strong>{{ new Date(selectedCompra.fecha).toLocaleString('es-BO') }}</strong></div>
          <div class="col-md-4"><small class="text-secondary">Total:</small><br/><strong style="color: var(--info); font-size: 1.2rem;">Bs. {{ Number(selectedCompra.total).toFixed(2) }}</strong></div>
        </div>
        <table class="table table-sm" style="color: var(--text-primary);">
          <thead><tr><th>Producto</th><th>Cantidad</th><th>Precio Unitario</th><th>Subtotal</th></tr></thead>
          <tbody><tr v-for="d in selectedCompra.detalles" :key="d.id"><td>{{ d.producto?.nombre }}</td><td>{{ formatQuantityAndUnits(d.cantidad, d.producto?.unidadesPorCaja) }}</td><td>Bs. {{ Number(d.precio).toFixed(2) }}</td><td>Bs. {{ Number(d.subtotal).toFixed(2) }}</td></tr></tbody>
        </table>
      </div>
    </div></div></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import http from '@/plugins/axios'
import { Modal } from 'bootstrap'
const items = ref<any[]>([]); const selectedCompra = ref<any>(null); const detailModalRef = ref<HTMLElement>(); let detailModal: Modal
onMounted(async () => { detailModal = new Modal(detailModalRef.value!); items.value = (await http.get('compras')).data })
function showDetail(c: any) { selectedCompra.value = c; detailModal.show() }

function formatQuantityAndUnits(cantidad: number, unidadesPorCaja?: number) {
  const units = Number(cantidad || 0);
  const factor = Number(unidadesPorCaja || 6);
  const cajas = Math.floor(units / factor);
  const residuo = units % factor;
  if (cajas > 0 && residuo > 0) {
    return `${units} u (${cajas} c y ${residuo} u)`;
  } else if (cajas > 0) {
    return `${units} u (${cajas} c)`;
  } else {
    return `${units} u`;
  }
}
</script>
