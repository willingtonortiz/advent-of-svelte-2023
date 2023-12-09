<script lang="ts">
  import { z } from "zod";
  import { Circle, X, Plus, Trash, ArrowUp, ArrowDown } from "lucide-svelte";
  import ChallengeTitle from "$lib/components/molecules/ChallengeTitle.svelte";
  import ChallengeBackButton from "$lib/components/molecules/ChallengeBackButton.svelte";

  const ZAddChild = z.object({
    name: z.string({ required_error: "Name is required" }),
    tally: z.number({ required_error: "Tally is required" }),
  });

  export let data;
  let { children } = data;

  let dialog: HTMLDialogElement;
  let newName: string;
  let newTally: number;
  let errors: z.ZodIssue[] = [];

  function openDialog() {
    dialog.showModal();
  }

  function closeDialog() {
    dialog.close();
  }

  function addChild() {
    const newChild = ZAddChild.safeParse({
      name: newName,
      tally: newTally,
    });

    if (!newChild.success) {
      errors = newChild.error.issues;
      return;
    }

    // Add and sort
    const newChildren = [...children, { ...newChild.data, id: crypto.randomUUID() }];
    newChildren.sort((a, b) => b.tally - a.tally);

    // Updating variable
    children = newChildren;

    newName = "";
    newTally = 0;
    errors = [];

    closeDialog();
  }

  function removeChild(id: string) {
    children = children.filter((child) => child.id !== id);
  }

  function incrementTally(id: string) {
    const newChildren = children.map((child) => {
      if (child.id === id) {
        return { ...child, tally: child.tally + 1 };
      }

      return child;
    });

    newChildren.sort((a, b) => b.tally - a.tally);

    children = newChildren;
  }

  function decrementTally(id: string) {
    const newChildren = children.map((child) => {
      if (child.id === id) {
        return { ...child, tally: child.tally - 1 };
      }

      return child;
    });

    newChildren.sort((a, b) => b.tally - a.tally);

    children = newChildren;
  }
</script>

<!-- TODO: Total children, Nicest Child, Naughtiest Child -->

<main class="mt-4">
  <ChallengeBackButton />

  <ChallengeTitle>Challenge 01 - Naughty or Nice</ChallengeTitle>

  <div class="mb-4">
    <button
      class="flex items-center px-2 py-1 transition-colors border rounded-md hover:bg-gray-100"
      on:click={openDialog}
    >
      <Plus class="inline mr-2" size={16} /> Add child
    </button>
  </div>

  <table class="w-full border">
    <thead>
      <tr>
        <th class="px-2 py-1 border">Name</th>
        <th class="px-2 py-1 border">Tally</th>
        <th class="px-2 py-1 border">Category</th>
        <th class="px-2 py-1 border">Actions</th>
      </tr>
    </thead>

    <tbody>
      {#each children as child}
        {@const isNice = child.tally > 0}
        <tr>
          <td class="px-2 py-1 border">{child.name}</td>
          <td class="px-2 py-1 border">{child.tally}</td>
          <td class="px-2 py-1 border">
            <Circle
              class="inline {isNice
                ? 'fill-green-400 text-green-400'
                : 'fill-red-400 text-red-400'}"
            />

            <span class="ml-2">{isNice ? "Nice" : "Naughty"}</span>
          </td>

          <td class="px-2 py-1 border">
            <div class="flex justify-center gap-4 flex-nowrap">
              <button class="text-green-500" on:click={() => incrementTally(child.id)}>
                <ArrowUp size={20} />
              </button>

              <button class="text-red-500" on:click={() => decrementTally(child.id)}>
                <ArrowDown size={20} />
              </button>

              <button class="text-red-500" on:click={() => removeChild(child.id)}>
                <Trash size={20} />
              </button>
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>

<dialog
  bind:this={dialog}
  class="w-[300px] px-8 py-2 relative rounded-lg backdrop:backdrop-blur-sm"
>
  <button on:click={closeDialog}>
    <X class="absolute right-2 top-2" />
  </button>

  <h1 class="mb-4 text-xl font-semibold">Add child</h1>

  <div class="flex flex-col gap-1 mb-2 flex-nowrap">
    <label for="name">Name</label>
    <input id="name" name="name" type="text" bind:value={newName} />
  </div>

  <div class="flex flex-col gap-1 mb-4 flex-nowrap">
    <label for="tally">Tally</label>
    <input id="tally" name="tally" type="number" bind:value={newTally} />
  </div>

  {#if errors.length > 0}
    <ul>
      {#each errors as error}
        <li>
          <p class="text-sm text-red-500">{error.message}</p>
        </li>
      {/each}
    </ul>
  {/if}

  <button
    class="w-full px-2 py-1 my-8 transition-colors border rounded-md hover:bg-gray-100"
    on:click={addChild}
  >
    Register
  </button>
</dialog>
