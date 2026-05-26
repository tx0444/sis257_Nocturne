<template>
  <div class="container py-5">
    <div class="d-flex flex-wrap justify-content-between gap-3 align-items-end mb-4">
      <div>
        <h1 class="h3 font-serif text-white mb-1">Panel administrativo</h1>
        <p class="text-secondary small mb-0">CRUD de catalogos, empleados y ventas.</p>
      </div>
      <a href="http://localhost:3000/api/docs" target="_blank" class="btn btn-outline-gold btn-sm">
        <i class="bi bi-file-earmark-text"></i> Swagger
      </a>
    </div>

    <div v-if="error" class="alert alert-danger small">{{ error }}</div>

    <ul class="nav nav-tabs border-secondary mb-4">
      <li v-for="item in tabs" :key="item.id" class="nav-item">
        <button class="nav-link" :class="{ active: tab === item.id }" @click="tab = item.id">
          {{ item.label }}
        </button>
      </li>
    </ul>

    <section v-if="tab === 'productos'" class="row g-4">
      <div class="col-lg-4">
        <form class="card card-nocturne p-4" @submit.prevent="guardarProducto">
          <h2 class="h5 font-serif text-white mb-3">{{ productoForm.id ? 'Editar producto' : 'Nuevo producto' }}</h2>
          <input v-model.trim="productoForm.nombre" class="form-control mb-3" placeholder="Nombre" required />
          <textarea v-model.trim="productoForm.descripcion" class="form-control mb-3" placeholder="Descripcion" />
          <input v-model.number="productoForm.precio" type="number" min="0" step="0.01" class="form-control mb-3" placeholder="Precio" required />
          <input v-model.number="productoForm.stock" type="number" min="0" step="1" class="form-control mb-3" placeholder="Stock" required />
          <input v-model.trim="productoForm.imagenUrl" class="form-control mb-3" placeholder="URL imagen" />
          <select v-model.number="productoForm.categoriaId" class="form-select mb-3" required>
            <option disabled value="">Categoria</option>
            <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{ categoria.nombre }}</option>
          </select>
          <label class="form-check text-secondary small mb-3">
            <input v-model="productoForm.activo" class="form-check-input" type="checkbox" />
            Activo
          </label>
          <FormButtons :loading="loading" @clear="resetProducto" />
        </form>
      </div>
      <div class="col-lg-8">
        <DataTable :headers="['Producto', 'Categoria', 'Precio', 'Stock', 'Activo', '']">
          <tr v-for="producto in productos" :key="producto.id">
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.categoria?.nombre || '-' }}</td>
            <td>Bs. {{ fmt(producto.precio) }}</td>
            <td>{{ producto.stock }}</td>
            <td>{{ producto.activo ? 'Si' : 'No' }}</td>
            <td class="text-end actions-cell">
              <button class="btn btn-sm btn-outline-gold" type="button" @click="editarProducto(producto)"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-sm btn-outline-danger" type="button" @click="eliminarProducto(producto.id)"><i class="bi bi-trash"></i></button>
            </td>
          </tr>
        </DataTable>
      </div>
    </section>

    <section v-else-if="tab === 'categorias'" class="row g-4">
      <div class="col-lg-4">
        <form class="card card-nocturne p-4" @submit.prevent="guardarCategoria">
          <h2 class="h5 font-serif text-white mb-3">{{ categoriaForm.id ? 'Editar categoria' : 'Nueva categoria' }}</h2>
          <input v-model.trim="categoriaForm.nombre" class="form-control mb-3" placeholder="Nombre" required />
          <textarea v-model.trim="categoriaForm.descripcion" class="form-control mb-3" placeholder="Descripcion" required />
          <label class="form-check text-secondary small mb-3">
            <input v-model="categoriaForm.activo" class="form-check-input" type="checkbox" />
            Activa
          </label>
          <FormButtons :loading="loading" @clear="resetCategoria" />
        </form>
      </div>
      <div class="col-lg-8">
        <DataTable :headers="['Categoria', 'Descripcion', 'Activa', '']">
          <tr v-for="categoria in categorias" :key="categoria.id">
            <td>{{ categoria.nombre }}</td>
            <td>{{ categoria.descripcion }}</td>
            <td>{{ categoria.activo ? 'Si' : 'No' }}</td>
            <td class="text-end actions-cell">
              <button class="btn btn-sm btn-outline-gold" type="button" @click="editarCategoria(categoria)"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-sm btn-outline-danger" type="button" @click="eliminarCategoria(categoria.id)"><i class="bi bi-trash"></i></button>
            </td>
          </tr>
        </DataTable>
      </div>
    </section>

    <section v-else-if="tab === 'empleados'" class="row g-4">
      <div class="col-lg-4">
        <form class="card card-nocturne p-4" @submit.prevent="guardarEmpleado">
          <h2 class="h5 font-serif text-white mb-3">{{ empleadoForm.id ? 'Editar empleado' : 'Nuevo empleado' }}</h2>
          <input v-model.trim="empleadoForm.nombre" class="form-control mb-3" placeholder="Nombre" required />
          <input v-model.trim="empleadoForm.email" type="email" class="form-control mb-3" placeholder="Email" required />
          <input v-model="empleadoForm.password" type="password" class="form-control mb-3" :placeholder="empleadoForm.id ? 'Nueva contrasena opcional' : 'Contrasena'" :required="!empleadoForm.id" />
          <label class="form-check text-secondary small mb-3">
            <input v-model="empleadoForm.activo" class="form-check-input" type="checkbox" />
            Activo
          </label>
          <FormButtons :loading="loading" @clear="resetEmpleado" />
        </form>
      </div>
      <div class="col-lg-8">
        <DataTable :headers="['Empleado', 'Email', 'Activo', '']">
          <tr v-for="empleado in empleados" :key="empleado.id">
            <td>{{ empleado.nombre }}</td>
            <td>{{ empleado.email }}</td>
            <td>{{ empleado.activo ? 'Si' : 'No' }}</td>
            <td class="text-end actions-cell">
              <button class="btn btn-sm btn-outline-gold" type="button" @click="editarEmpleado(empleado)"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-sm btn-outline-danger" type="button" @click="eliminarEmpleado(empleado.id)"><i class="bi bi-trash"></i></button>
            </td>
          </tr>
        </DataTable>
      </div>
    </section>

    <section v-else class="row g-4">
      <div class="col-lg-4">
        <form class="card card-nocturne p-4" @submit.prevent="guardarVenta">
          <h2 class="h5 font-serif text-white mb-3">{{ ventaForm.id ? 'Editar venta' : 'Nueva venta (POS)' }}</h2>
          <input v-model.trim="ventaForm.clienteNombre" class="form-control mb-3" placeholder="Cliente" />
          <select v-model.number="ventaForm.empleadoId" class="form-select mb-3">
            <option :value="null">Sistema Web</option>
            <option v-for="empleado in empleados" :key="empleado.id" :value="empleado.id">{{ empleado.nombre }}</option>
          </select>
          
          <div v-if="!ventaForm.id" class="mb-3 p-2 border border-secondary rounded">
            <label class="form-label small text-gold mb-1">Añadir Producto</label>
            <div class="d-flex gap-2 mb-2">
              <select v-model="posSeleccion.productoId" class="form-select form-select-sm bg-dark text-white border-secondary">
                <option value="">Seleccione producto</option>
                <option v-for="p in productos" :key="p.id" :value="p.id" :disabled="!p.activo || p.stock < 1">
                  {{ p.nombre }} (Stock: {{ p.stock }}) - Bs. {{ p.precio }}
                </option>
              </select>
              <input v-model.number="posSeleccion.cantidad" type="number" min="1" class="form-control form-control-sm bg-dark text-white border-secondary" style="width: 60px" />
              <button class="btn btn-sm btn-outline-gold" type="button" @click="agregarProductoPOS">+</button>
            </div>
            
            <ul class="list-group list-group-flush small" v-if="ventaForm.items.length > 0">
              <li class="list-group-item bg-transparent text-white border-secondary d-flex justify-content-between px-1 py-1" v-for="(item, index) in ventaForm.items" :key="index">
                <span>{{ getProductoNombre(item.productoId) }} (x{{ item.cantidad }})</span>
                <button class="btn btn-sm btn-link text-danger p-0" type="button" @click="ventaForm.items.splice(index, 1)"><i class="bi bi-x"></i></button>
              </li>
            </ul>
          </div>
          
          <div class="d-flex justify-content-between align-items-center mb-3 px-2">
            <span class="small text-secondary">Total:</span>
            <span class="text-gold fw-bold h5 mb-0">Bs. {{ fmt(ventaForm.id ? ventaForm.total : totalPOS) }}</span>
          </div>

          <select v-model="ventaForm.metodoPago" class="form-select mb-3" required>
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="transferencia">Transferencia</option>
            <option value="qr">QR</option>
          </select>

          <div v-if="ventaForm.metodoPago === 'efectivo' && !ventaForm.id" class="mb-3 px-2">
            <label class="form-label small text-gold mb-1">Monto Recibido</label>
            <input v-model.number="ventaForm.montoRecibido" type="number" min="0" step="0.01" class="form-control form-control-sm bg-dark text-white border-secondary mb-1" placeholder="Efectivo entregado por cliente" />
            <div v-if="cambioPOS >= 0 && ventaForm.montoRecibido > 0" class="small text-success mt-1 fw-bold">
              Cambio a devolver: Bs. {{ fmt(cambioPOS) }}
            </div>
            <div v-else-if="cambioPOS < 0 && ventaForm.montoRecibido > 0" class="small text-danger mt-1">
              Falta Bs. {{ fmt(Math.abs(cambioPOS)) }}
            </div>
          </div>

          <textarea v-model.trim="ventaForm.notas" class="form-control mb-3" placeholder="Notas" />
          <FormButtons :loading="loading" @clear="resetVenta" />
        </form>
      </div>
      <div class="col-lg-8">
        <DataTable :headers="['Venta', 'Cliente', 'Metodo', 'Total', 'Estado', '']">
          <tr v-for="venta in ventas" :key="venta.id">
            <td>#{{ venta.id }}</td>
            <td>{{ venta.clienteNombre || venta.empleadoNombreSnapshot || 'Sistema Web' }}</td>
            <td>{{ venta.metodoPago }}</td>
            <td>Bs. {{ fmt(venta.total) }}</td>
            <td>{{ venta.estado }}</td>
            <td class="text-end actions-cell">
              <button class="btn btn-sm btn-outline-gold" type="button" @click="editarVenta(venta)"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-sm btn-outline-danger" type="button" @click="eliminarVenta(venta.id)"><i class="bi bi-trash"></i></button>
            </td>
          </tr>
        </DataTable>
      </div>
    </section>
  </div>
