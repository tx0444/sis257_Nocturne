import { defineStore } from 'pinia'
import { getTokenFromLocalStorage } from '@/helpers'
import http from '@/plugins/axios'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => {
    let savedUser = null
    try {
      const u = localStorage.getItem('user')
      if (u) savedUser = JSON.parse(u)
    } catch (e) {}

    return {
      user: savedUser as any,
      token: getTokenFromLocalStorage(),
      returnUrl: '',
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.user?.rol?.nombre === 'ADMIN',
    isVendedor: (state) => state.user?.rol?.nombre === 'VENDEDOR',
    fullName: (state) => state.user ? `${state.user.nombre} ${state.user.apellido}` : '',
  },
  actions: {
    async login(usuario: string, clave: string) {
      const response = await http.post('auth/login', { usuario, clave })
      const data = response.data

      this.token = data.access_token
      this.user = {
        id: data.id,
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        usuario: data.usuario,
        rol: data.rol,
      }

      localStorage.setItem('token', this.token || '')
      localStorage.setItem('user', JSON.stringify(this.user))

      let targetPath = '/'
      if (this.user?.rol?.nombre === 'ADMIN') targetPath = '/admin/dashboard'
      else if (this.user?.rol?.nombre === 'VENDEDOR') targetPath = '/vendedor/dashboard'

      router.push(this.returnUrl || targetPath)
    },
    logout() {
      localStorage.clear()
      this.$reset()
      this.token = null
      this.user = null
      router.push('/login')
    },
  },
})
