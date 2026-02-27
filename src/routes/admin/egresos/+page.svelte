<script lang="ts">
  import { goto } from '$app/navigation';
  import Badge from '$lib/components/Badge.svelte';
  import EmptyState from '$lib/components/EmptyState.svelte';
  import { formatCurrency, formatDateShort, estadoEgresoLabels } from '$lib/utils/format';
  
  let { data } = $props();
  
  let search = $state(data.filtros.search);
  let estado = $state(data.filtros.estado);
  
  const estadoVariant = (e: string) => {
    switch (e) {
      case 'VERIFICADO': return 'success';
      case 'PENDIENTE': return 'warning';
      case 'ANULADO': return 'danger';
      default: return 'default';
    }
  };
  
  function aplicarFiltros() {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (estado) params.set('estado', estado);
    goto(`/admin/egresos?${params.toString()}`);
  }
</script>

<svelte:head>
  <title>Egresos - Admin</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="page-title">Egresos / Gastos</h1>
      <p class="text-slate-600 mt-1">{data.pagination.total} egreso{data.pagination.total !== 1 ? 's' : ''} registrado{data.pagination.total !== 1 ? 's' : ''}</p>
    </div>
    <a href="/admin/egresos/nuevo" class="btn btn-primary">
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Nuevo Egreso
    </a>
  </div>
  
  <!-- Filters -->
  <div class="card p-4">
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <input 
          type="text" 
          bind:value={search}
          placeholder="Buscar por concepto o proveedor..."
          class="input"
          onkeyup={(e) => e.key === 'Enter' && aplicarFiltros()}
        />
      </div>
      <select bind:value={estado} class="select w-full sm:w-40">
        <option value="">Todos los estados</option>
        <option value="PENDIENTE">Pendiente</option>
        <option value="VERIFICADO">Verificado</option>
        <option value="ANULADO">Anulado</option>
      </select>
      <button onclick={aplicarFiltros} class="btn btn-primary">
        Buscar
      </button>
    </div>
  </div>
  
  <!-- Table -->
  {#if data.egresos.length === 0}
    <EmptyState 
      title="No hay egresos" 
      description="No se encontraron egresos con los filtros aplicados."
      icon="📤"
      actionLabel="Registrar egreso"
      actionHref="/admin/egresos/nuevo"
    />
  {:else}
    <div class="card overflow-hidden">
      <table class="table">
        <thead>
          <tr>
            <th>Fecha</th>
             <th>Concepto</th>
             <th>Proveedor</th>
             <th class="text-right">Monto</th>
             <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {#each data.egresos as egreso}
            <tr>
              <td class="whitespace-nowrap">{formatDateShort(egreso.fecha)}</td>
              <td>
                <p class="font-medium text-slate-900">{egreso.concepto}</p>
                {#if egreso.rubro}
                  <p class="text-xs text-slate-500 flex items-center gap-2">
                    <span class="inline-flex w-2 h-2 rounded-full" style={`background:${egreso.rubroColor}`}></span>
                    {egreso.rubro}
                  </p>
                {/if}
              </td>
              <td class="text-sm text-slate-600">
                {egreso.proveedor || '-'}
              </td>
              <td class="text-right font-bold text-red-600">
                {formatCurrency(egreso.monto)}
              </td>
              <td>
                <Badge variant={estadoVariant(egreso.estado)}>
                  {estadoEgresoLabels[egreso.estado]}
                </Badge>
              </td>
              <td>
                <a 
                  href="/admin/egresos/{egreso.id}"
                  class="text-primary-600 hover:underline text-sm"
                >
                  Ver
                </a>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    
    <!-- Pagination -->
    {#if data.pagination.totalPages > 1}
      <div class="flex justify-center gap-2">
        {#each Array(Math.min(data.pagination.totalPages, 10)) as _, i}
          <a 
            href="/admin/egresos?page={i + 1}&q={search}&estado={estado}"
            class="w-10 h-10 rounded-lg flex items-center justify-center {data.pagination.page === i + 1 ? 'bg-primary-600 text-white' : 'bg-white border border-slate-200 hover:bg-slate-50'}"
          >
            {i + 1}
          </a>
        {/each}
      </div>
    {/if}
  {/if}
</div>
