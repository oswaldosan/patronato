<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Badge from '$lib/components/Badge.svelte';
  import EmptyState from '$lib/components/EmptyState.svelte';
  import { formatCurrency, formatDate, metodoPagoLabels } from '$lib/utils/format';
  
  let { data } = $props();
  
  let tipo = $state(data.filtros.tipo);
  let rubroId = $state(data.filtros.rubroId);
  let metodo = $state(data.filtros.metodo);
  let desde = $state(data.filtros.desde);
  let hasta = $state(data.filtros.hasta);
  
  function aplicarFiltros() {
    const params = new URLSearchParams();
    if (tipo && tipo !== 'todos') params.set('tipo', tipo);
    if (rubroId) params.set('rubro', rubroId);
    if (metodo) params.set('metodo', metodo);
    if (desde) params.set('desde', desde);
    if (hasta) params.set('hasta', hasta);
    
    goto(`/movimientos?${params.toString()}`);
  }
  
  function limpiarFiltros() {
    tipo = 'todos';
    rubroId = '';
    metodo = '';
    desde = '';
    hasta = '';
    goto('/movimientos');
  }
</script>

<svelte:head>
  <title>Movimientos - Patronato de Monterrey</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <!-- Header -->
  <div class="mb-8">
    <h1 class="page-title mb-2">Movimientos</h1>
    <p class="text-slate-600">Consulta todos los ingresos y egresos verificados del proyecto.</p>
  </div>
  
  <!-- Stats -->
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
    <div class="card p-4 flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
        <svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <div>
        <p class="text-sm text-slate-500">Ingresos</p>
        <p class="text-xl font-bold text-green-600">{formatCurrency(data.totales.ingresos)}</p>
      </div>
    </div>
    
    <div class="card p-4 flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
        <svg class="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
        </svg>
      </div>
      <div>
        <p class="text-sm text-slate-500">Egresos</p>
        <p class="text-xl font-bold text-red-600">{formatCurrency(data.totales.egresos)}</p>
      </div>
    </div>
    
    <div class="card p-4 flex items-center gap-4">
      <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
        <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>
      <div>
        <p class="text-sm text-slate-500">Balance</p>
        <p class="text-xl font-bold text-blue-600">{formatCurrency(data.totales.ingresos - data.totales.egresos)}</p>
      </div>
    </div>
  </div>
  
  <!-- Filtros -->
  <div class="card p-6 mb-8">
    <h2 class="font-display font-semibold text-slate-800 mb-4">Filtros</h2>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <div>
        <label for="tipo" class="label">Tipo</label>
        <select id="tipo" bind:value={tipo} class="select">
          <option value="todos">Todos</option>
          <option value="ingresos">Solo Ingresos</option>
          <option value="egresos">Solo Egresos</option>
        </select>
      </div>
      
      <div>
        <label for="rubro" class="label">Rubro</label>
        <select id="rubro" bind:value={rubroId} class="select" disabled={tipo === 'egresos'}>
          <option value="">Todos</option>
          {#each data.rubros as rubro}
            <option value={rubro.id}>{rubro.nombre}</option>
          {/each}
        </select>
      </div>
      
      <div>
        <label for="metodo" class="label">Método</label>
        <select id="metodo" bind:value={metodo} class="select" disabled={tipo === 'egresos'}>
          <option value="">Todos</option>
          <option value="DEPOSITO">Depósito</option>
          <option value="TRANSFERENCIA">Transferencia</option>
          <option value="EFECTIVO">Efectivo</option>
          <option value="CHEQUE">Cheque</option>
        </select>
      </div>
      
      <div>
        <label for="desde" class="label">Desde</label>
        <input type="date" id="desde" bind:value={desde} class="input" />
      </div>
      
      <div>
        <label for="hasta" class="label">Hasta</label>
        <input type="date" id="hasta" bind:value={hasta} class="input" />
      </div>
    </div>
    
    <div class="flex gap-3 mt-4">
      <button onclick={aplicarFiltros} class="btn btn-primary">
        Aplicar Filtros
      </button>
      <button onclick={limpiarFiltros} class="btn btn-secondary">
        Limpiar
      </button>
    </div>
  </div>
  
  <!-- Lista de Movimientos -->
  {#if data.movimientos.length === 0}
    <EmptyState 
      title="No hay movimientos" 
      description="No se encontraron movimientos con los filtros seleccionados."
      icon="📋"
    />
  {:else}
    <div class="space-y-3">
      {#each data.movimientos as mov, i}
        <div 
          class="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow animate-slide-up"
          style="animation-delay: {i * 0.03}s"
        >
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center {mov.tipo === 'ingreso' ? 'bg-green-100' : 'bg-red-100'}">
              {#if mov.tipo === 'ingreso'}
                <svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              {:else}
                <svg class="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                </svg>
              {/if}
            </div>
            
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h3 class="font-medium text-slate-900">{mov.concepto}</h3>
                {#if mov.rubro}
                  <Badge variant="info">{mov.rubro}</Badge>
                {/if}
              </div>
              <p class="text-sm text-slate-500 mt-1">
                {formatDate(mov.fecha)}
                {#if mov.metodo}
                  <span class="mx-2">•</span>
                  {metodoPagoLabels[mov.metodo] || mov.metodo}
                {/if}
              </p>
              {#if mov.detalle}
                <p class="text-sm text-slate-400 mt-1">{mov.detalle}</p>
              {/if}
            </div>
          </div>
          
          <div class="text-right sm:text-left">
            <p class="text-xl font-bold {mov.tipo === 'ingreso' ? 'text-green-600' : 'text-red-600'}">
              {mov.tipo === 'ingreso' ? '+' : '-'}{formatCurrency(mov.monto)}
            </p>
            <Badge variant={mov.tipo === 'ingreso' ? 'success' : 'danger'}>
              {mov.tipo === 'ingreso' ? 'Ingreso' : 'Egreso'}
            </Badge>
          </div>
        </div>
      {/each}
    </div>
    
    <!-- Pagination (simple) -->
    {#if data.pagination.hasMore}
      <div class="flex justify-center mt-8">
        <a 
          href="/movimientos?page={data.pagination.page + 1}&{$page.url.searchParams.toString()}"
          class="btn btn-outline"
        >
          Cargar más
        </a>
      </div>
    {/if}
  {/if}
</div>
