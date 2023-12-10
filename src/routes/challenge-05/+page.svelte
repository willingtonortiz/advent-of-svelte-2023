<script lang="ts">
  import { onMount } from "svelte";
  import ChallengeBackButton from "$lib/components/molecules/ChallengeBackButton.svelte";
  import ChallengeTitle from "$lib/components/molecules/ChallengeTitle.svelte";
  import * as Card from "$lib/components/ui/card";
  import { cn } from "$lib/utils";

  const apiUrl = "https://advent.sveltesociety.dev/data/2023/day-five.json";

  type TaskType = "CREATED_TOY" | "WRAPPED_PRESENT";

  interface Task {
    elf: string;
    task: TaskType;
    minutesTaken: number;
    date: string;
  }

  let tasks: Task[] = [];
  $: wrappedPresentsTasks = tasks.filter((task) => task.task === "WRAPPED_PRESENT");
  $: createdToysTasks = tasks.filter((task) => task.task === "CREATED_TOY");
  $: totalToysCreated = createdToysTasks.length;
  $: totalPresentsWrapped = wrappedPresentsTasks.length;
  $: averageToyCreationTime =
    createdToysTasks.reduce((acc, task) => acc + task.minutesTaken, 0) / totalToysCreated;
  $: averagePresentWrappingTime =
    wrappedPresentsTasks.reduce((acc, task) => acc + task.minutesTaken, 0) / totalPresentsWrapped;
  $: elvesTasks = tasks.reduce(
    (acc, task) => {
      if (!acc[task.elf]) {
        acc[task.elf] = {
          presentsWrapped: [],
          toysCreated: [],
        };
      }

      if (task.task === "WRAPPED_PRESENT") {
        acc[task.elf].presentsWrapped.push(task);
      } else {
        acc[task.elf].toysCreated.push(task);
      }

      return acc;
    },
    {} as Record<string, { presentsWrapped: Task[]; toysCreated: Task[] }>,
  );
  // TODO: Calculate elves metrics (average presents wrapped, average toys created, etc)
  $: mostToysCreatedElf = Object.keys(elvesTasks).reduce(
    (acc, elf) => {
      if (elvesTasks[elf].toysCreated.length > acc.toysCreated.length) {
        return { elf, toysCreated: elvesTasks[elf].toysCreated };
      }

      return acc;
    },
    { elf: "", toysCreated: [] as Task[] },
  );
  $: mostPresentsWrappedElf = Object.keys(elvesTasks).reduce(
    (acc, elf) => {
      if (elvesTasks[elf].presentsWrapped.length > acc.presentsWrapped.length) {
        return { elf, presentsWrapped: elvesTasks[elf].presentsWrapped };
      }

      return acc;
    },
    { elf: "", presentsWrapped: [] as Task[] },
  );
  $: fastestToysCreatorElf = Object.keys(elvesTasks).reduce(
    (acc, elf) => {
      const toysCreated = elvesTasks[elf].toysCreated;
      const averageTime =
        toysCreated.reduce((acc, task) => acc + task.minutesTaken, 0) / toysCreated.length;

      if (averageTime < acc.averageTime) {
        return { elf, averageTime };
      }

      return acc;
    },
    { elf: "", averageTime: 99 },
  );
  $: fastestPresentsWrapperElf = Object.keys(elvesTasks).reduce(
    (acc, elf) => {
      const presentsWrapped = elvesTasks[elf].presentsWrapped;
      const averageTime =
        presentsWrapped.reduce((acc, task) => acc + task.minutesTaken, 0) / presentsWrapped.length;

      if (averageTime < acc.averageTime) {
        return { elf, averageTime };
      }

      return acc;
    },
    { elf: "", averageTime: 99 },
  );

  async function fetchTasks(): Promise<Task[]> {
    return fetch(apiUrl).then((res) => res.json());
  }

  onMount(() => {
    fetchTasks().then((newTasks) => {
      tasks = newTasks;
    });

    const intervalId = setInterval(async () => {
      const newTasks = await fetchTasks();
      tasks = newTasks;
    }, 1000);

    return () => clearInterval(intervalId);
  });
</script>

