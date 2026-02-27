<script lang="ts">
  import { enhance } from '$app/forms';
  import Badge from '$lib/components/Badge.svelte';
  import { formatCurrency, formatDateTime, metodoPagoLabels, estadoAporteLabels } from '$lib/utils/format';
  
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
  <title>Aporte #{data.aporte.id.slice(-6)} - Admin</title>
</svelte:head>

<div class="max-w-4xl mx-auto">
  <!-- Header -->
  <div class="mb-8">
    <a href="/admin/aportes" class="text-sm text-slate-600 hover:text-primary-600 mb-2 inline-block">
      ← Volver a aportes
    </a>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="page-title">Detalle del Aporte</h1>
        <p class="text-slate-600 mt-1">ID: {data.aporte.id}</p>
      </div>
      <Badge variant={estadoVariant(data.aporte.estado)}>
        {estadoAporteLabels[data.aporte.estado]}
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
      {form.verified ? 'Aporte verificado correctamente' : form.cancelled ? 'Aporte anulado' : 'Aporte actualizado correctamente'}
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
        <!-- Donante -->
        <div>
          <label for="donanteId" class="label">Donante *</label>
          <select 
            id="donanteId" 
            name="donanteId"
            value={data.aporte.donanteId}
            class="select"
            required
          >
            {#each data.donantes as donante}
              <option value={donante.id}>
                {donante.nombreNegocio || donante.nombre}
              </option>
            {/each}
          </select>
        </div>
        
        <!-- Rubro -->
        <div>
          <label for="rubroId" class="label">Rubro *</label>
          <select 
            id="rubroId" 
            name="rubroId"
            value={data.aporte.rubroId}
            class="select"
            required
          >
            {#each data.rubros as rubro}
              <option value={rubro.id}>{rubro.nombre}</option>
            {/each}
          </select>
        </div>
        
        <!-- Fecha y Monto -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="fecha" class="label">Fecha *</label>
            <input 
              type="date" 
              id="fecha" 
              name="fecha"
              value={data.aporte.fecha}
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
              value={data.aporte.monto}
              class="input"
              required
            />
          </div>
        </div>
        
        <!-- Método y Estado -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="metodo" class="label">Método de pago *</label>
            <select 
              id="metodo" 
              name="metodo"
              value={data.aporte.metodo}
              class="select"
              required
            >
              <option value="DEPOSITO">Depósito Bancario</option>
              <option value="TRANSFERENCIA">Transferencia</option>
              <option value="EFECTIVO">Efectivo</option>
              <option value="CHEQUE">Cheque</option>
              <option value="OTRO">Otro</option>
            </select>
          </div>
          <div>
            <label for="estado" class="label">Estado *</label>
            <select 
              id="estado" 
              name="estado"
              value={data.aporte.estado}
              class="select"
              required
            >
              <option value="PENDIENTE">Pendiente</option>
              <option value="VERIFICADO">Verificado</option>
              <option value="ANULADO">Anulado</option>
            </select>
          </div>
        </div>
        
        <!-- Referencia -->
        <div>
          <label for="referencia" class="label">
            Referencia <span class="text-slate-400 font-normal">(privado)</span>
          </label>
          <input 
            type="text" 
            id="referencia" 
            name="referencia"
            value={data.aporte.referencia ?? ''}
            class="input"
          />
        </div>
        
        <!-- Comentario -->
        <div>
          <label for="comentario" class="label">Comentario</label>
          <textarea 
            id="comentario" 
            name="comentario"
            rows="2"
            class="input"
          >{data.aporte.comentario ?? ''}</textarea>
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
            <p class="text-2xl font-bold text-primary-600">{formatCurrency(data.aporte.monto)}</p>
          </div>
          
          <div>
            <p class="text-slate-500">Donante</p>
            <a href="/admin/donantes/{data.aporte.donante.id}" class="font-medium text-primary-600 hover:underline">
              {data.aporte.donante.nombreNegocio || data.aporte.donante.nombre}
            </a>
          </div>
          
          <div>
            <p class="text-slate-500">Rubro</p>
            <div class="flex items-center gap-2">
              <div 
                class="w-3 h-3 rounded-full" 
                style="background-color: {data.aporte.rubro.color}"
              ></div>
              <span class="font-medium">{data.aporte.rubro.nombre}</span>
            </div>
          </div>
          
          <div>
            <p class="text-slate-500">Creado</p>
            <p class="font-medium">{formatDateTime(data.aporte.createdAt)}</p>
          </div>
          
          <div>
            <p class="text-slate-500">Actualizado</p>
            <p class="font-medium">{formatDateTime(data.aporte.updatedAt)}</p>
          </div>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="card p-6 space-y-3">
        <h3 class="font-display font-semibold text-slate-800 mb-4">Acciones</h3>
        
        {#if data.aporte.estado === 'PENDIENTE'}
          <form method="POST" action="?/verify">
            <button type="submit" class="btn btn-primary w-full">
              ✓ Verificar Aporte
            </button>
          </form>
        {/if}
        
        {#if data.aporte.estado !== 'ANULADO'}
          <form method="POST" action="?/cancel">
            <button type="submit" class="btn btn-secondary w-full">
              ✗ Anular Aporte
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
        ¿Eliminar aporte?
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
