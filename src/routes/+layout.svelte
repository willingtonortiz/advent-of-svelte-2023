<script lang="ts">
  import "../app.pcss";
  import Header from "$lib/ui/components/Header.svelte";
</script>

<Header />

<div class="mx-auto max-w-screen-lg px-12">
  <slot />
</div>
