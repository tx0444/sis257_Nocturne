<template>
  <div class="pagos-view animate-fade-in">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="mb-1 text-gold fw-bold"><i class="bi bi-credit-card me-2"></i>Pagos</h4>
        <p class="text-secondary mb-0">Listado de cobros y transacciones registrados</p>
      </div>
    </div>

    <div class="glass-card p-4">
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th># Pago</th>
              <th>Venta #</th>
              <th>Método de Pago</th>
              <th>Monto</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in pagos" :key="p.id">
              <td>#{{ p.id }}</td>
              <td><code>#{{ p.ventaId }}</code></td>
              <td>
                <span class="badge bg-secondary bg-opacity-20 text-light border border-secondary-subtle px-3">
                  {{ p.metodo }}
                </span>
              </td>
              <td class="fw-bold text-success">Bs. {{ p.monto.toFixed(2) }}</td>
              <td>{{ p.fecha }}</td>
            </tr>
            <tr v-if="pagos.length === 0">
              <td colspan="5" class="text-center text-secondary py-4">No hay pagos registrados</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import http from '@/plugins/axios'

const pagos = ref<any[]>([])

onMounted(async () => {
  try {
    const res = await http.get('ventas')
    // Extract payments from sales
    const extracted: any[] = []
    let idCounter = 1
    res.data.forEach((v: any) => {
      if (v.pagos && v.pagos.length > 0) {
        v.pagos.forEach((p: any) => {
          extracted.push({
            id: p.id || idCounter++,
            ventaId: v.id,
            metodo: p.metodoPago?.nombre || 'Efectivo',
            monto: Number(p.monto),
            fecha: new Date(v.fecha).toLocaleString('es-BO')
          })
        })
      }
    })
    pagos.value = extracted
  } catch (e) {
    console.error('Error fetching payments:', e)
  }
})
</script>

<style scoped>
.text-gold {
  color: var(--primary) !important;
}
.glass-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}
</style>
