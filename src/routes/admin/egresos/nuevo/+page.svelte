<script lang="ts">
  import { enhance } from '$app/forms';
  
  let { data, form } = $props();
  
  let loading = $state(false);
</script>

<svelte:head>
  <title>Nuevo Egreso - Admin</title>
</svelte:head>

<div class="max-w-2xl mx-auto">
  <!-- Header -->
  <div class="mb-8">
    <a href="/admin/egresos" class="text-sm text-slate-600 hover:text-primary-600 mb-2 inline-block">
      ← Volver a egresos
    </a>
    <h1 class="page-title">Registrar Egreso</h1>
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
    <!-- Concepto -->
    <div>
      <label for="concepto" class="label">Concepto / Descripción *</label>
      <input 
        type="text" 
        id="concepto" 
        name="concepto"
        value={form?.data?.concepto ?? ''}
        class="input"
        placeholder="Ej: Compra de materiales, pago de mano de obra..."
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
    
    <!-- Rubro y Proveedor -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label for="rubroId" class="label">Rubro / Categoría *</label>
        <select 
          id="rubroId"
          name="rubroId"
          class="select"
          required
          value={form?.data?.rubroId ?? ''}
        >
          <option value="" disabled hidden>Selecciona un rubro</option>
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
          value={form?.data?.proveedorId ?? ''}
        >
          <option value="">Sin proveedor registrado</option>
          {#each data.proveedores as proveedor}
            <option value={proveedor.id}>{proveedor.nombre}</option>
          {/each}
        </select>
      </div>
    </div>
    
    <!-- Referencia -->
    <div>
      <label for="referencia" class="label">
        Número de factura/comprobante
        <span class="text-slate-400 font-normal">(privado)</span>
      </label>
      <input 
        type="text" 
        id="referencia" 
        name="referencia"
        class="input"
        placeholder="Número de factura, recibo, etc."
      />
    </div>
    
    <!-- Notas -->
    <div>
      <label for="notas" class="label">Notas</label>
      <textarea 
        id="notas" 
        name="notas"
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
      <a href="/admin/egresos" class="btn btn-secondary">Cancelar</a>
      <button type="submit" class="btn btn-primary" disabled={loading}>
        {loading ? 'Guardando...' : 'Registrar Egreso'}
      </button>
    </div>
  </form>
</div>
