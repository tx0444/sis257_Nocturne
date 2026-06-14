function getTokenFromLocalStorage() {
  const tokenAuth = localStorage.getItem('token') || ''
  if (!tokenAuth) return null

  try {
    const jwtPayload = parseJwt(tokenAuth)
    const isExpired = jwtPayload.exp < Date.now() / 1000

    if (!isExpired) return tokenAuth
    else return null
  } catch (e) {
    return null
  }
}

function parseJwt(token: string) {
  const base64Url = token.split('.')[1] ?? ''
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(''),
  )

  return JSON.parse(jsonPayload)
}

/**
 * Convierte cualquier ruta de imagen al formato correcto para mostrarla.
 *
 * Casos que maneja:
 *  - Sin imagen       → fallback a Unsplash
 *  - URL externa      → se devuelve tal cual (http/https)
 *  - Ruta con "public/" → se limpia el prefijo y se construye URL del backend
 *  - Ruta relativa    → se construye URL del backend con VITE_BASE_URL_ENDPOINT
 *
 * El backend origin se lee desde la variable de entorno VITE_BASE_URL_ENDPOINT
 * para que funcione tanto en local como en cualquier despliegue sin cambiar código.
 */
function getImageUrl(path?: string | null): string {
  // Sin imagen → fallback Unsplash
  if (!path) return 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=400'

  // URL externa completa → se devuelve tal cual
  if (path.startsWith('http://') || path.startsWith('https://')) return path

  // Limpiamos el prefijo "public/" que a veces viene de la base de datos
  const cleanPath = path.replace(/^public\//, '')

  // Construimos el origin del backend desde la variable de entorno
  // Ejemplo: "http://127.0.0.1:3000/api/v1/" → "http://127.0.0.1:3000"
  const apiBase = import.meta.env.VITE_BASE_URL_ENDPOINT || 'http://127.0.0.1:3000/api/v1/'
  const backendOrigin = apiBase.replace(/\/api\/v1\/?$/, '').replace(/\/api\/?$/, '').replace(/\/$/, '')

  // Nos aseguramos que la ruta empiece con /
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`

  return `${backendOrigin}${normalizedPath}`
}

export { getTokenFromLocalStorage, parseJwt, getImageUrl }

