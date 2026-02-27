<script lang="ts">
  interface Props {
    title: string;
    description?: string;
    icon?: string;
    actionLabel?: string;
    actionHref?: string;
    onAction?: () => void;
  }
  
  let { title, description, icon = '📭', actionLabel, actionHref, onAction }: Props = $props();
</script>

<div class="flex flex-col items-center justify-center py-12 px-4 text-center">
  <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
    <span class="text-4xl">{icon}</span>
  </div>
  
  <h3 class="text-lg font-display font-semibold text-slate-900 mb-2">{title}</h3>
  
  {#if description}
    <p class="text-sm text-slate-500 max-w-sm mb-6">{description}</p>
  {/if}
  
  {#if actionLabel}
    {#if actionHref}
      <a href={actionHref} class="btn btn-primary">
        {actionLabel}
      </a>
    {:else if onAction}
      <button onclick={onAction} class="btn btn-primary">
        {actionLabel}
      </button>
    {/if}
  {/if}
</div>
