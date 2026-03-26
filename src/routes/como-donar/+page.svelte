<script lang="ts">
  import { enhance } from '$app/forms';

  let { form } = $props();

  let loading = $state(false);
  let comprobantePreview = $state<string | null>(null);

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        comprobantePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      comprobantePreview = null;
    }
  }
</script>

<svelte:head>
  <title>Cómo Donar - Patronato Pro Mejoramiento de Monterrey</title>
</svelte:head>

<!-- Hero -->
<section class="relative py-16 md:py-24 overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950"></div>
  <div class="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

  <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/20">
      <span class="text-lg">🤝</span>
      Tu aporte transforma Monterrey
    </div>
    <h1 class="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-5 tracking-tight">
      ¿Cómo Puedo <span class="text-accent-400">Donar</span>?
    </h1>
    <p class="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
      Tu generosidad hace posible las obras que transforman nuestra comunidad. 
      Aquí te explicamos cómo puedes realizar tu donativo de forma fácil y segura.
    </p>
  </div>

  <div class="absolute -bottom-1 left-0 right-0">
    <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto" preserveAspectRatio="none">
      <path d="M0 100L60 90C120 80 240 60 360 50C480 40 600 40 720 45C840 50 960 60 1080 65C1200 70 1320 70 1380 70L1440 70V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0Z" fill="#f8fafc"/>
    </svg>
  </div>
</section>

