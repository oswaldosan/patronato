<script lang="ts">
  interface Props {
    open: boolean;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    onClose?: () => void;
    children: import('svelte').Snippet;
    footer?: import('svelte').Snippet;
  }
  
  let { open = $bindable(false), title, size = 'md', onClose, children, footer }: Props = $props();
  
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };
  
  function handleClose() {
    open = false;
    onClose?.();
  }
  
  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }
  
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      handleClose();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <div 
    class="fixed inset-0 z-50 overflow-y-auto"
    role="dialog"
    aria-modal="true"
  >
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-in"
      onclick={handleBackdropClick}
    ></div>
    
    <!-- Modal Container -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div 
        class="relative w-full {sizeClasses[size]} bg-white rounded-2xl shadow-2xl animate-scale-in"
      >
        <!-- Header -->
        {#if title}
          <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <h3 class="text-lg font-display font-semibold text-slate-900">{title}</h3>
            <button
              onclick={handleClose}
              class="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <svg class="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        {/if}
        
        <!-- Content -->
        <div class="px-6 py-4 max-h-[70vh] overflow-y-auto">
          {@render children()}
        </div>
        
        <!-- Footer -->
        {#if footer}
          <div class="px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
            {@render footer()}
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
