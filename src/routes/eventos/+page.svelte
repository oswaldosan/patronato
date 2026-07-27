<script lang="ts">
  import { formatDate } from '$lib/utils/format';

  let { data } = $props();
</script>

<svelte:head>
  <title>Eventos - Patronato Pro Mejoramiento de Monterrey</title>
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
      Eventos de Recaudación
    </h1>
    <p class="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
      Fiestas y actividades organizadas para recaudar fondos. Publicamos los ingresos y gastos de cada evento para que conozcas cuánto se recaudó en neto.
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
    {#if data.eventos.length === 0}
      <div class="card p-16 text-center">
        <span class="text-5xl mb-4 block">🎉</span>
        <h2 class="text-xl font-display font-semibold text-slate-700 mb-2">Próximamente</h2>
        <p class="text-slate-500">Los eventos de recaudación se publicarán aquí pronto.</p>
      </div>
    {:else}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each data.eventos as evento, i}
          <a
            href="/eventos/{evento.id}"
            class="card block overflow-hidden hover:shadow-xl hover:border-primary-200 transition-all duration-300 animate-slide-up"
            style="animation-delay: {i * 0.08}s"
          >
            {#if evento.foto1}
              <div class="aspect-video overflow-hidden bg-slate-100">
                <img
                  src={evento.foto1}
                  alt={evento.nombre}
                  class="w-full h-full object-cover"
                />
              </div>
            {:else}
              <div class="aspect-video bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
                <span class="text-5xl">🎉</span>
              </div>
            {/if}

            <div class="p-6">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="text-sm text-slate-500">{formatDate(evento.fecha)}</span>
              </div>

              <h2 class="font-display font-bold text-lg text-slate-900 mb-2 line-clamp-2">
                {evento.nombre}
              </h2>

              {#if evento.lugar}
                <div class="flex items-center gap-2 mb-3">
                  <svg class="w-4 h-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="text-sm text-slate-500">{evento.lugar}</span>
                </div>
              {/if}

              {#if evento.descripcion}
                <p class="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                  {evento.descripcion}
                </p>
              {/if}

              <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                <span class="text-slate-500">Ver desglose de ingresos y gastos</span>
                <svg class="w-4 h-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</section>
