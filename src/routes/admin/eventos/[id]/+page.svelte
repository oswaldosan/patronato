<script lang="ts">
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';
  import Badge from '$lib/components/Badge.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { formatCurrency, formatDateShort, formatDateTime, metodoPagoLabels } from '$lib/utils/format';

  let { data, form } = $props();

  type Ingreso = typeof data.ingresos[0];
  type Gasto = typeof data.gastos[0];

  let loading = $state(false);
  let showDeleteConfirm = $state(false);
  let preview: string | null = $state(null);

  // Ingresos
  let showNewIngreso = $state(false);
  let editingIngreso = $state<Ingreso | null>(null);
  let deletingIngresoId = $state<string | null>(null);

  // Gastos
  let showNewGasto = $state(false);
  let editingGasto = $state<Gasto | null>(null);
  let deletingGastoId = $state<string | null>(null);

  // Excel
  let showDeleteExcel = $state(false);
  let uploadingExcel = $state(false);
  let excelFileName = $state<string | null>(null);

  function handleExcelChange(event: Event) {
    const input = event.target as HTMLInputElement;
    excelFileName = input.files?.[0]?.name ?? null;
  }

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        preview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  function closeModals() {
    showNewIngreso = false;
    editingIngreso = null;
    deletingIngresoId = null;
    showNewGasto = false;
    editingGasto = null;
    deletingGastoId = null;
    showDeleteExcel = false;
  }

  const enhanceAndClose: SubmitFunction = () => {
    return async ({ result, update }) => {
      if (result.type === 'success') {
        closeModals();
      }
      await update();
    };
  };

  const hoy = new Date().toISOString().split('T')[0];
</script>

<svelte:head>
  <title>{data.evento.nombre} - Admin</title>
</svelte:head>

