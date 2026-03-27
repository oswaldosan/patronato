<script lang="ts">
  import { formatCurrencyOptional, formatDate } from '$lib/utils/format';

  let { data } = $props();
</script>

<svelte:head>
  <title>Proyectos Realizados - Patronato Pro Mejoramiento de Monterrey</title>
</svelte:head>

<section class="relative pt-12 pb-20 overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950"></div>
  <div class="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/20">
      <span class="w-2 h-2 bg-accent-400 rounded-full"></span>
      Transparencia en acción
    </div>
    <h1 class="text-4xl sm:text-5xl font-display font-bold text-white mb-4 tracking-tight">
      Proyectos Realizados
    </h1>
    <p class="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
      Cada proyecto es un paso hacia el desarrollo de Monterrey. Aquí documentamos las obras y mejoras realizadas con los aportes de nuestra comunidad.
    </p>
  </div>

  <div class="absolute -bottom-1 left-0 right-0">
    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto" preserveAspectRatio="none">
      <path d="M0 60L60 52C120 44 240 28 360 22C480 16 600 20 720 24C840 28 960 32 1080 34C1200 36 1320 36 1380 36L1440 36V60H0Z" fill="#f8fafc"/>
    </svg>
  </div>
</section>

<section class="py-16 -mt-8 relative z-10">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {#if data.proyectos.length === 0}
      <div class="card p-16 text-center">
        <span class="text-5xl mb-4 block">🏗️</span>
        <h2 class="text-xl font-display font-semibold text-slate-700 mb-2">Próximamente</h2>
        <p class="text-slate-500">Los proyectos realizados se publicarán aquí pronto.</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each data.proyectos as proyecto, i}
          <a
            href="/proyectos/{proyecto.id}"
            class="card group overflow-hidden hover:shadow-xl hover:border-primary-200 transition-all duration-300 animate-slide-up"
            style="animation-delay: {i * 0.08}s"
          >
            {#if proyecto.foto1}
              <div class="aspect-video overflow-hidden bg-slate-100">
                <img
                  src={proyecto.foto1}
                  alt={proyecto.titulo}
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            {:else}
              <div class="aspect-video bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                <span class="text-5xl">🏗️</span>
              </div>
            {/if}

            <div class="p-6">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="text-sm text-slate-500">{formatDate(proyecto.fecha)}</span>
              </div>

              <h2 class="font-display font-bold text-lg text-slate-900 group-hover:text-primary-700 transition-colors mb-2 line-clamp-2">
                {proyecto.titulo}
              </h2>

              <p class="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                {proyecto.descripcion}
              </p>

              <div class="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <p class="text-xs text-slate-400 uppercase tracking-wider font-medium">Inversión</p>
                  <p class="text-xl font-display font-bold text-primary-700">{formatCurrencyOptional(proyecto.gastoTotal)}</p>
                </div>
                <span class="text-primary-600 group-hover:translate-x-1 transition-transform duration-300">
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</section>
