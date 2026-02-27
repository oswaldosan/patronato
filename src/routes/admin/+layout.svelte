<script lang="ts">
  import { page } from '$app/stores';
  import '../../app.css';

  let { data, children } = $props();

  let sidebarOpen = $state(false);
  const baseNavItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/donantes', label: 'Donantes', icon: '👥' },
    { href: '/admin/rubros', label: 'Categorías', icon: '📁' },
    { href: '/admin/aportes', label: 'Donaciones', icon: '💰' },
    { href: '/admin/egresos', label: 'Gastos', icon: '📤' },
    { href: '/admin/reportes', label: 'Reportes', icon: '📑' },
    { href: '/admin/auditoria', label: 'Auditoría', icon: '📋' },
  ];
  const navItems = $derived([
    ...baseNavItems,
    ...(data?.user?.role === 'ADMIN'
      ? [
          { href: '/admin/usuarios', label: 'Usuarios', icon: '👤' },
          { href: '/admin/configuracion', label: 'Configuración', icon: '⚙️' },
        ]
      : []),
  ]);

  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }
</script>

{#if !data.user}
  {@render children()}
{:else}
  <div class="min-h-screen bg-slate-100">
    <!-- Mobile Header -->
    <header class="lg:hidden bg-white border-b border-slate-200 sticky top-0 z-40">
      <div class="flex items-center justify-between px-4 h-16">
        <button onclick={toggleSidebar} class="p-2 rounded-lg hover:bg-slate-100" aria-label="Abrir menu">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-primary-700 flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span class="font-display font-bold text-slate-900">Panel Administrativo</span>
        </div>
        <a href="/" class="text-sm text-primary-700 font-medium">Ver sitio</a>
      </div>
    </header>

    <!-- Sidebar Overlay -->
    {#if sidebarOpen}
      <div
        class="fixed inset-0 bg-black/50 z-40 lg:hidden"
        role="button"
        tabindex="0"
        aria-label="Cerrar menú lateral"
        onclick={() => sidebarOpen = false}
        onkeydown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            sidebarOpen = false;
          }
        }}
      ></div>
    {/if}

    <!-- Sidebar -->
    <aside class="fixed inset-y-0 left-0 z-50 w-64 bg-primary-950 transform transition-transform duration-300 lg:translate-x-0 {sidebarOpen ? 'translate-x-0' : '-translate-x-full'}">
      <div class="flex flex-col h-full">
        <!-- Logo -->
        <div class="flex items-center gap-3 px-5 h-16 border-b border-primary-900">
          <div class="w-10 h-10 rounded-xl bg-primary-800 flex items-center justify-center shrink-0">
            <svg class="w-6 h-6 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <span class="font-display font-bold text-white text-sm leading-tight block">Patronato Monterrey</span>
            <span class="text-xs text-accent-400 font-medium">Panel Administrativo</span>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
          {#each navItems as item}
            <a
              href={item.href}
              onclick={() => sidebarOpen = false}
              class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors {$page.url.pathname === item.href ? 'bg-primary-700 text-white' : 'text-primary-200 hover:bg-primary-900 hover:text-white'}"
            >
              <span class="text-base">{item.icon}</span>
              {item.label}
            </a>
          {/each}
        </nav>

        <!-- User -->
        <div class="p-4 border-t border-primary-900">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-primary-800 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {data.user.name.charAt(0).toUpperCase()}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-white truncate">{data.user.name}</p>
              <p class="text-xs text-primary-300 truncate">{data.user.email}</p>
            </div>
          </div>
          <div class="flex gap-2">
            <a href="/" class="flex-1 btn btn-sm bg-primary-900 text-primary-200 hover:bg-primary-800 text-center text-xs">
              Ver sitio
            </a>
            <form action="/admin/logout" method="POST" class="flex-1">
              <button type="submit" class="w-full btn btn-sm bg-red-600/20 text-red-400 hover:bg-red-600/30 text-xs">
                Salir
              </button>
            </form>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="lg:ml-64 min-h-screen">
      <div class="p-4 lg:p-8">
        {@render children()}
      </div>
    </main>
  </div>
{/if}
