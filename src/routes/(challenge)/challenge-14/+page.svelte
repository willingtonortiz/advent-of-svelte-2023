<script lang="ts">
  import { Label } from "$lib/components/ui/label";
  import { Slider } from "$lib/components/ui/slider";
  import Snowfall from "$lib/components/molecules/Snowfall.svelte";
  import { Snowflake } from "lucide-svelte";

  let quantity = [50];
  let speed = [5];
</script>

<div class="mt-4 mb-24">
  <h1 class="mt-4 mb-2">Configure the Snowflake Component</h1>

  <Snowfall {quantity} {speed}>
    <Snowflake class="text-[#35a2ae] animate-spin-slow w-full h-full" />
  </Snowfall>

  <div class="space-y-2 mb-4">
    <Label>Quantity ({quantity[0]}) [1 - 150]</Label>
    <Slider bind:value={quantity} min={1} max={150} step={1} />
  </div>

  <div class="space-y-2">
    <Label>Speed ({speed[0]}) [1 - 10]</Label>
    <Slider bind:value={speed} min={1} max={100} step={1} />
  </div>
</div>
