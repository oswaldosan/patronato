<script lang="ts">
  import { enhance } from '$app/forms';

  let { form } = $props();

  let loading = $state(false);
  let preview: string | null = $state(null);

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        preview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      preview = null;
    }
  }
</script>

<svelte:head>
  <title>Nuevo Evento - Admin</title>
</svelte:head>

<div class="max-w-2xl mx-auto">
  <div class="mb-8">
    <a href="/admin/eventos" class="text-sm text-slate-600 hover:text-primary-600 mb-2 inline-block">
      ← Volver a eventos
    </a>
    <h1 class="page-title">Nuevo Evento</h1>
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
      <label for="nombre" class="label">Nombre del evento *</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        value={form?.data?.nombre ?? ''}
        class="input"
        placeholder="Ej: Fiesta bailable pro fondos"
        required
      />
    </div>

    <div>
      <label for="descripcion" class="label">
        Descripción
        <span class="text-slate-400 font-normal">(opcional)</span>
      </label>
      <textarea
        id="descripcion"
        name="descripcion"
        rows="4"
        class="input"
        placeholder="Describe el evento, su propósito y actividades..."
      >{form?.data?.descripcion ?? ''}</textarea>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label for="fecha" class="label">Fecha del evento *</label>
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
        <label for="lugar" class="label">
          Lugar
          <span class="text-slate-400 font-normal">(opcional)</span>
        </label>
        <input
          type="text"
          id="lugar"
          name="lugar"
          value={form?.data?.lugar ?? ''}
          class="input"
          placeholder="Ej: Salón comunal de Monterrey"
        />
      </div>
    </div>

    <div>
      <span class="label mb-3">Fotografía (opcional)</span>
      <div class="max-w-xs">
        <label
          for="foto1"
          class="block border-2 border-dashed border-slate-300 rounded-xl aspect-video cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 transition-all overflow-hidden"
        >
          {#if preview}
            <img src={preview} alt="Vista previa" class="w-full h-full object-cover" />
          {:else}
            <div class="flex flex-col items-center justify-center h-full text-slate-400">
              <svg class="w-8 h-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="text-xs">Foto del evento</span>
            </div>
          {/if}
        </label>
        <input
          type="file"
          id="foto1"
          name="foto1"
          accept="image/jpeg,image/png,image/webp,image/gif"
          class="hidden"
          onchange={handleFileChange}
        />
      </div>
      <p class="text-xs text-slate-500 mt-2">Formatos: JPG, PNG, WebP, GIF. Máximo 5MB.</p>
    </div>

    <div class="flex justify-end gap-3 pt-4 border-t border-slate-200">
      <a href="/admin/eventos" class="btn btn-secondary">Cancelar</a>
      <button type="submit" class="btn btn-primary" disabled={loading}>
        {loading ? 'Guardando...' : 'Crear Evento'}
      </button>
    </div>
  </form>
</div>
