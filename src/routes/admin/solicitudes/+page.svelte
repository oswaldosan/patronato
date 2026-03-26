<script lang="ts">
  import { goto } from '$app/navigation';
  import Badge from '$lib/components/Badge.svelte';
  import EmptyState from '$lib/components/EmptyState.svelte';
  import { formatCurrency, formatDateTime } from '$lib/utils/format';

  let { data } = $props();

  let estado = $state(data.filtros.estado);

  function aplicarFiltros() {
    const params = new URLSearchParams();
    if (estado) params.set('estado', estado);
    goto(`/admin/solicitudes?${params.toString()}`);
  }

  const estadoVariant = (e: string) => {
    switch (e) {
      case 'APROBADO': return 'success' as const;
      case 'PENDIENTE': return 'warning' as const;
      case 'RECHAZADO': return 'danger' as const;
      default: return 'default' as const;
    }
  };

  const estadoLabel: Record<string, string> = {
    PENDIENTE: 'Pendiente',
    APROBADO: 'Aprobado',
    RECHAZADO: 'Rechazado',
  };
</script>

<svelte:head>
  <title>Solicitudes de Donación - Admin</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="page-title">Solicitudes de Donación</h1>
      <p class="text-slate-600 mt-1">
        {data.pagination.total} solicitud{data.pagination.total !== 1 ? 'es' : ''}
        {#if data.pendientes > 0}
          <span class="inline-flex items-center gap-1 ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
            {data.pendientes} pendiente{data.pendientes !== 1 ? 's' : ''}
          </span>
        {/if}
      </p>
    </div>
  </div>

  <div class="card p-4">
    <div class="flex flex-col sm:flex-row gap-4">
      <select bind:value={estado} class="select w-full sm:w-48">
        <option value="">Todos los estados</option>
        <option value="PENDIENTE">Pendientes</option>
        <option value="APROBADO">Aprobados</option>
        <option value="RECHAZADO">Rechazados</option>
      </select>
      <button onclick={aplicarFiltros} class="btn btn-primary">Filtrar</button>
    </div>
  </div>

  {#if data.solicitudes.length === 0}
    <EmptyState
      title="No hay solicitudes"
      description="No se encontraron solicitudes con los filtros aplicados."
      icon="📋"
    />
  {:else}
    <div class="space-y-3">
      {#each data.solicitudes as solicitud}
        <a
          href="/admin/solicitudes/{solicitud.id}"
          class="card p-5 block hover:border-primary-300 hover:shadow-md transition-all duration-200"
        >
          <div class="flex flex-col sm:flex-row sm:items-center gap-4">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3 mb-1">
                <h3 class="font-display font-semibold text-slate-900 truncate">{solicitud.nombre}</h3>
                <Badge variant={estadoVariant(solicitud.estado)} size="sm">
                  {estadoLabel[solicitud.estado] ?? solicitud.estado}
                </Badge>
              </div>
              <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                <span>ID: {solicitud.identidad}</span>
                <span>Tel: {solicitud.telefono}</span>
                <span>{formatDateTime(solicitud.createdAt)}</span>
              </div>
              {#if solicitud.mensaje}
                <p class="text-sm text-slate-600 mt-1 line-clamp-1">{solicitud.mensaje}</p>
              {/if}
            </div>
            <div class="flex items-center gap-4 shrink-0">
              {#if solicitud.monto}
                <span class="text-xl font-display font-bold text-primary-700">{formatCurrency(solicitud.monto)}</span>
              {/if}
              {#if solicitud.comprobante}
                <span class="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-lg font-medium">Comprobante</span>
              {/if}
            </div>
          </div>
        </a>
      {/each}
    </div>

    {#if data.pagination.totalPages > 1}
      <div class="flex justify-center gap-2">
        {#each Array(Math.min(data.pagination.totalPages, 10)) as _, i}
          <a
            href="/admin/solicitudes?page={i + 1}&estado={estado}"
            class="w-10 h-10 rounded-lg flex items-center justify-center {data.pagination.page === i + 1 ? 'bg-primary-600 text-white' : 'bg-white border border-slate-200 hover:bg-slate-50'}"
          >
            {i + 1}
          </a>
        {/each}
      </div>
    {/if}
  {/if}
</div>
