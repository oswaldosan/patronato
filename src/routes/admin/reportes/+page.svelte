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
    goto(`/admin/reportes?${params.toString()}`);
  }
</script>

<svelte:head>
  <title>Reportes - Admin</title>
</svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="page-title">Reportes</h1>
    <p class="text-slate-600 mt-1">Vista consolidada de ingresos, egresos y balance.</p>
  </div>

  <div class="card p-4">
    <div class="flex flex-col sm:flex-row gap-4 items-end">
      <div>
        <label class="label" for="desde">Desde</label>
        <input id="desde" type="date" class="input" bind:value={desde} />
      </div>
      <div>
        <label class="label" for="hasta">Hasta</label>
        <input id="hasta" type="date" class="input" bind:value={hasta} />
      </div>
      <button class="btn btn-primary" onclick={aplicarFiltros}>Aplicar filtros</button>
    </div>
  </div>

  <ReportsView reportes={data} />
</div>
