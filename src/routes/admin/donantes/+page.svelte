<script lang="ts">
  import { goto } from '$app/navigation';
  import Badge from '$lib/components/Badge.svelte';
  import EmptyState from '$lib/components/EmptyState.svelte';
  import { formatCurrency, formatDateShort, tipDonanteLabels } from '$lib/utils/format';
  
  let { data } = $props();
  
  let search = $state(data.filtros.search);
  let tipo = $state(data.filtros.tipo);
  
  function aplicarFiltros() {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (tipo) params.set('tipo', tipo);
    goto(`/admin/donantes?${params.toString()}`);
  }
</script>

<svelte:head>
  <title>Donantes - Admin</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="page-title">Donantes</h1>
      <p class="text-slate-600 mt-1">{data.pagination.total} donante{data.pagination.total !== 1 ? 's' : ''} registrado{data.pagination.total !== 1 ? 's' : ''}</p>
    </div>
    <a href="/admin/donantes/nuevo" class="btn btn-primary">
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Nuevo Donante
    </a>
  </div>
  
  <!-- Filters -->
  <div class="card p-4">
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <input 
          type="text" 
          bind:value={search}
          placeholder="Buscar por nombre..."
          class="input"
          onkeyup={(e) => e.key === 'Enter' && aplicarFiltros()}
        />
      </div>
      <select bind:value={tipo} class="select w-full sm:w-48">
        <option value="">Todos los tipos</option>
        <option value="PERSONA">Persona</option>
        <option value="EMPRESA">Empresa</option>
      </select>
      <button onclick={aplicarFiltros} class="btn btn-primary">
        Buscar
      </button>
    </div>
  </div>
  
  <!-- Table -->
  {#if data.donantes.length === 0}
    <EmptyState 
      title="No hay donantes" 
      description="No se encontraron donantes con los filtros aplicados."
      icon="👥"
      actionLabel="Agregar donante"
      actionHref="/admin/donantes/nuevo"
    />
  {:else}
    <div class="card overflow-hidden">
      <table class="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Contacto</th>
            <th class="text-center">Aportes</th>
            <th class="text-right">Total</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {#each data.donantes as donante}
            <tr>
              <td>
                <div>
                  <p class="font-medium text-slate-900">
                    {donante.nombreNegocio || donante.nombre}
                  </p>
                  {#if donante.nombreNegocio}
                    <p class="text-xs text-slate-500">{donante.nombre}</p>
                  {/if}
                </div>
              </td>
              <td>
                <Badge variant={donante.tipo === 'EMPRESA' ? 'info' : 'default'}>
                  {tipDonanteLabels[donante.tipo]}
                </Badge>
              </td>
              <td>
                <div class="text-sm">
                  {#if donante.telefono}
                    <p>{donante.telefono}</p>
                  {/if}
                  {#if donante.email}
                    <p class="text-slate-500">{donante.email}</p>
                  {/if}
                  {#if !donante.telefono && !donante.email}
                    <span class="text-slate-400">-</span>
                  {/if}
                </div>
              </td>
              <td class="text-center">{donante.totalAportes}</td>
              <td class="text-right font-bold text-primary-600">
                {formatCurrency(donante.totalDonado)}
              </td>
              <td>
                <Badge variant={donante.activo ? 'success' : 'danger'}>
                  {donante.activo ? 'Activo' : 'Inactivo'}
                </Badge>
              </td>
              <td>
                <a 
                  href="/admin/donantes/{donante.id}"
                  class="text-primary-600 hover:underline text-sm"
                >
                  Editar
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
        {#each Array(data.pagination.totalPages) as _, i}
          <a 
            href="/admin/donantes?page={i + 1}&q={search}&tipo={tipo}"
            class="w-10 h-10 rounded-lg flex items-center justify-center {data.pagination.page === i + 1 ? 'bg-primary-600 text-white' : 'bg-white border border-slate-200 hover:bg-slate-50'}"
          >
            {i + 1}
          </a>
        {/each}
      </div>
    {/if}
  {/if}
</div>