<!-- Datos Bancarios -->
<section class="py-16 -mt-8 relative z-10">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Tarjeta de datos bancarios -->
      <div class="card p-8 border-2 border-primary-200 bg-gradient-to-br from-white to-primary-50/30 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-primary-100/50 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        <div class="relative">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center text-3xl">
              🏦
            </div>
            <div>
              <h2 class="font-display font-bold text-xl text-slate-900">Datos Bancarios</h2>
              <p class="text-sm text-primary-600 font-medium">Banco del País (BANPAÍS)</p>
            </div>
          </div>

          <div class="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm mb-4">
            <p class="font-semibold mb-0.5">Cuenta Provisional</p>
            <p class="text-xs text-amber-700">
              Esta es la cuenta personal del presidente del patronato, Oswaldo Antonio Sánchez López, 
              utilizada de forma provisional mientras se apertura la cuenta oficial a nombre del 
              Patronato Pro Mejoramiento de Monterrey.
            </p>
          </div>

          <div class="space-y-4">
            <div class="bg-white rounded-xl p-4 border border-primary-100">
              <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Titular de la Cuenta</p>
              <p class="font-display font-bold text-lg text-slate-900">Oswaldo Antonio Sánchez López</p>
              <p class="text-xs text-slate-500 mt-0.5">Presidente — Patronato Pro Mejoramiento de Monterrey</p>
            </div>
            
            <div class="bg-white rounded-xl p-4 border border-primary-100">
              <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Número de Cuenta</p>
              <p class="font-display font-bold text-2xl text-primary-700 tracking-wide">210420131256</p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="bg-white rounded-xl p-4 border border-primary-100">
                <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Identidad</p>
                <p class="font-mono font-semibold text-slate-800">0502-1992-00553</p>
              </div>
              <div class="bg-white rounded-xl p-4 border border-primary-100">
                <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">RTN</p>
                <p class="font-mono font-semibold text-slate-800">0502-1992-00553-1</p>
              </div>
            </div>

            <div class="bg-white rounded-xl p-4 border border-primary-100">
              <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Dirección</p>
              <p class="font-medium text-slate-800">Monterrey, Choloma</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Pasos para donar -->
      <div class="space-y-6">
        <h2 class="font-display font-bold text-2xl text-slate-900">Pasos para Donar</h2>
        
        <div class="space-y-4">
          <!-- Paso 1 -->
          <div class="flex gap-4 group">
            <div class="shrink-0">
              <div class="w-12 h-12 rounded-2xl bg-accent-100 text-accent-700 flex items-center justify-center font-display font-bold text-lg group-hover:bg-accent-200 transition-colors">
                1
              </div>
            </div>
            <div class="card p-5 flex-1 group-hover:border-accent-300 transition-colors">
              <h3 class="font-display font-semibold text-slate-900 mb-1">Realiza tu depósito o transferencia</h3>
              <p class="text-sm text-slate-600">
                Deposita el monto que desees en la cuenta de <strong>BANPAÍS</strong> con el número 
                <span class="font-mono font-semibold text-primary-700">210420131256</span> a nombre de 
                <strong>Oswaldo Antonio Sánchez López</strong>.
              </p>
            </div>
          </div>

          <!-- Paso 2 -->
          <div class="flex gap-4 group">
            <div class="shrink-0">
              <div class="w-12 h-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center font-display font-bold text-lg group-hover:bg-green-200 transition-colors">
                2
              </div>
            </div>
            <div class="card p-5 flex-1 group-hover:border-green-300 transition-colors">
              <h3 class="font-display font-semibold text-slate-900 mb-1">Envía tu comprobante por WhatsApp</h3>
              <p class="text-sm text-slate-600 mb-3">
                Envía una foto o captura del comprobante de depósito junto con tu número de identidad al siguiente número:
              </p>
              <a
                href="https://wa.me/50433363789?text=Hola%2C%20quiero%20confirmar%20mi%20donativo%20al%20Patronato%20Pro%20Mejoramiento%20de%20Monterrey"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-xl font-semibold text-sm hover:bg-green-700 transition-colors shadow-sm"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                +504 3336-3789
              </a>
            </div>
          </div>

          <!-- Paso 3 -->
          <div class="flex gap-4 group">
            <div class="shrink-0">
              <div class="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-display font-bold text-lg group-hover:bg-blue-200 transition-colors">
                3
              </div>
            </div>
            <div class="card p-5 flex-1 group-hover:border-blue-300 transition-colors">
              <h3 class="font-display font-semibold text-slate-900 mb-1">Confirmación</h3>
              <p class="text-sm text-slate-600">
                Una vez verificado tu depósito, tu donativo aparecerá registrado en nuestro portal de transparencia.
                Recibirás una confirmación por WhatsApp.
              </p>
            </div>
          </div>
        </div>

        <!-- Alternativa: Formulario -->
        <div class="card p-5 bg-blue-50 border-blue-200">
          <div class="flex items-start gap-3">
            <span class="text-xl">💡</span>
            <div class="text-sm text-blue-800">
              <p class="font-semibold mb-1">¿Prefieres registrarlo aquí mismo?</p>
              <p>
                También puedes usar el formulario más abajo para enviar tu comprobante directamente.
                Lo revisaremos y confirmaremos tu donativo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Formulario de Envío de Comprobante -->
