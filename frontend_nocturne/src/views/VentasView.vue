<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="mb-0" style="font-family:'Outfit',sans-serif; font-weight:800;">
          <i class="bi bi-cart-check-fill me-2" style="color:var(--success);"></i>Ventas
        </h4>
        <small class="text-secondary">{{ items.length }} registros encontrados</small>
      </div>
      <router-link :to="isVendedor ? '/vendedor/ventas/nueva' : '/admin/ventas/nueva'" class="btn-primary-custom" style="border-radius:8px; padding:0.45rem 1rem; text-decoration:none; display:inline-flex; align-items:center; gap:0.4rem;">
        <i class="bi bi-plus-lg"></i> Nueva Venta
      </router-link>
    </div>

    <div class="table-dark-custom">
      <table class="table table-hover mb-0">
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Vendedor</th>
            <th>Total</th>
            <th>Estado</th>
            <th>QR</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="v in items" :key="v.id">
            <td class="text-secondary">#{{ v.id }}</td>
            <td style="font-size:0.8rem;">{{ new Date(v.fecha).toLocaleString('es-BO') }}</td>
            <td class="fw-semibold">
              {{ v.cliente?.nombre || 'Consumidor' }} {{ v.cliente?.apellido || 'Final' }}
            </td>
            <td class="text-secondary" style="font-size:0.85rem;">{{ v.usuario?.nombre }}</td>
            <td class="fw-bold" style="color:var(--primary); font-family:'Outfit',sans-serif;">Bs. {{ Number(v.total).toFixed(2) }}</td>
            <td>
              <span class="badge" :class="badgeEstado(v.estado)" style="border-radius:6px; font-size:0.72rem; padding:4px 8px;">
                {{ v.estado || 'Confirmada' }}
              </span>
            </td>
            <td>
              <a v-if="v.comprobanteQr" :href="v.comprobanteQr" target="_blank" class="text-gold" title="Ver comprobante QR">
                <i class="bi bi-qr-code-scan"></i>
              </a>
              <span v-else class="text-secondary" style="font-size:0.75rem;">—</span>
            </td>
            <td>
              <div class="d-flex gap-1">
                <button class="btn btn-sm" style="border:1px solid var(--border-color); color:var(--text-secondary); border-radius:6px;" @click="showDetail(v)" title="Ver detalle">
                  <i class="bi bi-eye"></i>
                </button>
                <button v-if="v.estado !== 'Anulada'" class="btn btn-sm" style="border:1px solid rgba(239,68,68,0.3); color:var(--danger); border-radius:6px;" @click="anularVenta(v)" title="Anular venta">
                  <i class="bi bi-x-circle"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="items.length === 0">
            <td colspan="8" class="text-center text-secondary py-5">
              <i class="bi bi-receipt" style="font-size:2rem; display:block; margin-bottom:0.5rem; opacity:0.3;"></i>
              No hay ventas registradas
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Detalle -->
    <div class="modal fade" ref="detailModalRef" tabindex="-1">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <h5 class="modal-title mb-0">Detalle de Venta <span class="text-gold">#{{ selectedVenta?.id }}</span></h5>
              <small class="text-secondary">{{ selectedVenta ? new Date(selectedVenta.fecha).toLocaleString('es-BO') : '' }}</small>
            </div>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" v-if="selectedVenta">
            <!-- Info Row -->
            <div class="row g-3 mb-4">
              <div class="col-md-4">
                <div class="glass-card p-3">
                  <small class="text-secondary d-block mb-1" style="font-size:0.7rem; text-transform:uppercase; letter-spacing:1px;">Cliente</small>
                  <strong>{{ selectedVenta.cliente?.nombre || 'Consumidor' }} {{ selectedVenta.cliente?.apellido || 'Final' }}</strong>
                  <div class="text-secondary" style="font-size:0.78rem;">CI/NIT: {{ selectedVenta.cliente?.ciNit || '0' }}</div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="glass-card p-3">
                  <small class="text-secondary d-block mb-1" style="font-size:0.7rem; text-transform:uppercase; letter-spacing:1px;">Vendedor</small>
                  <strong>{{ selectedVenta.usuario?.nombre }} {{ selectedVenta.usuario?.apellido }}</strong>
                </div>
              </div>
              <div class="col-md-4">
                <div class="glass-card p-3">
                  <small class="text-secondary d-block mb-1" style="font-size:0.7rem; text-transform:uppercase; letter-spacing:1px;">Total</small>
                  <strong class="text-gold" style="font-size:1.3rem; font-family:'Outfit',sans-serif;">Bs. {{ Number(selectedVenta.total).toFixed(2) }}</strong>
                </div>
              </div>
            </div>

            <!-- Estado Timeline -->
            <div class="mb-4">
              <small class="text-secondary d-block mb-2" style="font-size:0.7rem; text-transform:uppercase; letter-spacing:1px;">Estado de la Venta</small>
              <div class="d-flex align-items-center gap-1">
                <template v-for="(e, i) in estados" :key="e.key">
                  <div class="d-flex flex-column align-items-center" style="min-width:70px;">
                    <div
                      class="rounded-circle d-flex align-items-center justify-content-center mb-1"
                      style="width:34px; height:34px; font-size:0.9rem; transition:all 0.2s;"
                      :style="getEstadoStyle(e.key)"
                    >
                      <i :class="e.icon"></i>
                    </div>
                    <small style="font-size:0.65rem; text-align:center;" :class="selectedVenta.estado === e.key ? 'text-gold fw-bold' : 'text-secondary'">{{ e.label }}</small>
                  </div>
                  <div v-if="i < estados.length - 1" style="flex:1; height:2px; background:var(--border-color); margin-bottom:16px;"></div>
                </template>
              </div>

              <!-- Cambiar Estado -->
              <div v-if="selectedVenta.estado !== 'Anulada'" class="mt-3 d-flex gap-2 flex-wrap">
                <button
                  v-for="e in estadosBotones"
                  :key="e.key"
                  class="btn btn-sm"
                  :style="e.style"
                  :disabled="selectedVenta.estado === e.key"
                  @click="cambiarEstado(selectedVenta.id, e.key)"
                >
                  <i :class="e.icon + ' me-1'"></i>{{ e.label }}
                </button>
              </div>
            </div>

            <!-- Productos Detalle -->
            <h6 class="text-gold mb-2"><i class="bi bi-box-seam me-1"></i>Productos</h6>
            <table class="table table-sm mb-3" style="color:var(--text-primary);">
              <thead style="background:rgba(212,175,55,0.08);">
                <tr>
                  <th style="color:var(--primary-light); font-size:0.72rem;">Producto</th>
                  <th style="color:var(--primary-light); font-size:0.72rem;">Cant.</th>
                  <th style="color:var(--primary-light); font-size:0.72rem;">Precio</th>
                  <th style="color:var(--primary-light); font-size:0.72rem;">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="d in selectedVenta.detalles" :key="d.id">
                  <td>
                    {{ d.producto?.nombre }}
                    <span class="text-secondary" style="font-size:0.75rem;">({{ d.tipoVenta || 'Unidad' }})</span>
                  </td>
                  <td>
                    {{ d.cantidad }}
                    <small class="text-secondary" v-if="d.tipoVenta === 'Caja'">({{ d.cantidad * (d.producto?.unidadesPorCaja || 6) }} u)</small>
                  </td>
                  <td>Bs. {{ Number(d.precio).toFixed(2) }}</td>
                  <td class="text-gold fw-bold">Bs. {{ Number(d.subtotal).toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>

            <!-- Pagos -->
            <div v-if="selectedVenta.pagos?.length" class="mb-3">
              <h6 class="text-gold mb-2"><i class="bi bi-credit-card me-1"></i>Pagos</h6>
              <div v-for="p in selectedVenta.pagos" :key="p.id" class="d-flex justify-content-between py-2 px-3 rounded mb-1 glass-card">
                <span>{{ p.metodoPago?.nombre }}</span>
                <span class="fw-bold text-gold">Bs. {{ Number(p.monto).toFixed(2) }}</span>
              </div>
            </div>

            <!-- Comprobante QR -->
            <div v-if="selectedVenta.comprobanteQr" class="text-center mt-3">
              <small class="text-secondary d-block mb-2">Comprobante QR</small>
              <img :src="selectedVenta.comprobanteQr" alt="Comprobante QR" style="max-height:200px; border-radius:10px; border:1px solid var(--border-color);" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import http from '@/plugins/axios'
import Swal from 'sweetalert2'
import { Modal } from 'bootstrap'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const isVendedor = computed(() => authStore.user?.rol?.nombre === 'VENDEDOR')

const items = ref<any[]>([])
const selectedVenta = ref<any>(null)
const detailModalRef = ref<HTMLElement>()
let detailModal: Modal

const estados = [
  { key: 'Pendiente',  label: 'Pendiente',  icon: 'bi bi-hourglass-split' },
  { key: 'Confirmada', label: 'Confirmada', icon: 'bi bi-check-circle' },
  { key: 'Entregada',  label: 'Entregada',  icon: 'bi bi-bag-check-fill' },
  { key: 'Anulada',    label: 'Anulada',    icon: 'bi bi-x-circle-fill' },
]

const estadosBotones = [
  { key: 'Pendiente',  label: 'Pendiente',  icon: 'bi bi-hourglass-split', style: 'border:1px solid rgba(245,158,11,0.4); color:#f59e0b;' },
  { key: 'Confirmada', label: 'Confirmar',  icon: 'bi bi-check-circle',     style: 'border:1px solid rgba(59,130,246,0.4); color:#60a5fa;' },
  { key: 'Entregada',  label: 'Entregada',  icon: 'bi bi-bag-check-fill',   style: 'border:1px solid rgba(16,185,129,0.4); color:var(--success);' },
  { key: 'Anulada',    label: 'Anular',     icon: 'bi bi-x-circle',         style: 'border:1px solid rgba(239,68,68,0.4); color:var(--danger);' },
]

onMounted(async () => {
  detailModal = new Modal(detailModalRef.value!)
  items.value = (await http.get('ventas')).data
})

function showDetail(v: any) {
  selectedVenta.value = v
  detailModal.show()
}

function badgeEstado(estado: string) {
  const map: Record<string, string> = {
    Pendiente: 'badge-estado-pendiente',
    Confirmada: 'badge-estado-confirmada',
    Entregada: 'badge-estado-entregada',
    Anulada: 'badge-estado-anulada',
  }
  return map[estado] || 'badge-estado-confirmada'
}

function getEstadoStyle(key: string) {
  if (!selectedVenta.value) return ''
  const order = ['Pendiente','Confirmada','Entregada','Anulada']
  const currentIdx = order.indexOf(selectedVenta.value.estado)
  const thisIdx = order.indexOf(key)
  if (selectedVenta.value.estado === 'Anulada' && key === 'Anulada') {
    return 'background:rgba(239,68,68,0.2); color:var(--danger); border:2px solid var(--danger);'
  }
  if (thisIdx <= currentIdx && selectedVenta.value.estado !== 'Anulada') {
    return 'background:rgba(212,175,55,0.2); color:var(--primary); border:2px solid var(--primary);'
  }
  return 'background:rgba(255,255,255,0.04); color:var(--text-secondary); border:2px solid var(--border-color);'
}

async function cambiarEstado(id: number, estado: string) {
  try {
    const updated = await http.patch(`ventas/${id}/estado`, { estado })
    selectedVenta.value.estado = updated.data.estado
    const item = items.value.find(i => i.id === id)
    if (item) item.estado = updated.data.estado
    Swal.fire({ icon: 'success', title: `Estado actualizado a "${estado}"`, timer: 1500, showConfirmButton: false })
  } catch (e: any) {
    Swal.fire({ icon: 'error', title: 'Error', text: e.response?.data?.message || 'No se pudo cambiar el estado' })
  }
}

async function anularVenta(v: any) {
  const confirm = await Swal.fire({
    title: `¿Anular venta #${v.id}?`,
    text: 'Esta acción cambiará el estado a Anulada.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, anular',
    cancelButtonText: 'Cancelar',
  })
  if (confirm.isConfirmed) {
    await cambiarEstado(v.id, 'Anulada')
  }
}
</script>
