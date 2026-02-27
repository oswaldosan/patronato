<script lang="ts">
  import { enhance } from '$app/forms';

  let { form } = $props();

  let loading = $state(false);
</script>

<svelte:head>
  <title>Iniciar Sesión – Patronato Monterrey Admin</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 px-4">
  <div class="w-full max-w-md">
    <!-- Logo -->
    <div class="text-center mb-8">
      <div class="w-16 h-16 bg-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-900/50 border border-primary-600">
        <svg class="w-10 h-10 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      <h1 class="text-2xl font-display font-bold text-white">Panel de Administración</h1>
      <p class="text-primary-300 mt-1">Patronato de Monterrey – Comité de Desarrollo</p>
    </div>

    <!-- Form Card -->
    <div class="bg-white rounded-2xl shadow-2xl p-8">
      <h2 class="text-xl font-display font-semibold text-slate-900 mb-6">Iniciar Sesión</h2>

      {#if form?.error}
        <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {form.error}
        </div>
      {/if}

      <form
        method="POST"
        use:enhance={() => {
          loading = true;
          return async ({ update }) => {
            loading = false;
            await update();
          };
        }}
        class="space-y-5"
      >
        <div>
          <label for="email" class="label">Correo electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form?.email ?? ''}
            class="input"
            placeholder="admin@patronato-monterrey.org"
            required
          />
        </div>

        <div>
          <label for="password" class="label">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            class="input"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full btn btn-primary btn-lg"
          disabled={loading}
        >
          {#if loading}
            <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Ingresando...
          {:else}
            Ingresar al sistema
          {/if}
        </button>
      </form>
    </div>

    <!-- Back link -->
    <div class="text-center mt-6">
      <a href="/" class="text-primary-300 hover:text-white text-sm transition-colors">
        ← Volver al portal público
      </a>
    </div>
  </div>
</div>
