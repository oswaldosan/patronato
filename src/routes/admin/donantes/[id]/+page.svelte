<script lang="ts">
  import { enhance } from '$app/forms';
  import Badge from '$lib/components/Badge.svelte';
  import { formatCurrency, formatDateShort, estadoAporteLabels, metodoPagoLabels } from '$lib/utils/format';
  
  let { data, form } = $props();
  
  let loading = $state(false);
  let tipo = $state(data.donante.tipo);
  let showDeleteConfirm = $state(false);
  
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
  <title>Editar {data.donante.nombreNegocio || data.donante.nombre} - Admin</title>
</svelte:head>

<div class="max-w-4xl mx-auto">
  <!-- Header -->
  <div class="mb-8">
    <a href="/admin/donantes" class="text-sm text-slate-600 hover:text-primary-600 mb-2 inline-block">
      ← Volver a donantes
    </a>
    <div class="flex items-center justify-between">
      <h1 class="page-title">Editar Donante</h1>
      <button 
        onclick={() => showDeleteConfirm = true}
        class="btn btn-danger btn-sm"
      >
        Eliminar
      </button>
    </div>
  </div>
  
  {#if form?.error}
    <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
      {form.error}
    </div>
  {/if}
  
  {#if form?.success}
    <div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
      Donante actualizado correctamente
    </div>
  {/if}
  
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Form -->
    <div class="lg:col-span-2">
      <form 
        method="POST"
        action="?/update"
        use:enhance={() => {
          loading = true;
          return async ({ update }) => {
            loading = false;
            await update();
          };
        }}
        class="card p-6 space-y-6"
      >
        <!-- Tipo -->
        <div>
          <label class="label">Tipo de donante</label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="tipo" 
                value="PERSONA" 
                bind:group={tipo}
                class="w-4 h-4 text-primary-600"
              />
              <span>Persona</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="tipo" 
                value="EMPRESA" 
                bind:group={tipo}
                class="w-4 h-4 text-primary-600"
              />
              <span>Empresa</span>
            </label>
          </div>
        </div>
        
        <!-- Nombre -->
        <div>
          <label for="nombre" class="label">
            {tipo === 'EMPRESA' ? 'Nombre del representante' : 'Nombre completo'} *
          </label>
          <input 
            type="text" 
            id="nombre" 
            name="nombre"
            value={data.donante.nombre}
            class="input"
            required
          />
        </div>

        <!-- Identificación -->
        <div>
          <label for="identificacion" class="label">Identidad / RTN *</label>
          <input
            type="text"
            id="identificacion"
            name="identificacion"
            value={data.donante.identificacion}
            class="input"
            required
          />
          <p class="text-xs text-slate-500 mt-1">Debe coincidir con el documento oficial.</p>
        </div>
        
        <!-- Nombre Negocio -->
        {#if tipo === 'EMPRESA'}
          <div>
            <label for="nombreNegocio" class="label">Nombre del negocio/empresa</label>
            <input 
              type="text" 
              id="nombreNegocio" 
              name="nombreNegocio"
              value={data.donante.nombreNegocio ?? ''}
              class="input"
            />
          </div>
        {/if}
        
        <!-- Contacto -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="telefono" class="label">Teléfono</label>
            <input 
              type="tel" 
              id="telefono" 
              name="telefono"
              value={data.donante.telefono ?? ''}
              class="input"
            />
          </div>
          <div>
            <label for="email" class="label">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={data.donante.email ?? ''}
              class="input"
            />
          </div>
        </div>
        
        <!-- Dirección -->
        <div>
          <label for="direccion" class="label">Dirección</label>
          <input 
            type="text" 
            id="direccion" 
            name="direccion"
            value={data.donante.direccion ?? ''}
            class="input"
          />
        </div>
        
        <!-- Notas -->
        <div>
          <label for="notas" class="label">Notas</label>
          <textarea 
            id="notas" 
            name="notas"
            rows="3"
            class="input"
          >{data.donante.notas ?? ''}</textarea>
        </div>
        
        <!-- Activo -->
        <div>
          <label class="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              name="activo"
              checked={data.donante.activo}
              class="w-4 h-4 rounded text-primary-600"
            />
            <span class="text-sm font-medium">Donante activo</span>
          </label>
        </div>
        
        <!-- Submit -->
        <div class="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button type="submit" class="btn btn-primary" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
    
    <!-- Sidebar -->
    <div class="space-y-6">
      <!-- Stats -->
      <div class="card p-6">
        <h3 class="font-display font-semibold text-slate-800 mb-4">Resumen</h3>
        <div class="space-y-4">
          <div>
            <p class="text-sm text-slate-500">Total donado</p>
            <p class="text-2xl font-bold text-primary-600">{formatCurrency(data.totalDonado)}</p>
          </div>
          <div>
            <p class="text-sm text-slate-500">Total aportes</p>
            <p class="text-lg font-semibold text-slate-900">{data.aportes.length}</p>
          </div>
        </div>
        
        <div class="mt-4 pt-4 border-t border-slate-200">
          <a 
            href="/admin/aportes/nuevo?donante={data.donante.id}"
            class="btn btn-primary w-full"
          >
            + Nuevo Aporte
          </a>
        </div>
      </div>
      
      <!-- Aportes -->
      <div class="card overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-200">
          <h3 class="font-display font-semibold text-slate-800">Historial</h3>
        </div>
        
        {#if data.aportes.length === 0}
          <div class="p-6 text-center text-slate-500 text-sm">
            Sin aportes registrados
          </div>
        {:else}
          <div class="divide-y divide-slate-100 max-h-96 overflow-y-auto">
            {#each data.aportes as aporte}
              <a 
                href="/admin/aportes/{aporte.id}"
                class="block p-4 hover:bg-slate-50 transition-colors"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-slate-500">{formatDateShort(aporte.fecha)}</p>
                    <p class="text-xs text-slate-400">{aporte.rubro}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-slate-900">{formatCurrency(aporte.monto)}</p>
                    <Badge variant={estadoVariant(aporte.estado)}>
                      {estadoAporteLabels[aporte.estado]}
                    </Badge>
                  </div>
                </div>
              </a>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<!-- Delete Confirmation Modal -->
{#if showDeleteConfirm}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/50" onclick={() => showDeleteConfirm = false}></div>
    <div class="relative bg-white rounded-2xl p-6 max-w-sm w-full">
      <h3 class="text-lg font-display font-semibold text-slate-900 mb-2">
        ¿Eliminar donante?
      </h3>
      <p class="text-slate-600 mb-6">
        Esta acción no se puede deshacer. Solo puedes eliminar donantes sin aportes registrados.
      </p>
      <div class="flex justify-end gap-3">
        <button 
          onclick={() => showDeleteConfirm = false}
          class="btn btn-secondary"
        >
          Cancelar
        </button>
        <form method="POST" action="?/delete">
          <button type="submit" class="btn btn-danger">
            Eliminar
          </button>
        </form>
      </div>
    </div>
  </div>
{/if}
