<script lang="ts">
  import { Canvas } from "@threlte/core";
  import { Map } from "immutable";
  import Scene from "./Scene.svelte";
  import type { Present } from "./types";
  import { onMount } from "svelte";
  import { cn } from "$lib/utils";
  const API_URL = "https://advent.sveltesociety.dev/data/2023/day-sixteen.json";

  let presents: Present[] = [];
  let selectedId: string | null = null;
  $: selectedPresent = presents.find(({ id }) => id === selectedId);

  function selectPresent(id: string) {
    if (selectedId === id) {
      selectedId = null;
      return;
    }

    selectedId = id;
  }

  onMount(async () => {
    const response = await fetch(API_URL);
    const data = (await response.json()) as Present[];

    let zMap = Map<string, number>();

    presents = data.map(({ name, x, y }: Present) => {
      const z = zMap.get(`${x}-${y}`) ?? 0;
      zMap = zMap.set(`${x}-${y}`, z + 1);

      return { id: crypto.randomUUID(), name, x, y, z };
    });
  });
</script>

<div class={"mt-8 mb-12 grid grid-cols-[1fr_200px] grid-rows-[600px_200px] gap-4"}>
  <div class="h-[600px] flex-1 border rounded-lg">
    <Canvas>
      <Scene {presents} {selectedId} />
    </Canvas>
  </div>

  <ul class="overflow-y-auto flex flex-col gap-2 col-start-2 col-end-3 row-start-1 row-end-3">
    {#each presents as present (present.id)}
      <li>
        <button
          class={cn("border w-full py-2 rounded-lg", present.id === selectedId && "bg-gray-200")}
          on:click={() => selectPresent(present.id)}
        >
          {present.name}
        </button>
      </li>
    {/each}
  </ul>

  <div class="col-start-1 col-end-2 row-start-2 row-end-3 border rounded-lg p-4">
    {#if selectedPresent}
      <h2 class="text-2xl font-semibold">{selectedPresent.name}</h2>

      <div class="text-gray-500 flex flex-col">
        <span>X: {selectedPresent.x}</span>
        <span>Y: {selectedPresent.y}</span>
        <span>Z: {selectedPresent.z}</span>
      </div>
    {:else}
      <p class="text-sm text-gray-500">Select a present to see more information</p>
    {/if}
  </div>
</div>
