<script lang="ts">
  import StatCard from '$lib/components/StatCard.svelte';
  import Badge from '$lib/components/Badge.svelte';
  import { formatCurrency, formatDateShort, formatDateTime, estadoAporteLabels, estadoEgresoLabels } from '$lib/utils/format';

  let { data } = $props();

  const estadoVariant = (estado: string) => {
    switch (estado) {
      case 'VERIFICADO': return 'success';
      case 'PENDIENTE': return 'warning';
      case 'ANULADO': return 'danger';
      default: return 'default';
    }
  };
</script>

<svelte:head>
  <title>Dashboard – Patronato Monterrey Admin</title>
</svelte:head>

<div class="space-y-8">
  <!-- Header -->
  <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
    <div>
      <h1 class="page-title">Dashboard</h1>
      <p class="text-slate-600 mt-1">Resumen operativo y financiero del Patronato de Monterrey.</p>
    </div>
    <div class="flex flex-wrap gap-3">
      <a href="/admin/reportes" class="btn btn-secondary">Ver reportes</a>
      <a href="/admin/auditoria" class="btn btn-secondary">Auditoría</a>
    </div>
  </div>

  <!-- Estado de verificación -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <div class="card p-5 border border-yellow-200 bg-yellow-50/60">
      <p class="text-sm font-medium text-yellow-800">Pendientes de verificación</p>
      <div class="mt-3 space-y-2">
        <p class="text-2xl font-bold text-yellow-900">{data.stats.aportesPendientes + data.stats.egresosPendientes}</p>
        <p class="text-xs text-yellow-700">{data.stats.aportesPendientes} donaciones · {data.stats.egresosPendientes} gastos</p>
      </div>
      <div class="mt-4 flex gap-2">
        <a href="/admin/aportes?estado=PENDIENTE" class="btn btn-sm bg-yellow-600 text-white hover:bg-yellow-700">Donaciones</a>
        <a href="/admin/egresos?estado=PENDIENTE" class="btn btn-sm bg-yellow-600 text-white hover:bg-yellow-700">Gastos</a>
      </div>
    </div>
    <div class="card p-5 bg-gradient-to-br from-primary-50 via-white to-slate-50 border border-primary-100">
      <p class="text-sm font-medium text-slate-600">Balance disponible</p>
      <p class="text-3xl font-bold text-primary-700 mt-2">{formatCurrency(data.stats.balance)}</p>
      <div class="mt-3 text-xs text-slate-500">
        <p>Ingresos: {formatCurrency(data.stats.totalIngresos)}</p>
        <p>Egresos: {formatCurrency(data.stats.totalEgresos)}</p>
      </div>
    </div>
    <div class="card p-5">
      <p class="text-sm font-medium text-slate-600">Actividad total</p>
      <p class="text-3xl font-bold text-slate-900 mt-2">{data.stats.totalAportes}</p>
      <p class="text-xs text-slate-500 mt-2">Donaciones verificadas en el sistema.</p>
    </div>
  </div>

  <!-- Indicadores clave -->
  <div>
    <h2 class="text-lg font-display font-semibold text-slate-800 mb-4">Indicadores clave</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
      <StatCard title="Ingresos" value={data.stats.totalIngresos} icon="💰" isCurrency={true} color="blue" />
      <StatCard title="Egresos" value={data.stats.totalEgresos} icon="📤" isCurrency={true} color="red" />
      <StatCard title="Balance" value={data.stats.balance} icon="📊" isCurrency={true} color="green" />
      <StatCard title="Donantes" value={data.stats.totalDonantes} icon="👥" color="purple" />
      <StatCard title="Donaciones pendientes" value={data.stats.aportesPendientes} icon="⏳" color="yellow" />
      <StatCard title="Gastos pendientes" value={data.stats.egresosPendientes} icon="🧾" color="yellow" />
    </div>
  </div>

  <!-- Quick Actions -->
  <div>
    <h2 class="text-lg font-display font-semibold text-slate-800 mb-4">Acciones rápidas</h2>
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
      <a href="/admin/aportes/nuevo" class="card p-4 flex items-center gap-3 hover:border-primary-300 transition-colors group">
        <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">➕</div>
        <div>
          <p class="font-medium text-slate-900">Nueva Donación</p>
          <p class="text-xs text-slate-500">Registrar ingreso</p>
        </div>
      </a>

      <a href="/admin/egresos/nuevo" class="card p-4 flex items-center gap-3 hover:border-red-300 transition-colors group">
        <div class="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📝</div>
        <div>
          <p class="font-medium text-slate-900">Nuevo Gasto</p>
          <p class="text-xs text-slate-500">Registrar egreso</p>
        </div>
      </a>

      <a href="/admin/donantes/nuevo" class="card p-4 flex items-center gap-3 hover:border-purple-300 transition-colors group">
        <div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">👤</div>
        <div>
          <p class="font-medium text-slate-900">Nuevo Donante</p>
          <p class="text-xs text-slate-500">Agregar persona/empresa</p>
        </div>
      </a>

      <a href="/admin/rubros" class="card p-4 flex items-center gap-3 hover:border-blue-300 transition-colors group">
        <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📁</div>
        <div>
          <p class="font-medium text-slate-900">Categorías</p>
          <p class="text-xs text-slate-500">Gestionar rubros</p>
        </div>
      </a>

      <a href="/admin/reportes" class="card p-4 flex items-center gap-3 hover:border-slate-300 transition-colors group">
        <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📑</div>
        <div>
          <p class="font-medium text-slate-900">Reportes</p>
          <p class="text-xs text-slate-500">Resumen y análisis</p>
        </div>
      </a>
    </div>
  </div>

  <!-- Recent Tables -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Últimas Donaciones -->
    <div class="card overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <h2 class="font-display font-semibold text-slate-800">Últimas Donaciones</h2>
        <a href="/admin/aportes" class="text-sm text-primary-700 hover:underline">Ver todas →</a>
      </div>

      {#if data.ultimosAportes.length === 0}
        <div class="p-8 text-center text-slate-500">No hay donaciones registradas</div>
      {:else}
        <div class="divide-y divide-slate-100">
          {#each data.ultimosAportes as aporte}
            <a href="/admin/aportes/{aporte.id}" class="block p-4 hover:bg-slate-50 transition-colors">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-slate-900">{aporte.donante}</p>
                  <p class="text-xs text-slate-500">{aporte.rubro} · {formatDateShort(aporte.fecha)}</p>
                </div>
                <div class="text-right">
                  <p class="font-bold text-primary-700">{formatCurrency(aporte.monto)}</p>
                  <Badge variant={estadoVariant(aporte.estado)}>{estadoAporteLabels[aporte.estado]}</Badge>
                </div>
              </div>
            </a>
          {/each}
        </div>
      {/if}
    </div>

    <!-- Últimos Gastos -->
    <div class="card overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <h2 class="font-display font-semibold text-slate-800">Últimos Gastos</h2>
        <a href="/admin/egresos" class="text-sm text-primary-700 hover:underline">Ver todos →</a>
      </div>

      {#if data.ultimosEgresos.length === 0}
        <div class="p-8 text-center text-slate-500">No hay gastos registrados</div>
      {:else}
        <div class="divide-y divide-slate-100">
          {#each data.ultimosEgresos as egreso}
            <a href="/admin/egresos/{egreso.id}" class="block p-4 hover:bg-slate-50 transition-colors">
              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium text-slate-900">{egreso.concepto}</p>
                  <p class="text-xs text-slate-500">
                    {formatDateShort(egreso.fecha)}
                    {#if egreso.rubro}{' · '}{egreso.rubro}{/if}
                    {#if egreso.proveedor}{' · '}{egreso.proveedor}{/if}
                  </p>
                </div>
                <div class="text-right">
                  <p class="font-bold text-red-600">{formatCurrency(egreso.monto)}</p>
                  <Badge variant={estadoVariant(egreso.estado)}>{estadoEgresoLabels[egreso.estado]}</Badge>
                </div>
              </div>
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </div>

  <!-- Audit Log -->
  <div class="card overflow-hidden">
    <div class="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
      <h2 class="font-display font-semibold text-slate-800">Actividad Reciente</h2>
      <a href="/admin/auditoria" class="text-sm text-primary-700 hover:underline">Ver todo →</a>
    </div>

    {#if data.ultimosLogs.length === 0}
      <div class="p-8 text-center text-slate-500">No hay actividad registrada</div>
    {:else}
      <div class="divide-y divide-slate-100">
        {#each data.ultimosLogs as log}
          <div class="px-6 py-3 flex items-center gap-4">
            <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
              {#if log.action === 'CREATE'}
                <span class="text-green-600 font-bold">+</span>
              {:else if log.action === 'UPDATE'}
                <span class="text-blue-600 font-bold">✎</span>
              {:else}
                <span class="text-red-600 font-bold">×</span>
              {/if}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-slate-900">
                <span class="font-medium">{log.user}</span>
                {log.action === 'CREATE' ? ' creó ' : log.action === 'UPDATE' ? ' actualizó ' : ' eliminó '}
                <span class="text-slate-600">{log.entity}</span>
              </p>
              <p class="text-xs text-slate-500">{formatDateTime(log.createdAt)}</p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>
