<script lang="ts">
  type Role = 'ADMIN' | 'VIEWER';

  type UserRow = {
    id: string;
    name: string;
    email: string;
    role: Role;
    activo: boolean;
    createdAt: string;
  };

  export let data: {
    users: UserRow[];
    stats: {
      total: number;
      activos: number;
      inactivos: number;
      viewers: number;
    };
    generatedAt: string;
  };

  const dateFormatter = new Intl.DateTimeFormat('es-HN', { dateStyle: 'medium' });
  const dateTimeFormatter = new Intl.DateTimeFormat('es-HN', { dateStyle: 'medium', timeStyle: 'short' });

  const roleStyles: Record<Role, { label: string; classes: string }> = {
    ADMIN: {
      label: 'Administrador',
      classes: 'bg-primary-50 text-primary-700 border border-primary-100',
    },
    VIEWER: {
      label: 'Consulta',
      classes: 'bg-slate-100 text-slate-700 border border-slate-200',
    },
  };

  const adminCount = data.stats.total - data.stats.viewers;

  const statCards = [
    { label: 'Usuarios totales', value: data.stats.total, accent: 'text-slate-900', helper: 'Registros en el sistema' },
    { label: 'Activos', value: data.stats.activos, accent: 'text-green-600', helper: 'Pueden iniciar sesión' },
    { label: 'Inactivos', value: data.stats.inactivos, accent: 'text-amber-600', helper: 'Acceso suspendido' },
    { label: 'Administradores', value: adminCount, accent: 'text-primary-600', helper: 'Con rol completo' },
  ];

  const formatDate = (value: string) => dateFormatter.format(new Date(value));
  $: lastUpdatedLabel = dateTimeFormatter.format(new Date(data.generatedAt));
</script>

<section class="mb-8">
  <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
    <div>
      <p class="text-sm font-semibold text-primary-600 uppercase tracking-wide">Control de accesos</p>
      <h1 class="page-title">Usuarios administrativos</h1>
      <p class="text-sm text-slate-500 mt-2">
        Registra y administra las personas autorizadas para cargar aportes, egresos y reportes.
      </p>
    </div>
    <div class="bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
      <p class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Última actualización</p>
      <p class="text-lg font-display text-slate-900">{lastUpdatedLabel}</p>
    </div>
  </div>
</section>

<section class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
  {#each statCards as stat}
    <article class="stat-card">
      <p class="text-xs font-semibold text-slate-500 uppercase tracking-wide">{stat.label}</p>
      <p class={`stat-value mt-2 ${stat.accent}`}>{stat.value}</p>
      <p class="stat-label">{stat.helper}</p>
    </article>
  {/each}
</section>

<section class="card p-6 mb-10">
  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
    <div>
      <h2 class="section-title">Crear nuevo usuario</h2>
      <p class="text-sm text-slate-500">Comparte el acceso institucional sin exponer la contraseña maestra.</p>
    </div>
    <p class="text-xs text-slate-400 bg-slate-100 rounded-full px-4 py-1 inline-flex items-center gap-1">
      🔐 Contraseñas se guardan cifradas automáticamente
    </p>
  </div>
  <form method="POST" action="?/create" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div>
      <label class="label" for="name">Nombre completo</label>
      <input id="name" name="name" placeholder="Ej. María Fernández" required class="input" />
    </div>
    <div>
      <label class="label" for="email">Correo institucional</label>
      <input id="email" name="email" type="email" placeholder="correo@comite.org" required class="input" />
    </div>
    <div>
      <label class="label" for="password">Contraseña temporal</label>
      <input id="password" name="password" type="password" minlength="8" placeholder="Mínimo 8 caracteres" required class="input" />
    </div>
    <div>
      <label class="label" for="role">Tipo de acceso</label>
      <select id="role" name="role" class="select">
        <option value="ADMIN">Administración completa</option>
        <option value="VIEWER">Solo consulta</option>
      </select>
    </div>
    <div class="md:col-span-2 lg:col-span-4 flex flex-col sm:flex-row gap-3">
      <button type="submit" class="btn btn-primary flex-1">Registrar usuario</button>
      <p class="text-xs text-slate-400 flex items-center">Se enviará la contraseña temporal por el canal que definas.</p>
    </div>
  </form>
</section>

<section>
  <div class="flex items-center justify-between mb-4">
    <h2 class="section-title">Listado de usuarios</h2>
    <span class="text-sm text-slate-500">{data.users.length} registros</span>
  </div>
  {#if data.users.length === 0}
    <div class="card p-8 text-center text-slate-500">
      No hay usuarios registrados aún. Utiliza el formulario superior para crear el primero.
    </div>
  {:else}
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Creado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {#each data.users as u}
            <tr>
              <td>
                <p class="font-semibold text-slate-900">{u.name}</p>
                <p class="text-xs text-slate-500">ID: {u.id}</p>
              </td>
              <td>
                <p>{u.email}</p>
                <p class="text-xs text-slate-400">Último cambio: {formatDate(u.createdAt)}</p>
              </td>
              <td>
                <span class={`badge ${roleStyles[u.role].classes}`}>
                  {roleStyles[u.role].label}
                </span>
              </td>
              <td>
                <span class={`badge ${u.activo ? 'badge-success' : 'badge-warning'}`}>
                  {u.activo ? 'Activo' : 'Inactivo'}
                </span>
              </td>
              <td>{formatDate(u.createdAt)}</td>
              <td>
                <div class="flex flex-col gap-2 min-w-[220px]">
                  <form method="POST" action="?/toggleActive" class="flex gap-2 items-center">
                    <input type="hidden" name="id" value={u.id} />
                    <button type="submit" class={`btn btn-sm ${u.activo ? 'btn-secondary' : 'btn-primary'}`}>
                      {u.activo ? 'Desactivar' : 'Activar'}
                    </button>
                  </form>
                  <form method="POST" action="?/resetPassword" class="flex gap-2 items-center">
                    <input type="hidden" name="id" value={u.id} />
                    <input
                      name="password"
                      type="password"
                      minlength="8"
                      placeholder="Nueva contraseña"
                      required
                      class="input"
                    />
                    <button type="submit" class="btn btn-sm btn-outline">Actualizar</button>
                  </form>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</section>
