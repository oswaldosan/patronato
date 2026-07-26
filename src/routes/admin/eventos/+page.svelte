<script lang="ts">
  import { goto } from '$app/navigation';
  import Badge from '$lib/components/Badge.svelte';
  import EmptyState from '$lib/components/EmptyState.svelte';
  import StatCard from '$lib/components/StatCard.svelte';
  import { formatCurrency, formatDateShort } from '$lib/utils/format';

  let { data } = $props();

  let search = $state(data.filtros.search);
  let estado = $state(data.filtros.estado);

  function aplicarFiltros() {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (estado) params.set('estado', estado);
    goto(`/admin/eventos?${params.toString()}`);
  }
</script>

<svelte:head>
  <title>Eventos - Admin</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="page-title">Eventos</h1>
      <p class="text-slate-600 mt-1">{data.eventos.length} evento{data.eventos.length !== 1 ? 's' : ''}</p>
    </div>
    <a href="/admin/eventos/nuevo" class="btn btn-primary">
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Nuevo Evento
    </a>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <StatCard title="Total eventos" value={data.resumen.totalEventos} icon="🎉" color="blue" />
    <StatCard title="Total recaudado" value={data.resumen.totalRecaudado} isCurrency icon="💰" color="green" />
    <StatCard title="Total gastado" value={data.resumen.totalGastado} isCurrency icon="📤" color="red" />
    <StatCard
      title="Balance global"
      value={data.resumen.balanceGlobal}
      isCurrency
      icon="⚖️"
      color={data.resumen.balanceGlobal >= 0 ? 'green' : 'red'}
    />
  </div>

  <div class="card p-4">
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <input
          type="text"
          bind:value={search}
          placeholder="Buscar por nombre o lugar..."
          class="input"
          onkeyup={(e) => e.key === 'Enter' && aplicarFiltros()}
        />
      </div>
      <select bind:value={estado} class="select w-full sm:w-40">
        <option value="">Todos</option>
        <option value="publicado">Publicados</option>
        <option value="borrador">Borradores</option>
      </select>
      <button onclick={aplicarFiltros} class="btn btn-primary">
        Buscar
      </button>
    </div>
  </div>

  {#if data.eventos.length === 0}
    <EmptyState
      title="No hay eventos"
      description="No se encontraron eventos con los filtros aplicados."
      icon="🎉"
      actionLabel="Crear evento"
      actionHref="/admin/eventos/nuevo"
    />
  {:else}
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-500">
              <th class="px-4 py-3 font-medium">Nombre</th>
              <th class="px-4 py-3 font-medium">Fecha</th>
              <th class="px-4 py-3 font-medium text-right">Ingresos</th>
              <th class="px-4 py-3 font-medium text-right">Gastos</th>
              <th class="px-4 py-3 font-medium text-right">Balance</th>
              <th class="px-4 py-3 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {#each data.eventos as evento}
              <tr
                class="border-b border-slate-100 last:border-0 hover:bg-slate-50 cursor-pointer transition-colors"
                onclick={() => goto(`/admin/eventos/${evento.id}`)}
              >
                <td class="px-4 py-3">
                  <a href="/admin/eventos/{evento.id}" class="font-medium text-slate-900 hover:text-primary-700">
                    {evento.nombre}
                  </a>
                  {#if evento.lugar}
                    <p class="text-xs text-slate-500">{evento.lugar}</p>
                  {/if}
                </td>
                <td class="px-4 py-3 text-slate-600">{formatDateShort(evento.fecha)}</td>
                <td class="px-4 py-3 text-right font-medium text-green-600">{formatCurrency(evento.totalIngresos)}</td>
                <td class="px-4 py-3 text-right font-medium text-red-600">{formatCurrency(evento.totalGastos)}</td>
                <td class="px-4 py-3 text-right font-bold {evento.balance >= 0 ? 'text-green-700' : 'text-red-700'}">
                  {formatCurrency(evento.balance)}
                </td>
                <td class="px-4 py-3">
                  <Badge variant={evento.publicado ? 'success' : 'warning'}>
                    {evento.publicado ? 'Publicado' : 'Borrador'}
                  </Badge>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {/if}
</div>
