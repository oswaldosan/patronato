<script lang="ts">
  import { goto } from '$app/navigation';
  import Badge from '$lib/components/Badge.svelte';
  import { formatCurrency, formatDate } from '$lib/utils/format';
  
  let { data } = $props();
  
  let rubroId = $state(data.filtros.rubroId);
  let proveedorId = $state(data.filtros.proveedorId);
  let desde = $state(data.filtros.desde);
  let hasta = $state(data.filtros.hasta);
  
  function aplicarFiltros() {
    const params = new URLSearchParams();
    if (rubroId) params.set('rubro', rubroId);
    if (proveedorId) params.set('proveedor', proveedorId);
    if (desde) params.set('desde', desde);
    if (hasta) params.set('hasta', hasta);
    goto(`/egresos?${params.toString()}`);
  }
  
  function limpiarFiltros() {
    rubroId = '';
    proveedorId = '';
    desde = '';
    hasta = '';
    goto('/egresos');
  }
  
  function irPagina(page: number) {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    if (rubroId) params.set('rubro', rubroId);
    if (proveedorId) params.set('proveedor', proveedorId);
    if (desde) params.set('desde', desde);
    if (hasta) params.set('hasta', hasta);
    goto(`/egresos?${params.toString()}`);
  }
</script>

<svelte:head>
  <title>Gastos del Proyecto - Portal de Transparencia</title>
</svelte:head>

