<script lang="ts">
  interface Option {
    value: string;
    label: string;
    sublabel?: string;
  }
  
  interface Props {
    options: Option[];
    value?: string;
    placeholder?: string;
    name: string;
    required?: boolean;
    disabled?: boolean;
  }
  
  let { 
    options, 
    value = $bindable(''), 
    placeholder = 'Seleccionar...', 
    name,
    required = false,
    disabled = false
  }: Props = $props();
  
  let query = $state('');
  let isOpen = $state(false);
  let highlightedIndex = $state(0);
  let inputElement = $state<HTMLInputElement | null>(null);
  let listElement = $state<HTMLUListElement | null>(null);
  
  // Get selected option for display
  const selectedOption = $derived(options.find(o => o.value === value));
  
  // Filter options based on query
  const filteredOptions = $derived(
    query.trim() === ''
      ? options
      : options.filter(o => 
          o.label.toLowerCase().includes(query.toLowerCase()) ||
          (o.sublabel && o.sublabel.toLowerCase().includes(query.toLowerCase()))
        )
  );
  
  // Reset highlight when filtered options change
  $effect(() => {
    if (filteredOptions.length > 0) {
      highlightedIndex = 0;
    }
  });
  
  function openDropdown() {
    if (disabled) return;
    isOpen = true;
    query = '';
  }
  
  function closeDropdown() {
    isOpen = false;
    query = '';
  }
  
  function selectOption(option: Option) {
    value = option.value;
    closeDropdown();
  }
  
  function handleInputKeydown(e: KeyboardEvent) {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDropdown();
      }
      return;
    }
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        highlightedIndex = Math.min(highlightedIndex + 1, filteredOptions.length - 1);
        scrollToHighlighted();
        break;
      case 'ArrowUp':
        e.preventDefault();
        highlightedIndex = Math.max(highlightedIndex - 1, 0);
        scrollToHighlighted();
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredOptions[highlightedIndex]) {
          selectOption(filteredOptions[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        closeDropdown();
        break;
      case 'Tab':
        closeDropdown();
        break;
    }
  }
  
  function scrollToHighlighted() {
    if (listElement) {
      const item = listElement.children[highlightedIndex] as HTMLElement;
      if (item) {
        item.scrollIntoView({ block: 'nearest' });
      }
    }
  }
  
  function handleBlur(e: FocusEvent) {
    // Delay closing to allow click on options
    setTimeout(() => {
      const relatedTarget = e.relatedTarget as HTMLElement;
      if (!relatedTarget?.closest('.combobox-container')) {
        closeDropdown();
      }
    }, 150);
  }
</script>

<div class="combobox-container relative">
  <!-- Hidden input for form submission -->
  <input type="hidden" {name} {value} />
  
  <!-- Display button / Search input -->
  <div class="relative">
    {#if isOpen}
      <input
        bind:this={inputElement}
        type="text"
        bind:value={query}
        onkeydown={handleInputKeydown}
        onblur={handleBlur}
        placeholder="Buscar..."
        class="input w-full pr-10"
        autocomplete="off"
      />
    {:else}
      <button
        type="button"
        onclick={openDropdown}
        onkeydown={handleInputKeydown}
        {disabled}
        class="input w-full text-left pr-10 {disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} {!selectedOption ? 'text-slate-400' : ''}"
      >
        {#if selectedOption}
          <span class="block truncate">
            {selectedOption.label}
            {#if selectedOption.sublabel}
              <span class="text-slate-500">({selectedOption.sublabel})</span>
            {/if}
          </span>
        {:else}
          <span class="block truncate">{placeholder}</span>
        {/if}
      </button>
    {/if}
    
    <!-- Chevron icon -->
    <span class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
      <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </span>
  </div>
  
  <!-- Dropdown list -->
  {#if isOpen}
    <ul
      bind:this={listElement}
      class="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg max-h-60 overflow-auto"
      role="listbox"
    >
      {#if filteredOptions.length === 0}
        <li class="px-4 py-3 text-sm text-slate-500 text-center">
          No se encontraron resultados
        </li>
      {:else}
        {#each filteredOptions as option, index}
          <li
            role="option"
            tabindex="-1"
            aria-selected={option.value === value}
            class="px-4 py-2.5 cursor-pointer transition-colors {index === highlightedIndex ? 'bg-primary-50' : ''} {option.value === value ? 'bg-primary-100 text-primary-900' : 'text-slate-700 hover:bg-slate-50'}"
            onmouseenter={() => highlightedIndex = index}
            onclick={() => selectOption(option)}
            onkeydown={(e) => { if (e.key === 'Enter') selectOption(option); }}
          >
            <span class="block font-medium truncate">{option.label}</span>
            {#if option.sublabel}
              <span class="block text-xs text-slate-500 truncate">{option.sublabel}</span>
            {/if}
          </li>
        {/each}
      {/if}
    </ul>
  {/if}
</div>

{#if isOpen}
  <!-- Focus trap: auto-focus input when dropdown opens -->
  {@const _ = setTimeout(() => inputElement?.focus(), 0)}
{/if}
