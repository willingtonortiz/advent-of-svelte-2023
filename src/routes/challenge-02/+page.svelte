<script lang="ts">
  import { ArrowLeft } from "lucide-svelte";
  import { slide } from "svelte/transition";
  import Button from "$lib/components/ui/button/button.svelte";
  import santaNormal from "$lib/assets/challenge-02/santa-normal.webp";
  import santaHappy from "$lib/assets/challenge-02/santa-happy.webp";
  import Cookie from "./Cookie.svelte";

  let totalCookies = 0;
  $: blackCookies = Math.floor(totalCookies / 1000);
  $: blueCookies = Math.floor((totalCookies % 1000) / 100);
  $: greenCookies = Math.floor((totalCookies % 100) / 10);
  $: redCookies = Math.floor(totalCookies % 10);

  function addRedCookie() {
    totalCookies++;
  }

  function addGreenCookie() {
    totalCookies += 10;
  }

  function addBlueCookie() {
    totalCookies += 100;
  }

  function addBlackCookie() {
    totalCookies += 1000;
  }

  function removeRedCookie() {
    totalCookies--;
  }

  function removeGreenCookie() {
    totalCookies -= 10;
  }

  function removeBlueCookie() {
    totalCookies -= 100;
  }

  function removeBlackCookie() {
    totalCookies -= 1000;
  }
</script>

<main class="mt-4">
  <Button variant={"outline"} href="/">
    <ArrowLeft class="inline mr-2" size={16} /> Back
  </Button>

  <h1 class="mb-12 font-semibold text-xl uppercase">Challenge 02 - Cookies for Santa</h1>

  <div class="grid grid-cols-3 items-start">
    <div class="flex flex-col flex-nowrap gap-4 justify-self-start p-4 bg-gray-100 rounded-lg">
      <h2 class="text-lg">Click any cookie!!!</h2>
      <Cookie color="red" on:click={addRedCookie} />
      <Cookie color="green" on:click={addGreenCookie} />
      <Cookie color="blue" on:click={addBlueCookie} />
      <Cookie color="black" on:click={addBlackCookie} />
    </div>

    <div class="place-self-center flex flex-col flex-nowrap items-center">
      <div class="relative w-32 h-64">
        <img
          src={santaNormal}
          class="w-full h-full absolute left-0 top-0 hover:opacity-0"
          alt="Santa Normal"
        />

        <img
          src={santaHappy}
          class="w-full h-full absolute left-0 top-0 opacity-0 transition-transform hover:opacity-100 hover:scale-105"
          alt="Santa Happy"
        />
      </div>

      <h2 class="mt-4 text-lg text-center">
        Santa ate
        <div class="inline-flex flex-col flex-nowrap overflow-hidden">
          {#key totalCookies}
            <span in:slide class="inline">
              {totalCookies}
            </span>
          {/key}
        </div>
        cookies
      </h2>
    </div>

    <div class="flex flex-col flex-nowrap gap-4 justify-self-end p-4 bg-gray-100 rounded-lg">
      <h2 class="text-lg">Equivalences</h2>

      <div class="flex flex-nowrap items-center gap-2">
        <Cookie class="inline" color="red" />
        <span class="text-lg">x10</span>
        <span class="text-2xl">=</span>
        <Cookie class="inline" color="green" />
        <span class="text-lg">x1</span>
      </div>

      <div class="flex flex-nowrap items-center gap-2">
        <Cookie class="inline" color="green" />
        <span class="text-lg">x10</span>
        <span class="text-2xl">=</span>
        <Cookie class="inline" color="blue" />
        <span class="text-lg">x1</span>
      </div>

      <div class="flex flex-nowrap items-center gap-2">
        <Cookie class="inline" color="blue" />
        <span class="text-lg">x10</span>
        <span class="text-2xl">=</span>
        <Cookie class="inline" color="black" />
        <span class="text-lg">x1</span>
      </div>
    </div>
  </div>

  <p class="mt-4 mb-2 text-sm">Click a cookie to remove it</p>

  {#if totalCookies > 0}
    <div class="flex flex-wrap gap-4 mb-12 p-4 bg-gray-100 rounded-lg">
      {#each Array.from({ length: blackCookies }) as _}
        <Cookie color="black" on:click={removeBlackCookie} />
      {/each}

      {#each Array.from({ length: blueCookies }) as _}
        <Cookie color="blue" on:click={removeBlueCookie} />
      {/each}

      {#each Array.from({ length: greenCookies }) as _}
        <Cookie color="green" on:click={removeGreenCookie} />
      {/each}

      {#each Array.from({ length: redCookies }) as _}
        <Cookie color="red" on:click={removeRedCookie} />
      {/each}
    </div>
  {/if}
</main>
