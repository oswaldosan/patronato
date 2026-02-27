<script lang="ts">
  import { formatCurrency, calculatePercentage } from '$lib/utils/format';
  
  interface Props {
    current: number;
    goal: number;
    label?: string;
    showLabels?: boolean;
    variant?: 'light' | 'dark';
  }
  
  let { 
    current, 
    goal, 
    label = 'Meta del proyecto', 
    showLabels = true,
    variant = 'light'
  }: Props = $props();
  
  const percentage = $derived(calculatePercentage(current, goal));
  const clampedPercentage = $derived(Math.min(percentage, 100));
  
  // Color classes based on variant
  const labelClass = $derived(variant === 'dark' ? 'text-white/90' : 'text-slate-700');
  const percentageClass = $derived(variant === 'dark' ? 'text-white font-bold' : 'text-primary-600');
  const sublabelClass = $derived(variant === 'dark' ? 'text-white/80' : 'text-slate-500');
  const barBgClass = $derived(variant === 'dark' ? 'bg-white/20' : 'bg-slate-200');
</script>

<div class="space-y-3">
  {#if showLabels}
    <div class="flex justify-between items-center">
      <span class="text-sm font-medium {labelClass}">{label}</span>
      <span class="text-sm font-bold {percentageClass}">{percentage}%</span>
    </div>
  {/if}
  
  <div class="relative h-6 {barBgClass} rounded-full overflow-hidden">
    <div 
      class="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 via-primary-400 to-accent-400 rounded-full transition-all duration-1000 ease-out"
      style="width: {clampedPercentage}%"
    >
      <div class="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.3),transparent)] animate-[shimmer_2s_infinite]"></div>
    </div>
    
    {#if percentage >= 10}
      <span class="absolute inset-y-0 left-3 flex items-center text-xs font-bold text-white drop-shadow">
        {formatCurrency(current)}
      </span>
    {/if}
  </div>
  
  {#if showLabels}
    <div class="flex justify-between items-center text-xs {sublabelClass}">
      <span>Recaudado</span>
      <span>Meta: {formatCurrency(goal)}</span>
    </div>
  {/if}
</div>

<style>
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
  }
</style>
