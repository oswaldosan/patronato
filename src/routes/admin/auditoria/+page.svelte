<script lang="ts">
  import { goto } from '$app/navigation';
  import Badge from '$lib/components/Badge.svelte';
  import EmptyState from '$lib/components/EmptyState.svelte';
  import { formatDateTime } from '$lib/utils/format';
  
  let { data } = $props();
  
  let entity = $state(data.filtros.entity);
  let action = $state(data.filtros.action);
  let expandedId = $state<string | null>(null);
  
  const actionLabels: Record<string, string> = {
    CREATE: 'Crear',
    UPDATE: 'Actualizar',
    DELETE: 'Eliminar',
  };
  
  const actionVariants: Record<string, 'success' | 'info' | 'danger'> = {
    CREATE: 'success',
    UPDATE: 'info',
    DELETE: 'danger',
  };
  
  function aplicarFiltros() {
    const params = new URLSearchParams();
    if (entity) params.set('entity', entity);
    if (action) params.set('action', action);
    goto(`/admin/auditoria?${params.toString()}`);
  }
  
  function toggleExpand(id: string) {
    expandedId = expandedId === id ? null : id;
  }
</script>

<svelte:head>
  <title>Auditoría - Admin</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div>
    <h1 class="page-title">Registro de Auditoría</h1>
    <p class="text-slate-600 mt-1">{data.pagination.total} registro{data.pagination.total !== 1 ? 's' : ''} de actividad</p>
  </div>
  
  <!-- Filters -->
  <div class="card p-4">
    <div class="flex flex-col sm:flex-row gap-4">
      <select bind:value={entity} class="select flex-1">
        <option value="">Todas las entidades</option>
        {#each data.entities as e}
          <option value={e}>{e}</option>
        {/each}
      </select>
      <select bind:value={action} class="select w-full sm:w-40">
        <option value="">Todas las acciones</option>
        <option value="CREATE">Crear</option>
        <option value="UPDATE">Actualizar</option>
        <option value="DELETE">Eliminar</option>
      </select>
      <button onclick={aplicarFiltros} class="btn btn-primary">
        Filtrar
      </button>
    </div>
  </div>
  
  <!-- Logs -->
  {#if data.logs.length === 0}
    <EmptyState 
      title="Sin registros" 
      description="No hay actividad registrada con los filtros seleccionados."
      icon="📋"
    />
  {:else}
    <div class="space-y-2">
      {#each data.logs as log}
        <div class="card overflow-hidden">
          <button 
            onclick={() => toggleExpand(log.id)}
            class="w-full p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors text-left"
          >
            <div class="w-10 h-10 rounded-full flex items-center justify-center {log.action === 'CREATE' ? 'bg-green-100 text-green-600' : log.action === 'UPDATE' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}">
              {#if log.action === 'CREATE'}
                +
              {:else if log.action === 'UPDATE'}
                ✎
              {:else}
                ×
              {/if}
            </div>
            
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <Badge variant={actionVariants[log.action]}>
                  {actionLabels[log.action]}
                </Badge>
                <span class="font-medium text-slate-900">{log.entity}</span>
                <span class="text-xs text-slate-400 font-mono">{log.entityId.slice(-8)}</span>
              </div>
              <p class="text-sm text-slate-500 mt-1">
                {log.user} • {formatDateTime(log.createdAt)}
              </p>
            </div>
            
            <svg 
              class="w-5 h-5 text-slate-400 transition-transform {expandedId === log.id ? 'rotate-180' : ''}" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {#if expandedId === log.id}
            <div class="px-4 pb-4 border-t border-slate-100 bg-slate-50">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {#if log.oldData}
                  <div>
                    <p class="text-xs font-medium text-slate-500 mb-2">Datos anteriores</p>
                    <pre class="text-xs bg-white p-3 rounded-lg border border-slate-200 overflow-auto max-h-60">{JSON.stringify(log.oldData, null, 2)}</pre>
                  </div>
                {/if}
                
                {#if log.newData}
                  <div>
                    <p class="text-xs font-medium text-slate-500 mb-2">Datos nuevos</p>
                    <pre class="text-xs bg-white p-3 rounded-lg border border-slate-200 overflow-auto max-h-60">{JSON.stringify(log.newData, null, 2)}</pre>
                  </div>
                {/if}
              </div>
              
              <div class="mt-4 text-xs text-slate-500">
                <p>ID completo: {log.id}</p>
                {#if log.ip}
                  <p>IP: {log.ip}</p>
                {/if}
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
    
    <!-- Pagination -->
    {#if data.pagination.totalPages > 1}
      <div class="flex justify-center gap-2">
        {#each Array(Math.min(data.pagination.totalPages, 10)) as _, i}
          <a 
            href="/admin/auditoria?page={i + 1}&entity={entity}&action={action}"
            class="w-10 h-10 rounded-lg flex items-center justify-center {data.pagination.page === i + 1 ? 'bg-primary-600 text-white' : 'bg-white border border-slate-200 hover:bg-slate-50'}"
          >
            {i + 1}
          </a>
        {/each}
      </div>
    {/if}
  {/if}
</div>