</template>

<script setup>
import { defineComponent, h, onMounted, reactive, ref, computed } from 'vue';
import { adminApi, catalogApi, refreshCsrf } from '@/api/client';
import { useAuth } from '@/composables/useAuth';

const tabs = [
  { id: 'productos', label: 'Productos' },
  { id: 'categorias', label: 'Categorias' },
  { id: 'empleados', label: 'Empleados' },
  { id: 'ventas', label: 'Ventas' },
];

const tab = ref('productos');
const loading = ref(false);
const error = ref('');
const productos = ref([]);
const categorias = ref([]);
const empleados = ref([]);
const ventas = ref([]);

const { user } = useAuth();

const productoForm = reactive({ id: null, nombre: '', descripcion: '', precio: 0, stock: 0, imagenUrl: '', categoriaId: '', activo: true });
const categoriaForm = reactive({ id: null, nombre: '', descripcion: '', activo: true });
const empleadoForm = reactive({ id: null, nombre: '', email: '', password: '', activo: true });
const ventaForm = reactive({ id: null, clienteNombre: '', empleadoId: null, items: [], total: 0, metodoPago: 'efectivo', montoRecibido: null, notas: '' });
const posSeleccion = reactive({ productoId: '', cantidad: 1 });

const totalPOS = computed(() => {
  return ventaForm.items.reduce((acc, item) => {
    const prod = productos.value.find((p) => p.id === item.productoId);
    if (!prod) return acc;
    return acc + prod.precio * item.cantidad;
  }, 0);
});