<div class="max-w-5xl mx-auto space-y-8">
  <div>
    <a href="/admin/eventos" class="text-sm text-slate-600 hover:text-primary-600 mb-2 inline-block">
      ← Volver a eventos
    </a>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="page-title">Editar Evento</h1>
        <p class="text-slate-600 mt-1">ID: {data.evento.id}</p>
      </div>
      <Badge variant={data.evento.publicado ? 'success' : 'warning'}>
        {data.evento.publicado ? 'Publicado' : 'Borrador'}
      </Badge>
    </div>
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
          <label for="nombre" class="label">Nombre *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={data.evento.nombre}
            class="input"
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
          >{data.evento.descripcion ?? ''}</textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="fecha" class="label">Fecha *</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={data.evento.fecha}
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
              value={data.evento.lugar ?? ''}
              class="input"
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
              {#if preview || data.evento.foto1}
                <img src={preview ?? data.evento.foto1} alt="Foto del evento" class="w-full h-full object-cover" />
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
          <p class="text-xs text-slate-500 mt-2">Haz clic para reemplazar la foto. Formatos: JPG, PNG, WebP, GIF. Máx 5MB.</p>
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
        <h3 class="font-display font-semibold text-slate-800 mb-4">Resumen Financiero</h3>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span class="text-slate-500">Total ingresos</span>
            <span class="font-semibold text-green-600">{formatCurrency(data.financiero.totalIngresos)}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">Total gastos</span>
            <span class="font-semibold text-red-600">{formatCurrency(data.financiero.totalGastos)}</span>
          </div>
          <div class="border-t border-slate-200 pt-2 flex justify-between">
            <span class="text-slate-600 font-medium">Balance</span>
            <span class="font-bold {data.financiero.balance >= 0 ? 'text-green-700' : 'text-red-700'}">
              {formatCurrency(data.financiero.balance)}
            </span>
          </div>
          <div class="text-xs text-slate-400 pt-1">
            {data.ingresos.length} ingreso{data.ingresos.length !== 1 ? 's' : ''} · {data.gastos.length} gasto{data.gastos.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      <div class="card p-6">
        <h3 class="font-display font-semibold text-slate-800 mb-4">Información</h3>
        <div class="space-y-4 text-sm">
          <div>
            <p class="text-slate-500">Creado</p>
            <p class="font-medium">{formatDateTime(data.evento.createdAt)}</p>
          </div>
          <div>
            <p class="text-slate-500">Actualizado</p>
            <p class="font-medium">{formatDateTime(data.evento.updatedAt)}</p>
          </div>
        </div>
      </div>

      <div class="card p-6 space-y-3">
        <h3 class="font-display font-semibold text-slate-800 mb-4">Acciones</h3>

        {#if !data.evento.publicado}
          <form method="POST" action="?/publish">
            <button type="submit" class="btn btn-primary w-full">
              ✓ Publicar Evento
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

  <!-- Excel del evento -->
  <div class="card p-6">
    <h2 class="font-display font-semibold text-slate-900 mb-1">Excel del evento</h2>
    <p class="text-sm text-slate-500 mb-4">
      El archivo se mostrará como tabla en la página pública del evento. Al subir uno nuevo se reemplaza el anterior.
    </p>

    {#if data.evento.excelNombre}
      <div class="flex flex-wrap items-center gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl mb-4">
        <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
          <svg class="w-5 h-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-6h6v6m-3-13v4m-7 9a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10z" />
          </svg>
        </div>
        <div class="min-w-0 flex-1">
          <p class="font-medium text-slate-900 truncate">{data.evento.excelNombre}</p>
          {#if data.evento.excelActualizado}
            <p class="text-xs text-slate-500">Actualizado: {formatDateTime(data.evento.excelActualizado)}</p>
          {/if}
        </div>
        <button
          onclick={() => showDeleteExcel = true}
          class="btn btn-sm btn-outline text-red-600 border-red-200 hover:bg-red-50"
        >
          Eliminar
        </button>
      </div>
    {/if}

    <form
      method="POST"
      action="?/subirExcel"
      enctype="multipart/form-data"
      use:enhance={() => {
        uploadingExcel = true;
        return async ({ update }) => {
          uploadingExcel = false;
          excelFileName = null;
          await update();
        };
      }}
      class="flex flex-wrap items-center gap-3"
    >
      <label
        for="excel"
        class="btn btn-secondary cursor-pointer"
      >
        {excelFileName ?? (data.evento.excelNombre ? 'Seleccionar nuevo archivo' : 'Seleccionar archivo')}
      </label>
      <input
        type="file"
        id="excel"
        name="excel"
        accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        class="hidden"
        onchange={handleExcelChange}
      />
      <button type="submit" class="btn btn-primary" disabled={uploadingExcel || !excelFileName}>
        {uploadingExcel ? 'Subiendo...' : (data.evento.excelNombre ? 'Reemplazar' : 'Subir Excel')}
      </button>
    </form>
    <p class="text-xs text-slate-500 mt-2">Formatos: XLSX, XLS. Máx 5MB.</p>
  </div>

  <!-- Ingresos -->
  <div class="card overflow-hidden">
    <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200">
      <div>
        <h2 class="font-display font-semibold text-slate-900">Ingresos del evento</h2>
        <p class="text-sm text-slate-500">Total: {formatCurrency(data.financiero.totalIngresos)}</p>
      </div>
      <button onclick={() => showNewIngreso = true} class="btn btn-sm btn-primary">
        + Agregar ingreso
      </button>
    </div>
    {#if data.ingresos.length === 0}
      <p class="px-6 py-8 text-center text-sm text-slate-500">No hay ingresos registrados para este evento.</p>
    {:else}
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-500">
              <th class="px-4 py-3 font-medium">Concepto</th>
              <th class="px-4 py-3 font-medium">Fecha</th>
              <th class="px-4 py-3 font-medium">Método</th>
              <th class="px-4 py-3 font-medium text-right">Monto</th>
              <th class="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {#each data.ingresos as ingreso}
              <tr class="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td class="px-4 py-3">
                  <p class="font-medium text-slate-900">{ingreso.concepto}</p>
                  {#if ingreso.notas}
                    <p class="text-xs text-slate-500">{ingreso.notas}</p>
                  {/if}
                </td>
                <td class="px-4 py-3 text-slate-600">{formatDateShort(ingreso.fecha)}</td>
                <td class="px-4 py-3 text-slate-600">{metodoPagoLabels[ingreso.metodoPago]}</td>
                <td class="px-4 py-3 text-right font-semibold text-green-600">{formatCurrency(ingreso.monto)}</td>
                <td class="px-4 py-3 text-right">
                  <div class="flex justify-end gap-2">
                    <button onclick={() => editingIngreso = ingreso} class="btn btn-sm btn-secondary">Editar</button>
                    <button
                      onclick={() => deletingIngresoId = ingreso.id}
                      class="btn btn-sm btn-outline text-red-600 border-red-200 hover:bg-red-50"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>

  <!-- Gastos -->
  <div class="card overflow-hidden">
    <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200">
      <div>
        <h2 class="font-display font-semibold text-slate-900">Gastos del evento</h2>
        <p class="text-sm text-slate-500">Total: {formatCurrency(data.financiero.totalGastos)}</p>
      </div>
      <button onclick={() => showNewGasto = true} class="btn btn-sm btn-primary">
        + Agregar gasto
      </button>
    </div>
    {#if data.gastos.length === 0}
      <p class="px-6 py-8 text-center text-sm text-slate-500">No hay gastos registrados para este evento.</p>
    {:else}
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-left text-xs uppercase tracking-wider text-slate-500">
              <th class="px-4 py-3 font-medium">Concepto</th>
              <th class="px-4 py-3 font-medium">Fecha</th>
              <th class="px-4 py-3 font-medium">Proveedor</th>
              <th class="px-4 py-3 font-medium text-right">Monto</th>
              <th class="px-4 py-3 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {#each data.gastos as gasto}
              <tr class="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                <td class="px-4 py-3">
                  <p class="font-medium text-slate-900">{gasto.concepto}</p>
                  {#if gasto.notas}
                    <p class="text-xs text-slate-500">{gasto.notas}</p>
                  {/if}
                </td>
                <td class="px-4 py-3 text-slate-600">{formatDateShort(gasto.fecha)}</td>
                <td class="px-4 py-3 text-slate-600">{gasto.proveedorNombre ?? '-'}</td>
                <td class="px-4 py-3 text-right font-semibold text-red-600">{formatCurrency(gasto.monto)}</td>
                <td class="px-4 py-3 text-right">
                  <div class="flex justify-end gap-2">
                    <button onclick={() => editingGasto = gasto} class="btn btn-sm btn-secondary">Editar</button>
                    <button
                      onclick={() => deletingGastoId = gasto.id}
                      class="btn btn-sm btn-outline text-red-600 border-red-200 hover:bg-red-50"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>

<!-- New/Edit Ingreso Modal -->
<Modal open={showNewIngreso || !!editingIngreso} title={editingIngreso ? 'Editar Ingreso' : 'Nuevo Ingreso'} onClose={closeModals}>
  <form
    method="POST"
    action={editingIngreso ? '?/updateIngreso' : '?/createIngreso'}
    use:enhance={enhanceAndClose}
    class="space-y-4"
  >
    {#if editingIngreso}
      <input type="hidden" name="id" value={editingIngreso.id} />
    {/if}

    <div>
      <label for="ingreso-concepto" class="label">Concepto *</label>
      <input
        type="text"
        id="ingreso-concepto"
        name="concepto"
        value={editingIngreso?.concepto ?? ''}
        class="input"
        required
        placeholder="Ej: Venta de entradas"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label for="ingreso-monto" class="label">Monto (L.) *</label>
        <input
          type="number"
          id="ingreso-monto"
          name="monto"
          step="0.01"
          min="0.01"
          value={editingIngreso?.monto ?? ''}
          class="input"
          required
          placeholder="0.00"
        />
      </div>
      <div>
        <label for="ingreso-fecha" class="label">Fecha *</label>
        <input
          type="date"
          id="ingreso-fecha"
          name="fecha"
          value={editingIngreso?.fecha ?? hoy}
          class="input"
          required
        />
      </div>
    </div>

    <div>
      <label for="ingreso-metodo" class="label">Método de pago *</label>
      <select id="ingreso-metodo" name="metodoPago" class="select" required>
        {#each Object.entries(metodoPagoLabels) as [value, label]}
          <option {value} selected={editingIngreso?.metodoPago === value}>{label}</option>
        {/each}
      </select>
    </div>

    <div>
      <label for="ingreso-notas" class="label">Notas</label>
      <textarea
        id="ingreso-notas"
        name="notas"
        rows="2"
        class="input"
      >{editingIngreso?.notas ?? ''}</textarea>
    </div>

    <div class="flex justify-end gap-3 pt-4">
      <button type="button" onclick={closeModals} class="btn btn-secondary">Cancelar</button>
      <button type="submit" class="btn btn-primary">{editingIngreso ? 'Guardar' : 'Registrar'}</button>
    </div>
  </form>
</Modal>

<!-- Delete Ingreso Modal -->
<Modal open={!!deletingIngresoId} title="¿Eliminar ingreso?" onClose={closeModals}>
  <p class="text-slate-600 mb-6">Esta acción no se puede deshacer.</p>
  <div class="flex justify-end gap-3">
    <button onclick={closeModals} class="btn btn-secondary">Cancelar</button>
    <form method="POST" action="?/deleteIngreso" use:enhance={enhanceAndClose}>
      <input type="hidden" name="id" value={deletingIngresoId} />
      <button type="submit" class="btn btn-danger">Eliminar</button>
    </form>
  </div>
</Modal>

<!-- New/Edit Gasto Modal -->
<Modal open={showNewGasto || !!editingGasto} title={editingGasto ? 'Editar Gasto' : 'Nuevo Gasto'} onClose={closeModals}>
  <form
    method="POST"
    action={editingGasto ? '?/updateGasto' : '?/createGasto'}
    use:enhance={enhanceAndClose}
    class="space-y-4"
  >
    {#if editingGasto}
      <input type="hidden" name="id" value={editingGasto.id} />
    {/if}

    <div>
      <label for="gasto-concepto" class="label">Concepto *</label>
      <input
        type="text"
        id="gasto-concepto"
        name="concepto"
        value={editingGasto?.concepto ?? ''}
        class="input"
        required
        placeholder="Ej: Alquiler de sonido"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label for="gasto-monto" class="label">Monto (L.) *</label>
        <input
          type="number"
          id="gasto-monto"
          name="monto"
          step="0.01"
          min="0.01"
          value={editingGasto?.monto ?? ''}
          class="input"
          required
          placeholder="0.00"
        />
      </div>
      <div>
        <label for="gasto-fecha" class="label">Fecha *</label>
        <input
          type="date"
          id="gasto-fecha"
          name="fecha"
          value={editingGasto?.fecha ?? hoy}
          class="input"
          required
        />
      </div>
    </div>

    <div>
      <label for="gasto-proveedor" class="label">
        Proveedor
        <span class="text-slate-400 font-normal">(opcional)</span>
      </label>
      <select id="gasto-proveedor" name="proveedorId" class="select">
        <option value="">Sin proveedor</option>
        {#each data.proveedores as proveedor}
          <option value={proveedor.id} selected={editingGasto?.proveedorId === proveedor.id}>
            {proveedor.nombre}
          </option>
        {/each}
      </select>
    </div>

    <div>
      <label for="gasto-notas" class="label">Notas</label>
      <textarea
        id="gasto-notas"
        name="notas"
        rows="2"
        class="input"
      >{editingGasto?.notas ?? ''}</textarea>
    </div>

    <div class="flex justify-end gap-3 pt-4">
      <button type="button" onclick={closeModals} class="btn btn-secondary">Cancelar</button>
      <button type="submit" class="btn btn-primary">{editingGasto ? 'Guardar' : 'Registrar'}</button>
    </div>
  </form>
</Modal>

<!-- Delete Gasto Modal -->
<Modal open={!!deletingGastoId} title="¿Eliminar gasto?" onClose={closeModals}>
  <p class="text-slate-600 mb-6">Esta acción no se puede deshacer.</p>
  <div class="flex justify-end gap-3">
    <button onclick={closeModals} class="btn btn-secondary">Cancelar</button>
    <form method="POST" action="?/deleteGasto" use:enhance={enhanceAndClose}>
      <input type="hidden" name="id" value={deletingGastoId} />
      <button type="submit" class="btn btn-danger">Eliminar</button>
    </form>
  </div>
</Modal>

<!-- Delete Excel Modal -->
<Modal open={showDeleteExcel} title="¿Eliminar Excel?" onClose={closeModals}>
  <p class="text-slate-600 mb-6">
    Se eliminará el archivo Excel del evento y dejará de mostrarse en la página pública. Esta acción no se puede deshacer.
  </p>
  <div class="flex justify-end gap-3">
    <button onclick={closeModals} class="btn btn-secondary">Cancelar</button>
    <form method="POST" action="?/eliminarExcel" use:enhance={enhanceAndClose}>
      <button type="submit" class="btn btn-danger">Eliminar</button>
    </form>
  </div>
</Modal>

<!-- Delete Evento Modal -->
<Modal open={showDeleteConfirm} title="¿Eliminar evento?" onClose={() => showDeleteConfirm = false}>
  <p class="text-slate-600 mb-6">
    Se eliminarán también todos los ingresos y gastos del evento, junto con su foto. Esta acción no se puede deshacer.
  </p>
  <div class="flex justify-end gap-3">
    <button onclick={() => showDeleteConfirm = false} class="btn btn-secondary">Cancelar</button>
    <form method="POST" action="?/delete">
      <button type="submit" class="btn btn-danger">Eliminar</button>
    </form>
  </div>
</Modal>
