<script lang="ts">
  interface Props {
    value?: string;
    placeholder?: string;
    onSearch?: (query: string) => void;
  }
  
  let { value = $bindable(''), placeholder = 'Buscar...', onSearch }: Props = $props();
  
  function handleSubmit(e: Event) {
    e.preventDefault();
    onSearch?.(value);
  }
  
  function handleKeyup(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      onSearch?.(value);
    }
  }
</script>

<form onsubmit={handleSubmit} class="relative">
  <div class="relative">
    <svg 
      class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    
    <input
      type="text"
      bind:value
      onkeyup={handleKeyup}
      {placeholder}
      class="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 shadow-sm transition-all duration-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 focus:outline-none"
    />
    
    {#if value}
      <button
        type="button"
        onclick={() => { value = ''; onSearch?.(''); }}
        class="absolute right-14 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 transition-colors"
      >
        <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    {/if}
    
    <button
      type="submit"
      class="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors"
    >
      Buscar
    </button>
  </div>
</form>
