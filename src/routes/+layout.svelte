<script lang="ts">
  import { page } from '$app/stores';
  import '../app.css';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  
  let { children } = $props();

  const isAdminRoute = (pathname: string) => pathname.startsWith('/admin');
</script>

<div class="min-h-screen flex flex-col">
  {#if !isAdminRoute($page.url.pathname)}
    <Header />
  {/if}
  
  <main class="flex-1">
    {@render children()}
  </main>
  
  {#if !isAdminRoute($page.url.pathname)}
    <Footer />
  {/if}
</div>
