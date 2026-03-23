<script lang="ts">
  import { enhance } from '$app/forms';

  let { form } = $props();

  let loading = $state(false);
</script>

<svelte:head>
  <title>Iniciar Sesión – Patronato Pro Mejoramiento de Monterrey</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 px-4">
  <div class="w-full max-w-md">
    <!-- Logo -->
    <div class="text-center mb-8">
      <img src="/logo.png" alt="Patronato Pro Mejoramiento de Monterrey" class="w-20 h-20 rounded-2xl object-contain mx-auto mb-4 shadow-lg shadow-primary-900/50" />
      <h1 class="text-2xl font-display font-bold text-white">Panel de Administración</h1>
      <p class="text-primary-300 mt-1">Patronato Pro Mejoramiento de Monterrey</p>
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
