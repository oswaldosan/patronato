<script lang="ts">
  import { goto } from '$app/navigation';
  import SearchInput from '$lib/components/SearchInput.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import EmptyState from '$lib/components/EmptyState.svelte';
  import { formatCurrency } from '$lib/utils/format';
  
  let { data } = $props();
  
  let searchQuery = $state(data.query);
  
  function handleSearch(query: string) {
    if (query && query.length >= 2) {
      goto(`/buscar?q=${encodeURIComponent(query)}`);
    } else if (!query) {
      goto('/buscar');
    }
  }
</script>

<svelte:head>
  <title>Buscar Donante - Patronato de Monterrey</title>
</svelte:head>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <!-- Header -->
  <div class="text-center mb-12">
    <h1 class="page-title mb-4">Buscar Donante</h1>
    <p class="text-slate-600 max-w-xl mx-auto">
      Busca por nombre de persona o empresa para ver el historial de donaciones y el total acumulado.
    </p>
  </div>
  
  <!-- Search -->
  <div class="max-w-xl mx-auto mb-12">
    <SearchInput 
      bind:value={searchQuery}
      placeholder="Nombre de persona o empresa..."
      onSearch={handleSearch}
    />
    <p class="text-xs text-slate-400 mt-2 text-center">
      Ingresa al menos 2 caracteres para buscar
    </p>
  </div>
  
  <!-- Results -->
  {#if data.searched}
    {#if data.donantes.length === 0}
      <EmptyState 
        title="Sin resultados" 
        description="No se encontraron donantes con ese nombre. Intenta con otro término."
        icon="🔍"
      />
    {:else}
      <div class="space-y-4">
        <p class="text-sm text-slate-500">
          {data.donantes.length} resultado{data.donantes.length !== 1 ? 's' : ''} para "<strong>{data.query}</strong>"
        </p>
        
        {#each data.donantes as donante, i}
          <a 
            href="/donante/{donante.id}"
            class="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-lg hover:border-primary-200 transition-all group animate-slide-up"
            style="animation-delay: {i * 0.05}s"
          >
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-2xl font-display font-bold text-primary-600 group-hover:scale-110 transition-transform">
                {(donante.nombreNegocio || donante.nombre).charAt(0).toUpperCase()}
              </div>
              
              <div>
                <h3 class="font-display font-semibold text-lg text-slate-900 group-hover:text-primary-600 transition-colors">
                  {donante.nombreNegocio || donante.nombre}
                </h3>
                {#if donante.nombreNegocio}
                  <p class="text-sm text-slate-500">{donante.nombre}</p>
                {/if}
                <div class="flex items-center gap-2 mt-1">
                  <Badge variant={donante.tipo === 'EMPRESA' ? 'info' : 'default'}>
                    {donante.tipo === 'EMPRESA' ? 'Empresa' : 'Persona'}
                  </Badge>
                  <span class="text-xs text-slate-400">
                    {donante.cantidadDonaciones} aporte{donante.cantidadDonaciones !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="text-right">
              <p class="text-sm text-slate-500">Total donado</p>
              <p class="text-2xl font-display font-bold text-primary-600">
                {formatCurrency(donante.totalDonado)}
              </p>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  {:else}
    <!-- Initial state with suggestions -->
    <div class="text-center py-12">
      <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg class="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 class="font-display font-semibold text-lg text-slate-700 mb-2">
        Ingresa un término de búsqueda
      </h3>
      <p class="text-slate-500 max-w-md mx-auto">
        Puedes buscar por nombre de persona, nombre de empresa o negocio para ver su historial completo de donaciones.
      </p>
    </div>
  {/if}
</div>
