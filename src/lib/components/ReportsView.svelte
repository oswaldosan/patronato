<script lang="ts">
  import { formatCurrency, formatNumber } from '$lib/utils/format';

  let { reportes } = $props();
</script>

<div class="space-y-10">
  <section class="card p-6">
    <h2 class="font-display font-semibold text-slate-800 mb-4">Resumen por periodo (mensual)</h2>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <p class="text-sm font-medium text-slate-700 mb-3">Ingresos</p>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Mes</th>
                <th class="text-right">Total</th>
                <th class="text-right">Aportes</th>
              </tr>
            </thead>
            <tbody>
              {#if reportes.aportesPorPeriodo.length === 0}
                <tr>
                  <td colspan="3" class="text-center text-slate-500 py-6">Sin datos en el periodo</td>
                </tr>
              {:else}
                {#each reportes.aportesPorPeriodo as row}
                  <tr>
                    <td>{row.mes}</td>
                    <td class="text-right font-semibold text-emerald-700">{formatCurrency(row.total)}</td>
                    <td class="text-right text-slate-500">{formatNumber(row.cantidad)}</td>
                  </tr>
                {/each}
              {/if}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <p class="text-sm font-medium text-slate-700 mb-3">Egresos</p>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Mes</th>
                <th class="text-right">Total</th>
                <th class="text-right">Egresos</th>
              </tr>
            </thead>
            <tbody>
              {#if reportes.egresosPorPeriodo.length === 0}
                <tr>
                  <td colspan="3" class="text-center text-slate-500 py-6">Sin datos en el periodo</td>
                </tr>
              {:else}
                {#each reportes.egresosPorPeriodo as row}
                  <tr>
                    <td>{row.mes}</td>
                    <td class="text-right font-semibold text-red-600">{formatCurrency(row.total)}</td>
                    <td class="text-right text-slate-500">{formatNumber(row.cantidad)}</td>
                  </tr>
                {/each}
              {/if}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>

  <section class="card p-6">
    <h2 class="font-display font-semibold text-slate-800 mb-4">Ingresos por rubro</h2>
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Rubro</th>
            <th class="text-right">Total</th>
            <th class="text-right">Aportes</th>
          </tr>
        </thead>
        <tbody>
          {#if reportes.aportesPorRubro.length === 0}
            <tr>
              <td colspan="3" class="text-center text-slate-500 py-6">Sin aportes verificados</td>
            </tr>
          {:else}
            {#each reportes.aportesPorRubro as row}
              <tr>
                <td>
                  <div class="flex items-center gap-2">
                    <span class="inline-flex w-2.5 h-2.5 rounded-full" style={`background:${row.color}`}></span>
                    {row.rubro}
                  </div>
                </td>
                <td class="text-right font-semibold text-emerald-700">{formatCurrency(row.total)}</td>
                <td class="text-right text-slate-500">{formatNumber(row.cantidad)}</td>
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>
  </section>

  <section class="card p-6">
    <h2 class="font-display font-semibold text-slate-800 mb-4">Egresos por rubro</h2>
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Rubro</th>
            <th class="text-right">Total</th>
            <th class="text-right">Egresos</th>
          </tr>
        </thead>
        <tbody>
          {#if reportes.egresosPorRubro.length === 0}
            <tr>
              <td colspan="3" class="text-center text-slate-500 py-6">Sin egresos verificados</td>
            </tr>
          {:else}
            {#each reportes.egresosPorRubro as row}
              <tr>
                <td>
                  <div class="flex items-center gap-2">
                    <span class="inline-flex w-2.5 h-2.5 rounded-full" style={`background:${row.color}`}></span>
                    {row.rubro}
                  </div>
                </td>
                <td class="text-right font-semibold text-red-600">{formatCurrency(row.total)}</td>
                <td class="text-right text-slate-500">{formatNumber(row.cantidad)}</td>
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>
  </section>

  <section class="card p-6">
    <h2 class="font-display font-semibold text-slate-800 mb-4">Aportes por donante</h2>
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Donante</th>
            <th class="text-right">Total</th>
            <th class="text-right">Aportes</th>
          </tr>
        </thead>
        <tbody>
          {#if reportes.aportesPorDonante.length === 0}
            <tr>
              <td colspan="3" class="text-center text-slate-500 py-6">Sin aportes en el periodo</td>
            </tr>
          {:else}
            {#each reportes.aportesPorDonante as row}
              <tr>
                <td>{row.donante}</td>
                <td class="text-right font-semibold text-emerald-700">{formatCurrency(row.total)}</td>
                <td class="text-right text-slate-500">{formatNumber(row.cantidad)}</td>
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>
  </section>

  <section class="card p-6">
    <h2 class="font-display font-semibold text-slate-800 mb-4">Egresos por proveedor</h2>
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Proveedor</th>
            <th class="text-right">Total</th>
            <th class="text-right">Egresos</th>
          </tr>
        </thead>
        <tbody>
          {#if reportes.egresosPorProveedor.length === 0}
            <tr>
              <td colspan="3" class="text-center text-slate-500 py-6">Sin egresos en el periodo</td>
            </tr>
          {:else}
            {#each reportes.egresosPorProveedor as row}
              <tr>
                <td>{row.proveedor}</td>
                <td class="text-right font-semibold text-red-600">{formatCurrency(row.total)}</td>
                <td class="text-right text-slate-500">{formatNumber(row.cantidad)}</td>
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>
  </section>

  <section class="card p-6">
    <h2 class="font-display font-semibold text-slate-800 mb-4">Balance historico</h2>
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Mes</th>
            <th class="text-right">Ingresos</th>
            <th class="text-right">Egresos</th>
            <th class="text-right">Balance</th>
          </tr>
        </thead>
        <tbody>
          {#if reportes.balanceHistorico.length === 0}
            <tr>
              <td colspan="4" class="text-center text-slate-500 py-6">Sin movimientos en el periodo</td>
            </tr>
          {:else}
            {#each reportes.balanceHistorico as row}
              <tr>
                <td>{row.mes}</td>
                <td class="text-right text-emerald-700">{formatCurrency(row.ingresos)}</td>
                <td class="text-right text-red-600">{formatCurrency(row.egresos)}</td>
                <td class="text-right font-semibold text-slate-900">{formatCurrency(row.balance)}</td>
              </tr>
            {/each}
          {/if}
        </tbody>
      </table>
    </div>
  </section>

  <section class="card p-6">
    <h2 class="font-display font-semibold text-slate-800 mb-4">Estados de verificacion</h2>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <p class="text-sm font-medium text-slate-700 mb-3">Aportes</p>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Estado</th>
                <th class="text-right">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {#if reportes.estados.aportes.length === 0}
                <tr>
                  <td colspan="2" class="text-center text-slate-500 py-6">Sin datos</td>
                </tr>
              {:else}
                {#each reportes.estados.aportes as row}
                  <tr>
                    <td>{row.estado}</td>
                    <td class="text-right text-slate-600">{formatNumber(row.cantidad)}</td>
                  </tr>
                {/each}
              {/if}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <p class="text-sm font-medium text-slate-700 mb-3">Egresos</p>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>Estado</th>
                <th class="text-right">Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {#if reportes.estados.egresos.length === 0}
                <tr>
                  <td colspan="2" class="text-center text-slate-500 py-6">Sin datos</td>
                </tr>
              {:else}
                {#each reportes.estados.egresos as row}
                  <tr>
                    <td>{row.estado}</td>
                    <td class="text-right text-slate-600">{formatNumber(row.cantidad)}</td>
                  </tr>
                {/each}
              {/if}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</div>
