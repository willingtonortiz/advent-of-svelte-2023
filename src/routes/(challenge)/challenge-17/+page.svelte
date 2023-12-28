<script lang="ts">
  import * as Sheet from "$lib/components/ui/sheet";
  import { Button } from "$lib/components/ui/button";
  import { Label } from "$lib/components/ui/label";
  import { Input } from "$lib/components/ui/input";

  type ElfExpenses = {
    id: string;
    name: string;
    budget: number;
    items: {
      name: string;
      price: number;
    }[];
  };

  let isAddExpenseSheetOpen = true;
  let expenses: ElfExpenses[] = [
    {
      id: "719b7feb-be77-4422-be7f-19b0dc50c703",
      name: "Frankie",
      budget: 1000,
      items: [
        { name: "MacBook Air", price: 999 },
        { name: "MacBook Pro", price: 1299 },
        { name: "Magic Mouse", price: 79 },
        { name: "Magic Trackpad", price: 99 },
        { name: "Webcam", price: 49 },
      ],
    },
    {
      id: "1ffd60ba-2d98-4d04-8790-e5a535106635",
      name: "Kaelyn",
      budget: 2000,
      items: [
        { name: "Dell XPS 13", price: 999 },
        { name: "Dell Curved Monitor", price: 399 },
        { name: "Webcam", price: 49 },
        { name: "Headphones", price: 99 },
        { name: "Standing Desk", price: 199 },
        { name: "Chair", price: 49 },
      ],
    },
  ];

  function addElfExpenses({ target }: SubmitEvent) {
    const values = Object.fromEntries(new FormData(target as HTMLFormElement));

    expenses = [
      {
        id: Math.random().toString(),
        name: values.elfName as string,
        budget: Number(values.budget),
        items: [],
      },
      ...expenses,
    ];

    isAddExpenseSheetOpen = false;
  }
</script>

<div class="mt-8">
  <ul class="flex flex-col gap-4">
    {#each expenses as expense}
      <li class="border p-4 rounded-lg grid grid-cols-3">
        <h2 class="text-xl font-bold">Budget: ${expense.budget}</h2>

        <ul class="list-disc ml-4">
          {#each expense.items as item}
            <li class="text-gray-700">{item.name} - ${item.price}</li>
          {/each}
        </ul>
      </li>
    {/each}
  </ul>

  <div class="mt-4">
    <Button on:click={() => (isAddExpenseSheetOpen = true)}>Add Elf Expenses Record</Button>

    <Sheet.Root open={isAddExpenseSheetOpen}>
      <Sheet.Content class="flex flex-col h-full">
        <Sheet.Header>
          <Sheet.Title>New Elf Expenses</Sheet.Title>

          <Sheet.Description>
            Complete the following information to add a new Elf Expenses record.
          </Sheet.Description>
        </Sheet.Header>

        <!-- Extract form to component -->
        <form class="flex-1 flex flex-col gap-4" on:submit|preventDefault={addElfExpenses}>
          <div class="space-y-2">
            <Label for={"elfName"}>Elf name</Label>

            <Input type={"text"} name={"elfName"} />
          </div>

          <div class="space-y-2">
            <Label for={"budget"}>Budget</Label>

            <Input type={"number"} name={"budget"} />
          </div>

          <div class="space-y-2">
            <Label for={"items"}>Items</Label>

            <div>
              <div class="grid grid-cols-2 gap-2 mb-2">
                <Input placeholder="Name" type={"text"} name={"item.name"} />
                <Input placeholder="Price" type={"number"} name={"item.price"} />
              </div>

              <Button variant={"outline"} class="w-full">new Item</Button>
            </div>
          </div>

          <div class="flex-1" />

          <Button type="submit" class="w-full">Add</Button>
        </form>
      </Sheet.Content>
    </Sheet.Root>
  </div>
</div>
