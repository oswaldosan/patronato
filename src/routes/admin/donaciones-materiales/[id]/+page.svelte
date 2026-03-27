<script lang="ts">
  import { enhance } from '$app/forms';
  import Badge from '$lib/components/Badge.svelte';
  import { formatCurrency, formatDateTime, estadoDonacionMaterialLabels } from '$lib/utils/format';

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
  <title>Donación #{data.donacion.id.slice(-6)} - Admin</title>
</svelte:head>

<div class="max-w-4xl mx-auto">
  <div class="mb-8">
    <a href="/admin/donaciones-materiales" class="text-sm text-slate-600 hover:text-primary-600 mb-2 inline-block">
      ← Volver a donaciones de materiales
    </a>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="page-title">Detalle de Donación de Material</h1>
        <p class="text-slate-600 mt-1">ID: {data.donacion.id}</p>
      </div>
      <Badge variant={estadoVariant(data.donacion.estado)}>
        {estadoDonacionMaterialLabels[data.donacion.estado]}
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
      {form.verified ? 'Donación verificada correctamente' : form.cancelled ? 'Donación anulada' : 'Donación actualizada correctamente'}
    </div>
  {/if}

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div class="lg:col-span-2">
      <form
        method="POST"
        action="?/update"
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
          <label for="donanteId" class="label">Aportante *</label>
          <select
            id="donanteId"
            name="donanteId"
            value={data.donacion.donanteId}
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

        <div>
          <label for="descripcion" class="label">Descripción del material *</label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows="2"
            class="input"
            required
          >{data.donacion.descripcion}</textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="cantidad" class="label">Cantidad</label>
            <input
              type="text"
              id="cantidad"
              name="cantidad"
              value={data.donacion.cantidad ?? ''}
              class="input"
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
              value={data.donacion.valorEstimado}
              class="input"
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
              value={data.donacion.fecha}
              class="input"
              required
            />
          </div>
          <div>
            <label for="estado" class="label">Estado *</label>
            <select
              id="estado"
              name="estado"
              value={data.donacion.estado}
              class="select"
              required
            >
              <option value="PENDIENTE">Pendiente</option>
              <option value="VERIFICADO">Verificado</option>
              <option value="ANULADO">Anulado</option>
            </select>
          </div>
        </div>

        <div>
          <label for="evidenciaFile" class="label">Evidencia (foto)</label>
          {#if data.donacion.evidencia}
            <div class="mb-2">
              <img src={data.donacion.evidencia} alt="Evidencia actual" class="w-32 h-32 object-cover rounded-lg border" />
              <p class="text-xs text-slate-500 mt-1">Imagen actual. Sube otra para reemplazarla.</p>
            </div>
          {/if}
          <input
            type="file"
            id="evidenciaFile"
            name="evidenciaFile"
            accept="image/*"
            class="input"
          />
        </div>

        <div>
          <label for="notas" class="label">Notas</label>
          <textarea
            id="notas"
            name="notas"
            rows="2"
            class="input"
          >{data.donacion.notas ?? ''}</textarea>
        </div>

        <div class="flex justify-end gap-3 pt-4 border-t border-slate-200">
          <button type="submit" class="btn btn-primary" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>

    <div class="space-y-6">
      <div class="card p-6">
        <h3 class="font-display font-semibold text-slate-800 mb-4">Información</h3>

        <div class="space-y-4 text-sm">
          <div>
            <p class="text-slate-500">Valor Estimado</p>
            <p class="text-2xl font-bold text-primary-600">{formatCurrency(data.donacion.valorEstimado)}</p>
          </div>

          <div>
            <p class="text-slate-500">Material</p>
            <p class="font-medium text-slate-900">{data.donacion.descripcion}</p>
          </div>

          {#if data.donacion.cantidad}
            <div>
              <p class="text-slate-500">Cantidad</p>
              <p class="font-medium">{data.donacion.cantidad}</p>
            </div>
          {/if}

          <div>
            <p class="text-slate-500">Aportante</p>
            <a href="/admin/donantes/{data.donacion.donante.id}" class="font-medium text-primary-600 hover:underline">
              {data.donacion.donante.nombreNegocio || data.donacion.donante.nombre}
            </a>
          </div>

          <div>
            <p class="text-slate-500">Creado</p>
            <p class="font-medium">{formatDateTime(data.donacion.createdAt)}</p>
          </div>

          <div>
            <p class="text-slate-500">Actualizado</p>
            <p class="font-medium">{formatDateTime(data.donacion.updatedAt)}</p>
          </div>
        </div>
      </div>

      <div class="card p-6 space-y-3">
        <h3 class="font-display font-semibold text-slate-800 mb-4">Acciones</h3>

        {#if data.donacion.estado === 'PENDIENTE'}
          <form method="POST" action="?/verify">
            <button type="submit" class="btn btn-primary w-full">
              ✓ Verificar Donación
            </button>
          </form>
        {/if}

        {#if data.donacion.estado !== 'ANULADO'}
          <form method="POST" action="?/cancel">
            <button type="submit" class="btn btn-secondary w-full">
              ✗ Anular Donación
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

{#if showDeleteConfirm}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div
      class="absolute inset-0 bg-black/50"
      role="button"
      tabindex="0"
      aria-label="Cerrar diálogo"
      onclick={() => showDeleteConfirm = false}
      onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showDeleteConfirm = false; } }}
    ></div>
    <div class="relative bg-white rounded-2xl p-6 max-w-sm w-full">
      <h3 class="text-lg font-display font-semibold text-slate-900 mb-2">
        ¿Eliminar donación?
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
