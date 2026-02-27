<script lang="ts">
  import { enhance } from '$app/forms';
  
  let { form } = $props();
  
  let loading = $state(false);
  let tipo = $state(form?.data?.tipo || 'PERSONA');
</script>

<svelte:head>
  <title>Nuevo Donante - Admin</title>
</svelte:head>

<div class="max-w-2xl mx-auto">
  <!-- Header -->
  <div class="mb-8">
    <a href="/admin/donantes" class="text-sm text-slate-600 hover:text-primary-600 mb-2 inline-block">
      ← Volver a donantes
    </a>
    <h1 class="page-title">Nuevo Donante</h1>
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
        value={form?.data?.nombre ?? ''}
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
        value={(form?.data as any)?.identificacion ?? ''}
        class="input"
        placeholder="Ej: 0801-1980-12345"
        required
      />
      <p class="text-xs text-slate-500 mt-1">Debe ser único en el sistema.</p>
    </div>
    
    <!-- Nombre Negocio -->
    {#if tipo === 'EMPRESA'}
      <div>
        <label for="nombreNegocio" class="label">Nombre del negocio/empresa *</label>
        <input 
          type="text" 
          id="nombreNegocio" 
          name="nombreNegocio"
          value={form?.data?.nombreNegocio ?? ''}
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
          value={form?.data?.telefono ?? ''}
          class="input"
        />
      </div>
      <div>
        <label for="email" class="label">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email"
          value={form?.data?.email ?? ''}
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
        value={form?.data?.direccion ?? ''}
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
      >{form?.data?.notas ?? ''}</textarea>
    </div>
    
    <!-- Submit -->
    <div class="flex justify-end gap-3 pt-4 border-t border-slate-200">
      <a href="/admin/donantes" class="btn btn-secondary">Cancelar</a>
      <button type="submit" class="btn btn-primary" disabled={loading}>
        {loading ? 'Guardando...' : 'Crear Donante'}
      </button>
    </div>
  </form>
</div>
