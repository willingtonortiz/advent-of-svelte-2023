<script lang="ts">
  import santaSmiling from "$lib/assets/challenge-10/santa-smilling.webp";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Button } from "$lib/components/ui/button";
  import { onMount } from "svelte";

  let counter = 8;
  let isOpen = false;

  $: {
    if (isOpen) {
      counter = 0;
    }
  }

  onMount(() => {
    const intervalId = setInterval(() => {
      counter--;

      if (counter <= 0) {
        isOpen = true;
        clearInterval(intervalId);
      }
    }, 1000);
  });
</script>

<div class="mt-24">
  <Button class="mx-auto block" on:click={() => (isOpen = true)}>Open Pop-up!</Button>

  {#if counter > 0}
    <span class="mt-12 mx-auto block w-fit">It will open in {counter} seconds</span>
  {/if}

  <Dialog.Root open={isOpen} onOpenChange={(open) => (isOpen = open)}>
    <Dialog.Content class="bg-[#f2f5ed]">
      <h1 class="text-center text-xl font-semibold">A Svelte Christmas Delight!</h1>

      <div class="grid gap-4 py-4">
        <img src={santaSmiling} alt="Santa Smiling" class="max-h-64 mx-auto" />
      </div>

      <p class="text-center font-semibold">
        Greetings, Svelte Developer! Wishing your code be as smooth as fresh snow and your Christmas
        be filled with magic and joy. Keep coding and spreading cheer! 🎄🚀
      </p>
    </Dialog.Content>
  </Dialog.Root>
</div>
