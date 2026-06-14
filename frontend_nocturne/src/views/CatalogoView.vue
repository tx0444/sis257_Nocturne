<template>
  <div class="catalogo-page">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center gap-2" href="#">
          <img src="/logo_owl.png" alt="Nocturne Logo" style="height: 2.5em; width: auto; object-fit: contain; border-radius: 50%; filter: drop-shadow(0 0 8px rgba(212,175,55,0.4));" />
          <span class="brand-text">NOCTURNE:COLD STORAGE</span>
        </a>
        <button class="navbar-toggler" type="button" @click="isNavbarOpen = !isNavbarOpen" :aria-expanded="isNavbarOpen" :class="{ collapsed: !isNavbarOpen }">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" :class="{ show: isNavbarOpen }" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-center gap-3">
            <li class="nav-item">
              <a class="nav-link" href="#inicio" @click="isNavbarOpen = false">Inicio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#destacados" @click="isNavbarOpen = false">Destacados</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#categorias" @click="isNavbarOpen = false">Categorías</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#tienda" @click="isNavbarOpen = false">Catálogo</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#elegirnos" @click="isNavbarOpen = false">Nosotros</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#testimonios" @click="isNavbarOpen = false">Testimonios</a>
            </li>

            <!-- Client specific actions -->
            <template v-if="authStore.isLoggedIn && authStore.user?.rol?.nombre === 'CLIENTE'">
              <li class="nav-item position-relative">
                <button class="btn btn-outline-gold position-relative d-flex align-items-center gap-2" @click="openCart(); isNavbarOpen = false">
                  <i class="bi bi-cart3"></i>
                  <span>Carrito</span>
                  <span class="badge bg-gold text-dark rounded-pill" v-if="cart.length > 0">{{ cartCount }}</span>
                </button>
              </li>
              <li class="nav-item">
                <button class="btn btn-outline-secondary d-flex align-items-center gap-2 text-white border-secondary" @click="openHistory(); isNavbarOpen = false">
                  <i class="bi bi-clock-history"></i>
                  <span>Mis Pedidos</span>
                </button>
              </li>
              <li class="nav-item">
                <span class="text-gold" style="font-size: 0.85rem; font-weight: 600;">
                  <i class="bi bi-person-circle"></i> {{ authStore.user.nombre }}
                </span>
              </li>
              <li class="nav-item">
                <button class="btn btn-sm btn-outline-danger" @click="handleLogout(); isNavbarOpen = false">
                  <i class="bi-box-arrow-right"></i> Salir
                </button>
              </li>
            </template>

            <!-- Admin / Vendedor redirect link -->
            <template v-else-if="authStore.isLoggedIn">
              <li class="nav-item">
                <router-link to="/admin" class="btn btn-outline-gold d-flex align-items-center gap-2" @click="isNavbarOpen = false">
                  <i class="bi bi-speedometer2"></i>
                  <span>Ir al Panel</span>
                </router-link>
              </li>
              <li class="nav-item">
                <button class="btn btn-sm btn-outline-danger" @click="handleLogout(); isNavbarOpen = false">
                  <i class="bi-box-arrow-right"></i> Salir
                </button>
              </li>
            </template>

            <!-- Guest Login link -->
            <template v-else>
              <li class="nav-item ms-lg-2">
                <router-link to="/login" class="btn btn-outline-gold d-flex align-items-center gap-2" @click="isNavbarOpen = false">
                  <i class="bi bi-person-circle"></i>
                  <span>Acceso Personal</span>
                </router-link>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>

    <!-- SECCIÓN 1 - VIDEO HERO PRINCIPAL -->
    <header id="inicio" class="hero-section position-relative d-flex align-items-center">
      <div class="hero-video-container">
        <video
          ref="heroVideoRef"
          autoplay
          muted
          loop
          playsinline
          preload="auto"
          class="hero-bg-video"
          :src="heroVideoUrl"
        />
        <div class="hero-video-overlay" style="background: linear-gradient(90deg, rgba(5,5,5,0.95) 0%, rgba(10,10,10,0.6) 60%, rgba(5,5,5,0.1) 100%);"></div>
      </div>

      <div class="container hero-content z-3">
        <div class="row">
          <div class="col-lg-8 fade-in-up">
            <div class="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-4 border border-gold border-opacity-25" style="background: rgba(212, 175, 55, 0.05); backdrop-filter: blur(10px);">
              <span class="spinner-grow spinner-grow-sm text-gold" style="width: 0.5rem; height: 0.5rem;" role="status"></span>
              <span class="text-gold fw-semibold" style="font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase;">La Bodega Premium</span>
            </div>
            
            <h1 class="brand-title-premium text-white mb-2" style="font-family: 'Cinzel', serif;">
              <span class="d-block text-gold" style="font-weight: 900; letter-spacing: 4px; font-size: clamp(3rem, 7.5vw, 7rem); line-height: 1; text-shadow: 0 0 50px rgba(212, 175, 55, 0.4);">NOCTURNE</span>
              <span class="d-block mt-2" style="font-family: 'Inter', sans-serif; font-weight: 300; letter-spacing: min(1vw, 15px); font-size: clamp(1.2rem, 3vw, 2rem); opacity: 0.9;">COLD STORAGE</span>
            </h1>
            
            <p class="h4 mt-4 mb-4 text-white" style="font-family: 'Playfair Display', serif; font-style: italic; opacity: 0.85; font-weight: 400; max-width: 600px;">
              "Donde la confianza se celebra en cada copa."
            </p>
            
            <p class="lead text-secondary mb-5" style="max-width: 550px; font-size: 1.05rem; line-height: 1.6;">
              Descubre la selección más exclusiva de licores nacionales e importados. Una bóveda climatizada que garantiza la máxima calidad para tus celebraciones.
            </p>
            
            <div class="d-flex flex-wrap gap-3 mt-2">
              <a href="#destacados" class="btn btn-gold-premium px-5 py-3 d-flex align-items-center gap-2 text-decoration-none">
                <span class="fw-bold" style="letter-spacing: 1px;">COMPRAR AHORA</span>
                <i class="bi bi-arrow-right fs-5"></i>
              </a>
              <a href="#tienda" class="btn btn-outline-glass px-5 py-3 d-flex align-items-center gap-2 text-decoration-none">
                <span class="fw-semibold text-white" style="letter-spacing: 1px;">VER CATÁLOGO</span>
                <i class="bi bi-grid fs-6 text-gold"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Scroll indicator down -->
      <div class="position-absolute bottom-0 start-50 translate-middle-x mb-4 z-3 text-center scroll-indicator d-none d-md-block">
        <span class="d-block text-secondary mb-2" style="font-size: 0.65rem; letter-spacing: 3px; text-transform: uppercase;">Descubre</span>
        <div class="mouse-scroll mx-auto border border-secondary rounded-pill position-relative" style="width: 26px; height: 42px;">
          <div class="scroll-wheel bg-gold rounded-circle position-absolute start-50 translate-middle-x" style="width: 4px; height: 8px; top: 6px; animation: scrollDown 2s cubic-bezier(0.15, 0.41, 0.69, 0.94) infinite;"></div>
        </div>
      </div>
    </header>

    <!-- SECCIÓN 2 - PRODUCTOS DESTACADOS -->
    <section id="destacados" class="section-padding bg-black-deep">
      <div class="container">
        <div class="text-center mb-5">
          <span class="text-gold text-uppercase fw-bold letter-spacing-2" style="font-size: 0.8rem;">Selección Exclusiva</span>
          <h2 class="section-title text-white">PRODUCTOS DESTACADOS</h2>
          <div class="divider-gold mx-auto mt-2"></div>
        </div>

        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-gold mb-3" role="status"></div>
          <p class="text-secondary">Cargando colección premium...</p>
        </div>

        <div v-else class="row g-4">
          <div class="col-md-6 col-lg-4 col-xl-3" v-for="p in featuredProducts" :key="p.id">
            <div class="product-premium-card" @click="openDetails(p)">
              <div class="card-image-wrapper">
                <template v-if="p.imagen">
                  <video v-if="isVideoUrl(p.imagen)" :src="getImageUrl(p.imagen)" muted autoplay loop playsinline class="card-img-premium"></video>
                  <img v-else :src="getImageUrl(p.imagen)" :alt="p.nombre" class="card-img-premium" />
                </template>
                <div v-else class="card-img-fallback">
                  <i :class="getCategoryIcon(p.categoria?.nombre)" class="fallback-icon"></i>
                </div>
                <span class="badge-category">{{ p.categoria?.nombre }}</span>
              </div>
              <div class="card-body-premium">
                <small class="text-gold fw-bold text-uppercase d-block mb-1">{{ p.marca?.nombre }}</small>
                <h5 class="premium-title text-truncate text-white">{{ p.nombre }}</h5>
                <p class="premium-price mb-2">Bs. {{ Number(p.precioVenta).toFixed(2) }}</p>
                <div v-if="p.precioCaja && p.unidadesPorCaja" class="mb-3" style="line-height: 1.1;">
                  <span class="badge bg-secondary bg-opacity-10 text-secondary border border-secondary-subtle" style="font-size: 0.7rem;">
                    Caja ({{p.unidadesPorCaja}} un): <span class="text-white">Bs. {{ Number(p.precioCaja).toFixed(2) }}</span>
                  </span>
                </div>
                <div v-else class="mb-3" style="line-height: 1.1; opacity: 0;">&nbsp;</div>
                <div class="d-flex justify-content-between align-items-center pt-2 border-top border-dark">
                  <span class="badge bg-dark text-secondary p-2">Stock: {{ p.stock }}</span>
                  <button v-if="p.stock > 0" class="btn btn-gold-sm" @click.stop="openDetails(p)">
                    <i class="bi bi-cart-plus"></i> Comprar
                  </button>
                  <span v-else class="text-danger fw-bold small">Agotado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 3 - CATEGORÍAS -->
    <section id="categorias" class="section-padding bg-dark-glow border-top border-dark">
      <div class="container">
        <div class="text-center mb-5">
          <span class="text-gold text-uppercase fw-bold letter-spacing-2" style="font-size: 0.8rem;">Variedad Premium</span>
          <h2 class="section-title text-white">NUESTRAS CATEGORÍAS</h2>
          <div class="divider-gold mx-auto mt-2"></div>
        </div>

        <div class="row g-4">
          <div class="col-6 col-md-4 col-lg-3" v-for="cat in categorias" :key="cat.id">
            <div class="category-premium-card" @click="selectDbCategory(cat.id)">
              <div class="category-image-wrapper">
                <img :src="getImageUrl(cat.imagen) || 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=400'" :alt="cat.nombre" class="category-img" />
                <div class="category-overlay">
                  <h4 class="category-name text-white">{{ cat.nombre }}</h4>
                  <span class="category-btn btn btn-gold-sm">Ver Licores</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 4 - NUESTRAS MARCAS (Slider Continuo) -->
    <section class="brands-marquee bg-black-deep py-5 border-top border-bottom border-dark">
      <div class="marquee-wrapper">
        <div class="marquee-content">
          <span class="brand-item" v-for="b in brandNames" :key="b">{{ b }}</span>
        </div>
        <div class="marquee-content" aria-hidden="true">
          <span class="brand-item" v-for="b in brandNames" :key="b + '-dup'">{{ b }}</span>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 5 - POR QUÉ ELEGIRNOS -->
    <section id="elegirnos" class="section-padding bg-dark-glow">
      <div class="container">
        <div class="text-center mb-5">
          <span class="text-gold text-uppercase fw-bold letter-spacing-2" style="font-size: 0.8rem;">Nuestra Garantía</span>
          <h2 class="section-title text-white">¿POR QUÉ ELEGIRNOS?</h2>
          <div class="divider-gold mx-auto mt-2"></div>
        </div>

        <div class="row g-4">
          <div class="col-md-4">
            <div class="why-card text-center">
              <div class="why-icon-box mx-auto mb-4">
                <img src="/logo_owl.png" alt="Nocturne Logo" style="height: 2.5em; width: auto; object-fit: contain; margin-right: 12px; border-radius: 50%;" />
              </div>
              <h4 class="text-white mb-3">Seguridad</h4>
              <p class="text-secondary mb-0">Tus transacciones y datos están protegidos bajo protocolos de alta seguridad.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="why-card text-center">
              <div class="why-icon-box mx-auto mb-4">
                <i class="bi bi-award-fill"></i>
              </div>
              <h4 class="text-white mb-3">Calidad</h4>
              <p class="text-secondary mb-0">Importaciones legítimas y licores nacionales con certificación 100% de origen.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="why-card text-center">
              <div class="why-icon-box mx-auto mb-4">
                <i class="bi bi-truck"></i>
              </div>
              <h4 class="text-white mb-3">Entrega</h4>
              <p class="text-secondary mb-0">Envíos rápidos a domicilio en condiciones óptimas de empaque y temperatura.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 6 - TIENDA & CATALOGO (Productos más vendidos / Catálogo completo) -->
    <section id="tienda" class="section-padding bg-black-deep border-top border-dark">
      <div class="container">
        <div class="text-center mb-5">
          <span class="text-gold text-uppercase fw-bold letter-spacing-2" style="font-size: 0.8rem;">Nuestra Bodega</span>
          <h2 class="section-title text-white">CATÁLOGO DE PRODUCTOS</h2>
          <div class="divider-gold mx-auto mt-2"></div>
        </div>

        <!-- Filter bar -->
        <div class="row g-3 mb-5 align-items-center">
          <div class="col-md-5">
            <div class="search-box-gold">
              <i class="bi bi-search text-gold"></i>
              <input type="text" class="form-control" placeholder="Buscar licor por nombre o código..." v-model="searchQuery" />
            </div>
          </div>
          <div class="col-md-4">
            <select class="form-select-gold" v-model="selectedMarcaId">
              <option :value="null">Todas las Marcas</option>
              <option v-for="m in marcas" :key="m.id" :value="m.id">{{ m.nombre }} ({{ m.paisOrigen }})</option>
            </select>
          </div>
          <div class="col-md-3">
            <select class="form-select-gold" v-model="sortBy">
              <option value="nombre">Ordenar por Nombre</option>
              <option value="precioAsc">Precio: Menor a Mayor</option>
              <option value="precioDesc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>

        <!-- Category Tabs -->
        <div class="d-flex flex-wrap justify-content-center gap-2 mb-5">
          <button 
            class="btn category-tab-gold" 
            :class="{ active: selectedCategoriaId === null }" 
            @click="selectedCategoriaId = null"
          >
            Todos
          </button>
          <button 
            v-for="cat in categorias" 
            :key="cat.id" 
            class="btn category-tab-gold"
            :class="{ active: selectedCategoriaId === cat.id }"
            @click="selectedCategoriaId = cat.id"
          >
            {{ cat.nombre }}
          </button>
        </div>

        <!-- No items -->
        <div v-if="filteredProducts.length === 0" class="text-center py-5">
          <i class="bi bi-search text-secondary" style="font-size: 3rem;"></i>
          <h5 class="mt-3 text-white">No se encontraron productos</h5>
          <p class="text-secondary">Prueba con otros términos de búsqueda o filtros.</p>
        </div>

        <!-- Main Products Grid -->
        <div v-else class="row g-4">
          <div class="col-md-6 col-lg-4 col-xl-3" v-for="p in filteredProducts" :key="p.id">
            <div class="product-premium-card" @click="openDetails(p)">
              <div class="card-image-wrapper">
                <template v-if="p.imagen">
                  <video v-if="isVideoUrl(p.imagen)" :src="getImageUrl(p.imagen)" muted autoplay loop playsinline class="card-img-premium"></video>
                  <img v-else :src="getImageUrl(p.imagen)" :alt="p.nombre" class="card-img-premium" />
                </template>
                <div v-else class="card-img-fallback">
                  <i :class="getCategoryIcon(p.categoria?.nombre)" class="fallback-icon"></i>
                </div>
                <span class="badge-category">{{ p.categoria?.nombre }}</span>
                <span class="badge bg-gold text-dark position-absolute top-0 start-0 m-3 fw-bold" v-if="getActiveDiscount(p) > 0" style="z-index: 5; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
                  {{ getActiveDiscount(p) }}% DTO
                </span>
              </div>
              <div class="card-body-premium">
                <small class="text-gold fw-bold text-uppercase d-block mb-1">{{ p.marca?.nombre }}</small>
                <h5 class="premium-title text-truncate text-white">{{ p.nombre }}</h5>
                <p class="premium-price mb-2">
                  <template v-if="getActiveDiscount(p) > 0">
                    <span class="text-gold">Bs. {{ getDiscountedPrice(p).toFixed(2) }}</span>
                    <span class="text-secondary text-decoration-line-through ms-2" style="font-size: 0.82rem;">Bs. {{ Number(p.precioVenta).toFixed(2) }}</span>
                  </template>
                  <template v-else>
                    Bs. {{ Number(p.precioVenta).toFixed(2) }}
                  </template>
                </p>
                <div v-if="p.precioCaja && p.unidadesPorCaja" class="mb-3" style="line-height: 1.1;">
                  <span class="badge bg-secondary bg-opacity-10 text-secondary border border-secondary-subtle" style="font-size: 0.7rem;">
                    Caja ({{p.unidadesPorCaja}} un): <span class="text-white">Bs. {{ Number(p.precioCaja).toFixed(2) }}</span>
                  </span>
                </div>
                <div v-else class="mb-3" style="line-height: 1.1; opacity: 0;">&nbsp;</div>
                <div class="d-flex justify-content-between align-items-center pt-2 border-top border-dark">
                  <span class="badge bg-dark text-secondary p-2">Stock: {{ p.stock }}</span>
                  <button v-if="p.stock > 0" class="btn btn-gold-sm" @click.stop="openDetails(p)">
                    <i class="bi bi-cart-plus"></i> Comprar
                  </button>
                  <span v-else class="text-danger fw-bold small">Agotado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 7 - TESTIMONIOS -->
    <section id="testimonios" class="section-padding bg-dark-glow border-top border-dark">
      <div class="container">
        <div class="text-center mb-5">
          <span class="text-gold text-uppercase fw-bold letter-spacing-2" style="font-size: 0.8rem;">Opiniones</span>
          <h2 class="section-title text-white">TESTIMONIOS DE CLIENTES</h2>
          <div class="divider-gold mx-auto mt-2"></div>
        </div>

        <div class="row g-4">
          <div class="col-md-4" v-for="t in testimonials" :key="t.name">
            <div class="testimonial-card">
              <div class="d-flex align-items-center gap-3 mb-4">
                <img :src="t.photo" :alt="t.name" class="testimonial-img" />
                <div>
                  <h5 class="text-white mb-1">{{ t.name }}</h5>
                  <div class="text-gold">
                    <i class="bi bi-star-fill" v-for="star in t.rating" :key="star"></i>
                  </div>
                </div>
              </div>
              <p class="text-secondary mb-0">"{{ t.comment }}"</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 8 - SUSCRIPCIÓN -->
    <section class="section-padding bg-black-deep border-top border-dark">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <span class="text-gold text-uppercase fw-bold letter-spacing-2" style="font-size: 0.8rem;">Newsletter</span>
            <h3 class="text-white fw-bold mb-3 mt-2">SUSCRÍBETE A NUESTRO CLUB DE SOCIOS</h3>
            <p class="text-secondary mb-4 max-width-600 mx-auto">Recibe promociones exclusivas, invitaciones a catas privadas y entérate de nuevos ingresos antes que nadie.</p>
            
            <form @submit.prevent="subscribeNewsletter" class="input-group-gold mx-auto" style="max-width: 500px;">
              <input type="email" class="form-control" placeholder="Ingresa tu correo electrónico" required v-model="newsletterEmail" />
              <button class="btn btn-gold-custom px-4" type="submit">Suscribirme</button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER PREMIUM -->
    <footer class="footer-premium border-top border-dark bg-dark-glow py-5">
      <div class="container">
        <div class="row g-5 mb-5">
          <div class="col-lg-4">
            <h4 class="brand-text-gold mb-4">NOCTURNE:COLD STORAGE</h4>
            <p class="text-secondary mb-4">
              "Donde la confianza se celebra." El refugio definitivo para los amantes de las buenas bebidas. Contamos con una amplia bodega de licores importados y nacionales de calidad certificada.
            </p>
            <div class="social-links-gold d-flex gap-3">
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" class="social-circle-gold"><i class="bi bi-facebook"></i></a>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" class="social-circle-gold"><i class="bi bi-instagram"></i></a>
              <a href="https://www.x.com/" target="_blank" rel="noopener noreferrer" class="social-circle-gold"><i class="bi bi-twitter-x"></i></a>
              <a href="https://wa.me/59175781303" target="_blank" rel="noopener noreferrer" class="social-circle-gold"><i class="bi bi-whatsapp"></i></a>
            </div>
          </div>
          
          <div class="col-md-6 col-lg-4">
            <h4 class="footer-title-gold mb-4">HORARIO DE ATENCIÓN</h4>
            <ul class="list-unstyled text-secondary d-flex flex-column gap-3">
              <li class="d-flex align-items-center gap-2">
                <i class="bi bi-clock text-gold"></i>
                <span>Lunes a Sábado: 10:00 AM - 11:00 PM</span>
              </li>
              <li class="d-flex align-items-center gap-2">
                <i class="bi bi-clock text-gold"></i>
                <span>Domingos: 11:00 AM - 08:00 PM</span>
              </li>
            </ul>
          </div>
          
          <div class="col-md-6 col-lg-4">
            <h4 class="footer-title-gold mb-4">DIRECCIÓN & CONTACTO</h4>
            <ul class="list-unstyled text-secondary d-flex flex-column gap-3">
              <li class="d-flex align-items-start gap-2">
                <i class="bi bi-geo-alt-fill text-gold mt-1"></i>
                <span>Calle El Paraiso 123, Sucre - Bolivia</span>
              </li>
              <li class="d-flex align-items-center gap-2">
                <i class="bi bi-whatsapp text-gold"></i>
                <a href="https://wa.me/59175781303" target="_blank" rel="noopener noreferrer" class="text-secondary text-decoration-none">+591 75781303</a>
              </li>
              <li class="d-flex align-items-center gap-2">
                <i class="bi bi-envelope-fill text-gold"></i>
                <span>contacto@lafortaleza.com.bo</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom-gold text-center pt-4" style="border-top: 1px solid rgba(255,255,255,0.05);">
          <p class="text-secondary mb-0">&copy; 2026 NOCTURNE:COLD STORAGE. Todos los derechos reservados. Diseñado para la materia SIS257.</p>
        </div>
      </div>
    </footer>

    <!-- Details Modal -->
    <div class="modal fade" ref="detailsModalRef" id="productDetailsModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" v-if="selectedProduct">
          <div class="modal-header">
            <h5 class="modal-title d-flex align-items-center gap-2">
              <i class="bi bi-patch-check-fill text-gold"></i>
              Detalle del Licor
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-center py-4">
            <div class="modal-image-holder mb-3" v-if="selectedProduct.imagen">
              <video v-if="isVideoUrl(selectedProduct.imagen)" :src="getImageUrl(selectedProduct.imagen)" controls autoplay muted class="modal-prod-image"></video>
              <img v-else :src="getImageUrl(selectedProduct.imagen)" :alt="selectedProduct.nombre" class="modal-prod-image" />
            </div>
            <div v-else class="modal-icon-holder mb-3">
              <i :class="getCategoryIcon(selectedProduct.categoria?.nombre)" style="font-size: 4rem; color: var(--gold);"></i>
            </div>
            <span class="badge bg-secondary mb-2 text-uppercase">{{ selectedProduct.categoria?.nombre }}</span>
            <h3 class="text-white mb-1">{{ selectedProduct.nombre }}</h3>
            <p class="text-gold fw-semibold mb-3">{{ selectedProduct.marca?.nombre }} ({{ selectedProduct.marca?.paisOrigen }})</p>
            
            <p class="text-secondary px-3 mb-4">
              {{ selectedProduct.descripcion || 'Este producto no cuenta con una descripción detallada en este momento. Garantizamos el estándar de calidad característico de su marca.' }}
            </p>
            
            <div v-if="!selectedProduct.esCombo" class="row g-2 justify-content-center">
              <div class="col-5">
                <div class="p-2 border rounded border-secondary h-100 d-flex flex-column justify-content-between" style="background: rgba(255,255,255,0.02);">
                  <div>
                    <small class="text-secondary d-block">Unidad</small>
                    <strong class="text-white" style="font-size: 1.1rem;">
                      <template v-if="getActiveDiscount(selectedProduct) > 0">
                        <span class="text-gold">Bs. {{ getDiscountedPrice(selectedProduct).toFixed(2) }}</span>
                      </template>
                      <template v-else>
                        Bs. {{ Number(selectedProduct.precioVenta).toFixed(2) }}
                      </template>
                    </strong>
                  </div>
                  <div class="mt-2" v-if="selectedProduct.stock >= 1">
                    <div class="qty-selector-custom mx-auto">
                      <button class="qty-btn-custom" type="button" @click="qtyUnidad > 0 ? qtyUnidad-- : null">-</button>
                      <input type="number" min="0" step="1" class="qty-input-custom" v-model.number="qtyUnidad" @input="sanitizeUnidad" />
                      <button class="qty-btn-custom" type="button" @click="qtyUnidad < selectedProduct.stock ? qtyUnidad++ : null">+</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-5" v-if="selectedProduct.precioCaja && selectedProduct.unidadesPorCaja">
                <div class="p-2 border rounded border-secondary h-100 d-flex flex-column justify-content-between" style="background: rgba(255,255,255,0.02);">
                  <div>
                    <small class="text-secondary d-block">Caja ({{selectedProduct.unidadesPorCaja}} un)</small>
                    <strong class="text-white" style="font-size: 1.1rem;">
                      Bs. {{ Number(selectedProduct.precioCaja).toFixed(2) }}
                    </strong>
                    <small class="text-secondary d-block mt-1" style="font-size: 0.75rem;">
                      (Bs. {{ (Number(selectedProduct.precioCaja) / selectedProduct.unidadesPorCaja).toFixed(2) }} c/u)
                    </small>
                  </div>
                  <div class="mt-2" v-if="selectedProduct.stock >= selectedProduct.unidadesPorCaja">
                    <div class="qty-selector-custom mx-auto">
                      <button class="qty-btn-custom" type="button" @click="qtyCaja > 0 ? qtyCaja-- : null">-</button>
                      <input type="number" min="0" step="1" class="qty-input-custom" v-model.number="qtyCaja" @input="sanitizeCaja" />
                      <button class="qty-btn-custom" type="button" @click="(qtyCaja + 1) * selectedProduct.unidadesPorCaja <= selectedProduct.stock ? qtyCaja++ : null">+</button>
                    </div>
                  </div>
                  <span v-else class="text-danger d-block mt-2" style="font-size:0.8rem;">Stock insuf.</span>
                </div>
              </div>
              <div class="col-5" v-else>
                <div class="p-2 border rounded border-secondary" style="background: rgba(255,255,255,0.02);">
                  <small class="text-secondary d-block">Disponibilidad</small>
                  <strong :class="selectedProduct.stock > 0 ? 'text-success' : 'text-danger'" style="font-size: 1.1rem;">
                    {{ selectedProduct.stock > 0 ? 'En Stock' : 'Agotado' }}
                  </strong>
                </div>
              </div>
            </div>
            
            <div v-else class="text-start px-3">
              <h5 class="text-gold mb-3 border-bottom border-dark pb-2 animate-glow" style="font-size: 1rem; font-family: 'Cinzel', serif;">
                <i class="bi bi-tools text-gold me-2"></i>Arma tu Combo
              </h5>
              
              <div v-if="loadingComboItems" class="text-center py-4">
                <div class="spinner-border text-gold spinner-border-sm" role="status"></div>
                <small class="text-secondary d-block mt-2">Cargando componentes del combo...</small>
              </div>
              
              <div v-else class="mb-4">
                <div v-for="(comp, index) in customizedComponents" :key="index" class="mb-3 p-2 rounded border border-secondary" style="background: rgba(255,255,255,0.01);">
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <span class="text-white fw-semibold" style="font-size: 0.85rem;">
                      {{ comp.defaultProducto.nombre }} (x{{ comp.cantidad }})
                    </span>
                    <span class="badge bg-dark text-gold border border-gold border-opacity-25" style="font-size: 0.65rem;">
                      {{ comp.defaultProducto.categoria?.nombre || 'General' }}
                    </span>
                  </div>
                  <select class="form-select-gold py-1" v-model="comp.selectedProductoId" style="font-size: 0.82rem; padding: 0.4rem 0.8rem;">
                    <option v-for="alt in getAlternativeProducts(comp.categoriaId)" :key="alt.id" :value="alt.id">
                      {{ alt.nombre }} — Stock: {{ alt.stock }} u.
                    </option>
                  </select>
                </div>
                
                <!-- Hielo option checkbox -->
                <div class="form-check form-switch p-3 rounded border border-secondary mb-3 mt-4" style="background: rgba(255,255,255,0.02);">
                  <input class="form-check-input" type="checkbox" id="hieloSwitch" v-model="conHielo" style="cursor: pointer;" />
                  <label class="form-check-label text-white fw-bold d-flex align-items-center gap-2" for="hieloSwitch" style="cursor: pointer; font-size: 0.9rem;">
                    <i class="bi bi-snow text-info"></i>
                    <span>¿Agregar bolsa de hielo a tu combo? (+ Bs. 5.00)</span>
                  </label>
                  <small class="text-secondary d-block mt-1 ms-1" style="font-size: 0.75rem;">Recibe tu combo helado y listo para disfrutar.</small>
                </div>

                <!-- Final price display & quantity -->
                <div class="d-flex justify-content-between align-items-center mt-4 p-3 rounded border border-gold border-opacity-25" style="background: rgba(212, 175, 55, 0.03);">
                  <div>
                    <span class="text-secondary d-block" style="font-size: 0.75rem;">PRECIO COMBO:</span>
                    <strong class="text-gold" style="font-size: 1.4rem;">
                      Bs. {{ (getDiscountedPrice(selectedProduct) + (conHielo ? 5 : 0)).toFixed(2) }}
                    </strong>
                  </div>
                  <div class="d-flex flex-column align-items-end">
                    <span class="text-secondary mb-1" style="font-size: 0.75rem;">CANTIDAD COMBO:</span>
                    <div class="qty-selector-custom">
                      <button class="qty-btn-custom" type="button" @click="qtyUnidad > 0 ? qtyUnidad-- : null">-</button>
                      <input type="number" min="0" step="1" class="qty-input-custom" v-model.number="qtyUnidad" @input="sanitizeUnidad" />
                      <button class="qty-btn-custom" type="button" @click="qtyUnidad < selectedProduct.stock ? qtyUnidad++ : null">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-between align-items-center">
            <div class="text-start">
              <small class="text-secondary d-block">Stock total:</small>
              <strong class="text-white">{{ selectedProduct.stock }} u.</strong>
            </div>
            <div class="d-flex gap-2">
              <button type="button" class="btn btn-secondary px-4 py-2" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" class="btn btn-gold-custom px-4 py-2 d-flex align-items-center gap-2" @click="addToCartCombined">
                <i class="bi bi-cart-plus-fill"></i> Llevar al Carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart Modal -->
    <div class="modal fade" ref="cartModalRef" id="cartModal" tabindex="-1">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><i class="bi bi-cart3 text-gold me-2"></i> Mi Carrito de Compras</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div v-if="cart.length === 0" class="text-center py-5">
              <i class="bi bi-cart-x text-secondary" style="font-size: 3rem;"></i>
              <p class="text-secondary mt-3">Tu carrito está vacío.</p>
              <button class="btn btn-outline-gold btn-sm mt-2" data-bs-dismiss="modal">Seguir Explorando</button>
            </div>
            <div v-else>
              <div class="table-responsive">
                <table class="table table-dark table-hover align-middle mb-4" style="color: var(--text-light);">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio Unitario</th>
                      <th class="text-center" style="width: 140px;">Cantidad</th>
                      <th class="text-end">Subtotal</th>
                      <th class="text-center" style="width: 60px;"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in cart" :key="index">
                      <td>
                        <span class="fw-semibold text-white d-block">{{ item.nombre }} <span class="text-gold" style="font-size: 0.75rem;">({{ item.tipoVenta }})</span></span>
                        <small class="text-secondary">{{ item.codigo }}</small>
                        <!-- Customize Components Sublist -->
                        <div v-if="item.componentes && item.componentes.length > 0" class="mt-1 ps-2 border-start border-gold" style="border-width: 2px !important;">
                          <small class="text-secondary d-block" style="font-size: 0.72rem; line-height: 1.1;">Componentes:</small>
                          <small v-for="c in item.componentes" :key="c.productoId" class="text-light d-block" style="font-size: 0.68rem; line-height: 1.1;">
                            • {{ c.nombre }} (x{{ c.cantidad }})
                          </small>
                        </div>
                        <!-- Con Hielo Badge -->
                        <span v-if="item.conHielo" class="badge bg-info text-dark mt-1 d-inline-flex align-items-center gap-1" style="font-size: 0.65rem;">
                          <i class="bi bi-snow"></i> Con Hielo
                        </span>
                      </td>
                      <td>
                        <div class="text-white">Bs. {{ Number(item.precio).toFixed(2) }}</div>
                        <small class="text-secondary d-block" style="font-size: 0.7rem; line-height: 1;" v-if="item.tipoVenta === 'Caja'">
                          (equivale a Bs. {{ (Number(item.precio) / item.factorUnidades).toFixed(2) }} c/u)
                        </small>
                      </td>
                      <td>
                        <div class="d-flex align-items-center justify-content-center gap-2">
                          <button class="btn-qty" @click="decreaseQty(index)">-</button>
                          <span class="qty-display">{{ item.cantidad }}</span>
                          <button class="btn-qty" @click="increaseQty(index)">+</button>
                        </div>
                      </td>
                      <td class="text-end fw-bold">Bs. {{ (item.cantidad * item.precio).toFixed(2) }}</td>
                      <td class="text-center">
                        <button class="btn btn-sm btn-outline-danger" @click="removeFromCart(index)"><i class="bi bi-trash"></i></button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Tipo de Entrega & Delivery details -->
              <div class="row g-3 p-3 rounded border border-secondary mb-3" style="background: rgba(255,255,255,0.02);">
                <div class="col-12">
                  <label class="form-label text-gold fw-bold mb-2"><i class="bi bi-truck me-2"></i>Tipo de Entrega</label>
                  <div class="d-flex gap-3 mb-3">
                    <div class="flex-grow-1">
                      <input type="radio" class="btn-check" name="cartTipoEntrega" id="cartEntregaTienda" value="Tienda" v-model="cartTipoEntrega" />
                      <label class="btn btn-outline-custom w-100 py-2 d-flex align-items-center justify-content-center gap-2" for="cartEntregaTienda" style="border-radius: 8px;">
                        <i class="bi bi-shop"></i> Recoger en Tienda
                      </label>
                    </div>
                    <div class="flex-grow-1">
                      <input type="radio" class="btn-check" name="cartTipoEntrega" id="cartEntregaDelivery" value="Delivery" v-model="cartTipoEntrega" />
                      <label class="btn btn-outline-custom w-100 py-2 d-flex align-items-center justify-content-center gap-2" for="cartEntregaDelivery" style="border-radius: 8px;">
                        <i class="bi bi-geo-alt"></i> Delivery
                      </label>
                    </div>
                  </div>
                  
                  <!-- Si es Delivery, pedir datos -->
                  <div v-if="cartTipoEntrega === 'Delivery'" class="p-3 rounded border border-secondary" style="background: rgba(0, 0, 0, 0.2);">
                    <div class="row g-2">
                      <div class="col-12 mb-3">
                        <label class="form-label mb-1" style="font-size: 0.75rem; color: var(--gold);"><i class="bi bi-map me-1"></i> Seleccionar Ubicación en el Mapa (Sucre)</label>
                        <div id="map-cart" style="height: 220px; border-radius: 8px; border: 1px solid var(--border-color); z-index: 1;"></div>
                        <small class="text-secondary" style="font-size: 0.7rem; display: block; margin-top: 4px;">Haz clic en el mapa de Sucre o arrastra el marcador para autocompletar tu dirección exacta.</small>
                      </div>
                      <div class="col-12">
                        <label class="form-label mb-1" style="font-size: 0.75rem;">Dirección de Entrega *</label>
                        <div class="input-group input-group-sm">
                          <input type="text" class="form-control form-control-sm" placeholder="Ej: Av. Las Americas #123" v-model="cartDireccion" @keyup.enter="forwardGeocodeCart" required />
                          <button class="btn btn-outline-secondary d-flex align-items-center gap-1" type="button" @click="forwardGeocodeCart" title="Buscar dirección en el mapa">
                            <i class="bi bi-search"></i>
                            <span class="d-none d-md-inline">Buscar</span>
                          </button>
                        </div>
                        <small class="text-secondary" style="font-size: 0.68rem; display: block; margin-top: 2px;">Escribe una dirección y presiona Enter o haz clic en Buscar para ubicarla en el mapa.</small>
                      </div>
                      <div class="col-12">
                        <label class="form-label mb-1" style="font-size: 0.75rem;">Referencia de Ubicación</label>
                        <input type="text" class="form-control form-control-sm" placeholder="Ej: Portón dorado al lado de la farmacia" v-model="cartReferencia" />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label mb-1" style="font-size: 0.75rem;">Teléfono de Contacto *</label>
                        <input type="text" class="form-control form-control-sm" placeholder="Ej: 71234567" v-model="cartTelefonoContacto" required />
                      </div>
                      <div class="col-md-6">
                        <label class="form-label mb-1" style="font-size: 0.75rem;">Costo de Envío</label>
                        <input type="text" class="form-control form-control-sm bg-transparent border-0 text-gold fw-bold" readonly :value="'Bs. ' + cartCostoDelivery.toFixed(2)" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Payment Method & Total -->
              <div class="row g-3 p-3 rounded border border-secondary mb-4" style="background: rgba(255,255,255,0.02);">
                <div class="col-md-6">
                  <label class="form-label">Método de Pago</label>
                  <select class="form-select select-gold-payment" v-model="cartMetodoPagoId">
                    <option v-for="m in metodosPago" :key="m.id" :value="m.id">{{ m.nombre }}</option>
                  </select>
                  <small class="text-secondary mt-1 d-block">Selecciona cómo deseas pagar tu pedido.</small>
                </div>
                <div class="col-md-6 text-md-end d-flex flex-column justify-content-center">
                  <span class="text-secondary" style="font-size: 0.9rem;">TOTAL A PAGAR:</span>
                  <span class="fw-black text-gold" style="font-size: 2rem;">Bs. {{ cartTotal.toFixed(2) }}</span>
                </div>
              </div>

              <div class="d-flex gap-2 justify-content-end">
                <button type="button" class="btn btn-secondary px-4 py-2" data-bs-dismiss="modal">Seguir Comprando</button>
                <button type="button" class="btn btn-gold-custom px-4 py-2" @click="confirmarCompra" :disabled="processingCart">
                  <span v-if="processingCart"><i class="bi bi-arrow-repeat spin"></i> Procesando...</span>
                  <span v-else><i class="bi bi-check-circle me-1"></i> Confirmar Pedido</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- History Modal -->
    <div class="modal fade" ref="historyModalRef" id="historyModal" tabindex="-1">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><i class="bi bi-clock-history text-gold me-2"></i> Mis Pedidos</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div v-if="loadingHistory" class="text-center py-5">
              <div class="spinner-border text-gold mb-2" role="status"></div>
              <p class="text-secondary">Cargando historial...</p>
            </div>
            <div v-else-if="pedidos.length === 0" class="text-center py-5">
              <i class="bi bi-receipt text-secondary" style="font-size: 3rem;"></i>
              <p class="text-secondary mt-3">Aún no has realizado compras.</p>
            </div>
            <div v-else>
              <div class="table-responsive">
                <table class="table table-dark table-hover align-middle mb-0" style="color: var(--text-light);">
                  <thead>
                    <tr>
                      <th>Pedido #</th>
                      <th>Fecha</th>
                      <th>Método de Pago</th>
                      <th class="text-end">Total</th>
                      <th class="text-center">Estado</th>
                      <th>Detalle del Pedido</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="ped in pedidos" :key="ped.id">
                      <td>#{{ ped.id }}</td>
                      <td>{{ new Date(ped.fecha).toLocaleString('es-BO') }}</td>
                      <td>
                        <span class="badge bg-secondary">{{ ped.pagos?.[0]?.metodoPago?.nombre || 'Efectivo' }}</span>
                      </td>
                      <td class="text-end fw-bold text-gold">Bs. {{ Number(ped.total).toFixed(2) }}</td>
                      <td class="text-center">
                        <span class="badge" :class="badgeEstado(ped.estado)">{{ ped.estado }}</span>
                      </td>
                      <td>
                        <ul class="list-unstyled mb-0" style="font-size: 0.8rem; color: var(--text-muted);">
                          <li v-for="det in ped.detalles" :key="det.id">
                            • {{ det.producto?.nombre }} (x{{ det.cantidad }} {{ det.tipoVenta || 'Unidad' }})
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'
import http from '@/plugins/axios'
import { getImageUrl } from '@/helpers'
import { Modal } from 'bootstrap'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const isNavbarOpen = ref(false)

