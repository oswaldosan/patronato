<script lang="ts">
  import { onMount } from 'svelte';
  import StatCard from '$lib/components/StatCard.svelte';
  import ProgressBar from '$lib/components/ProgressBar.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import { formatCurrency, metodoPagoLabels, calculatePercentage } from '$lib/utils/format';
  
  let { data } = $props();
  
  let pieChartCanvas: HTMLCanvasElement;
  let barChartCanvas: HTMLCanvasElement;
  let lineChartCanvas: HTMLCanvasElement;
  let metodoChartCanvas: HTMLCanvasElement;
  
  onMount(async () => {
    const Chart = (await import('chart.js/auto')).default;
    
    // Pie Chart - Por Rubro
    if (pieChartCanvas && data.rubroStats.length > 0) {
      new Chart(pieChartCanvas, {
        type: 'doughnut',
        data: {
          labels: data.rubroStats.map(r => r.nombre),
          datasets: [{
            data: data.rubroStats.map(r => r.total),
            backgroundColor: data.rubroStats.map(r => r.color),
            borderWidth: 0,
            spacing: 2,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'right' },
          },
        },
      });
    }
    
    // Bar Chart - Top Donantes
    if (barChartCanvas && data.topDonantes.length > 0) {
      new Chart(barChartCanvas, {
        type: 'bar',
        data: {
          labels: data.topDonantes.map(d => d.nombreNegocio || d.nombre),
          datasets: [{
            label: 'Total donado',
            data: data.topDonantes.map(d => d.total),
            backgroundColor: '#22c55e',
            borderRadius: 8,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y',
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false } },
            y: { grid: { display: false } },
          },
        },
      });
    }
    
    // Line Chart - Ingresos vs Egresos por Mes
    if (lineChartCanvas) {
      const meses = [...new Set([
        ...data.ingresosPorMes.map(m => m.mes),
        ...data.egresosPorMes.map(m => m.mes)
      ])].sort();
      
      const ingresosData = meses.map(mes => {
        const found = data.ingresosPorMes.find(m => m.mes === mes);
        return found?.total || 0;
      });
      
      const egresosData = meses.map(mes => {
        const found = data.egresosPorMes.find(m => m.mes === mes);
        return found?.total || 0;
      });
      
      const labels = meses.map(m => {
        const [year, month] = m.split('-');
        return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('es', { month: 'short', year: '2-digit' });
      });
      
      new Chart(lineChartCanvas, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Ingresos',
              data: ingresosData,
              borderColor: '#22c55e',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              fill: true,
              tension: 0.4,
            },
            {
              label: 'Egresos',
              data: egresosData,
              borderColor: '#ef4444',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'top' },
          },
          scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true },
          },
        },
      });
    }
    
    // Método de Pago Chart
    if (metodoChartCanvas && data.metodoStats.length > 0) {
      const colors = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];
      
      new Chart(metodoChartCanvas, {
        type: 'polarArea',
        data: {
          labels: data.metodoStats.map(m => metodoPagoLabels[m.metodo] || m.metodo),
          datasets: [{
            data: data.metodoStats.map(m => m.total),
            backgroundColor: colors.slice(0, data.metodoStats.length),
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'right' },
          },
        },
      });
    }
  });
</script>

