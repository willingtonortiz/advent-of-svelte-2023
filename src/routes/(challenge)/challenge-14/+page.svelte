<script lang="ts">
  import { onMount } from "svelte";
  import { Snowflake } from "lucide-svelte";
  import { Label } from "$lib/components/ui/label";
  import { Slider } from "$lib/components/ui/slider";
  let quantity = [0];
  let speed = [5];
  let containerWidth = 0;

  let container: HTMLDivElement | undefined;

  function generateCSSVariables(speed: number) {
    const leftInit = Math.random() * containerWidth;
    // A little variation between leftInit and leftEnd
    const leftEnd = leftInit + Math.random() * 400 - 200;
    return `
      --size: ${Math.random() * 18 + 12}px;
      --left-init: ${leftInit}px;
      --left-end: ${leftEnd}px;
      --speed: ${11 - speed / 10}s;
      --animation-delay: -${Math.random() * 10}s;
    `;
  }

  onMount(() => {
    containerWidth = container?.clientWidth ?? 0;
    quantity = [50];
  });
</script>

<div class="mt-4 mb-24">
  <div class="w-full border rounded-lg h-[400px] relative overflow-hidden" bind:this={container}>
    {#each { length: quantity[0] } as _}
      <div class="snowflake" style={generateCSSVariables(speed[0])}>
        <Snowflake class="text-[#35a2ae] animate-spin-slow w-full h-full" />
      </div>
    {/each}
  </div>

  <h1 class="mt-4 mb-2">Configure the Snowflake Component</h1>

  <div class="space-y-2 mb-4">
    <Label>Quantity ({quantity[0]}) [1 - 150]</Label>
    <Slider bind:value={quantity} min={1} max={150} step={1} />
  </div>

  <div class="space-y-2">
    <Label>Speed ({speed[0]}) [1 - 10]</Label>
    <Slider bind:value={speed} min={1} max={100} step={1} />
  </div>
</div>

<style>
  .snowflake {
    position: absolute;
    animation: animatedBackground var(--speed) linear infinite;
    animation-delay: var(--animation-delay);
    width: var(--size);
    height: var(--size);
  }

  @keyframes animatedBackground {
    0% {
      left: var(--left-init);
      top: -25px;
    }
    100% {
      left: var(--left-end);
      top: 400px;
    }
  }
</style>
