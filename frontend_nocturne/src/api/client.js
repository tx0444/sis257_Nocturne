import axios from 'axios';

const configuredApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const baseURL = configuredApiUrl.replace(/\/api\/v1\/?$/, '/api');

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('nocturne_csrf');
  if (token && ['post', 'put', 'patch', 'delete'].includes(config.method)) {
    config.headers['X-CSRF-Token'] = token;
  }
  return config;
});

export async function refreshCsrf() {
  const { data } = await api.get('/auth/csrf');
  localStorage.setItem('nocturne_csrf', data.csrfToken);
  return data.csrfToken;
}

export default api;

export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  loginClient: (email, password) => api.post('/auth/login-client', { email, password }),
  logout: () => api.post('/auth/logout'),
  profile: () => api.get('/auth/me'),
};

export const clienteApi = {
  crear: (data) => api.post('/clientes', data),
  actualizar: (id, data) => api.patch(`/clientes/${id}`, data),
  obtenerTodos: () => api.get('/clientes'),
  misCompras: () => api.get('/ventas/mis-compras'),
};

export const catalogApi = {
  productos: () => api.get('/productos'),
  productosActivos: async () => {
    const response = await api.get('/productos');
    response.data = response.data.filter((producto) => producto.activo);
    return response;
  },
  producto: (id) => api.get(`/productos/${id}`),
  categorias: () => api.get('/categorias'),
  crearCategoria: (data) => api.post('/categorias', data),
  actualizarCategoria: (id, data) => api.patch(`/categorias/${id}`, data),
  eliminarCategoria: (id) => api.delete(`/categorias/${id}`),
  crearProducto: (data) => api.post('/productos', data),
  actualizarProducto: (id, data) => api.patch(`/productos/${id}`, data),
  eliminarProducto: (id) => api.delete(`/productos/${id}`),
  buscar: async (termino) => {
    const response = await api.get('/productos');
    const q = termino.toLowerCase();
    response.data = response.data.filter((producto) =>
      [producto.nombre, producto.descripcion, producto.categoria?.nombre]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(q)),
    );
    return response;
  },
  porCategoria: async (categoriaId) => {
    const response = await api.get('/productos');
    response.data = response.data.filter(
      (producto) => Number(producto.categoriaId) === Number(categoriaId),
    );
    return response;
  },
};

export const cartApi = {
  crearCarrito: (clienteTempId) =>
    api.post('/carritos', { clienteTempId, estado: 'activo', total: 0 }),
  agregarItem: (data) => api.post('/carrito-items', data),
  checkout: (data) => api.post('/carritos/checkout', data),
};

export const adminApi = {
  empleados: () => api.get('/empleados'),
  crearEmpleado: (data) => api.post('/empleados', data),
  actualizarEmpleado: (id, data) => api.patch(`/empleados/${id}`, data),
  eliminarEmpleado: (id) => api.delete(`/empleados/${id}`),
  ventas: () => api.get('/ventas'),
  crearVenta: (data) => api.post('/ventas', data),
  actualizarVenta: (id, data) => api.patch(`/ventas/${id}`, data),
  eliminarVenta: (id) => api.delete(`/ventas/${id}`),
};
