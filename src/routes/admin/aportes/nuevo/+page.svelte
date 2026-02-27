<script lang="ts">
  import { enhance } from '$app/forms';
  import Combobox from '$lib/components/Combobox.svelte';
  
  let { data, form } = $props();
  
  let loading = $state(false);
  let donanteId = $state(data.preselectedDonante || '');
  
  // Transform donantes for Combobox
  const donanteOptions = $derived(
    data.donantes.map(d => ({
      value: d.id,
      label: d.nombreNegocio || d.nombre,
      sublabel: d.nombreNegocio ? d.nombre : undefined
    }))
  );
</script>

<svelte:head>
  <title>Nuevo Aporte - Admin</title>
</svelte:head>

<div class="max-w-2xl mx-auto">
  <!-- Header -->
  <div class="mb-8">
    <a href="/admin/aportes" class="text-sm text-slate-600 hover:text-primary-600 mb-2 inline-block">
      ← Volver a aportes
    </a>
    <h1 class="page-title">Registrar Aporte</h1>
  </div>
  
  {#if form?.error}
    <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
      {form.error}
    </div>
  {/if}
  
  <form 
    method="POST"
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
      <Combobox
        name="donanteId"
        options={donanteOptions}
        bind:value={donanteId}
        placeholder="Buscar donante..."
        required
      />
      <p class="text-xs text-slate-500 mt-1">
        ¿Donante nuevo? <a href="/admin/donantes/nuevo" class="text-primary-600 hover:underline">Crear primero</a>
      </p>
    </div>
    
    <!-- Rubro -->
    <div>
      <label for="rubroId" class="label">Rubro / Categoría *</label>
      <select 
        id="rubroId" 
        name="rubroId"
        class="select"
        required
      >
        <option value="">Seleccionar rubro...</option>
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
          value={new Date().toISOString().split('T')[0]}
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
          class="input"
          placeholder="0.00"
          required
        />
      </div>
    </div>
    
    <!-- Método -->
    <div>
      <label for="metodo" class="label">Método de pago *</label>
      <select 
        id="metodo" 
        name="metodo"
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
    
    <!-- Referencia -->
    <div>
      <label for="referencia" class="label">
        Número de referencia
        <span class="text-slate-400 font-normal">(privado)</span>
      </label>
      <input 
        type="text" 
        id="referencia" 
        name="referencia"
        class="input"
        placeholder="Ej: Número de depósito, boleta, etc."
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
        placeholder="Notas adicionales..."
      ></textarea>
    </div>
    
    <!-- Estado -->
    <div>
      <label for="estado" class="label">Estado inicial</label>
      <select 
        id="estado" 
        name="estado"
        class="select"
      >
        <option value="PENDIENTE">Pendiente de verificación</option>
        <option value="VERIFICADO">Verificado</option>
      </select>
    </div>
    
    <!-- Submit -->
    <div class="flex justify-end gap-3 pt-4 border-t border-slate-200">
      <a href="/admin/aportes" class="btn btn-secondary">Cancelar</a>
      <button type="submit" class="btn btn-primary" disabled={loading}>
        {loading ? 'Guardando...' : 'Registrar Aporte'}
      </button>
    </div>
  </form>
</div>
