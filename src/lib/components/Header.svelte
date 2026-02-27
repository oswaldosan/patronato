<script lang="ts">
  import { page } from '$app/stores';

  let mobileMenuOpen = $state(false);

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/movimientos', label: 'Donaciones' },
    { href: '/egresos', label: 'Gastos' },
    { href: '/buscar', label: 'Buscar Donante' },
    { href: '/reportes', label: 'Reportes' },
  ];

  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
</script>

<header class="sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-sm py-2 border-b border-primary-100/50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-14">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-3 group">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center shadow-md shadow-primary-700/30">
          <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div class="hidden sm:block">
          <span class="font-display font-bold text-lg text-slate-900 leading-tight">Patronato de Monterrey</span>
          <span class="block text-xs text-primary-600 -mt-0.5 font-medium">Comité de Desarrollo</span>
        </div>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-1">
        {#each navLinks as link}
          <a
            href={link.href}
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 {$page.url.pathname === link.href ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}"
          >
            {link.label}
          </a>
        {/each}
      </nav>

      <!-- Admin Link & Mobile Button -->
      <div class="flex items-center gap-3">
        <a
          href="/admin"
          class="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-700 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Admin
        </a>

        <button
          onclick={toggleMobileMenu}
          class="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {#if mobileMenuOpen}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            {/if}
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Nav -->
    {#if mobileMenuOpen}
      <nav class="md:hidden py-4 border-t border-slate-100 animate-slide-up">
        {#each navLinks as link}
          <a
            href={link.href}
            onclick={() => mobileMenuOpen = false}
            class="block px-4 py-3 rounded-lg text-sm font-medium transition-colors {$page.url.pathname === link.href ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-100'}"
          >
            {link.label}
          </a>
        {/each}
        <a
          href="/admin"
          class="block px-4 py-3 mt-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 border-t border-slate-100"
        >
          Panel Administrativo
        </a>
      </nav>
    {/if}
  </div>
</header>
