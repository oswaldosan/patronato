<script lang="ts" generics="T extends Record<string, unknown>">
  import EmptyState from './EmptyState.svelte';
  
  interface Column<T extends Record<string, unknown>> {
    key: keyof T & string;
    label: string;
    sortable?: boolean;
    align?: 'left' | 'center' | 'right';
    render?: (item: T) => string;
  }
  
  interface Props {
    data: T[];
    columns: Column<T>[];
    emptyTitle?: string;
    emptyDescription?: string;
    rowKey?: keyof T & string;
    onRowClick?: (item: T) => void;
    rowSlot?: import('svelte').Snippet<[T]>;
  }
  
  let { 
    data, 
    columns, 
    emptyTitle = 'No hay datos', 
    emptyDescription = 'No se encontraron registros para mostrar.',
    rowKey = 'id' as keyof T & string,
    onRowClick,
    rowSlot
  }: Props = $props();
  
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
</script>

{#if data.length === 0}
  <EmptyState title={emptyTitle} description={emptyDescription} />
{:else}
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          {#each columns as col}
            <th class={alignClasses[col.align || 'left']}>
              {col.label}
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each data as item (item[rowKey])}
          {#if rowSlot}
            {@render rowSlot(item)}
          {:else}
            <tr 
              class={onRowClick ? 'cursor-pointer' : ''}
              onclick={() => onRowClick?.(item)}
            >
              {#each columns as col}
                <td class={alignClasses[col.align || 'left']}>
                  {#if col.render}
                    {@html col.render(item)}
                  {:else}
                    {item[col.key] ?? '-'}
                  {/if}
                </td>
              {/each}
            </tr>
          {/if}
        {/each}
      </tbody>
    </table>
  </div>
{/if}