const cambioPOS = computed(() => {
  if (!ventaForm.montoRecibido) return 0;
  return ventaForm.montoRecibido - totalPOS.value;
});

function getProductoNombre(id) {
  return productos.value.find((p) => p.id === id)?.nombre || 'Producto Desconocido';
}

function agregarProductoPOS() {
  if (!posSeleccion.productoId || posSeleccion.cantidad < 1) return;
  const prod = productos.value.find(p => p.id === posSeleccion.productoId);
  if (!prod || prod.stock < posSeleccion.cantidad) {
    error.value = 'Stock insuficiente o producto no válido';
    setTimeout(() => error.value = '', 3000);
    return;
  }
  
  const existe = ventaForm.items.find(i => i.productoId === posSeleccion.productoId);
  if (existe) {
    existe.cantidad += posSeleccion.cantidad;
  } else {
    ventaForm.items.push({ ...posSeleccion });
  }
  posSeleccion.productoId = '';
  posSeleccion.cantidad = 1;
}

const DataTable = defineComponent({
  props: { headers: { type: Array, required: true } },
  setup(props, { slots }) {
    return () =>
      h('div', { class: 'table-responsive' }, [
        h('table', { class: 'table table-dark table-borderless align-middle' }, [
          h('thead', { class: 'text-gold small text-uppercase' }, [
            h('tr', props.headers.map((header) => h('th', header))),
          ]),
          h('tbody', slots.default?.()),
        ]),
      ]);
  },
});