const heroVideoUrl = ref('/video/hero.mp4')
const heroVideoRef = ref<HTMLVideoElement | null>(null)
const loading = ref(true)
const products = ref<any[]>([])
const categorias = ref<any[]>([])
const marcas = ref<any[]>([])
const selectedProduct = ref<any>(null)
const detailsModalRef = ref<HTMLElement>()
let detailsModal: Modal | null = null

// Filters state
const searchQuery = ref('')
const selectedCategoriaId = ref<number | null>(null)
const selectedMarcaId = ref<number | null>(null)
const sortBy = ref('nombre')
const newsletterEmail = ref('')

const qtyUnidad = ref(0)
const qtyCaja = ref(0)

// Combo builder state
const comboItems = ref<any[]>([])
const loadingComboItems = ref(false)
const conHielo = ref(false)
const customizedComponents = ref<any[]>([])

// Cart and History state
const cart = ref<{
  productoId: number;
  nombre: string;
  codigo: string;
  cantidad: number;
  precio: number;
  stock: number;
  tipoVenta: string;
  factorUnidades: number;
  conHielo?: boolean;
  componentes?: { productoId: number; cantidad: number; nombre: string }[];
}[]>([])
const metodosPago = ref<any[]>([])
const cartMetodoPagoId = ref(1)
const processingCart = ref(false)
const cartModalRef = ref<HTMLElement>()
let cartModal: Modal | null = null

