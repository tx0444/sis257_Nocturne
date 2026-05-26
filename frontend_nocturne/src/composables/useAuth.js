import { ref, computed } from 'vue';
import { authApi, clienteApi, refreshCsrf } from '@/api/client';

const user = ref(null);
const session = ref(localStorage.getItem('nocturne_session'));

export function useAuth() {
  const isLoggedIn = computed(() => !!session.value);
  const isAdmin = computed(() => isLoggedIn.value && user.value?.rol === 'admin');
  const isClient = computed(() => isLoggedIn.value && user.value?.rol === 'cliente');

  async function loadProfile() {
    if (!session.value) return;
    try {
      const { data } = await authApi.profile();
      const profile = data.user || data;
      user.value = {
        id: profile.id,
        nombre: profile.nombre,
        email: profile.email,
        direccion: profile.direccion,
        telefono: profile.telefono,
        rol: profile.rol || user.value?.rol || 'admin',
      };
    } catch {
      logout();
    }
  }

  async function login(email, password) {
    await refreshCsrf();
    const { data } = await authApi.login(email, password);
    await refreshCsrf();
    session.value = 'active';
    user.value = { ...data.user, rol: 'admin' };
    localStorage.setItem('nocturne_session', 'active');
    localStorage.setItem('nocturne_user', JSON.stringify(user.value));
  }

  async function loginClient(email, password) {
    await refreshCsrf();
    const { data } = await authApi.loginClient(email, password);
    await refreshCsrf();
    session.value = 'active';
    user.value = { ...data.user, rol: 'cliente' };
    localStorage.setItem('nocturne_session', 'active');
    localStorage.setItem('nocturne_user', JSON.stringify(user.value));
  }

  async function registerClient(userData) {
    await refreshCsrf();
    await clienteApi.crear(userData);
    await loginClient(userData.email, userData.password);
  }

  async function logout() {
    try {
      await refreshCsrf();
      await authApi.logout();
    } catch {
      // La sesion local se limpia aunque el backend no responda.
    }
    session.value = null;
    user.value = null;
    localStorage.removeItem('nocturne_session');
    localStorage.removeItem('nocturne_user');
    localStorage.removeItem('nocturne_csrf');
  }

  const stored = localStorage.getItem('nocturne_user');
  if (stored && session.value) {
    try {
      user.value = JSON.parse(stored);
      loadProfile();
    } catch {
      logout();
    }
  }

  return { user, session, isLoggedIn, isAdmin, isClient, login, loginClient, registerClient, logout, loadProfile };
}