const FormButtons = defineComponent({
  props: { loading: { type: Boolean, default: false } },
  emits: ['clear'],
  setup(props, { emit }) {
    return () =>
      h('div', { class: 'd-flex gap-2' }, [
        h('button', { class: 'btn btn-gold flex-grow-1', type: 'submit', disabled: props.loading }, 'Guardar'),
        h('button', { class: 'btn btn-outline-gold', type: 'button', onClick: () => emit('clear') }, 'Limpiar'),
      ]);
  },
});

function fmt(n) {
  return Number(n || 0).toFixed(2);
}

function apiError(e, fallback) {
  const message = e.response?.data?.message || e.message;
  error.value = Array.isArray(message) ? message.join(', ') : message || fallback;
}

async function cargarDatos() {
  const [prod, cat, emp, ven] = await Promise.all([
    catalogApi.productos(),
    catalogApi.categorias(),
    adminApi.empleados(),
    adminApi.ventas(),
  ]);
  productos.value = prod.data;
  categorias.value = cat.data;
  empleados.value = emp.data;
  ventas.value = ven.data;
}

async function withSave(action, fallback) {
  error.value = '';
  loading.value = true;
  try {
    await refreshCsrf();
    await action();
    await cargarDatos();
  } catch (e) {
    apiError(e, fallback);
  } finally {
    loading.value = false;
  }
}

function resetProducto() {
  Object.assign(productoForm, { id: null, nombre: '', descripcion: '', precio: 0, stock: 0, imagenUrl: '', categoriaId: categorias.value[0]?.id || '', activo: true });
}

function editarProducto(producto) {
  Object.assign(productoForm, {
    id: producto.id,
    nombre: producto.nombre,
    descripcion: producto.descripcion || '',
    precio: Number(producto.precio),
    stock: Number(producto.stock),
    imagenUrl: producto.imagenUrl || '',
    categoriaId: producto.categoriaId,
    activo: producto.activo,
  });
}

function guardarProducto() {
  return withSave(async () => {
    const payload = {
      nombre: productoForm.nombre,
      descripcion: productoForm.descripcion,
      precio: Number(productoForm.precio),
      stock: Number(productoForm.stock),
      imagenUrl: productoForm.imagenUrl || null,
      categoriaId: Number(productoForm.categoriaId),
      activo: productoForm.activo,
    };
    productoForm.id
      ? await catalogApi.actualizarProducto(productoForm.id, payload)
      : await catalogApi.crearProducto(payload);
    resetProducto();
  }, 'No se pudo guardar el producto');
}

function eliminarProducto(id) {
  return withSave(() => catalogApi.eliminarProducto(id), 'No se pudo eliminar el producto');
}

function resetCategoria() {
  Object.assign(categoriaForm, { id: null, nombre: '', descripcion: '', activo: true });
}

function editarCategoria(categoria) {
  Object.assign(categoriaForm, { id: categoria.id, nombre: categoria.nombre, descripcion: categoria.descripcion || '', activo: categoria.activo });
}

