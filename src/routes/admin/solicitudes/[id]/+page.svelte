<script lang="ts">
  import { enhance } from '$app/forms';
  import Badge from '$lib/components/Badge.svelte';
  import { formatCurrency, formatDateTime } from '$lib/utils/format';

  let { data, form } = $props();

  let showDeleteConfirm = $state(false);
  let notasAdmin = $state(data.solicitud.notasAdmin ?? '');

  const estadoVariant = (e: string) => {
    switch (e) {
      case 'APROBADO': return 'success' as const;
      case 'PENDIENTE': return 'warning' as const;
      case 'RECHAZADO': return 'danger' as const;
      default: return 'default' as const;
    }
  };

  const estadoLabel: Record<string, string> = {
    PENDIENTE: 'Pendiente',
    APROBADO: 'Aprobado',
    RECHAZADO: 'Rechazado',
  };
</script>

<svelte:head>
  <title>Solicitud de {data.solicitud.nombre} - Admin</title>
</svelte:head>

<div class="max-w-4xl mx-auto">
  <div class="mb-8">
    <a href="/admin/solicitudes" class="text-sm text-slate-600 hover:text-primary-600 mb-2 inline-block">
      ← Volver a solicitudes
    </a>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="page-title">Solicitud de Donación</h1>
        <p class="text-slate-600 mt-1">De: {data.solicitud.nombre}</p>
      </div>
      <Badge variant={estadoVariant(data.solicitud.estado)}>
        {estadoLabel[data.solicitud.estado] ?? data.solicitud.estado}
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
      {form.approved ? 'Solicitud aprobada correctamente' : form.rejected ? 'Solicitud rechazada' : 'Acción realizada'}
    </div>
  {/if}

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Info principal -->
    <div class="lg:col-span-2 space-y-6">
      <!-- Datos del solicitante -->
      <div class="card p-6">
        <h3 class="font-display font-semibold text-slate-800 mb-4">Datos del aportante</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Nombre</p>
            <p class="font-medium text-slate-900 text-lg">{data.solicitud.nombre}</p>
          </div>
          <div>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Identidad</p>
            <p class="font-mono font-semibold text-slate-800">{data.solicitud.identidad}</p>
          </div>
          <div>
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Teléfono / WhatsApp</p>
            <a
              href="https://wa.me/{data.solicitud.telefono.replace(/[^0-9+]/g, '')}"
              target="_blank"
              rel="noopener noreferrer"
              class="font-medium text-green-600 hover:underline inline-flex items-center gap-1"
            >
              {data.solicitud.telefono}
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
          </div>
          {#if data.solicitud.monto}
            <div>
              <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Monto reportado</p>
              <p class="font-display font-bold text-2xl text-primary-700">{formatCurrency(data.solicitud.monto)}</p>
            </div>
          {/if}
        </div>

        {#if data.solicitud.mensaje}
          <div class="mt-4 pt-4 border-t border-slate-200">
            <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Mensaje</p>
            <p class="text-slate-700">{data.solicitud.mensaje}</p>
          </div>
        {/if}
      </div>

      <!-- Comprobante -->
      {#if data.solicitud.comprobante}
        <div class="card p-6">
          <h3 class="font-display font-semibold text-slate-800 mb-4">Comprobante de Depósito</h3>
          <div class="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
            <img
              src={data.solicitud.comprobante}
              alt="Comprobante de depósito"
              class="w-full max-h-[600px] object-contain"
            />
          </div>
        </div>
      {:else}
        <div class="card p-6">
          <h3 class="font-display font-semibold text-slate-800 mb-4">Comprobante</h3>
          <div class="py-8 text-center text-slate-400">
            <svg class="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p class="text-sm">No se adjuntó comprobante</p>
          </div>
        </div>
      {/if}
    </div>

    <!-- Sidebar -->
    <div class="space-y-6">
      <div class="card p-6">
        <h3 class="font-display font-semibold text-slate-800 mb-4">Información</h3>
        <div class="space-y-4 text-sm">
          <div>
            <p class="text-slate-500">Recibido</p>
            <p class="font-medium">{formatDateTime(data.solicitud.createdAt)}</p>
          </div>
          <div>
            <p class="text-slate-500">Actualizado</p>
            <p class="font-medium">{formatDateTime(data.solicitud.updatedAt)}</p>
          </div>
        </div>
      </div>

      <!-- Acciones -->
      <div class="card p-6 space-y-4">
        <h3 class="font-display font-semibold text-slate-800 mb-2">Acciones</h3>

        <div>
          <label for="notasAdmin" class="label">Notas internas</label>
          <textarea
            id="notasAdmin"
            bind:value={notasAdmin}
            rows="2"
            class="input text-sm"
            placeholder="Notas sobre esta solicitud..."
          ></textarea>
        </div>

        {#if data.solicitud.estado === 'PENDIENTE'}
          <form method="POST" action="?/approve">
            <input type="hidden" name="notasAdmin" value={notasAdmin} />
            <button type="submit" class="btn btn-primary w-full">
              ✓ Aprobar Solicitud
            </button>
          </form>
          <form method="POST" action="?/reject">
            <input type="hidden" name="notasAdmin" value={notasAdmin} />
            <button type="submit" class="btn btn-secondary w-full">
              ✗ Rechazar
            </button>
          </form>
        {:else if data.solicitud.estado === 'RECHAZADO'}
          <form method="POST" action="?/approve">
            <input type="hidden" name="notasAdmin" value={notasAdmin} />
            <button type="submit" class="btn btn-primary w-full">
              ✓ Aprobar Solicitud
            </button>
          </form>
        {:else if data.solicitud.estado === 'APROBADO'}
          <form method="POST" action="?/reject">
            <input type="hidden" name="notasAdmin" value={notasAdmin} />
            <button type="submit" class="btn btn-secondary w-full">
              ✗ Rechazar
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
        ¿Eliminar solicitud?
      </h3>
      <p class="text-slate-600 mb-6">
        Esta acción no se puede deshacer.
      </p>
      <div class="flex justify-end gap-3">
        <button onclick={() => showDeleteConfirm = false} class="btn btn-secondary">
          Cancelar
        </button>
        <form method="POST" action="?/delete">
          <button type="submit" class="btn btn-danger">Eliminar</button>
        </form>
      </div>
    </div>
  </div>
{/if}