<div class="min-h-screen bg-slate-50">
  <!-- Header -->
  <section class="bg-gradient-to-br from-red-500 via-red-600 to-red-700 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-3xl md:text-4xl font-display font-bold text-white mb-3">
          Gastos del Proyecto
        </h1>
        <p class="text-white/80 max-w-2xl mx-auto">
          Transparencia total: conoce en detalle como se utilizan los fondos recaudados.
        </p>
      </div>
    </div>
  </section>
  
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-16 mb-8 relative z-10">
      <div class="card p-6 text-center">
        <p class="text-sm text-slate-500 mb-1">Total Gastado</p>
        <p class="text-3xl font-display font-bold text-red-600">
          {formatCurrency(data.stats.totalGastado)}
        </p>
      </div>
      <div class="card p-6 text-center">
        <p class="text-sm text-slate-500 mb-1">Egresos Registrados</p>
        <p class="text-3xl font-display font-bold text-slate-800">
          {data.stats.totalEgresos}
        </p>
      </div>
      <div class="card p-6 text-center">
        <p class="text-sm text-slate-500 mb-1">Categorias</p>
        <p class="text-3xl font-display font-bold text-slate-800">
          {data.stats.porRubro.length}
        </p>
      </div>
    </div>
    
    <!-- Gastos por Rubro -->
    {#if data.stats.porRubro.length > 0}
      <div class="card p-6 mb-8">
        <h2 class="font-display font-semibold text-lg text-slate-800 mb-4">Distribucion de Gastos por Categoria</h2>
        <div class="space-y-3">
          {#each data.stats.porRubro as rubro}
            {@const porcentaje = (rubro.total / data.stats.totalGastado) * 100}
            <div>
              <div class="flex justify-between items-center mb-1">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full" style="background-color: {rubro.color}"></span>
                  <span class="text-sm font-medium text-slate-700">{rubro.nombre}</span>
                </div>
                <span class="text-sm font-semibold text-slate-900">{formatCurrency(rubro.total)}</span>
              </div>
              <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  class="h-full rounded-full transition-all duration-500"
                  style="width: {porcentaje}%; background-color: {rubro.color}"
                ></div>
              </div>
              <p class="text-xs text-slate-500 mt-0.5 text-right">{porcentaje.toFixed(1)}%</p>
            </div>
          {/each}
        </div>
      </div>
    {/if}
    
    <!-- Filtros -->
    <div class="card p-4 mb-6">
      <form onsubmit={(e) => { e.preventDefault(); aplicarFiltros(); }} class="flex flex-wrap gap-4 items-end">
        <div class="flex-1 min-w-[150px]">
          <label for="rubro" class="label">Categoria</label>
          <select id="rubro" bind:value={rubroId} class="select">
            <option value="">Todas</option>
            {#each data.rubros as rubro}
              <option value={rubro.id}>{rubro.nombre}</option>
            {/each}
          </select>
        </div>
        
        <div class="flex-1 min-w-[150px]">
          <label for="proveedor" class="label">Proveedor</label>
          <select id="proveedor" bind:value={proveedorId} class="select">
            <option value="">Todos</option>
            {#each data.proveedores as proveedor}
              <option value={proveedor.id}>{proveedor.nombre}</option>
            {/each}
          </select>
        </div>
        
        <div class="flex-1 min-w-[140px]">
          <label for="desde" class="label">Desde</label>
          <input type="date" id="desde" bind:value={desde} class="input" />
        </div>
        
        <div class="flex-1 min-w-[140px]">
          <label for="hasta" class="label">Hasta</label>
          <input type="date" id="hasta" bind:value={hasta} class="input" />
        </div>
        
        <div class="flex gap-2">
          <button type="submit" class="btn btn-primary">Filtrar</button>
          <button type="button" onclick={limpiarFiltros} class="btn btn-secondary">Limpiar</button>
        </div>
      </form>
    </div>
    
    <!-- Lista de Egresos -->
    <div class="card overflow-hidden">
      <div class="p-4 border-b border-slate-100">
        <h2 class="font-display font-semibold text-slate-800">
          Detalle de Gastos
          <span class="text-sm font-normal text-slate-500 ml-2">
            ({data.pagination.total} registros)
          </span>
        </h2>
      </div>
      
      {#if data.egresos.length === 0}
        <div class="p-12 text-center">
          <div class="text-4xl mb-3">📭</div>
          <p class="text-slate-500">No se encontraron egresos con los filtros seleccionados.</p>
        </div>
      {:else}
        <!-- Desktop Table -->
        <div class="hidden md:block overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Concepto</th>
                <th>Categoria</th>
                <th>Proveedor</th>
                <th class="text-right">Monto</th>
              </tr>
            </thead>
            <tbody>
              {#each data.egresos as egreso}
                <tr>
                  <td class="whitespace-nowrap">
                    {formatDate(egreso.fecha)}
                  </td>
                  <td>
                    <div>
                      <span class="font-medium text-slate-900">{egreso.concepto}</span>
                      {#if egreso.notas}
                        <p class="text-xs text-slate-500 mt-0.5 line-clamp-1">{egreso.notas}</p>
                      {/if}
                    </div>
                  </td>
                  <td>
                    {#if egreso.rubro}
                      <Badge variant="default">
                        <span class="flex items-center gap-1.5">
                          <span class="w-2 h-2 rounded-full" style="background-color: {egreso.rubroColor}"></span>
                          {egreso.rubro}
                        </span>
                      </Badge>
                    {:else}
                      <span class="text-slate-400">-</span>
                    {/if}
                  </td>
                  <td>
                    {#if egreso.proveedor}
                      <span class="text-slate-700">{egreso.proveedor}</span>
                    {:else}
                      <span class="text-slate-400">-</span>
                    {/if}
                  </td>
                  <td class="text-right">
                    <span class="font-semibold text-red-600">{formatCurrency(egreso.monto)}</span>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        
        <!-- Mobile Cards -->
        <div class="md:hidden divide-y divide-slate-100">
          {#each data.egresos as egreso}
            <div class="p-4">
              <div class="flex justify-between items-start mb-2">
                <div class="flex-1">
                  <p class="font-medium text-slate-900">{egreso.concepto}</p>
                  <p class="text-xs text-slate-500">{formatDate(egreso.fecha)}</p>
                </div>
                <span class="font-bold text-red-600">{formatCurrency(egreso.monto)}</span>
              </div>
              <div class="flex flex-wrap gap-2 text-xs">
                {#if egreso.rubro}
                  <Badge variant="default">
                    <span class="flex items-center gap-1">
                      <span class="w-2 h-2 rounded-full" style="background-color: {egreso.rubroColor}"></span>
                      {egreso.rubro}
                    </span>
                  </Badge>
                {/if}
                {#if egreso.proveedor}
                  <span class="text-slate-500">Proveedor: {egreso.proveedor}</span>
                {/if}
              </div>
              {#if egreso.notas}
                <p class="text-xs text-slate-500 mt-2">{egreso.notas}</p>
              {/if}
            </div>
          {/each}
        </div>
        
        <!-- Pagination -->
        {#if data.pagination.totalPages > 1}
          <div class="p-4 border-t border-slate-100 flex justify-center gap-2">
            <button
              onclick={() => irPagina(data.pagination.page - 1)}
              disabled={data.pagination.page <= 1}
              class="btn btn-secondary btn-sm"
            >
              Anterior
            </button>
            
            <span class="px-4 py-2 text-sm text-slate-600">
              Pagina {data.pagination.page} de {data.pagination.totalPages}
            </span>
            
            <button
              onclick={() => irPagina(data.pagination.page + 1)}
              disabled={data.pagination.page >= data.pagination.totalPages}
              class="btn btn-secondary btn-sm"
            >
              Siguiente
            </button>
          </div>
        {/if}
      {/if}
    </div>
  </div>
</div>
