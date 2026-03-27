<script lang="ts">
  import { goto } from '$app/navigation';
  import Badge from '$lib/components/Badge.svelte';
  import EmptyState from '$lib/components/EmptyState.svelte';
  import { formatCurrency, formatDateShort, estadoDonacionMaterialLabels } from '$lib/utils/format';

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
    goto(`/admin/donaciones-materiales?${params.toString()}`);
  }
</script>

<svelte:head>
  <title>Donaciones de Materiales - Admin</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="page-title">Donaciones de Materiales</h1>
      <p class="text-slate-600 mt-1">{data.pagination.total} donación{data.pagination.total !== 1 ? 'es' : ''} registrada{data.pagination.total !== 1 ? 's' : ''}</p>
    </div>
    <a href="/admin/donaciones-materiales/nuevo" class="btn btn-primary">
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Nueva Donación
    </a>
  </div>

  <div class="card p-4">
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <input
          type="text"
          bind:value={search}
          placeholder="Buscar aportante..."
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

  {#if data.donaciones.length === 0}
    <EmptyState
      title="No hay donaciones de materiales"
      description="No se encontraron donaciones con los filtros aplicados."
      icon="📦"
      actionLabel="Registrar donación"
      actionHref="/admin/donaciones-materiales/nuevo"
    />
  {:else}
    <div class="card overflow-hidden">
      <table class="table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Aportante</th>
            <th>Material</th>
            <th>Cantidad</th>
            <th class="text-right">Valor Est.</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {#each data.donaciones as donacion}
            <tr>
              <td class="whitespace-nowrap">{formatDateShort(donacion.fecha)}</td>
              <td>
                <a href="/admin/donantes/{donacion.donanteId}" class="font-medium text-slate-900 hover:text-primary-600">
                  {donacion.donante}
                </a>
              </td>
              <td class="max-w-xs truncate text-sm text-slate-700">{donacion.descripcion}</td>
              <td class="text-sm text-slate-600">{donacion.cantidad || '-'}</td>
              <td class="text-right font-bold text-primary-700">
                {formatCurrency(donacion.valorEstimado)}
              </td>
              <td>
                <Badge variant={estadoVariant(donacion.estado)}>
                  {estadoDonacionMaterialLabels[donacion.estado]}
                </Badge>
              </td>
              <td>
                <a
                  href="/admin/donaciones-materiales/{donacion.id}"
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

    {#if data.pagination.totalPages > 1}
      <div class="flex justify-center gap-2">
        {#each Array(Math.min(data.pagination.totalPages, 10)) as _, i}
          <a
            href="/admin/donaciones-materiales?page={i + 1}&q={search}&estado={estado}"
            class="w-10 h-10 rounded-lg flex items-center justify-center {data.pagination.page === i + 1 ? 'bg-primary-600 text-white' : 'bg-white border border-slate-200 hover:bg-slate-50'}"
          >
            {i + 1}
          </a>
        {/each}
      </div>
    {/if}
  {/if}
</div>