<section class="py-16 bg-white">
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-10">
      <div class="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 rounded-full text-primary-700 text-xs font-semibold uppercase tracking-wider mb-4">
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
        </svg>
        Formulario en Línea
      </div>
      <h2 class="text-3xl font-display font-bold text-slate-900 mb-3">
        Envía tu Comprobante
      </h2>
      <p class="text-slate-500 max-w-lg mx-auto">
        Completa el formulario con tus datos y adjunta una foto del comprobante de depósito. 
        Lo revisaremos y confirmaremos tu donativo.
      </p>
    </div>

    {#if form?.success}
      <div class="card p-8 text-center border-2 border-green-200 bg-green-50/50">
        <div class="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center text-4xl">
          ✅
        </div>
        <h3 class="font-display font-bold text-xl text-green-800 mb-2">
          ¡Solicitud Enviada!
        </h3>
        <p class="text-green-700 mb-4">
          Hemos recibido tu comprobante. Lo revisaremos y te contactaremos por WhatsApp para confirmar tu donativo.
        </p>
        <p class="text-sm text-green-600">
          Gracias por contribuir al desarrollo de Monterrey.
        </p>
      </div>
    {:else}
      {#if form?.error}
        <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {form.error}
        </div>
      {/if}

      <form
        method="POST"
        enctype="multipart/form-data"
        use:enhance={() => {
          loading = true;
          return async ({ update }) => {
            loading = false;
            await update();
          };
        }}
        class="card p-6 md:p-8 space-y-6"
      >
        <div>
          <label for="nombre" class="label">Nombre Completo *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={form?.data?.nombre ?? ''}
            class="input"
            placeholder="Ej: Juan Carlos Pérez"
            required
            minlength="2"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="identidad" class="label">Número de Identidad *</label>
            <input
              type="text"
              id="identidad"
              name="identidad"
              value={form?.data?.identidad ?? ''}
              class="input"
              placeholder="0502-XXXX-XXXXX"
              required
              minlength="5"
            />
          </div>
          <div>
            <label for="telefono" class="label">WhatsApp / Teléfono *</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={form?.data?.telefono ?? ''}
              class="input"
              placeholder="+504 XXXX-XXXX"
              required
              minlength="8"
            />
          </div>
        </div>

        <div>
          <label for="monto" class="label">
            Monto Depositado (L.)
            <span class="text-slate-400 font-normal">(opcional)</span>
          </label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">L.</span>
            <input
              type="number"
              id="monto"
              name="monto"
              step="0.01"
              min="0.01"
              value={form?.data?.monto ?? ''}
              class="input pl-10"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label for="comprobante" class="label">Foto del Comprobante</label>
          <label
            for="comprobante"
            class="block border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 transition-all overflow-hidden"
          >
            {#if comprobantePreview}
              <div class="relative">
                <img src={comprobantePreview} alt="Vista previa" class="w-full max-h-64 object-contain p-2" />
                <div class="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                  <span class="opacity-0 hover:opacity-100 text-white bg-black/50 px-3 py-1 rounded-lg text-sm font-medium">Cambiar imagen</span>
                </div>
              </div>
            {:else}
              <div class="flex flex-col items-center justify-center py-10 text-slate-400">
                <svg class="w-12 h-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-sm font-medium text-slate-500">Haz clic para subir tu comprobante</p>
                <p class="text-xs text-slate-400 mt-1">JPG, PNG, WebP o GIF. Máx 5MB</p>
              </div>
            {/if}
          </label>
          <input
            type="file"
            id="comprobante"
            name="comprobante"
            accept="image/jpeg,image/png,image/webp,image/gif"
            class="hidden"
            onchange={handleFileChange}
          />
        </div>

        <div>
          <label for="mensaje" class="label">
            Mensaje
            <span class="text-slate-400 font-normal">(opcional)</span>
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="2"
            class="input"
            placeholder="¿Algo que quieras agregar?"
          >{form?.data?.mensaje ?? ''}</textarea>
        </div>

        <button
          type="submit"
          class="btn btn-primary w-full text-lg py-3.5"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar Comprobante'}
        </button>

        <p class="text-xs text-center text-slate-400">
          Tu información se maneja de forma confidencial y solo será utilizada para verificar tu donativo.
        </p>
      </form>
    {/if}
  </div>
</section>

<!-- CTA Final -->
<section class="py-16 bg-gradient-to-br from-primary-800 to-primary-950">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl font-display font-bold text-white mb-4">
      Cada lempira cuenta
    </h2>
    <p class="text-white/75 mb-8 text-lg">
      Tu donativo, sin importar el monto, contribuye directamente a las obras que transforman Monterrey. 
      Juntos construimos una comunidad mejor.
    </p>
    <div class="flex flex-wrap justify-center gap-4">
      <a href="/" class="btn border-2 border-white/60 text-white hover:bg-white/10">
        Ver Portal de Transparencia
      </a>
      <a
        href="https://wa.me/50433363789?text=Hola%2C%20quiero%20información%20sobre%20cómo%20donar%20al%20Patronato%20de%20Monterrey"
        target="_blank"
        rel="noopener noreferrer"
        class="btn bg-green-600 text-white hover:bg-green-700 shadow-lg"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Contactar por WhatsApp
      </a>
    </div>
  </div>
</section>
