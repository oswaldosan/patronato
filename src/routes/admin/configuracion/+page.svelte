<script lang="ts">
  import { enhance } from '$app/forms';
  import { formatCurrency } from '$lib/utils/format';
  
  let { data, form } = $props();
  
  let metaProyecto = $state(data.config.metaProyecto.toString());
  let nombreProyecto = $state(data.config.nombreProyecto);
  let loadingMeta = $state(false);
  let loadingNombre = $state(false);
</script>

<svelte:head>
  <title>Configuracion - Admin</title>
</svelte:head>

<div class="max-w-3xl mx-auto">
  <!-- Header -->
  <div class="mb-8">
    <h1 class="page-title">Configuracion del Sistema</h1>
    <p class="text-slate-600 mt-1">Administra los parametros generales del proyecto.</p>
  </div>
  
  <!-- Success/Error Messages -->
  {#if form?.success}
    <div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
      {form.message || 'Configuracion actualizada correctamente'}
    </div>
  {/if}
  
  {#if form?.error}
    <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
      {form.error}
    </div>
  {/if}
  
  <div class="space-y-6">
    <!-- Meta del Proyecto -->
    <div class="card p-6">
      <div class="flex items-start gap-4 mb-6">
        <div class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center text-2xl">
          🎯
        </div>
        <div>
          <h2 class="font-display font-semibold text-lg text-slate-800">Meta del Proyecto</h2>
          <p class="text-sm text-slate-500">
            El monto total que se espera recaudar. Se muestra en el portal publico como referencia de progreso.
          </p>
        </div>
      </div>
      
      <form
        method="POST"
        action="?/updateMeta"
        use:enhance={() => {
          loadingMeta = true;
          return async ({ update }) => {
            loadingMeta = false;
            await update();
          };
        }}
      >
        <div class="flex items-end gap-4">
          <div class="flex-1">
            <label for="metaProyecto" class="label">Monto de la meta (L.)</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">L.</span>
              <input
                type="number"
                id="metaProyecto"
                name="metaProyecto"
                bind:value={metaProyecto}
                step="any"
                min="1"
                max="999999999"
                class="input pl-10"
                required
              />
            </div>
          </div>
          <button type="submit" class="btn btn-primary" disabled={loadingMeta}>
            {loadingMeta ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
        
        <p class="text-xs text-slate-500 mt-3">
          Meta actual: <span class="font-medium text-primary-600">{formatCurrency(data.config.metaProyecto)}</span>
        </p>
      </form>
    </div>
    
    <!-- Nombre del Proyecto -->
    <div class="card p-6">
      <div class="flex items-start gap-4 mb-6">
        <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
          📝
        </div>
        <div>
          <h2 class="font-display font-semibold text-lg text-slate-800">Nombre del Proyecto</h2>
          <p class="text-sm text-slate-500">
            El nombre que se muestra en el encabezado del portal publico.
          </p>
        </div>
      </div>
      
      <form
        method="POST"
        action="?/updateNombre"
        use:enhance={() => {
          loadingNombre = true;
          return async ({ update }) => {
            loadingNombre = false;
            await update();
          };
        }}
      >
        <div class="flex items-end gap-4">
          <div class="flex-1">
            <label for="nombreProyecto" class="label">Nombre del proyecto</label>
            <input
              type="text"
              id="nombreProyecto"
              name="nombreProyecto"
              bind:value={nombreProyecto}
              maxlength="100"
              class="input"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary" disabled={loadingNombre}>
            {loadingNombre ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
    
    <!-- Info Card -->
    <div class="card p-6 bg-slate-50 border-slate-200">
      <div class="flex items-start gap-3">
        <span class="text-xl">💡</span>
        <div class="text-sm text-slate-600">
          <p class="font-medium text-slate-700 mb-1">Nota sobre los cambios</p>
          <p>
            Los cambios realizados aqui se reflejan inmediatamente en el portal publico. 
            Todos los cambios quedan registrados en el log de auditoria.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
