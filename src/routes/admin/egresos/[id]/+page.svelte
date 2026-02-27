<script lang="ts">
  import { enhance } from '$app/forms';
  import Badge from '$lib/components/Badge.svelte';
  import { formatCurrency, formatDateTime, estadoEgresoLabels } from '$lib/utils/format';
  
  let { data, form } = $props();
  
  let loading = $state(false);
  let showDeleteConfirm = $state(false);
  
  const estadoVariant = (e: string) => {
    switch (e) {
      case 'VERIFICADO': return 'success';
      case 'PENDIENTE': return 'warning';
      case 'ANULADO': return 'danger';
      default: return 'default';
    }
  };
</script>

<svelte:head>
  <title>Egreso #{data.egreso.id.slice(-6)} - Admin</title>
</svelte:head>

<div class="max-w-4xl mx-auto">
  <!-- Header -->
  <div class="mb-8">
    <a href="/admin/egresos" class="text-sm text-slate-600 hover:text-primary-600 mb-2 inline-block">
      ← Volver a egresos
    </a>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="page-title">Detalle del Egreso</h1>
        <p class="text-slate-600 mt-1">ID: {data.egreso.id}</p>
      </div>
      <Badge variant={estadoVariant(data.egreso.estado)}>
        {estadoEgresoLabels[data.egreso.estado]}
      </Badge>
    </div>
  </div>
  
  {#if form?.error}
    <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
      {form.error}
    </div>
  {/if}
  
  {#if form?.success}
    <div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
      {form.verified ? 'Egreso verificado correctamente' : form.cancelled ? 'Egreso anulado' : 'Egreso actualizado correctamente'}
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
        <!-- Concepto -->
        <div>
          <label for="concepto" class="label">Concepto *</label>
          <input 
            type="text" 
            id="concepto" 
            name="concepto"
            value={data.egreso.concepto}
            class="input"
            required
          />
        </div>
        
        <!-- Fecha y Monto -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="fecha" class="label">Fecha *</label>
            <input 
              type="date" 
              id="fecha" 
              name="fecha"
              value={data.egreso.fecha}
              class="input"
              required
            />
          </div>
          <div>
            <label for="monto" class="label">Monto *</label>
            <input 
              type="number" 
              id="monto" 
              name="monto"
              step="0.01"
              min="0.01"
              value={data.egreso.monto}
              class="input"
              required
            />
          </div>
        </div>
        
        <!-- Proveedor y Categoría -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="rubroId" class="label">Rubro *</label>
            <select 
              id="rubroId" 
              name="rubroId"
              class="select"
              value={data.egreso.rubroId}
              required
            >
              {#each data.rubros as rubro}
                <option value={rubro.id}>{rubro.nombre}</option>
              {/each}
            </select>
          </div>
          <div>
            <label for="proveedorId" class="label">Proveedor</label>
            <select 
              id="proveedorId" 
              name="proveedorId"
              class="select"
              value={data.egreso.proveedorId ?? ''}
            >
              <option value="">Sin proveedor registrado</option>
              {#each data.proveedores as proveedor}
                <option value={proveedor.id}>{proveedor.nombre}</option>
              {/each}
            </select>
          </div>
        </div>
        
        <!-- Referencia y Estado -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="referencia" class="label">Referencia</label>
            <input 
              type="text" 
              id="referencia" 
              name="referencia"
              value={data.egreso.referencia ?? ''}
              class="input"
            />
          </div>
          <div>
            <label for="estado" class="label">Estado *</label>
            <select 
              id="estado" 
              name="estado"
              value={data.egreso.estado}
              class="select"
              required
            >
              <option value="PENDIENTE">Pendiente</option>
              <option value="VERIFICADO">Verificado</option>
              <option value="ANULADO">Anulado</option>
            </select>
          </div>
        </div>
        
        <!-- Notas -->
        <div>
          <label for="notas" class="label">Notas</label>
          <textarea 
            id="notas" 
            name="notas"
            rows="2"
            class="input"
          >{data.egreso.notas ?? ''}</textarea>
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
      <!-- Info Card -->
      <div class="card p-6">
        <h3 class="font-display font-semibold text-slate-800 mb-4">Información</h3>
        
        <div class="space-y-4 text-sm">
           <div>
            <p class="text-slate-500">Monto</p>
            <p class="text-2xl font-bold text-red-600">{formatCurrency(data.egreso.monto)}</p>
          </div>

          {#if data.egreso.rubroNombre}
            <div>
              <p class="text-slate-500">Rubro</p>
              <p class="font-medium flex items-center gap-2">
                <span class="inline-flex w-2.5 h-2.5 rounded-full" style={`background:${data.egreso.rubroColor}`}></span>
                {data.egreso.rubroNombre}
              </p>
            </div>
          {/if}

          <div>
            <p class="text-slate-500">Creado</p>
            <p class="font-medium">{formatDateTime(data.egreso.createdAt)}</p>
          </div>
          
          <div>
            <p class="text-slate-500">Actualizado</p>
            <p class="font-medium">{formatDateTime(data.egreso.updatedAt)}</p>
          </div>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="card p-6 space-y-3">
        <h3 class="font-display font-semibold text-slate-800 mb-4">Acciones</h3>
        
        {#if data.egreso.estado === 'PENDIENTE'}
          <form method="POST" action="?/verify">
            <button type="submit" class="btn btn-primary w-full">
              ✓ Verificar Egreso
            </button>
          </form>
        {/if}
        
        {#if data.egreso.estado !== 'ANULADO'}
          <form method="POST" action="?/cancel">
            <button type="submit" class="btn btn-secondary w-full">
              ✗ Anular Egreso
            </button>
          </form>
        {/if}
        
        <button 
          onclick={() => showDeleteConfirm = true}
          class="btn btn-danger w-full"
        >
          🗑 Eliminar
        </button>
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
        ¿Eliminar egreso?
      </h3>
      <p class="text-slate-600 mb-6">
        Esta acción no se puede deshacer.
      </p>
      <div class="flex justify-end gap-3">
        <button onclick={() => showDeleteConfirm = false} class="btn btn-secondary">
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
