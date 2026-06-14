import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { getTokenFromLocalStorage } from '@/helpers'

import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'catalogo',
      component: () => import('@/views/CatalogoView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
    },
    {
      path: '/admin',
      component: () => import('@/components/AdminLayout.vue'),
      redirect: '/admin/dashboard',
      children: [
        { path: 'dashboard', name: 'admin-dashboard', component: () => import('@/views/AdminDashboardView.vue') },
        { path: 'usuarios', name: 'admin-usuarios', component: () => import('@/views/UsuariosView.vue') },
        { path: 'roles', name: 'admin-roles', component: () => import('@/views/RolesView.vue') },
        { path: 'categorias', name: 'admin-categorias', component: () => import('@/views/CategoriasView.vue') },
        { path: 'marcas', name: 'admin-marcas', component: () => import('@/views/MarcasView.vue') },
        { path: 'proveedores', name: 'admin-proveedores', component: () => import('@/views/ProveedoresView.vue') },
        { path: 'clientes', name: 'admin-clientes', component: () => import('@/views/ClientesView.vue') },
        { path: 'productos', name: 'admin-productos', component: () => import('@/views/ProductosView.vue') },
        { path: 'compras', name: 'admin-compras', component: () => import('@/views/ComprasView.vue') },
        { path: 'compras/nueva', name: 'admin-nueva-compra', component: () => import('@/views/NuevaCompraView.vue') },
        { path: 'ventas', name: 'admin-ventas', component: () => import('@/views/VentasView.vue') },
        { path: 'ventas/nueva', name: 'admin-nueva-venta', component: () => import('@/views/NuevaVentaView.vue') },
        { path: 'pagos', name: 'admin-pagos', component: () => import('@/views/PagosView.vue') },
        { path: 'reportes', name: 'admin-reportes', component: () => import('@/views/ReportesView.vue') },
        { path: 'configuracion', name: 'admin-configuracion', component: () => import('@/views/ConfiguracionView.vue') },
        { path: 'auditoria', name: 'admin-auditoria', component: () => import('@/views/AuditoriaView.vue') },
        { path: 'promociones', name: 'admin-promociones', component: () => import('@/views/PromocionesView.vue') },
        { path: 'caja', name: 'admin-caja', component: () => import('@/views/CajaView.vue') },
        { path: 'delivery', name: 'admin-delivery', component: () => import('@/views/DeliveryTrackingView.vue') },
        { path: 'combos', name: 'admin-combos', component: () => import('@/views/CombosView.vue') },
      ],
    },
    {
      path: '/vendedor',
      component: () => import('@/components/VendedorLayout.vue'),
      redirect: '/vendedor/dashboard',
      children: [
        { path: 'dashboard', name: 'vendedor-dashboard', component: () => import('@/views/VendedorDashboardView.vue') },
        { path: 'ventas/nueva', name: 'vendedor-nueva-venta', component: () => import('@/views/NuevaVentaView.vue') },
        { path: 'ventas', name: 'vendedor-ventas', component: () => import('@/views/VentasView.vue') },
        { path: 'clientes', name: 'vendedor-clientes', component: () => import('@/views/ClientesView.vue') },
        { path: 'productos', name: 'vendedor-productos', component: () => import('@/views/ProductosView.vue') },
        { path: 'perfil', name: 'vendedor-perfil', component: () => import('@/views/PerfilView.vue') },
        { path: 'caja', name: 'vendedor-caja', component: () => import('@/views/CajaView.vue') },
        { path: 'delivery', name: 'vendedor-delivery', component: () => import('@/views/DeliveryTrackingView.vue') },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.beforeEach(async (to) => {
  const publicPages = ['/', '/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuthStore()
  const token = getTokenFromLocalStorage()

  if (authRequired && !token) {
    authStore.logout()
    authStore.returnUrl = to.fullPath
    return '/login'
  }

  // Prevent client role from accessing admin/vendedor subroutes
  if (token && (to.path.startsWith('/admin') || to.path.startsWith('/vendedor')) && authStore.user?.rol?.nombre === 'CLIENTE') {
    return '/'
  }

  // Prevent non-admin roles (e.g. VENDEDOR) from accessing admin subroutes
  if (token && to.path.startsWith('/admin') && authStore.user?.rol?.nombre !== 'ADMIN') {
    return '/vendedor/dashboard'
  }

  // Prevent non-vendedor roles (e.g. ADMIN) from accessing vendedor subroutes
  if (token && to.path.startsWith('/vendedor') && authStore.user?.rol?.nombre !== 'VENDEDOR') {
    return '/admin/dashboard'
  }

  if (to.path === '/login' && token) {
    if (authStore.user?.rol?.nombre === 'CLIENTE') return '/'
    if (authStore.user?.rol?.nombre === 'ADMIN') return '/admin/dashboard'
    return '/vendedor/dashboard'
  }
  return true
})

router.afterEach(() => {
  // Remove Bootstrap modal backdrops and clean up body classes on route transitions
  const backdrops = document.querySelectorAll('.modal-backdrop')
  backdrops.forEach(el => el.remove())
  document.body.classList.remove('modal-open')
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
})

export default router
