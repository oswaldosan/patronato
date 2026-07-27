<script lang="ts">
  import { formatDate, formatDateShort } from '$lib/utils/format';

  let { data } = $props();

  let selectedSheet = $state(0);

  const sheets = $derived(data.evento.excelData?.sheets ?? []);
  const activeSheet = $derived(sheets[selectedSheet] ?? null);

  function isTitleRow(fila: string[]): boolean {
    return fila.filter((celda) => celda.trim() !== '').length === 1;
  }

  function colCount(filas: string[][]): number {
    return Math.max(1, ...filas.map((fila) => fila.length));
  }
</script>

<svelte:head>
  <title>{data.evento.nombre} - Patronato Pro Mejoramiento de Monterrey</title>
</svelte:head>

<section class="py-12">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <a href="/eventos" class="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primary-600 mb-8 transition-colors">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Volver a eventos
    </a>

    {#if data.evento.foto1}
      <div class="rounded-2xl overflow-hidden shadow-lg bg-slate-100 aspect-video mb-8">
        <img
          src={data.evento.foto1}
          alt={data.evento.nombre}
          class="w-full h-full object-cover"
        />
      </div>
    {/if}

    <article>
      <div class="flex flex-wrap items-center gap-4 mb-4">
        <div class="flex items-center gap-2 text-sm text-slate-500">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(data.evento.fecha)}
        </div>
        {#if data.evento.lugar}
          <div class="flex items-center gap-2 text-sm text-slate-500">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {data.evento.lugar}
          </div>
        {/if}
      </div>

      <h1 class="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-6 leading-tight">
        {data.evento.nombre}
      </h1>

      {#if data.evento.descripcion}
        <div class="prose prose-slate max-w-none mb-12">
          {#each data.evento.descripcion.split('\n') as paragraph}
            {#if paragraph.trim()}
              <p class="text-slate-700 leading-relaxed text-lg">{paragraph}</p>
            {/if}
          {/each}
        </div>
      {/if}

      {#if sheets.length > 0}
        <div class="mb-8">
          <div class="flex flex-wrap items-baseline justify-between gap-2 mb-4">
            <h2 class="text-2xl font-display font-bold text-slate-900">Desglose del evento</h2>
            <div class="text-xs text-slate-400">
              {#if data.evento.excelNombre}
                <span>{data.evento.excelNombre}</span>
              {/if}
              {#if data.evento.excelActualizado}
                <span> · Actualizado: {formatDateShort(data.evento.excelActualizado)}</span>
              {/if}
            </div>
          </div>

          {#if sheets.length > 1}
            <div class="flex flex-wrap gap-2 mb-4">
              {#each sheets as sheet, i}
                <button
                  onclick={() => selectedSheet = i}
                  class="px-4 py-2 rounded-lg text-sm font-medium transition-all {selectedSheet === i ? 'bg-primary-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-primary-300 hover:text-primary-700'}"
                >
                  {sheet.nombre}
                </button>
              {/each}
            </div>
          {/if}

          {#if activeSheet}
            <div class="card overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <tbody>
                    {#each activeSheet.filas as fila, rowIndex}
                      {#if rowIndex === 0 && isTitleRow(fila)}
                        <tr class="bg-primary-50 border-b border-slate-200">
                          <td
                            colspan={colCount(activeSheet.filas)}
                            class="px-4 py-3 font-display font-bold text-primary-800"
                          >
                            {fila.find((celda) => celda.trim() !== '')}
                          </td>
                        </tr>
                      {:else}
                        <tr class="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                          {#each fila as celda}
                            <td class="px-4 py-2.5 text-slate-700 whitespace-nowrap">{celda}</td>
                          {/each}
                        </tr>
                      {/if}
                    {/each}
                  </tbody>
                </table>
              </div>
            </div>
          {/if}
        </div>
      {/if}
    </article>

    <div class="mt-12 pt-8 border-t border-slate-200 text-center">
      <a href="/eventos" class="btn btn-outline">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Ver todos los eventos
      </a>
    </div>
  </div>
</section>