<svelte:head>
  <title>Estadísticas - Patronato de Monterrey</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <!-- Header -->
  <div class="mb-8">
    <h1 class="page-title mb-2">Estadísticas</h1>
    <p class="text-slate-600">Análisis detallado de la recaudación y gastos del proyecto.</p>
  </div>
  
  <!-- Progress -->
  <div class="card p-6 mb-8">
    <h2 class="font-display font-semibold text-lg text-slate-800 mb-4">Progreso hacia la meta</h2>
    <ProgressBar 
      current={data.totales.ingresos} 
      goal={data.totales.metaProyecto}
      showLabels={true}
    />
    <div class="mt-4 flex flex-wrap gap-4 text-sm">
      <div>
        <span class="text-slate-500">Porcentaje:</span>
        <span class="font-bold text-primary-600 ml-1">
          {calculatePercentage(data.totales.ingresos, data.totales.metaProyecto)}%
        </span>
      </div>
      <div>
        <span class="text-slate-500">Faltante:</span>
        <span class="font-bold text-slate-700 ml-1">
          {formatCurrency(Math.max(0, data.totales.metaProyecto - data.totales.ingresos))}
        </span>
      </div>
    </div>
  </div>
  
  <!-- Stats Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
    <StatCard 
      title="Total Ingresos" 
      value={data.totales.ingresos} 
      icon="💰" 
      isCurrency={true}
      color="green"
    />
    <StatCard 
      title="Total Egresos" 
      value={data.totales.egresos} 
      icon="📤" 
      isCurrency={true}
      color="red"
    />
    <StatCard 
      title="Balance" 
      value={data.totales.balance} 
      icon="📊" 
      isCurrency={true}
      color="blue"
    />
    <StatCard 
      title="Donantes" 
      value={data.totales.donantes} 
      icon="👥" 
      color="purple"
    />
    <StatCard 
      title="Donaciones" 
      value={data.totales.donaciones} 
      icon="🎁" 
      color="yellow"
    />
    <StatCard 
      title="Promedio/Aporte" 
      value={data.totales.promedioAporte} 
      icon="📈" 
      isCurrency={true}
      color="green"
    />
  </div>
  
  <!-- Charts Row 1 -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
    <!-- Por Rubro -->
    <div class="card p-6">
      <h2 class="font-display font-semibold text-lg text-slate-800 mb-4">
        Ingresos por Rubro
      </h2>
      <div class="h-80">
        <canvas bind:this={pieChartCanvas}></canvas>
      </div>
    </div>
    
    <!-- Por Método -->
    <div class="card p-6">
      <h2 class="font-display font-semibold text-lg text-slate-800 mb-4">
        Por Método de Pago
      </h2>
      <div class="h-80">
        <canvas bind:this={metodoChartCanvas}></canvas>
      </div>
    </div>
  </div>
  
  <!-- Tendencia -->
  <div class="card p-6 mb-8">
    <h2 class="font-display font-semibold text-lg text-slate-800 mb-4">
      Tendencia Ingresos vs Egresos (12 meses)
    </h2>
    <div class="h-80">
      <canvas bind:this={lineChartCanvas}></canvas>
    </div>
  </div>
  
  <!-- Stats Details -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
    <!-- Desglose por Rubro -->
    <div class="card p-6">
      <h2 class="font-display font-semibold text-lg text-slate-800 mb-4">
        Desglose por Rubro
      </h2>
      <div class="space-y-3">
        {#each data.rubroStats.filter(r => r.total > 0) as rubro}
          <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div class="flex items-center gap-3">
              <div 
                class="w-4 h-4 rounded-full" 
                style="background-color: {rubro.color}"
              ></div>
              <div>
                <p class="font-medium text-slate-900">{rubro.nombre}</p>
                <p class="text-xs text-slate-500">{rubro.cantidad} donaciones</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-bold text-slate-900">{formatCurrency(rubro.total)}</p>
              <p class="text-xs text-slate-500">
                {calculatePercentage(rubro.total, data.totales.ingresos)}%
              </p>
            </div>
          </div>
        {/each}
      </div>
    </div>
    
    <!-- Por Tipo de Donante -->
    <div class="card p-6">
      <h2 class="font-display font-semibold text-lg text-slate-800 mb-4">
        Por Tipo de Donante
      </h2>
      <div class="space-y-4">
        {#if data.porTipoDonante.PERSONA}
          <div class="p-4 bg-slate-50 rounded-xl">
            <div class="flex items-center justify-between mb-2">
              <span class="font-medium text-slate-900">Personas</span>
              <span class="font-bold text-primary-600">{formatCurrency(data.porTipoDonante.PERSONA.total)}</span>
            </div>
            <div class="flex items-center justify-between text-sm text-slate-500">
              <span>{data.porTipoDonante.PERSONA.cantidad} donaciones</span>
              <span>{calculatePercentage(data.porTipoDonante.PERSONA.total, data.totales.ingresos)}%</span>
            </div>
          </div>
        {/if}
        
        {#if data.porTipoDonante.EMPRESA}
          <div class="p-4 bg-slate-50 rounded-xl">
            <div class="flex items-center justify-between mb-2">
              <span class="font-medium text-slate-900">Empresas</span>
              <span class="font-bold text-blue-600">{formatCurrency(data.porTipoDonante.EMPRESA.total)}</span>
            </div>
            <div class="flex items-center justify-between text-sm text-slate-500">
              <span>{data.porTipoDonante.EMPRESA.cantidad} donaciones</span>
              <span>{calculatePercentage(data.porTipoDonante.EMPRESA.total, data.totales.ingresos)}%</span>
            </div>
          </div>
        {/if}
      </div>
      
      <!-- Métodos de Pago -->
      <h3 class="font-display font-semibold text-slate-800 mt-6 mb-4">Por Método de Pago</h3>
      <div class="space-y-2">
        {#each data.metodoStats as met}
          <div class="flex items-center justify-between p-2 text-sm">
            <span class="text-slate-600">{metodoPagoLabels[met.metodo] || met.metodo}</span>
            <div class="text-right">
              <span class="font-medium text-slate-900">{formatCurrency(met.total)}</span>
              <span class="text-slate-400 ml-2">({met.cantidad})</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Top Donantes -->
  <div class="card p-6">
    <h2 class="font-display font-semibold text-lg text-slate-800 mb-4">
      🏆 Top 10 Donantes
    </h2>
    <div class="h-96">
      <canvas bind:this={barChartCanvas}></canvas>
    </div>
    
    <div class="mt-6 overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th class="w-12">#</th>
            <th>Donante</th>
            <th class="text-center">Tipo</th>
            <th class="text-center">Donaciones</th>
            <th class="text-right">Total</th>
            <th class="text-right">%</th>
          </tr>
        </thead>
        <tbody>
          {#each data.topDonantes as donante, index}
            <tr>
              <td>
                <span class="w-8 h-8 rounded-full {index < 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-600'} flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
              </td>
              <td>
                <a href="/donante/{donante.id}" class="font-medium text-slate-900 hover:text-primary-600 transition-colors">
                  {donante.nombreNegocio || donante.nombre}
                </a>
                {#if donante.nombreNegocio}
                  <span class="block text-xs text-slate-500">{donante.nombre}</span>
                {/if}
              </td>
              <td class="text-center">
                <Badge variant={donante.tipo === 'EMPRESA' ? 'info' : 'default'}>
                  {donante.tipo === 'EMPRESA' ? 'Empresa' : 'Persona'}
                </Badge>
              </td>
              <td class="text-center">{donante.donaciones}</td>
              <td class="text-right font-bold text-primary-600">
                {formatCurrency(donante.total)}
              </td>
              <td class="text-right text-slate-500">
                {calculatePercentage(donante.total, data.totales.ingresos)}%
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
