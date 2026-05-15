<script lang="ts">
  import Badge from '$lib/components/Badge.svelte';
  import { formatCurrency, calculatePercentage } from '$lib/utils/format';

  let { data } = $props();

  let query = $state('');
  let tipoFiltro = $state<'TODOS' | 'PERSONA' | 'EMPRESA'>('TODOS');

  const aportantesFiltrados = $derived(
    data.aportantes.filter((a) => {
      if (tipoFiltro !== 'TODOS' && a.tipo !== tipoFiltro) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        a.nombre.toLowerCase().includes(q) ||
        (a.nombreNegocio || '').toLowerCase().includes(q)
      );
    })
  );

  const totalFiltrado = $derived(
    aportantesFiltrados.reduce((s, a) => s + a.total, 0)
  );
</script>

<svelte:head>
  <title>Aportantes - Patronato de Monterrey</title>
</svelte:head>

<div class="max-w-6xl mx-auto px-4 py-8 space-y-6">
  <header class="space-y-2">
    <h1 class="font-display font-bold text-3xl text-slate-900">Aportantes</h1>
    <p class="text-slate-600">
      Listado completo ordenado por monto aportado. {data.aportantes.length} aportantes,
      total {formatCurrency(data.totalIngresos)}.
    </p>
  </header>

  <div class="card p-4 flex flex-col sm:flex-row gap-3 sm:items-center">
    <input
      type="search"
      bind:value={query}
      placeholder="Buscar por nombre o negocio..."
      class="input flex-1"
    />
    <div class="flex gap-2">
      {#each ['TODOS', 'PERSONA', 'EMPRESA'] as t}
        <button
          type="button"
          onclick={() => (tipoFiltro = t as typeof tipoFiltro)}
          class="px-3 py-2 rounded-lg text-sm font-medium transition-colors {tipoFiltro === t
            ? 'bg-primary-600 text-white'
            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}"
        >
          {t === 'TODOS' ? 'Todos' : t === 'PERSONA' ? 'Personas' : 'Empresas'}
        </button>
      {/each}
    </div>
  </div>

  <div class="card overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th class="w-16">#</th>
          <th>Aportante</th>
          <th class="text-center">Tipo</th>
          <th class="text-center">Aportes</th>
          <th class="text-right">Total</th>
          <th class="text-right">% del total</th>
        </tr>
      </thead>
      <tbody>
        {#each aportantesFiltrados as a, index}
          <tr>
            <td>
              <span
                class="w-8 h-8 rounded-full {index < 3 && !query && tipoFiltro === 'TODOS'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-slate-100 text-slate-600'} flex items-center justify-center text-sm font-bold"
              >
                {index + 1}
              </span>
            </td>
            <td>
              <a
                href="/donante/{a.id}"
                class="font-medium text-slate-900 hover:text-primary-600 transition-colors"
              >
                {a.nombreNegocio || a.nombre}
              </a>
              {#if a.nombreNegocio}
                <span class="block text-xs text-slate-500">{a.nombre}</span>
              {/if}
            </td>
            <td class="text-center">
              <Badge variant={a.tipo === 'EMPRESA' ? 'info' : 'default'}>
                {a.tipo === 'EMPRESA' ? 'Empresa' : 'Persona'}
              </Badge>
            </td>
            <td class="text-center">{a.aportes}</td>
            <td class="text-right font-bold text-primary-600">
              {formatCurrency(a.total)}
            </td>
            <td class="text-right text-slate-500">
              {calculatePercentage(a.total, data.totalIngresos)}%
            </td>
          </tr>
        {:else}
          <tr>
            <td colspan="6" class="text-center text-slate-500 py-8">
              No se encontraron aportantes con esos criterios.
            </td>
          </tr>
        {/each}
      </tbody>
      {#if aportantesFiltrados.length > 0}
        <tfoot>
          <tr class="border-t-2 border-slate-200 font-semibold">
            <td colspan="4" class="text-right text-slate-700">
              {aportantesFiltrados.length} aportante{aportantesFiltrados.length === 1 ? '' : 's'}
            </td>
            <td class="text-right text-primary-700">{formatCurrency(totalFiltrado)}</td>
            <td class="text-right text-slate-500">
              {calculatePercentage(totalFiltrado, data.totalIngresos)}%
            </td>
          </tr>
        </tfoot>
      {/if}
    </table>
  </div>
</div>
