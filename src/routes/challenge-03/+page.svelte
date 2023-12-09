<script lang="ts">
  import { ArrowLeft, ArrowRight } from "lucide-svelte";
  import { slide } from "svelte/transition";
  import Button from "$lib/components/ui/button/button.svelte";
  import Progress from "$lib/components/ui/progress/progress.svelte";
  import { cn } from "$lib/utils.js";
  import ChallengeTitle from "$lib/components/molecules/ChallengeTitle.svelte";
  import ChallengeBackButton from "$lib/components/molecules/ChallengeBackButton.svelte";
  import type { Present } from "./+page.server.js";

  export let data;
  let presents: Present[] = [...data.presents];
  let sleighPresents: Present[] = [];

  $: totalWeight = presents.reduce((acc, p) => acc + p.weight, 0);
  $: sleighTotalWeight = sleighPresents.reduce((acc, p) => acc + p.weight, 0);

  function add(id: string) {
    const present = presents.find((p) => p.id === id)!;
    sleighPresents = [...sleighPresents, present];
    presents = presents.filter((p) => p.id !== id);
  }

  function remove(id: string) {
    const present = sleighPresents.find((p) => p.id === id)!;
    presents = [...presents, present];
    sleighPresents = sleighPresents.filter((p) => p.id !== id);
  }
</script>

<main class="mt-4 mb-12">
  <ChallengeBackButton />

  <ChallengeTitle>Challenge 03 - Sleigh Load Balancer</ChallengeTitle>

  <div class="grid grid-cols-2 gap-8">
    <div>
      <div class="px-4 py-2 mb-6 border rounded-lg h-18 bg-gray-50">
        <span class="block text-sm">Total Weight</span>

        <div class="flex items-center gap-4 flex-nowrap">
          <span class="block text-2xl font-semibold">{totalWeight.toFixed(2)} Kg</span>
        </div>
      </div>

      <h2 class="mb-2 text-lg font-semibold">Children presents ({presents.length})</h2>

      <ul
        class="max-h-[500px] border rounded-lg px-4 py-2 overflow-y-scroll flex flex-col flex-nowrap gap-6"
      >
        {#each presents as present (present.id)}
          <li class="flex items-center justify-between flex-nowrap" in:slide>
            <div>
              <span class="font-semibold w-[80px] inline-block">{present.name}</span>
              <span>{present.weight.toFixed(2)} Kg</span>
            </div>

            <Button
              variant={"outline"}
              size={"icon"}
              class={"w-6 h-6"}
              disabled={sleighTotalWeight + present.weight > 100}
              on:click={() => add(present.id)}
            >
              <ArrowRight size={18} />
            </Button>
          </li>
        {:else}
          <p>There are no presents</p>
        {/each}
      </ul>
    </div>

    <div>
      <div class="px-4 py-2 mb-6 border rounded-lg h-18 bg-gray-50">
        <span class="block text-sm">Total Weight</span>

        <div class="flex items-center gap-4 flex-nowrap">
          <span class="block text-2xl font-semibold">{sleighTotalWeight.toFixed(2)} Kg</span>

          <Progress
            value={sleighTotalWeight}
            max={100}
            class={"flex-1"}
            barClass={cn("bg-red-500", {
              "bg-yellow-500": sleighTotalWeight <= 80,
              "bg-green-500": sleighTotalWeight <= 60,
            })}
          />
        </div>
      </div>

      <h2 class="mb-2 text-lg font-semibold">Sleigh presents ({sleighPresents.length})</h2>

      <ul
        class="max-h-[500px] border rounded-lg px-4 py-2 overflow-y-scroll flex flex-col flex-nowrap gap-6"
      >
        {#each sleighPresents as present (present.id)}
          <li class="flex items-center justify-between flex-nowrap" in:slide>
            <div>
              <span class="font-semibold w-[80px] inline-block">{present.name}</span>
              <span>{present.weight.toFixed(2)} Kg</span>
            </div>

            <Button
              variant={"outline"}
              size={"icon"}
              class={"w-6 h-6"}
              on:click={() => remove(present.id)}
            >
              <ArrowLeft size={18} />
            </Button>
          </li>
        {:else}
          <p>There are no presents</p>
        {/each}
      </ul>
    </div>
  </div>
</main>
