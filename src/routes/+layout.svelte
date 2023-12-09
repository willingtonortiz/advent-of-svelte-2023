<script lang="ts">
  import "../app.pcss";
  import Header from "$lib/components/molecules/Header.svelte";
</script>

<Header />

<div class="max-w-screen-lg px-4 mx-auto sm:px-12">
  <slot />
</div>
