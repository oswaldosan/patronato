<script lang="ts">
  import { formatCurrencyOptional, formatDate } from '$lib/utils/format';

  let { data } = $props();

  const fotos = $derived(
    [data.proyecto.foto1, data.proyecto.foto2, data.proyecto.foto3, data.proyecto.foto4].filter(Boolean) as string[]
  );
  let selectedFoto = $state(0);
</script>

<svelte:head>
  <title>{data.proyecto.titulo} - Patronato Pro Mejoramiento de Monterrey</title>
</svelte:head>

<section class="py-12">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <a href="/proyectos" class="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primary-600 mb-8 transition-colors">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Volver a proyectos
    </a>

    {#if fotos.length > 0}
      <div class="mb-8">
        <div class="rounded-2xl overflow-hidden shadow-lg bg-slate-100 aspect-video mb-4">
          <img
            src={fotos[selectedFoto]}
            alt="{data.proyecto.titulo} - Foto {selectedFoto + 1}"
            class="w-full h-full object-cover"
          />
        </div>

        {#if fotos.length > 1}
          <div class="flex gap-3 justify-center">
            {#each fotos as foto, i}
              <button
                onclick={() => selectedFoto = i}
                class="w-20 h-14 rounded-lg overflow-hidden border-2 transition-all {selectedFoto === i ? 'border-primary-500 shadow-md ring-2 ring-primary-200' : 'border-slate-200 opacity-70 hover:opacity-100'}"
              >
                <img src={foto} alt="Miniatura {i + 1}" class="w-full h-full object-cover" />
              </button>
            {/each}
          </div>
        {/if}
      </div>
    {/if}

    <article>
      <div class="flex flex-wrap items-center gap-4 mb-4">
        <div class="flex items-center gap-2 text-sm text-slate-500">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(data.proyecto.fecha)}
        </div>
      </div>

      <h1 class="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-6 leading-tight">
        {data.proyecto.titulo}
      </h1>

      <div class="card p-5 mb-8 flex items-center gap-4 bg-primary-50/50 border-primary-200">
        <div class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center shrink-0">
          <svg class="w-6 h-6 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p class="text-sm text-primary-600 font-medium">Inversión total del proyecto</p>
          <p class="text-2xl font-display font-bold text-primary-800">{formatCurrencyOptional(data.proyecto.gastoTotal)}</p>
        </div>
      </div>

      <div class="prose prose-slate max-w-none">
        {#each data.proyecto.descripcion.split('\n') as paragraph}
          {#if paragraph.trim()}
            <p class="text-slate-700 leading-relaxed text-lg">{paragraph}</p>
          {/if}
        {/each}
      </div>
    </article>

    <div class="mt-12 pt-8 border-t border-slate-200 text-center">
      <a href="/proyectos" class="btn btn-outline">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Ver todos los proyectos
      </a>
    </div>
  </div>
</section>
