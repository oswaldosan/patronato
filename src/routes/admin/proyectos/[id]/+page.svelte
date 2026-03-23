<script lang="ts">
  import { enhance } from '$app/forms';
  import Badge from '$lib/components/Badge.svelte';
  import { formatCurrency, formatDateTime } from '$lib/utils/format';

  let { data, form } = $props();

  let loading = $state(false);
  let showDeleteConfirm = $state(false);

  let previews: Record<string, string | null> = $state({});

  function handleFileChange(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previews[`foto${index}`] = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  function currentFoto(index: number): string | null {
    const key = `foto${index}`;
    if (previews[key]) return previews[key];
    if (index === 1) return data.proyecto.foto1;
    if (index === 2) return data.proyecto.foto2;
    if (index === 3) return data.proyecto.foto3;
    return null;
  }
</script>

<svelte:head>
  <title>{data.proyecto.titulo} - Admin</title>
</svelte:head>

<div class="max-w-4xl mx-auto">
  <div class="mb-8">
    <a href="/admin/proyectos" class="text-sm text-slate-600 hover:text-primary-600 mb-2 inline-block">
      ← Volver a proyectos
    </a>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="page-title">Editar Proyecto</h1>
        <p class="text-slate-600 mt-1">ID: {data.proyecto.id}</p>
      </div>
      <Badge variant={data.proyecto.publicado ? 'success' : 'warning'}>
        {data.proyecto.publicado ? 'Publicado' : 'Borrador'}
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
      {form.published ? 'Proyecto publicado correctamente' : form.unpublished ? 'Proyecto despublicado' : 'Proyecto actualizado correctamente'}
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
          <label for="titulo" class="label">Título *</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={data.proyecto.titulo}
            class="input"
            required
          />
        </div>

        <div>
          <label for="descripcion" class="label">Descripción *</label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows="4"
            class="input"
            required
          >{data.proyecto.descripcion}</textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="fecha" class="label">Fecha *</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={data.proyecto.fecha}
              class="input"
              required
            />
          </div>
          <div>
            <label for="gastoTotal" class="label">Gasto total *</label>
            <input
              type="number"
              id="gastoTotal"
              name="gastoTotal"
              step="0.01"
              min="0.01"
              value={data.proyecto.gastoTotal}
              class="input"
              required
            />
          </div>
        </div>

        <div>
          <span class="label mb-3">Fotografías</span>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {#each [1, 2, 3] as i}
              <div>
                <label
                  for="foto{i}"
                  class="block border-2 border-dashed border-slate-300 rounded-xl aspect-video cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 transition-all overflow-hidden relative"
                >
                  {#if currentFoto(i)}
                    <img src={currentFoto(i)} alt="Foto {i}" class="w-full h-full object-cover" />
                  {:else}
                    <div class="flex flex-col items-center justify-center h-full text-slate-400">
                      <svg class="w-8 h-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span class="text-xs">Foto {i}</span>
                    </div>
                  {/if}
                </label>
                <input
                  type="file"
                  id="foto{i}"
                  name="foto{i}"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  class="hidden"
                  onchange={(e) => handleFileChange(i, e)}
                />
              </div>
            {/each}
          </div>
          <p class="text-xs text-slate-500 mt-2">Haz clic en una foto para reemplazarla. Formatos: JPG, PNG, WebP, GIF. Máx 5MB.</p>
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
            <p class="text-slate-500">Gasto total</p>
            <p class="text-2xl font-bold text-primary-700">{formatCurrency(data.proyecto.gastoTotal)}</p>
          </div>
          <div>
            <p class="text-slate-500">Creado</p>
            <p class="font-medium">{formatDateTime(data.proyecto.createdAt)}</p>
          </div>
          <div>
            <p class="text-slate-500">Actualizado</p>
            <p class="font-medium">{formatDateTime(data.proyecto.updatedAt)}</p>
          </div>
        </div>
      </div>

      <div class="card p-6 space-y-3">
        <h3 class="font-display font-semibold text-slate-800 mb-4">Acciones</h3>

        {#if !data.proyecto.publicado}
          <form method="POST" action="?/publish">
            <button type="submit" class="btn btn-primary w-full">
              ✓ Publicar Proyecto
            </button>
          </form>
        {:else}
          <form method="POST" action="?/unpublish">
            <button type="submit" class="btn btn-secondary w-full">
              Despublicar
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
    <div class="absolute inset-0 bg-black/50" role="button" tabindex="0" aria-label="Cerrar" onclick={() => showDeleteConfirm = false} onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showDeleteConfirm = false; } }}></div>
    <div class="relative bg-white rounded-2xl p-6 max-w-sm w-full">
      <h3 class="text-lg font-display font-semibold text-slate-900 mb-2">
        ¿Eliminar proyecto?
      </h3>
      <p class="text-slate-600 mb-6">
        Se eliminarán también las fotos asociadas. Esta acción no se puede deshacer.
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
