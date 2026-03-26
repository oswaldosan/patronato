<script lang="ts">
  import { enhance } from '$app/forms';

  let { form } = $props();

  let loading = $state(false);
  let previews: (string | null)[] = $state([null, null, null]);

  function handleFileChange(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previews[index] = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      previews[index] = null;
    }
  }
</script>

<svelte:head>
  <title>Nuevo Proyecto - Admin</title>
</svelte:head>

<div class="max-w-2xl mx-auto">
  <div class="mb-8">
    <a href="/admin/proyectos" class="text-sm text-slate-600 hover:text-primary-600 mb-2 inline-block">
      ← Volver a proyectos
    </a>
    <h1 class="page-title">Nuevo Proyecto</h1>
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
      <label for="titulo" class="label">Título del proyecto *</label>
      <input
        type="text"
        id="titulo"
        name="titulo"
        value={form?.data?.titulo ?? ''}
        class="input"
        placeholder="Ej: Pavimentación Calle Principal"
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
        placeholder="Describe el proyecto realizado, los beneficios para la comunidad..."
        required
      >{form?.data?.descripcion ?? ''}</textarea>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label for="fecha" class="label">Fecha de realización *</label>
        <input
          type="date"
          id="fecha"
          name="fecha"
          value={form?.data?.fecha ?? new Date().toISOString().split('T')[0]}
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
          value={form?.data?.gastoTotal ?? ''}
          class="input"
          placeholder="0.00"
          required
        />
      </div>
    </div>

    <div>
      <label for="meta" class="label">
        Meta de recaudación (L.)
        <span class="text-slate-400 font-normal">(opcional - para proyectos de recaudación)</span>
      </label>
      <div class="relative">
        <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">L.</span>
        <input
          type="number"
          id="meta"
          name="meta"
          step="0.01"
          min="0.01"
          value={form?.data?.meta ?? ''}
          class="input pl-10"
          placeholder="0.00"
        />
      </div>
    </div>

    <div>
      <span class="label mb-3">Fotografías (máximo 3)</span>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {#each [0, 1, 2] as i}
          <div>
            <label
              for="foto{i + 1}"
              class="block border-2 border-dashed border-slate-300 rounded-xl aspect-video cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 transition-all overflow-hidden"
            >
              {#if previews[i]}
                <img src={previews[i]} alt="Vista previa {i + 1}" class="w-full h-full object-cover" />
              {:else}
                <div class="flex flex-col items-center justify-center h-full text-slate-400">
                  <svg class="w-8 h-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-xs">Foto {i + 1}</span>
                </div>
              {/if}
            </label>
            <input
              type="file"
              id="foto{i + 1}"
              name="foto{i + 1}"
              accept="image/jpeg,image/png,image/webp,image/gif"
              class="hidden"
              onchange={(e) => handleFileChange(i, e)}
            />
          </div>
        {/each}
      </div>
      <p class="text-xs text-slate-500 mt-2">Formatos: JPG, PNG, WebP, GIF. Máximo 5MB por imagen.</p>
    </div>

    <div class="flex justify-end gap-3 pt-4 border-t border-slate-200">
      <a href="/admin/proyectos" class="btn btn-secondary">Cancelar</a>
      <button type="submit" class="btn btn-primary" disabled={loading}>
        {loading ? 'Guardando...' : 'Crear Proyecto'}
      </button>
    </div>
  </form>
</div>
