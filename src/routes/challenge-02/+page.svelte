<script lang="ts">
  import { slide } from "svelte/transition";
  import santaNormal from "$lib/assets/challenge-02/santa-normal.webp";
  import santaHappy from "$lib/assets/challenge-02/santa-happy.webp";
  import ChallengeTitle from "$lib/components/molecules/ChallengeTitle.svelte";
  import ChallengeBackButton from "$lib/components/molecules/ChallengeBackButton.svelte";
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
  <ChallengeBackButton />

  <ChallengeTitle>Challenge 02 - Cookies for Santa</ChallengeTitle>

  <div class="grid items-start grid-cols-3">
    <div class="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg flex-nowrap justify-self-start">
      <h2 class="text-lg">Click any cookie!!!</h2>
      <Cookie color="red" on:click={addRedCookie} />
      <Cookie color="green" on:click={addGreenCookie} />
      <Cookie color="blue" on:click={addBlueCookie} />
      <Cookie color="black" on:click={addBlackCookie} />
    </div>

    <div class="flex flex-col items-center place-self-center flex-nowrap">
      <div class="relative w-32 h-64">
        <img
          src={santaNormal}
          class="absolute top-0 left-0 w-full h-full hover:opacity-0"
          alt="Santa Normal"
        />

        <img
          src={santaHappy}
          class="absolute top-0 left-0 w-full h-full transition-transform opacity-0 hover:opacity-100 hover:scale-105"
          alt="Santa Happy"
        />
      </div>

      <h2 class="mt-4 text-lg text-center">
        Santa ate
        <div class="inline-flex flex-col overflow-hidden flex-nowrap">
          {#key totalCookies}
            <span in:slide class="inline">
              {totalCookies}
            </span>
          {/key}
        </div>
        cookies
      </h2>
    </div>

    <div class="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg flex-nowrap justify-self-end">
      <h2 class="text-lg">Equivalences</h2>

      <div class="flex items-center gap-2 flex-nowrap">
        <Cookie class="inline" color="red" />
        <span class="text-lg">x10</span>
        <span class="text-2xl">=</span>
        <Cookie class="inline" color="green" />
        <span class="text-lg">x1</span>
      </div>

      <div class="flex items-center gap-2 flex-nowrap">
        <Cookie class="inline" color="green" />
        <span class="text-lg">x10</span>
        <span class="text-2xl">=</span>
        <Cookie class="inline" color="blue" />
        <span class="text-lg">x1</span>
      </div>

      <div class="flex items-center gap-2 flex-nowrap">
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
    <div class="flex flex-wrap gap-4 p-4 mb-12 bg-gray-100 rounded-lg">
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