<main class="mt-4">
  <ChallengeBackButton />

  <ChallengeTitle>Challenge 05 - Elf Productivity Dashboard</ChallengeTitle>

  <h2 class="mt-12 mb-4">General performance</h2>

  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
    <Card.Root class="bg-gray-100">
      <Card.Header class="h-20">
        <Card.Title class="text-sm">Total Toys Created</Card.Title>
      </Card.Header>

      <Card.Content>
        <p class="text-2xl font-semibold">{totalToysCreated} toys</p>
      </Card.Content>
    </Card.Root>

    <Card.Root class="bg-gray-100">
      <Card.Header class="h-20">
        <Card.Title class="text-sm">Average Toy Creation Time</Card.Title>
      </Card.Header>

      <Card.Content>
        <p class="text-2xl font-semibold">{averageToyCreationTime.toFixed(2)} minutes</p>
      </Card.Content>
    </Card.Root>

    <Card.Root class="bg-gray-100">
      <Card.Header class="h-20">
        <Card.Title class="text-sm">Total Presents Wrapped</Card.Title>
      </Card.Header>

      <Card.Content>
        <p class="text-2xl font-semibold">{totalPresentsWrapped} presents</p>
      </Card.Content>
    </Card.Root>

    <Card.Root class="bg-gray-100">
      <Card.Header class="h-20">
        <Card.Title class="text-sm">Average Present Wrapping Time</Card.Title>
      </Card.Header>

      <Card.Content>
        <p class="text-2xl font-semibold">{averagePresentWrappingTime.toFixed(2)} minutes</p>
      </Card.Content>
    </Card.Root>
  </div>

  <h2 class="mt-12 mb-4">Best Elves</h2>

  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
    <Card.Root class="bg-gray-100">
      <Card.Header class="h-20">
        <Card.Title class="text-sm">Most Toys Created</Card.Title>
      </Card.Header>

      <Card.Content>
        <p class="text-2xl font-semibold">{mostToysCreatedElf.elf}</p>
        <p class="text-sm">
          <span class="text-semibold">{mostToysCreatedElf.toysCreated.length}</span> toys created
        </p>
      </Card.Content>
    </Card.Root>

    <Card.Root class="bg-gray-100">
      <Card.Header class="h-20">
        <Card.Title class="text-sm">Most Presents Wrapped</Card.Title>
      </Card.Header>

      <Card.Content>
        <p class="text-2xl font-semibold">{mostPresentsWrappedElf.elf}</p>
        <p class="text-sm">
          <span class="text-semibold">{mostPresentsWrappedElf.presentsWrapped.length}</span> presents
          wrapped
        </p>
      </Card.Content>
    </Card.Root>

    <Card.Root class="bg-gray-100">
      <Card.Header class="h-20">
        <Card.Title class="text-sm">Fastest Toy Creator</Card.Title>
      </Card.Header>

      <Card.Content>
        <p class="text-2xl font-semibold">{fastestToysCreatorElf.elf}</p>
        <p class="text-sm">
          <span class="text-semibold">{fastestToysCreatorElf.averageTime.toFixed(2)}</span> minutes average
          time
        </p>
      </Card.Content>
    </Card.Root>

    <Card.Root class="bg-gray-100">
      <Card.Header class="h-20">
        <Card.Title class="text-sm">Fastest Present Wrapper</Card.Title>
      </Card.Header>

      <Card.Content>
        <p class="text-2xl font-semibold">{fastestPresentsWrapperElf.elf}</p>
        <p class="text-sm">
          <span class="text-semibold">{fastestPresentsWrapperElf.averageTime.toFixed(2)}</span> minutes
          average time
        </p>
      </Card.Content>
    </Card.Root>
  </div>

  <h2 class="mt-12 mb-4">Elves performance</h2>

  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
    {#each Object.keys(elvesTasks) as elf, index}
      <Card.Root class={cn(index % 2 === 0 && "bg-red-100", index % 2 !== 0 && "bg-green-100")}>
        <Card.Header class="h-20">
          <Card.Title>{elf} {["🧝", "🧝‍♂️", "🧝‍♀️"][index % 3]}</Card.Title>
        </Card.Header>

        <Card.Content>
          <p class="text-sm">
            <span class="text-semibold">{elvesTasks[elf].toysCreated.length}</span> toys created
          </p>
          <p class="text-sm">
            <span class="text-semibold">{elvesTasks[elf].presentsWrapped.length}</span> presents wrapped
          </p>
        </Card.Content>
      </Card.Root>
    {/each}
  </div>
</main>
