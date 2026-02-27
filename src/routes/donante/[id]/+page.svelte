<script lang="ts">
  import { onMount } from 'svelte';
  import Badge from '$lib/components/Badge.svelte';
  import { formatCurrency, formatDate, metodoPagoLabels } from '$lib/utils/format';
  
  let { data } = $props();
  
  let chartCanvas: HTMLCanvasElement;
  
  onMount(async () => {
    if (data.porRubro.length > 0 && chartCanvas) {
      const Chart = (await import('chart.js/auto')).default;
      
      new Chart(chartCanvas, {
        type: 'doughnut',
        data: {
          labels: data.porRubro.map(r => r.nombre),
          datasets: [{
            data: data.porRubro.map(r => r.total),
            backgroundColor: data.porRubro.map(r => r.color),
            borderWidth: 0,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
            },
          },
        },
      });
    }
  });
</script>

<svelte:head>
  <title>{data.donante.nombreNegocio || data.donante.nombre} - Patronato de Monterrey</title>
</svelte:head>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <!-- Back button -->
  <a href="/buscar" class="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primary-600 mb-8 transition-colors">
    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
    </svg>
    Volver a búsqueda
  </a>
  
  <!-- Profile Header -->
  <div class="card p-8 mb-8">
    <div class="flex flex-col md:flex-row md:items-center gap-6">
      <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-4xl font-display font-bold text-white shadow-lg shadow-primary-500/30">
        {(data.donante.nombreNegocio || data.donante.nombre).charAt(0).toUpperCase()}
      </div>
      
      <div class="flex-1">
        <h1 class="text-3xl font-display font-bold text-slate-900">
          {data.donante.nombreNegocio || data.donante.nombre}
        </h1>
        {#if data.donante.nombreNegocio}
          <p class="text-slate-600 mt-1">{data.donante.nombre}</p>
        {/if}
        <div class="flex items-center gap-3 mt-3">
          <Badge variant={data.donante.tipo === 'EMPRESA' ? 'info' : 'default'}>
            {data.donante.tipo === 'EMPRESA' ? 'Empresa' : 'Persona'}
          </Badge>
          <span class="text-sm text-slate-500">
            {data.donaciones.length} aporte{data.donaciones.length !== 1 ? 's' : ''} verificado{data.donaciones.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
      
      <div class="text-center md:text-right">
        <p class="text-sm text-slate-500">Total contribuido</p>
        <p class="text-4xl font-display font-bold text-gradient bg-gradient-to-r from-primary-600 to-accent-500">
          {formatCurrency(data.totalDonado)}
        </p>
      </div>
    </div>
  </div>
  
  <!-- Stats Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
    <!-- Por Rubro -->
    {#if data.porRubro.length > 0}
      <div class="card p-6">
        <h2 class="font-display font-semibold text-lg text-slate-800 mb-4">
          Distribución por Rubro
        </h2>
        <div class="h-64">
          <canvas bind:this={chartCanvas}></canvas>
        </div>
      </div>
    {/if}
    
    <!-- Resumen por Rubro -->
    <div class="card p-6">
      <h2 class="font-display font-semibold text-lg text-slate-800 mb-4">
        Desglose
      </h2>
      <div class="space-y-3">
        {#each data.porRubro as rubro}
          <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div class="flex items-center gap-3">
              <div 
                class="w-4 h-4 rounded-full" 
                style="background-color: {rubro.color}"
              ></div>
              <div>
                <p class="font-medium text-slate-900">{rubro.nombre}</p>
                <p class="text-xs text-slate-500">{rubro.cantidad} aporte{rubro.cantidad !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <p class="font-bold text-slate-900">{formatCurrency(rubro.total)}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Historial de Donaciones -->
  <div class="card overflow-hidden">
    <div class="px-6 py-4 border-b border-slate-200">
      <h2 class="font-display font-semibold text-lg text-slate-800">
        Historial de Donaciones
      </h2>
    </div>
    
    {#if data.donaciones.length === 0}
      <div class="p-12 text-center">
        <p class="text-slate-500">No hay donaciones verificados para mostrar.</p>
      </div>
    {:else}
      <div class="divide-y divide-slate-100">
        {#each data.donaciones as aporte, i}
          <div class="p-5 hover:bg-slate-50 transition-colors animate-slide-up" style="animation-delay: {i * 0.05}s">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <p class="font-medium text-slate-900">{formatDate(aporte.fecha)}</p>
                  <Badge variant="success">{aporte.rubro}</Badge>
                </div>
                <p class="text-sm text-slate-500 mt-1">
                  {metodoPagoLabels[aporte.metodo] || aporte.metodo}
                  {#if aporte.comentario}
                    <span class="mx-2">•</span>
                    {aporte.comentario}
                  {/if}
                </p>
              </div>
              <p class="text-xl font-bold text-primary-600">
                {formatCurrency(aporte.monto)}
              </p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
  
  <!-- Certificado / Agradecimiento -->
  <div class="mt-8 p-6 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl border border-primary-100 text-center">
    <div class="text-4xl mb-4">🏅</div>
    <h3 class="font-display font-bold text-xl text-slate-900 mb-2">
      ¡Gracias por tu apoyo!
    </h3>
    <p class="text-slate-600 max-w-md mx-auto">
      Tu contribución de <strong>{formatCurrency(data.totalDonado)}</strong> está ayudando a mejorar nuestra comunidad. 
      Cada aporte cuenta para alcanzar nuestra meta.
    </p>
  </div>
</div>
