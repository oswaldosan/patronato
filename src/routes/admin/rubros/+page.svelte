<script lang="ts">
  import { enhance } from '$app/forms';
  import Badge from '$lib/components/Badge.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { formatCurrency } from '$lib/utils/format';
  
  let { data, form } = $props();
  
  let showNewModal = $state(false);
  let editingRubro = $state<typeof data.rubros[0] | null>(null);
  let deletingId = $state<string | null>(null);
  
  // Form state
  let nombre = $state('');
  let descripcion = $state('');
  let color = $state('#22c55e');
  let icono = $state('');
  let orden = $state(0);
  let activo = $state(true);
  
  function openNew() {
    nombre = '';
    descripcion = '';
    color = '#22c55e';
    icono = '';
    orden = data.rubros.length;
    showNewModal = true;
  }
  
  function openEdit(rubro: typeof data.rubros[0]) {
    editingRubro = rubro;
    nombre = rubro.nombre;
    descripcion = rubro.descripcion || '';
    color = rubro.color;
    icono = rubro.icono || '';
    orden = rubro.orden;
    activo = rubro.activo;
  }
  
  function closeModals() {
    showNewModal = false;
    editingRubro = null;
    deletingId = null;
  }
</script>

<svelte:head>
  <title>Rubros - Admin</title>
</svelte:head>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="page-title">Rubros / Categorías</h1>
      <p class="text-slate-600 mt-1">{data.rubros.length} rubros registrados</p>
    </div>
    <button onclick={openNew} class="btn btn-primary">
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Nuevo Rubro
    </button>
  </div>
  
  {#if form?.error}
    <div class="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
      {form.error}
    </div>
  {/if}
  
  {#if form?.success}
    <div class="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
      Operación realizada correctamente
    </div>
  {/if}
  
  <!-- Rubros Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each data.rubros as rubro}
      <div class="card p-5 hover:shadow-md transition-shadow {!rubro.activo ? 'opacity-60' : ''}">
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <div 
              class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
              style="background-color: {rubro.color}"
            >
              {rubro.icono || rubro.nombre.charAt(0)}
            </div>
            <div>
              <h3 class="font-medium text-slate-900">{rubro.nombre}</h3>
              {#if rubro.descripcion}
                <p class="text-xs text-slate-500">{rubro.descripcion}</p>
              {/if}
            </div>
          </div>
          <Badge variant={rubro.activo ? 'success' : 'danger'}>
            {rubro.activo ? 'Activo' : 'Inactivo'}
          </Badge>
        </div>
        
        <div class="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <p class="text-slate-500">Aportes</p>
            <p class="font-semibold text-slate-900">{rubro.totalAportes}</p>
          </div>
          <div>
            <p class="text-slate-500">Recaudado</p>
            <p class="font-semibold text-primary-600">{formatCurrency(rubro.totalRecaudado)}</p>
          </div>
        </div>
        
        <div class="flex gap-2 pt-3 border-t border-slate-100">
          <button 
            onclick={() => openEdit(rubro)}
            class="flex-1 btn btn-sm btn-secondary"
          >
            Editar
          </button>
          <button 
            onclick={() => deletingId = rubro.id}
            class="btn btn-sm btn-outline text-red-600 border-red-200 hover:bg-red-50"
            disabled={rubro.totalAportes > 0}
          >
            Eliminar
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>

<!-- New Rubro Modal -->
<Modal bind:open={showNewModal} title="Nuevo Rubro" onClose={closeModals}>
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
      />
    </div>
    
    <div>
      <label for="new-descripcion" class="label">Descripción</label>
      <input 
        type="text" 
        id="new-descripcion" 
        name="descripcion"
        bind:value={descripcion}
        class="input"
      />
    </div>
    
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label for="new-color" class="label">Color</label>
        <div class="flex gap-2">
          <input 
            type="color" 
            id="new-color" 
            name="color"
            bind:value={color}
            class="w-12 h-10 rounded-lg cursor-pointer"
          />
          <input 
            type="text" 
            value={color}
            onchange={(e) => color = e.currentTarget.value}
            class="input flex-1"
          />
        </div>
      </div>
      <div>
        <label for="new-orden" class="label">Orden</label>
        <input 
          type="number" 
          id="new-orden" 
          name="orden"
          bind:value={orden}
          class="input"
          min="0"
        />
      </div>
    </div>
    
    <div>
      <label for="new-icono" class="label">Ícono (emoji)</label>
      <input 
        type="text" 
        id="new-icono" 
        name="icono"
        bind:value={icono}
        class="input"
        placeholder="🏪"
      />
    </div>
    
    <div class="flex justify-end gap-3 pt-4">
      <button type="button" onclick={closeModals} class="btn btn-secondary">Cancelar</button>
      <button type="submit" class="btn btn-primary">Crear</button>
    </div>
  </form>
</Modal>

<!-- Edit Rubro Modal -->
<Modal open={!!editingRubro} title="Editar Rubro" onClose={closeModals}>
  {#if editingRubro}
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
      <input type="hidden" name="id" value={editingRubro.id} />
      
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
        <label for="edit-descripcion" class="label">Descripción</label>
        <input 
          type="text" 
          id="edit-descripcion" 
          name="descripcion"
          bind:value={descripcion}
          class="input"
        />
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="edit-color" class="label">Color</label>
          <div class="flex gap-2">
            <input 
              type="color" 
              id="edit-color" 
              name="color"
              bind:value={color}
              class="w-12 h-10 rounded-lg cursor-pointer"
            />
            <input 
              type="text" 
              value={color}
              onchange={(e) => color = e.currentTarget.value}
              class="input flex-1"
            />
          </div>
        </div>
        <div>
          <label for="edit-orden" class="label">Orden</label>
          <input 
            type="number" 
            id="edit-orden" 
            name="orden"
            bind:value={orden}
            class="input"
            min="0"
          />
        </div>
      </div>
      
      <div>
        <label for="edit-icono" class="label">Ícono (emoji)</label>
        <input 
          type="text" 
          id="edit-icono" 
          name="icono"
          bind:value={icono}
          class="input"
          placeholder="🏪"
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
          <span class="text-sm font-medium">Rubro activo</span>
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
<Modal open={!!deletingId} title="¿Eliminar rubro?" onClose={closeModals}>
  <p class="text-slate-600 mb-6">
    Esta acción no se puede deshacer. Solo puedes eliminar rubros sin aportes asociados.
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
