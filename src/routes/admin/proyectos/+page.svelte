<script lang="ts">
  import { goto } from '$app/navigation';
  import Badge from '$lib/components/Badge.svelte';
  import EmptyState from '$lib/components/EmptyState.svelte';
  import { formatCurrency, formatDateShort } from '$lib/utils/format';

  let { data } = $props();

  let search = $state(data.filtros.search);
  let estado = $state(data.filtros.estado);

  function aplicarFiltros() {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (estado) params.set('estado', estado);
    goto(`/admin/proyectos?${params.toString()}`);
  }
</script>

<svelte:head>
  <title>Proyectos - Admin</title>
</svelte:head>

<div class="space-y-6">
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="page-title">Proyectos Realizados</h1>
      <p class="text-slate-600 mt-1">{data.pagination.total} proyecto{data.pagination.total !== 1 ? 's' : ''}</p>
    </div>
    <a href="/admin/proyectos/nuevo" class="btn btn-primary">
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Nuevo Proyecto
    </a>
  </div>

  <div class="card p-4">
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1">
        <input
          type="text"
          bind:value={search}
          placeholder="Buscar por título o descripción..."
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

  {#if data.proyectos.length === 0}
    <EmptyState
      title="No hay proyectos"
      description="No se encontraron proyectos con los filtros aplicados."
      icon="🏗️"
      actionLabel="Crear proyecto"
      actionHref="/admin/proyectos/nuevo"
    />
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each data.proyectos as proyecto}
        <a href="/admin/proyectos/{proyecto.id}" class="card group hover:border-primary-300 hover:shadow-lg transition-all duration-300 overflow-hidden">
          {#if proyecto.foto1}
            <div class="aspect-video overflow-hidden bg-slate-100">
              <img
                src={proyecto.foto1}
                alt={proyecto.titulo}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          {:else}
            <div class="aspect-video bg-slate-100 flex items-center justify-center">
              <span class="text-4xl">🏗️</span>
            </div>
          {/if}
          <div class="p-5">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <Badge variant={proyecto.publicado ? 'success' : 'warning'}>
                  {proyecto.publicado ? 'Publicado' : 'Borrador'}
                </Badge>
                {#if proyecto.activo}
                  <Badge variant="info">Activo</Badge>
                {/if}
              </div>
              <span class="text-xs text-slate-500">{formatDateShort(proyecto.fecha)}</span>
            </div>
            <h3 class="font-display font-semibold text-slate-900 group-hover:text-primary-700 transition-colors line-clamp-2 mb-2">
              {proyecto.titulo}
            </h3>
            <p class="text-sm text-slate-500 line-clamp-2 mb-3">{proyecto.descripcion}</p>
            <div class="flex items-center justify-between">
              <p class="text-lg font-display font-bold text-primary-700">{formatCurrency(proyecto.gastoTotal)}</p>
              {#if proyecto.meta}
                <p class="text-xs text-slate-500">Meta: {formatCurrency(proyecto.meta)}</p>
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
            href="/admin/proyectos?page={i + 1}&q={search}&estado={estado}"
            class="w-10 h-10 rounded-lg flex items-center justify-center {data.pagination.page === i + 1 ? 'bg-primary-600 text-white' : 'bg-white border border-slate-200 hover:bg-slate-50'}"
          >
            {i + 1}
          </a>
        {/each}
      </div>
    {/if}
  {/if}
</div>
