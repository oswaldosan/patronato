<script lang="ts">
  import { enhance } from '$app/forms';
  import Combobox from '$lib/components/Combobox.svelte';

  let { data, form } = $props();

  let loading = $state(false);
  let donanteId = $state(data.preselectedDonante || '');

  const donanteOptions = $derived(
    data.donantes.map(d => ({
      value: d.id,
      label: d.nombreNegocio || d.nombre,
      sublabel: d.nombreNegocio ? d.nombre : undefined
    }))
  );
</script>

<svelte:head>
  <title>Nueva Donación de Material - Admin</title>
</svelte:head>

<div class="max-w-2xl mx-auto">
  <div class="mb-8">
    <a href="/admin/donaciones-materiales" class="text-sm text-slate-600 hover:text-primary-600 mb-2 inline-block">
      ← Volver a donaciones de materiales
    </a>
    <h1 class="page-title">Registrar Donación de Material</h1>
  </div>

  {#if form?.error}
    <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
      {form.error}
    </div>
  {/if}

  <form
    method="POST"
    enctype="multipart/form-data"
    use:enhance={() => {
      loading = true;
      return async ({ update }) => {
        loading = false;
        await update();
      };
    }}
    class="card p-6 space-y-6"
  >
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

    <div>
      <label for="descripcion" class="label">Descripción del material *</label>
      <textarea
        id="descripcion"
        name="descripcion"
        rows="2"
        class="input"
        placeholder="Ej: 100 bolsas de cemento, 50 láminas de zinc..."
        required
      ></textarea>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label for="cantidad" class="label">Cantidad</label>
        <input
          type="text"
          id="cantidad"
          name="cantidad"
          class="input"
          placeholder="Ej: 100, 2 camionadas..."
        />
      </div>
      <div>
        <label for="valorEstimado" class="label">Valor estimado (L) *</label>
        <input
          type="number"
          id="valorEstimado"
          name="valorEstimado"
          step="0.01"
          min="0.01"
          class="input"
          placeholder="0.00"
          required
        />
      </div>
    </div>

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
    </div>

    <div>
      <label for="evidenciaFile" class="label">Evidencia (foto)</label>
      <input
        type="file"
        id="evidenciaFile"
        name="evidenciaFile"
        accept="image/*"
        class="input"
      />
      <p class="text-xs text-slate-500 mt-1">Imagen JPG, PNG o WebP. Máx 5MB.</p>
    </div>

    <div>
      <label for="notas" class="label">Notas</label>
      <textarea
        id="notas"
        name="notas"
        rows="2"
        class="input"
        placeholder="Observaciones adicionales..."
      ></textarea>
    </div>

    <div class="flex justify-end gap-3 pt-4 border-t border-slate-200">
      <a href="/admin/donaciones-materiales" class="btn btn-secondary">Cancelar</a>
      <button type="submit" class="btn btn-primary" disabled={loading}>
        {loading ? 'Guardando...' : 'Registrar Donación'}
      </button>
    </div>
  </form>
</div>
