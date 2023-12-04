<script lang="ts">
  import { z } from "zod";
  import { Circle, X, Plus } from "lucide-svelte";

  const ZChild = z.object({
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
    const newChild = ZChild.safeParse({
      name: newName,
      tally: newTally,
    });

    if (!newChild.success) {
      errors = newChild.error.issues;
      return;
    }

    // Add and sort
    const newChildren = [...children, newChild.data];
    newChildren.sort((a, b) => b.tally - a.tally);

    // Updating variable
    children = newChildren;

    newName = "";
    newTally = 0;
    errors = [];

    closeDialog();
  }
</script>

<!-- TODO: Total children, Nicest Child, Naughtiest Child -->
<!-- TODO: Remove child? -->
<!-- TODO: Increment and Decrement tally -->

<main class="mt-4">
  <h1 class="mb-8 font-semibold text-xl">Challenge 01 - Naughty or Nice</h1>

  <div class="mb-4">
    <button
      class="border px-2 py-1 rounded-md transition-colors hover:bg-gray-100 flex items-center"
      on:click={openDialog}
    >
      Add child <Plus class="inline ml-2" size={16} />
    </button>
  </div>

  <table class="border w-full">
    <thead>
      <tr>
        <th class="border px-2 py-1">Name</th>
        <th class="border px-2 py-1">Tally</th>
        <th class="border px-2 py-1">Category</th>
      </tr>
    </thead>

    <tbody>
      {#each children as child}
        {@const isNice = child.tally > 0}
        <tr>
          <td class="border px-2 py-1">{child.name}</td>
          <td class="border px-2 py-1">{child.tally}</td>
          <td class="border px-2 py-1">
            <Circle
              class="inline {isNice
                ? 'fill-green-400 text-green-400'
                : 'fill-red-400 text-red-400'}"
            />

            <span class="ml-2">{isNice ? "Nice" : "Naughty"}</span>
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

  <h1 class="text-xl font-semibold mb-4">Add child</h1>

  <div class="flex flex-col flex-nowrap gap-1 mb-2">
    <label for="name">Name</label>
    <input id="name" name="name" type="text" bind:value={newName} />
  </div>

  <div class="flex flex-col flex-nowrap gap-1 mb-4">
    <label for="tally">Tally</label>
    <input id="tally" name="tally" type="number" bind:value={newTally} />
  </div>

  {#if errors.length > 0}
    <ul>
      {#each errors as error}
        <li>
          <p class="text-red-500 text-sm">{error.message}</p>
        </li>
      {/each}
    </ul>
  {/if}

  <button
    class="w-full border px-2 py-1 rounded-md transition-colors hover:bg-gray-100 my-8"
    on:click={addChild}
  >
    Register
  </button>
</dialog>
