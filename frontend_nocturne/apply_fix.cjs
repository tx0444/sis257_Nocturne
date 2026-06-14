const fs = require('fs');

let path = './src/views/CatalogoView.vue';
let content = fs.readFileSync(path, 'utf8');

// 1. Initial Replacements
content = content.replace(/LA FORTALEZA/g, 'NOCTURNE:COLD STORAGE');
content = content.replace(/<i[^>]*bi-shield-fill[^>]*><\/i>/g, '<img src="/logo_owl.png" alt="Nocturne Logo" style="height: 2.5em; width: auto; object-fit: contain; margin-right: 12px; border-radius: 50%;" />');
content = content.replace(/<i[^>]*bi-shield[^>]*><\/i>/g, '<img src="/logo_owl.png" alt="Nocturne Logo" style="height: 2.5em; width: auto; object-fit: contain; margin-right: 12px; border-radius: 50%;" />');

// 2. Redesign Hero
let newHero = \    <!-- SECCIÓN 1 - VIDEO HERO PRINCIPAL -->
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
    </header>\;

let regexHero = /<!-- SECCIÓN 1 - VIDEO HERO PRINCIPAL -->[\\s\\S]*?<\/header>/;
content = content.replace(regexHero, newHero);

// 3. New Styles
let newStyles = \
/* New Hero Styles */
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
\;

content = content.replace(/<\/style>/, newStyles + '\\n</style>');

fs.writeFileSync(path, content);
console.log('Fixed file.');
