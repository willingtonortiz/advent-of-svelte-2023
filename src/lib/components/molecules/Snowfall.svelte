<script lang="ts">
  import { Snowflake } from "lucide-svelte";

  let container: HTMLDivElement | undefined;
  $: containerWidth = container?.clientWidth ?? 0;
  export let quantity = [50];
  export let speed = [5];

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
</script>

<div class="w-full border rounded-lg h-[400px] relative overflow-hidden" bind:this={container}>
  <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
  {#each { length: quantity[0] } as _}
    <div class="snowflake" style={generateCSSVariables(speed[0])}>
      <slot />
    </div>
  {/each}
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
