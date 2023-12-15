<script lang="ts">
  import { Snowflake } from "lucide-svelte";
  import Snowfall from "$lib/components/molecules/Snowfall.svelte";

  const quantity = [50];
  const speed = [5];
</script>

<div class="mt-4 mb-24">
  <h1 class="mt-4 mb-2">Configure the Snowflake Component</h1>

  <Snowfall {quantity} {speed}>
    <Snowflake class="text-[#35a2ae] animate-spin-slow w-full h-full" />
  </Snowfall>
</div>