function guardarCategoria() {
  return withSave(async () => {
    const payload = { nombre: categoriaForm.nombre, descripcion: categoriaForm.descripcion, activo: categoriaForm.activo };
    categoriaForm.id
      ? await catalogApi.actualizarCategoria(categoriaForm.id, payload)
      : await catalogApi.crearCategoria(payload);
    resetCategoria();
  }, 'No se pudo guardar la categoria');
}

function eliminarCategoria(id) {
  return withSave(() => catalogApi.eliminarCategoria(id), 'No se pudo eliminar la categoria');
}

function resetEmpleado() {
  Object.assign(empleadoForm, { id: null, nombre: '', email: '', password: '', activo: true });
}

function editarEmpleado(empleado) {
  Object.assign(empleadoForm, { id: empleado.id, nombre: empleado.nombre, email: empleado.email, password: '', activo: empleado.activo });
}

function guardarEmpleado() {
  return withSave(async () => {
    const payload = { nombre: empleadoForm.nombre, email: empleadoForm.email, activo: empleadoForm.activo };
    if (empleadoForm.password) payload.password = empleadoForm.password;
    empleadoForm.id
      ? await adminApi.actualizarEmpleado(empleadoForm.id, payload)
      : await adminApi.crearEmpleado(payload);
    resetEmpleado();
  }, 'No se pudo guardar el empleado');
}

function eliminarEmpleado(id) {
  return withSave(() => adminApi.eliminarEmpleado(id), 'No se pudo eliminar el empleado');
}

function resetVenta() {
  Object.assign(ventaForm, { id: null, clienteNombre: '', empleadoId: user.value?.id || null, items: [], total: 0, metodoPago: 'efectivo', montoRecibido: null, notas: '' });
  posSeleccion.productoId = '';
  posSeleccion.cantidad = 1;
}

function editarVenta(venta) {
  Object.assign(ventaForm, {
    id: venta.id,
    clienteNombre: venta.clienteNombre || '',
    empleadoId: venta.empleadoId || null,
    total: Number(venta.total),
    metodoPago: venta.metodoPago,
    notas: venta.notas || '',
    items: [],
  });
}

function guardarVenta() {
  return withSave(async () => {
    // Si hay un producto seleccionado en el dropdown POS sin agregar, añadirlo automáticamente
    if (!ventaForm.id && posSeleccion.productoId && posSeleccion.cantidad >= 1) {
      agregarProductoPOS();
    }
    
    if (!ventaForm.id && ventaForm.items.length === 0 && totalPOS.value === 0) {
      throw new Error('Debe añadir al menos un producto a la venta o usar otra interfaz');
    }
    
    if (!ventaForm.id && ventaForm.metodoPago === 'efectivo' && ventaForm.montoRecibido !== null && ventaForm.montoRecibido < totalPOS.value) {
      throw new Error('El monto recibido es menor al total de la compra');
    }

    const payload = {
      clienteNombre: ventaForm.clienteNombre || null,
      empleadoId: ventaForm.empleadoId || null,
      total: ventaForm.id ? Number(ventaForm.total) : totalPOS.value,
      metodoPago: ventaForm.metodoPago,
      notas: ventaForm.notas || null,
    };
    
    if (!ventaForm.id) {
      payload.items = ventaForm.items;
      if (ventaForm.metodoPago === 'efectivo') {
        payload.montoRecibido = ventaForm.montoRecibido;
      }
    }
    
    ventaForm.id
      ? await adminApi.actualizarVenta(ventaForm.id, payload)
      : await adminApi.crearVenta(payload);
    resetVenta();
  }, 'No se pudo guardar la venta');
}

function eliminarVenta(id) {
  return withSave(() => adminApi.eliminarVenta(id), 'No se pudo eliminar la venta');
}

onMounted(async () => {
  try {
    await cargarDatos();
    resetProducto();
  } catch (e) {
    apiError(e, 'No se pudo cargar el panel. Inicia sesion nuevamente.');
  }
});
</script>

<style scoped>
.nav-link {
  background: transparent;
  border-color: rgba(197, 160, 89, 0.25);
  color: var(--nocturne-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.75rem;
}

.nav-link.active {
  background: var(--nocturne-surface);
  border-color: rgba(197, 160, 89, 0.45);
  color: var(--nocturne-gold);
}

.actions-cell {
  white-space: nowrap;
}

.actions-cell .btn + .btn {
  margin-left: 0.5rem;
}
</style>