const cartTipoEntrega = ref('Tienda')
const cartDireccion = ref('')
const cartReferencia = ref('')
const cartTelefonoContacto = ref('')
const cartCostoDelivery = ref(10.00)

const cartLat = ref<number>(-19.0429)
const cartLng = ref<number>(-65.2554)
let cartMapInstance: any = null
let cartMarkerInstance: any = null

const pedidos = ref<any[]>([])
const loadingHistory = ref(false)
const historyModalRef = ref<HTMLElement>()
let historyModal: Modal | null = null

// static categories configuration with images
const staticCategories = [
  { name: 'Whisky', dbName: 'Whisky', image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?q=80&w=400' },
  { name: 'Ron', dbName: 'Ron', image: 'https://images.unsplash.com/photo-1614313511387-1436a4480edd?q=80&w=400' },
  { name: 'Vodka', dbName: 'Vodka', image: 'https://images.unsplash.com/photo-1596701062351-df5f8a4261e5?q=80&w=400' },
  { name: 'Cerveza', dbName: 'Cervezas', image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=400' },
  { name: 'Vino', dbName: 'Vinos', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=400' },
  { name: 'Singani', dbName: 'Singani', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=400' },
  { name: 'Tequila', dbName: 'Tequila', image: 'https://images.unsplash.com/photo-1516535794938-6063878f08cc?q=80&w=400' },
  { name: 'Energizantes', dbName: 'Energizantes', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400' },
]

// static brand names list for continuous marquee slider
const brandNames = [
  'Johnnie Walker',
  "Jack Daniel's",
  'Chivas Regal',
  'Old Parr',
  'Paceña',
  'Huari',
  'Corona',
  'Heineken',
  'Bacardí',
  'Absolut'
]

// static customer testimonials list
const testimonials = [
  {
    name: 'Alejandro Siles',
    rating: 5,
    comment: 'Excelente servicio. La entrega fue súper rápida y las botellas llegaron en perfecto estado y con empaque de lujo.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150'
  },
  {
    name: 'Valeria Mendoza',
    rating: 5,
    comment: 'La mejor selección de whiskies importados. Sin duda mi licorería de confianza para todos mis eventos corporativos.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150'
  },
  {
    name: 'Roberto Gómez',
    rating: 5,
    comment: 'Calidad 100% garantizada en cada botella. Su catálogo web es intuitivo y la atención por WhatsApp es excelente.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150'
  }
]

onMounted(async () => {
  if (detailsModalRef.value) detailsModal = new Modal(detailsModalRef.value)
  if (cartModalRef.value) {
    cartModal = new Modal(cartModalRef.value)
    cartModalRef.value.addEventListener('shown.bs.modal', () => {
      if (cartTipoEntrega.value === 'Delivery') {
        nextTick(() => {
          initCartMap()
        })
      }
    })
    cartModalRef.value.addEventListener('hidden.bs.modal', () => {
      destroyCartMap()
    })
  }
  if (historyModalRef.value) historyModal = new Modal(historyModalRef.value)
  
  try {
    const res = await fetch('/video/config.json')
    if (res.ok) {
      const data = await res.json()
      if (data.videoUrl) {
        heroVideoUrl.value = data.videoUrl
      }
    }
  } catch (e) {
    console.error('Error al cargar config de video', e)
  }

  heroVideoRef.value?.play().catch(() => {})

  await loadCatalog()
  
  try {
    const mpRes = await http.get('metodos-pago')
    metodosPago.value = mpRes.data
    if (metodosPago.value.length) cartMetodoPagoId.value = metodosPago.value[0].id
  } catch (e) {}
})

async function loadCatalog() {
  loading.value = true
  try {
    const [pRes, cRes, mRes] = await Promise.all([
      http.get('productos'),
      http.get('categorias'),
      http.get('marcas')
    ])
    products.value = pRes.data
    categorias.value = cRes.data
    marcas.value = mRes.data
  } catch (e) {
    console.error('Error al cargar datos del catálogo público', e)
  } finally {
    loading.value = false
  }
}

// Compute featured premium products (e.g. first 8 products)
const featuredProducts = computed(() => {
  return products.value.slice(0, 8)
})

// Filtered and sorted products
const filteredProducts = computed(() => {
  let list = [...products.value]
  
  // Search query
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(p => 
      p.nombre.toLowerCase().includes(q) || 
      p.codigo.toLowerCase().includes(q) ||
      (p.descripcion && p.descripcion.toLowerCase().includes(q))
    )
  }
  
  // Category filter
  if (selectedCategoriaId.value !== null) {
    list = list.filter(p => p.categoriaId === selectedCategoriaId.value)
  }
  
  // Brand filter
  if (selectedMarcaId.value !== null) {
    list = list.filter(p => p.marcaId === selectedMarcaId.value)
  }
  
  // Sort
  if (sortBy.value === 'nombre') {
    list.sort((a, b) => a.nombre.localeCompare(b.nombre))
  } else if (sortBy.value === 'precioAsc') {
    list.sort((a, b) => Number(a.precioVenta) - Number(b.precioVenta))
  } else if (sortBy.value === 'precioDesc') {
    list.sort((a, b) => Number(b.precioVenta) - Number(a.precioVenta))
  }
  
  return list
})

function isVideoUrl(url?: string) {
  if (!url) return false
  return url.match(/\.(mp4|webm|ogg|mov|avi)$/i) || url.includes('/videos/')
}

function selectDbCategory(catId: number) {
  selectedCategoriaId.value = catId
  const el = document.getElementById('tienda')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function filterByCategory(dbCategoryName: string) {
  const matched = categorias.value.find(c => c.nombre.toLowerCase().includes(dbCategoryName.toLowerCase()))
  if (matched) {
    selectedCategoriaId.value = matched.id
  } else {
    selectedCategoriaId.value = null
  }
  // Scroll smoothly to shop section
  const el = document.getElementById('tienda')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function getCategoryIcon(catName?: string) {
  if (!catName) return 'bi-droplet-fill'
  const name = catName.toLowerCase()
  if (name.includes('cerveza')) return 'bi-beer'
  if (name.includes('whisky') || name.includes('ron') || name.includes('vodka') || name.includes('tequila') || name.includes('singani') || name.includes('brandy')) return 'bi-glass-snifter'
  if (name.includes('vino')) return 'bi-cup-straw'
  if (name.includes('energizante')) return 'bi-lightning-charge-fill'
  return 'bi-droplet-half'
}

function getActiveDiscount(p: any): number {
  if (!p || !p.promocion || !p.promocion.estado) return 0
  const now = new Date()
  const start = new Date(p.promocion.fechaInicio)
  const end = new Date(p.promocion.fechaFin)
  if (now >= start && now <= end) {
    return Number(p.promocion.descuento)
  }
  return 0
}

function getDiscountedPrice(p: any): number {
  const discount = getActiveDiscount(p)
  if (discount > 0) {
    return Number(p.precioVenta) * (1 - discount / 100)
  }
  return Number(p.precioVenta)
}

async function openDetails(product: any) {
  selectedProduct.value = product
  qtyUnidad.value = 0
  qtyCaja.value = 0
  conHielo.value = false
  comboItems.value = []
  customizedComponents.value = []
  
  if (detailsModal) detailsModal.show()

  if (product.esCombo) {
    loadingComboItems.value = true
    try {
      const res = await http.get(`productos/${product.id}/combo-items`)
      comboItems.value = res.data
      customizedComponents.value = res.data.map((item: any) => ({
        defaultProducto: item.producto,
        selectedProductoId: item.productoId,
        cantidad: item.cantidad,
        categoriaId: item.producto?.categoriaId || item.producto?.categoria?.id
      }))
    } catch (e) {
      console.error('Error fetching combo items:', e)
    } finally {
      loadingComboItems.value = false
    }
  }
}

function getAlternativeProducts(categoriaId: number) {
  if (!categoriaId) return []
  return products.value.filter(p => p.categoriaId === categoriaId && !p.esCombo && p.stock > 0)
}

function handleLogout() {
  authStore.logout()
  cart.value = []
  cartTipoEntrega.value = 'Tienda'
  cartDireccion.value = ''
  cartReferencia.value = ''
  cartTelefonoContacto.value = ''
}

watch(cartTipoEntrega, (newVal) => {
  if (newVal === 'Delivery') {
    nextTick(() => {
      initCartMap()
    })
  } else {
    destroyCartMap()
  }
})

function initCartMap() {
  const el = document.getElementById('map-cart')
  if (!el || cartMapInstance) return

  const defaultIcon = (window as any).L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })

  cartMapInstance = (window as any).L.map('map-cart', {
    zoomControl: true,
    attributionControl: false
  }).setView([cartLat.value, cartLng.value], 14);

  (window as any).L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(cartMapInstance)

  cartMarkerInstance = (window as any).L.marker([cartLat.value, cartLng.value], {
    draggable: true,
    icon: defaultIcon
  }).addTo(cartMapInstance)

  cartMarkerInstance.on('dragend', async () => {
    const latLng = cartMarkerInstance.getLatLng()
    cartLat.value = latLng.lat
    cartLng.value = latLng.lng
    await updateCartAddressFromCoords(latLng.lat, latLng.lng)
  })

  cartMapInstance.on('click', async (e: any) => {
    const latLng = e.latlng
    cartMarkerInstance.setLatLng(latLng)
    cartLat.value = latLng.lat
    cartLng.value = latLng.lng
    await updateCartAddressFromCoords(latLng.lat, latLng.lng)
  })
  
  setTimeout(() => {
    if (cartMapInstance) cartMapInstance.invalidateSize()
  }, 300)
}

function destroyCartMap() {
  if (cartMapInstance) {
    cartMapInstance.remove()
    cartMapInstance = null
    cartMarkerInstance = null
  }
}

async function updateCartAddressFromCoords(lat: number, lng: number) {
  const address = await reverseGeocode(lat, lng)
  if (address) {
    cartDireccion.value = address
  }
}

async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`, {
      headers: {
        'Accept-Language': 'es',
        'User-Agent': 'LaFortaleza/1.0'
      }
    })
    if (res.ok) {
      const data = await res.json()
      return data.display_name || null
    }
  } catch (e) {
    console.error('Error reverse geocoding:', e)
  }
  return null
}

async function forwardGeocodeCart() {
  const query = cartDireccion.value.trim()
  if (!query || query.length < 3) return
  try {
    const searchQuery = query.toLowerCase().includes('sucre') ? query : `${query}, Sucre, Bolivia`
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&viewbox=-65.35,-19.12,-65.18,-18.97&bounded=1&limit=1`, {
      headers: {
        'Accept-Language': 'es',
        'User-Agent': 'LaFortaleza/1.0'
      }
    })
    if (res.ok) {
      const data = await res.json()
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat)
        const lng = parseFloat(data[0].lon)
        cartLat.value = lat
        cartLng.value = lng
        if (cartMarkerInstance) cartMarkerInstance.setLatLng([lat, lng])
        if (cartMapInstance) cartMapInstance.setView([lat, lng], 16)
        cartDireccion.value = data[0].display_name
      } else {
        // Try unbounded search within Sucre
        const res2 = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`, {
          headers: {
            'Accept-Language': 'es',
            'User-Agent': 'LaFortaleza/1.0'
          }
        })
        if (res2.ok) {
          const data2 = await res2.json()
          if (data2.length > 0) {
            const lat = parseFloat(data2[0].lat)
            const lng = parseFloat(data2[0].lon)
            cartLat.value = lat
            cartLng.value = lng
            if (cartMarkerInstance) cartMarkerInstance.setLatLng([lat, lng])
            if (cartMapInstance) cartMapInstance.setView([lat, lng], 16)
            cartDireccion.value = data2[0].display_name
          }
        }
      }
    }
  } catch (e) {
    console.error('Error forward geocoding:', e)
  }
}

// Shopping Cart Actions
const cartCount = computed(() => cart.value.reduce((s, i) => s + i.cantidad, 0))
const cartTotal = computed(() => {
  const baseTotal = cart.value.reduce((s, i) => s + (i.cantidad * i.precio), 0)
  if (cartTipoEntrega.value === 'Delivery') {
    return baseTotal + cartCostoDelivery.value
  }
  return baseTotal
})

function sanitizeUnidad() {
  if (qtyUnidad.value === null || qtyUnidad.value === undefined || (qtyUnidad.value as any) === '') return;
  let val = Math.floor(Number(qtyUnidad.value));
  if (isNaN(val) || val < 0) val = 0;
  qtyUnidad.value = val;
}

function sanitizeCaja() {
  if (qtyCaja.value === null || qtyCaja.value === undefined || (qtyCaja.value as any) === '') return;
  let val = Math.floor(Number(qtyCaja.value));
  if (isNaN(val) || val < 0) val = 0;
  qtyCaja.value = val;
}

function getConsumedStockInCart(pId: number) {
  let total = 0
  for (const item of cart.value) {
    if (item.productoId === pId && !item.componentes) {
      total += item.cantidad * item.factorUnidades
    }
    if (item.componentes) {
      for (const comp of item.componentes) {
        if (comp.productoId === pId) {
          total += item.cantidad * comp.cantidad
        }
      }
    }
  }
  return total
}

function addToCartCombined() {
  if (!authStore.isLoggedIn) {
    Swal.fire({
      icon: 'info',
      title: 'Iniciar Sesión',
      text: 'Debes iniciar sesión con tu cuenta para utilizar el carrito de compras.',
      showCancelButton: true,
      confirmButtonText: 'Iniciar Sesión',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'var(--gold)',
    }).then((res) => {
      if (res.isConfirmed) {
        if (detailsModal) detailsModal.hide()
        router.push('/login')
      }
    })
    return
  }
  
  if (authStore.user?.rol?.nombre !== 'CLIENTE') {
    Swal.fire({ icon: 'warning', title: 'Acceso inválido', text: 'Solo las cuentas de clientes pueden usar el carrito de compras.' })
    return
  }

  if (selectedProduct.value.esCombo) {
    if (qtyUnidad.value === 0) {
      Swal.fire({ icon: 'warning', title: 'Atención', text: 'Selecciona al menos una cantidad para llevar al carrito.' })
      return
    }

    // Validar stock de cada subproducto personalizado
    for (const comp of customizedComponents.value) {
      const subproduct = products.value.find(p => p.id === comp.selectedProductoId)
      if (!subproduct) continue
      
      const consumed = getConsumedStockInCart(comp.selectedProductoId)
      const needed = comp.cantidad * qtyUnidad.value
      
      if (consumed + needed > subproduct.stock) {
        Swal.fire({
          icon: 'warning',
          title: 'Stock insuficiente',
          text: `No hay suficiente stock del componente "${subproduct.nombre}". Disponible: ${subproduct.stock} u., Ya en carrito: ${consumed} u., Requerido ahora: ${needed} u.`
        })
        return
      }
    }

    // Agregar combo al carrito
    const mappedComponentes = customizedComponents.value.map(comp => {
      const prod = products.value.find(p => p.id === comp.selectedProductoId)
      return {
        productoId: comp.selectedProductoId,
        cantidad: comp.cantidad,
        nombre: prod ? prod.nombre : 'Producto'
      }
    })

    const basePrecio = getDiscountedPrice(selectedProduct.value)
    const finalPrecio = basePrecio + (conHielo.value ? 5.00 : 0)

    cart.value.push({
      productoId: selectedProduct.value.id,
      nombre: selectedProduct.value.nombre,
      codigo: selectedProduct.value.codigo,
      cantidad: qtyUnidad.value,
      precio: finalPrecio,
      stock: selectedProduct.value.stock,
      tipoVenta: 'Unidad',
      factorUnidades: 1,
      conHielo: conHielo.value,
      componentes: mappedComponentes
    })

    toastSuccess(`Agregado al carrito: ${selectedProduct.value.nombre} x${qtyUnidad.value}`)
    if (detailsModal) detailsModal.hide()

  } else {
    // Producto normal
    if (qtyUnidad.value === 0 && qtyCaja.value === 0) {
      Swal.fire({ icon: 'warning', title: 'Atención', text: 'Selecciona al menos una cantidad para llevar al carrito.' })
      return
    }

    const stockNeededUnidad = qtyUnidad.value * 1;
    const stockNeededCaja = qtyCaja.value * (selectedProduct.value.unidadesPorCaja || 1);
    const currentTotalInCart = getConsumedStockInCart(selectedProduct.value.id);

    if (currentTotalInCart + stockNeededUnidad + stockNeededCaja > selectedProduct.value.stock) {
      Swal.fire({ icon: 'warning', title: 'Límite alcanzado', text: `No hay suficiente stock. Ya tienes ${currentTotalInCart} u. en el carrito. Stock total: ${selectedProduct.value.stock} u.` })
      return
    }

    let added = false;
    if (qtyUnidad.value > 0) {
      addToCart(selectedProduct.value, 'Unidad', qtyUnidad.value, false);
      added = true;
    }
    if (qtyCaja.value > 0) {
      addToCart(selectedProduct.value, 'Caja', qtyCaja.value, false);
      added = true;
    }
    
    if (added) {
      if (detailsModal) detailsModal.hide()
    }
  }
}

function addToCart(p: any, tipoVenta: string = 'Unidad', cantidad: number = 1, hideModal: boolean = true) {
  if (!authStore.isLoggedIn) {
    Swal.fire({
      icon: 'info',
      title: 'Iniciar Sesión',
      text: 'Debes iniciar sesión con tu cuenta para utilizar el carrito de compras.',
      showCancelButton: true,
      confirmButtonText: 'Iniciar Sesión',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'var(--gold)',
    }).then((res) => {
      if (res.isConfirmed) {
        if (detailsModal) detailsModal.hide()
        router.push('/login')
      }
    })
    return
  }
  
  if (authStore.user?.rol?.nombre !== 'CLIENTE') {
    Swal.fire({ icon: 'warning', title: 'Acceso inválido', text: 'Solo las cuentas de clientes pueden usar el carrito de compras.' })
    return
  }
  
  const existing = cart.value.find(i => i.productoId === p.id && i.tipoVenta === tipoVenta && !i.componentes)
  const factor = tipoVenta === 'Caja' ? (p.unidadesPorCaja || 1) : 1
  
  // Calculate total consumed stock for this product in the cart
  const currentTotalInCart = getConsumedStockInCart(p.id)

  if (currentTotalInCart + (factor * cantidad) > p.stock) {
    Swal.fire({ icon: 'warning', title: 'Límite alcanzado', text: `No hay más stock disponible de ${p.nombre}.` })
    return
  }

  if (existing) {
    existing.cantidad += cantidad
    toastSuccess(`Agregado al carrito: ${p.nombre} (${tipoVenta}) x${cantidad}`)
  } else {
    let precio = getDiscountedPrice(p)
    if (tipoVenta === 'Caja') {
       const discount = getActiveDiscount(p)
       precio = discount > 0 ? Number(p.precioCaja) * (1 - discount / 100) : Number(p.precioCaja)
    }

    cart.value.push({
      productoId: p.id,
      nombre: p.nombre,
      codigo: p.codigo,
      cantidad: cantidad,
      precio: precio,
      stock: p.stock,
      tipoVenta: tipoVenta,
      factorUnidades: factor
    })
    toastSuccess(`Agregado al carrito: ${p.nombre} (${tipoVenta}) x${cantidad}`)
  }
  if (hideModal && detailsModal) detailsModal.hide()
}

function badgeEstado(estado: string) {
  const map: Record<string, string> = {
    Pendiente: 'bg-warning text-dark',
    Confirmada: 'bg-info text-dark',
    Entregada: 'bg-success',
    Anulada: 'bg-danger',
  }
  return map[estado] || 'bg-secondary'
}

function toastSuccess(msg: string) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
  })
  Toast.fire({ icon: 'success', title: msg })
}

async function openCart() {
  if (cartModal) cartModal.show()
  
  // Try to pre-fill client info if empty
  if (authStore.isLoggedIn && !cartTelefonoContacto.value && !cartDireccion.value) {
    try {
      const cRes = await http.get('clientes')
      const currentClient = cRes.data.find((c: any) => c.correo === authStore.user?.correo)
      if (currentClient) {
        if (currentClient.telefono) cartTelefonoContacto.value = currentClient.telefono
        if (currentClient.direccion) cartDireccion.value = currentClient.direccion
      }
    } catch (e) {
      console.error('Error auto-filling client info:', e)
    }
  }
}

function removeFromCart(idx: number) {
  cart.value.splice(idx, 1)
}

function increaseQty(idx: number) {
  const item = cart.value[idx]
  
  if (item.componentes && item.componentes.length > 0) {
    // Check stock for each component in the combo
    for (const comp of item.componentes) {
      const subproduct = products.value.find(p => p.id === comp.productoId)
      if (!subproduct) continue
      
      const consumed = getConsumedStockInCart(comp.productoId)
      // Incrementing item.cantidad by 1 means we need `comp.cantidad` more units of this subproduct
      if (consumed + comp.cantidad > subproduct.stock) {
        Swal.fire({
          icon: 'warning',
          title: 'Stock insuficiente',
          text: `No hay suficiente stock del componente "${subproduct.nombre}" para aumentar este combo.`
        })
        return
      }
    }
    item.cantidad++
  } else {
    // Normal product
    const currentTotalInCart = getConsumedStockInCart(item.productoId)
    if (currentTotalInCart + item.factorUnidades <= item.stock) {
      item.cantidad++
    } else {
      Swal.fire({ icon: 'warning', title: 'Límite alcanzado', text: 'No hay más stock disponible para este producto.' })
    }
  }
}

function decreaseQty(idx: number) {
  const item = cart.value[idx]
  if (item.cantidad > 1) {
    item.cantidad--
  } else {
    removeFromCart(idx)
  }
}

async function confirmarCompra() {
  if (cart.value.length === 0) return
  processingCart.value = true
  
  if (cartTipoEntrega.value === 'Delivery') {
    if (!cartDireccion.value.trim()) {
      Swal.fire({ icon: 'warning', title: 'Dirección requerida', text: 'Por favor, ingresa una dirección para la entrega a domicilio.' })
      processingCart.value = false
      return
    }
    if (!cartTelefonoContacto.value.trim()) {
      Swal.fire({ icon: 'warning', title: 'Teléfono requerido', text: 'Por favor, ingresa un teléfono de contacto para el delivery.' })
      processingCart.value = false
      return
    }
  }
  
  try {
    const cRes = await http.get('clientes')
    const currentClient = cRes.data.find((c: any) => c.correo === authStore.user?.correo)
    const clienteId = currentClient ? currentClient.id : 1
    
    await http.post('ventas', {
      clienteId: clienteId,
      usuarioId: authStore.user?.id,
      tipoEntrega: cartTipoEntrega.value,
      direccion: cartTipoEntrega.value === 'Delivery' ? cartDireccion.value.trim() : undefined,
      referencia: cartTipoEntrega.value === 'Delivery' ? cartReferencia.value.trim() : undefined,
      telefonoContacto: cartTipoEntrega.value === 'Delivery' ? cartTelefonoContacto.value.trim() : undefined,
      costoDelivery: cartTipoEntrega.value === 'Delivery' ? cartCostoDelivery.value : undefined,
      latitud: cartTipoEntrega.value === 'Delivery' ? cartLat.value : undefined,
      longitud: cartTipoEntrega.value === 'Delivery' ? cartLng.value : undefined,
      detalles: cart.value.map(i => ({
        productoId: i.productoId,
        cantidad: i.cantidad,
        precio: i.precio,
        tipoVenta: i.tipoVenta,
        conHielo: i.conHielo || false,
        componentes: i.componentes ? i.componentes.map(c => ({ productoId: c.productoId, cantidad: c.cantidad })) : undefined
      })),
      pagos: [{ 
        metodoPagoId: cartMetodoPagoId.value, 
        monto: cartTotal.value,
        montoRecibido: cartTotal.value,
        cambio: 0
      }],
      estado: 'Pendiente'
    })
    
    await Swal.fire({
      icon: 'success',
      title: '¡Pedido Realizado!',
      text: `Tu pedido por Bs. ${cartTotal.value.toFixed(2)} se ha registrado con éxito.`,
      timer: 3000,
      showConfirmButton: false
    })
    
    cart.value = []
    cartTipoEntrega.value = 'Tienda'
    cartDireccion.value = ''
    cartReferencia.value = ''
    cartTelefonoContacto.value = ''
    if (cartModal) cartModal.hide()
    await loadCatalog()
  } catch (e: any) {
    console.error(e)
    Swal.fire({ icon: 'error', title: 'Error', text: e.response?.data?.message || 'Error al procesar tu pedido' })
  } finally {
    processingCart.value = false
  }
}

async function openHistory() {
  if (historyModal) historyModal.show()
  loadingHistory.value = true
  try {
    const res = await http.get('ventas')
    pedidos.value = res.data
      .filter((v: any) => v.usuarioId === authStore.user?.id)
      .sort((a: any, b: any) => b.id - a.id)
  } catch (e) {
    console.error(e)
  } finally {
    loadingHistory.value = false
  }
}

function subscribeNewsletter() {
  if (!newsletterEmail.value) return
  Swal.fire({
    icon: 'success',
    title: '¡Suscripción exitosa!',
    text: `Te hemos enviado un correo de bienvenida a ${newsletterEmail.value}`,
    timer: 2500,
    showConfirmButton: false
  })
  newsletterEmail.value = ''
}

onUnmounted(() => {
  if (detailsModal) detailsModal.hide()
  if (cartModal) cartModal.hide()
  if (historyModal) historyModal.hide()
  destroyCartMap()

  const backdrops = document.querySelectorAll('.modal-backdrop')
  backdrops.forEach(el => el.remove())
  document.body.classList.remove('modal-open')
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
})
</script>

<style scoped>
/* Estilo Base de Página */
.catalogo-page {
  background-color: #0f0f0f;
  color: #f5f5f5;
  min-height: 100vh;
  --gold: #d4af37;
  --gold-hover: #b89321;
}

/* Custom Navbar */
.custom-navbar {
  background: rgba(15, 15, 15, 0.85);
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(212, 175, 55, 0.15);
  padding: 1rem 0;
  transition: all 0.3s ease;
}

.brand-text {
  font-weight: 800;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #fff 0%, var(--gold) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-link {
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #a0a0a0 !important;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}

.nav-link:hover, .nav-link.active {
  color: var(--gold) !important;
}

.btn-outline-gold {
  border: 1px solid var(--gold);
  color: var(--gold);
  background: transparent;
  font-weight: 700;
  font-size: 0.85rem;
  padding: 0.5rem 1.25rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-outline-gold:hover {
  background: var(--gold);
  color: #000;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2);
}

/* Video Hero Section */
.hero-section {
  height: 100vh;
  min-height: 650px;
  overflow: hidden;
}

.hero-video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: #000;
}

.hero-bg-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  opacity: 0.35;
  filter: blur(8px);
  transform: scale(1.05); /* Evita que los bordes borrosos revelen el fondo */
}

.hero-video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #0f0f0f 25%, rgba(15, 15, 15, 0.6) 60%, #0f0f0f 100%),
              radial-gradient(circle at center, transparent 20%, #0f0f0f 95%);
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
}

.brand-title {
  font-family: 'Cinzel', serif;
  font-size: 6rem;
  font-weight: 900;
  letter-spacing: 6px;
  text-shadow: 0 0 30px rgba(212, 175, 55, 0.5);
  margin-bottom: 0;
}

.subtitle {
  font-family: 'Cinzel', serif;
  font-weight: 500;
  letter-spacing: 4px;
  color: #f5f5f5 !important;
  text-transform: uppercase;
}

.divider-gold {
  width: 80px;
  height: 3px;
  background: var(--gold);
  border-radius: 2px;
}

.btn-gold-custom {
  background: var(--gold);
  border: 1px solid var(--gold);
  color: #000;
  font-weight: 700;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-gold-custom:hover {
  background: var(--gold-hover);
  border-color: var(--gold-hover);
  color: #000;
  box-shadow: 0 5px 20px rgba(212, 175, 55, 0.4);
  transform: translateY(-2px);
}

.btn-outline-gold-large {
  background: transparent;
  border: 1px solid var(--gold);
  color: var(--gold);
  font-weight: 700;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-outline-gold-large:hover {
  background: rgba(212, 175, 55, 0.08);
  color: var(--gold);
  transform: translateY(-2px);
}

/* Sections Base */
.section-padding {
  padding: 7rem 0;
}

.bg-black-deep {
  background-color: #0f0f0f;
}

.bg-dark-glow {
  background-color: #141414;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* Cards Premium style */
.product-premium-card {
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-premium-card:hover {
  transform: translateY(-6px);
  border-color: rgba(212, 175, 55, 0.3);
  box-shadow: 0 15px 35px rgba(0,0,0,0.6), 0 0 20px rgba(212, 175, 55, 0.05);
}

.card-image-wrapper {
  height: 220px;
  position: relative;
  background: #0d0d0d;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.02);
}

.card-img-premium {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-premium-card:hover .card-img-premium {
  transform: scale(1.06);
}

.card-img-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #222 0%, #0d0d0d 100%);
}

.fallback-icon {
  font-size: 4rem;
  color: var(--gold);
  opacity: 0.3;
}

.badge-category {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(15, 15, 15, 0.8);
  border: 1px solid rgba(212, 175, 55, 0.3);
  color: var(--gold);
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 4px;
  letter-spacing: 0.5px;
  z-index: 2;
}

.card-body-premium {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.premium-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.premium-price {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--gold);
}

.btn-gold-sm {
  background: var(--gold);
  color: #000;
  border: none;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.45rem 1rem;
  border-radius: 4px;
  text-transform: uppercase;
  transition: all 0.2s ease;
}

.btn-gold-sm:hover {
  background: var(--gold-hover);
  box-shadow: 0 3px 10px rgba(212, 175, 55, 0.3);
}

/* SECCIÓN 3 - CATEGORÍAS */
.category-premium-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.03);
  box-shadow: 0 10px 20px rgba(0,0,0,0.4);
}

.category-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.category-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.category-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(15, 15, 15, 0.9) 10%, rgba(15, 15, 15, 0.25) 60%, rgba(15, 15, 15, 0) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 1.5rem;
  transition: background 0.3s ease;
}

.category-premium-card:hover .category-img {
  transform: scale(1.1);
}

.category-premium-card:hover .category-overlay {
  background: linear-gradient(to top, rgba(15, 15, 15, 0.95) 20%, rgba(212, 175, 55, 0.15) 100%);
}

.category-name {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}

.category-btn {
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.category-premium-card:hover .category-btn {
  opacity: 1;
  transform: translateY(0);
}

/* SECCIÓN 4 - MARCAS (Infinite Marquee) */
.brands-marquee {
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
}

.marquee-wrapper {
  display: flex;
  width: 100%;
}

.marquee-content {
  display: flex;
  flex-shrink: 0;
  min-width: 100%;
  justify-content: space-around;
  align-items: center;
  animation: marquee-scroll 25s linear infinite;
}

@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

.brand-item {
  font-size: 1.6rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.15);
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: color 0.3s ease;
  padding: 0 2rem;
  cursor: default;
}

.brand-item:hover {
  color: var(--gold);
}

/* SECCIÓN 5 - POR QUÉ ELEGIRNOS */
.why-card {
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 3rem 2rem;
  transition: all 0.3s ease;
  height: 100%;
}

.why-card:hover {
  border-color: rgba(212, 175, 55, 0.2);
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.5);
}

.why-icon-box {
  width: 70px;
  height: 70px;
  background: rgba(212, 175, 55, 0.06);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  color: var(--gold);
}

/* SECCIÓN 6 - CATALOGO BODEGA */
.search-box-gold {
  position: relative;
  display: flex;
  align-items: center;
}

.search-box-gold i {
  position: absolute;
  left: 15px;
  font-size: 1.1rem;
}

.search-box-gold .form-control {
  background: #161616 !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  color: #fff !important;
  padding: 0.8rem 1rem 0.8rem 45px !important;
  border-radius: 6px !important;
  font-size: 0.95rem;
}

.search-box-gold .form-control:focus {
  border-color: var(--gold) !important;
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.1) !important;
}

.form-select-gold {
  background-color: #161616;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #fff;
  padding: 0.8rem 1.2rem;
  border-radius: 6px;
  width: 100%;
  outline: none;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.form-select-gold:focus {
  border-color: var(--gold);
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.1);
}

.category-tab-gold {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  color: #a0a0a0;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.6rem 1.4rem;
  border-radius: 30px;
  transition: all 0.3s ease;
}

.category-tab-gold:hover {
  background: rgba(212, 175, 55, 0.06);
  color: #fff;
  border-color: rgba(212, 175, 55, 0.3);
}

.category-tab-gold.active {
  background: var(--gold);
  color: #000;
  border-color: var(--gold);
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}

/* SECCIÓN 7 - TESTIMONIOS */
.testimonial-card {
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 2.5rem;
  height: 100%;
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  border-color: rgba(212, 175, 55, 0.2);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.testimonial-img {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--gold);
}

/* SECCIÓN 8 - SUSCRIPCIÓN NEWSLETTER */
.input-group-gold {
  display: flex;
  gap: 10px;
}

.input-group-gold .form-control {
  background: #161616;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #fff;
  padding: 0.8rem 1.2rem;
  border-radius: 4px;
}

.input-group-gold .form-control:focus {
  border-color: var(--gold);
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.1);
}

/* FOOTER PREMIUM */
.footer-premium {
  background-color: #0d0d0d;
}

.brand-text-gold {
  font-weight: 900;
  letter-spacing: 2px;
  color: var(--gold);
  font-size: 1.5rem;
}

.footer-title-gold {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: #fff;
  border-bottom: 2px solid var(--gold);
  padding-bottom: 8px;
  display: inline-block;
}

.social-circle-gold {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a0a0a0;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-circle-gold:hover {
  background: var(--gold);
  color: #000;
  border-color: var(--gold);
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}

/* Modals styling overrides for gold theme */
.modal-content {
  background-color: #141414 !important;
  border: 1px solid rgba(212, 175, 55, 0.2) !important;
  color: #f5f5f5 !important;
}

.modal-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
}

.modal-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.05) !important;
}

.modal-icon-holder {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.05);
  border: 1px solid rgba(212, 175, 55, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.modal-image-holder {
  width: 150px;
  height: 150px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(212, 175, 55, 0.2);
  margin: 0 auto;
  background: #000;
}

.modal-prod-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-content table th {
  background: rgba(212, 175, 55, 0.1) !important;
  color: var(--gold) !important;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.select-gold-payment {
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #fff;
  padding: 0.6rem 1rem;
  border-radius: 4px;
  width: 100%;
  outline: none;
}

.select-gold-payment:focus {
  border-color: var(--gold);
}

.bg-gold {
  background-color: var(--gold) !important;
}

/* Animations */
.animate-glow {
  animation: glow-gold 3s ease-in-out infinite alternate;
}

@keyframes glow-gold {
  from {
    text-shadow: 0 0 5px rgba(212, 175, 55, 0.2);
  }
  to {
    text-shadow: 0 0 20px rgba(212, 175, 55, 0.7), 0 0 30px rgba(212, 175, 55, 0.4);
  }
}

.fade-in-up {
  animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.spin {
  animation: spin 1.1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.max-width-600 {
  max-width: 600px;
}

/* Custom Quantity Selector in Details Modal */
.qty-selector-custom {
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
  height: 36px;
  width: 110px;
}

.qty-btn-custom {
  background: transparent;
  border: none;
  color: #a0a0a0;
  width: 32px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.qty-btn-custom:hover {
  background: rgba(212, 175, 55, 0.1);
  color: var(--gold);
}

.qty-input-custom {
  background: transparent;
  border: none;
  border-left: 1px solid rgba(255, 255, 255, 0.15);
  border-right: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
  width: 46px;
  height: 100%;
  text-align: center;
  font-weight: 700;
  font-size: 0.95rem;
  outline: none;
  -webkit-appearance: none;
  margin: 0;
}

/* Hide arrow keys for Chrome, Safari, Edge, Opera */
.qty-input-custom::-webkit-outer-spin-button,
.qty-input-custom::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Hide arrow keys for Firefox */
.qty-input-custom[type=number] {
  -moz-appearance: textfield;
}

/* New Hero Premium Styles */
.btn-gold-premium {
  background: linear-gradient(135deg, var(--gold) 0%, #b8860b 100%);
  color: #000;
  border: none;
  border-radius: 4px;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
}
.btn-gold-premium:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.5);
  color: #000;
}
.btn-outline-glass {
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255,255,255,0.1);
  color: #fff;
  border-radius: 4px;
  transition: all 0.3s ease;
}
.btn-outline-glass:hover {
  background: rgba(255,255,255,0.08);
  border-color: var(--gold);
  transform: translateY(-3px);
}
@keyframes scrollDown {
  0% { opacity: 1; transform: translate(-50%, 0); }
  100% { opacity: 0; transform: translate(-50%, 15px); }
}
</style>
