import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CatalogView from '@/views/CatalogView.vue';
import ProductView from '@/views/ProductView.vue';
import LoginView from '@/views/LoginView.vue';
import CartView from '@/views/CartView.vue';
import DashboardView from '@/views/DashboardView.vue';
import AboutView from '@/views/AboutView.vue';
import PromotionsView from '@/views/PromotionsView.vue';
import ProfileView from '@/views/ProfileView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/catalogo', name: 'catalogo', component: CatalogView },
    { path: '/producto/:id', name: 'producto', component: ProductView, props: true },
    { path: '/promociones', name: 'promociones', component: PromotionsView },
    { path: '/carrito', name: 'carrito', component: CartView },
    { path: '/login', name: 'login', component: LoginView },
    {
      path: '/panel',
      name: 'panel',
      component: DashboardView,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    { path: '/nosotros', name: 'nosotros', component: AboutView },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, _from, next) => {
  const session = localStorage.getItem('nocturne_session');
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('nocturne_user') || 'null');
  } catch {
    user = null;
  }
  if (to.meta.requiresAuth && !session) {
    return next({ name: 'login', query: { redirect: to.fullPath } });
  }
  if (to.meta.requiresAdmin && !user) {
    return next({ name: 'home' });
  }
  next();
});

export default router;
