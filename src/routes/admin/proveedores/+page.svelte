<script lang="ts">
  import { enhance } from '$app/forms';
  import Badge from '$lib/components/Badge.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { formatCurrency } from '$lib/utils/format';

  let { data, form } = $props();

  let showNewModal = $state(false);
  let editingProveedor = $state<typeof data.proveedores[0] | null>(null);
  let deletingId = $state<string | null>(null);
  let searchQuery = $state('');

  // Form state
  let nombre = $state('');
  let contacto = $state('');
  let activo = $state(true);

  const filtered = $derived(
    searchQuery
      ? data.proveedores.filter((p) =>
          p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.contacto && p.contacto.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      : data.proveedores
  );

  function openNew() {
    nombre = '';
    contacto = '';
    showNewModal = true;
  }

  function openEdit(proveedor: typeof data.proveedores[0]) {
    editingProveedor = proveedor;
    nombre = proveedor.nombre;
    contacto = proveedor.contacto || '';
    activo = proveedor.activo;
  }

  function closeModals() {
    showNewModal = false;
    editingProveedor = null;
    deletingId = null;
  }
</script>

<svelte:head>
  <title>Proveedores - Admin</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="page-title">Proveedores</h1>
      <p class="text-slate-600 mt-1">{data.proveedores.length} proveedores registrados</p>
    </div>
    <button onclick={openNew} class="btn btn-primary">
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Nuevo Proveedor
    </button>
  </div>

  {#if form?.error}
    <div class="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
      {form.error}
    </div>
  {/if}

  {#if form?.success}
    <div class="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
      Operacion realizada correctamente
    </div>
  {/if}

  <!-- Search -->
  <div class="max-w-md">
    <div class="relative">
      <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder="Buscar proveedor..."
        bind:value={searchQuery}
        class="input pl-10"
      />
    </div>
  </div>

  <!-- Proveedores Grid -->
  {#if filtered.length === 0}
    <div class="card p-12 text-center">
      <div class="text-4xl mb-3">🏢</div>
      <p class="text-slate-500">
        {searchQuery ? 'No se encontraron proveedores con esa busqueda.' : 'No hay proveedores registrados. Crea el primero.'}
      </p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each filtered as proveedor}
        <div class="card p-5 hover:shadow-md transition-shadow {!proveedor.activo ? 'opacity-60' : ''}">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-lg">
                🏢
              </div>
              <div class="min-w-0">
                <h3 class="font-medium text-slate-900 truncate">{proveedor.nombre}</h3>
                {#if proveedor.contacto}
                  <p class="text-xs text-slate-500 truncate">{proveedor.contacto}</p>
                {/if}
              </div>
            </div>
            <Badge variant={proveedor.activo ? 'success' : 'danger'}>
              {proveedor.activo ? 'Activo' : 'Inactivo'}
            </Badge>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p class="text-slate-500">Gastos</p>
              <p class="font-semibold text-slate-900">{proveedor.totalEgresos}</p>
            </div>
            <div>
              <p class="text-slate-500">Total gastado</p>
              <p class="font-semibold text-red-600">{formatCurrency(proveedor.totalGastado)}</p>
            </div>
          </div>

          <div class="flex gap-2 pt-3 border-t border-slate-100">
            <button
              onclick={() => openEdit(proveedor)}
              class="flex-1 btn btn-sm btn-secondary"
            >
              Editar
            </button>
            <button
              onclick={() => deletingId = proveedor.id}
              class="btn btn-sm btn-outline text-red-600 border-red-200 hover:bg-red-50"
              disabled={proveedor.totalEgresos > 0}
            >
              Eliminar
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<!-- New Proveedor Modal -->
<Modal bind:open={showNewModal} title="Nuevo Proveedor" onClose={closeModals}>
  <form
    method="POST"
    action="?/create"
    use:enhance={() => {
      return async ({ result, update }) => {
        if (result.type === 'success') {
          closeModals();
        }
        await update();
      };
    }}
    class="space-y-4"
  >
    <div>
      <label for="new-nombre" class="label">Nombre *</label>
      <input
        type="text"
        id="new-nombre"
        name="nombre"
        bind:value={nombre}
        class="input"
        required
        placeholder="Nombre del proveedor"
      />
    </div>

    <div>
      <label for="new-contacto" class="label">Contacto</label>
      <input
        type="text"
        id="new-contacto"
        name="contacto"
        bind:value={contacto}
        class="input"
        placeholder="Telefono, email, direccion, etc."
      />
    </div>

    <div class="flex justify-end gap-3 pt-4">
      <button type="button" onclick={closeModals} class="btn btn-secondary">Cancelar</button>
      <button type="submit" class="btn btn-primary">Crear</button>
    </div>
  </form>
</Modal>

<!-- Edit Proveedor Modal -->
<Modal open={!!editingProveedor} title="Editar Proveedor" onClose={closeModals}>
  {#if editingProveedor}
    <form
      method="POST"
      action="?/update"
      use:enhance={() => {
        return async ({ result, update }) => {
          if (result.type === 'success') {
            closeModals();
          }
          await update();
        };
      }}
      class="space-y-4"
    >
      <input type="hidden" name="id" value={editingProveedor.id} />

      <div>
        <label for="edit-nombre" class="label">Nombre *</label>
        <input
          type="text"
          id="edit-nombre"
          name="nombre"
          bind:value={nombre}
          class="input"
          required
        />
      </div>

      <div>
        <label for="edit-contacto" class="label">Contacto</label>
        <input
          type="text"
          id="edit-contacto"
          name="contacto"
          bind:value={contacto}
          class="input"
          placeholder="Telefono, email, direccion, etc."
        />
      </div>

      <div>
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            name="activo"
            bind:checked={activo}
            class="w-4 h-4 rounded text-primary-600"
          />
          <span class="text-sm font-medium">Proveedor activo</span>
        </label>
      </div>

      <div class="flex justify-end gap-3 pt-4">
        <button type="button" onclick={closeModals} class="btn btn-secondary">Cancelar</button>
        <button type="submit" class="btn btn-primary">Guardar</button>
      </div>
    </form>
  {/if}
</Modal>

<!-- Delete Confirmation Modal -->
<Modal open={!!deletingId} title="Eliminar proveedor?" onClose={closeModals}>
  <p class="text-slate-600 mb-6">
    Esta accion no se puede deshacer. Solo puedes eliminar proveedores sin gastos asociados.
  </p>
  <div class="flex justify-end gap-3">
    <button onclick={closeModals} class="btn btn-secondary">Cancelar</button>
    <form
      method="POST"
      action="?/delete"
      use:enhance={() => {
        return async ({ result, update }) => {
          if (result.type === 'success') {
            closeModals();
          }
          await update();
        };
      }}
    >
      <input type="hidden" name="id" value={deletingId} />
      <button type="submit" class="btn btn-danger">Eliminar</button>
    </form>
  </div>
</Modal>
