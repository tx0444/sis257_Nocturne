<template>
  <div class="roles-view animate-fade-in">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="mb-1 text-gold fw-bold"><img src="/logo_owl.png" alt="Nocturne Logo" style="height: 2.5em; width: auto; object-fit: contain; margin-right: 12px; border-radius: 50%;" />Roles del Sistema</h4>
        <p class="text-secondary mb-0">Gestión de privilegios y accesos en NOCTURNE:COLD STORAGE</p>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-md-6" v-for="rol in roles" :key="rol.id">
        <div class="glass-card p-4">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="fw-bold mb-0 text-gold">{{ rol.nombre }}</h5>
            <span class="badge bg-gold-trans text-gold text-uppercase">{{ rol.nombre === 'ADMIN' ? 'Acceso Total' : 'Restringido' }}</span>
          </div>
          <p class="text-secondary mb-3">{{ rol.descripcion }}</p>
          <div class="border-top border-gold-trans pt-3">
            <h6 class="fw-bold mb-2 text-light" style="font-size: 0.85rem;">Permisos Clave:</h6>
            <div class="d-flex flex-wrap gap-2">
              <span v-for="permiso in rol.permisos" :key="permiso" class="badge bg-secondary bg-opacity-20 text-light border border-secondary-subtle">
                {{ permiso }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const roles = ref([
  {
    id: 1,
    nombre: 'ADMIN',
    descripcion: 'Administrador del sistema. Tiene control total de inventarios, reportes de compras, bitácoras de auditoría y gestión de usuarios.',
    permisos: ['Crear', 'Editar', 'Eliminar', 'Consultar', 'Configurar Todo']
  },
  {
    id: 2,
    nombre: 'VENDEDOR',
    descripcion: 'Vendedor de mostrador de la licorería. Acceso al punto de venta (POS) rápido, consulta de stock y registro de clientes.',
    permisos: ['Registrar Ventas', 'Consultar Productos', 'Crear Clientes', 'Consultar Clientes', 'Ver Historial de Ventas']
  }
])
</script>

<style scoped>
.text-gold {
  color: var(--primary) !important;
}
.border-gold-trans {
  border-color: rgba(212, 175, 55, 0.15) !important;
}
.bg-gold-trans {
  background: rgba(212, 175, 55, 0.1) !important;
}
.glass-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}
</style>
