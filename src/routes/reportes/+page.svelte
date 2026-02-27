<script lang="ts">
  import { goto } from '$app/navigation';
  import ReportsView from '$lib/components/ReportsView.svelte';

  let { data } = $props();

  let desde = $state(data.filtros.desde);
  let hasta = $state(data.filtros.hasta);

  function aplicarFiltros() {
    const params = new URLSearchParams();
    if (desde) params.set('desde', desde);
    if (hasta) params.set('hasta', hasta);
    goto(`/reportes?${params.toString()}`);
  }
</script>

<svelte:head>
  <title>Reportes - Transparencia</title>
</svelte:head>

<section class="bg-slate-50 border-b border-slate-200">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h1 class="text-3xl font-display font-bold text-slate-900">Reportes públicos</h1>
    <p class="text-slate-600 mt-2">
      Resumen auditable de ingresos, egresos y balance historico del proyecto.
    </p>
    <div class="mt-6 flex flex-col sm:flex-row gap-4">
      <div>
        <label class="label" for="desde">Desde</label>
        <input id="desde" type="date" class="input" bind:value={desde} />
      </div>
      <div>
        <label class="label" for="hasta">Hasta</label>
        <input id="hasta" type="date" class="input" bind:value={hasta} />
      </div>
      <div class="flex items-end">
        <button class="btn btn-primary" onclick={aplicarFiltros}>Aplicar</button>
      </div>
    </div>
  </div>
</section>

<section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <ReportsView reportes={data} />
</section>
