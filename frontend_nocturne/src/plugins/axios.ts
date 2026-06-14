import axios from 'axios'
import { getTokenFromLocalStorage } from '@/helpers'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/auth'

const API_URL = import.meta.env.VITE_BASE_URL_ENDPOINT || 'http://127.0.0.1:3000/api/v1/'

const axiosInstance = axios.create({
  baseURL: API_URL,
})

axiosInstance.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage()
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const message = error.response?.data?.message || 'Error en el servidor. Inténtalo más tarde.'

    if (status === 401) {
      if (!window.location.pathname.includes('/login')) {
        const authStore = useAuthStore()
        authStore.logout()
        Swal.fire({
          icon: 'warning',
          title: 'Sesión Expirada',
          text: 'Tu sesión ha expirado. Por favor inicia sesión nuevamente.',
          timer: 2000,
          showConfirmButton: false,
        })
      }
    } else if (status === 403) {
      Swal.fire({
        icon: 'error',
        title: 'Acceso Denegado',
        text: message,
      })
    } else if (status === 500) {
      Swal.fire({
        icon: 'error',
        title: 'Error Interno (500)',
        text: message,
      })
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
