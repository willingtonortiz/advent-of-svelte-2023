<script lang="ts">
  import { Gift, Clock, TreePine } from "lucide-svelte";
  import { fade } from "svelte/transition";
  import { getDate } from "date-fns";
  import { onMount } from "svelte";
  import { CHALLENGES, type Challenge } from "$lib/data/levels";

  // Add emojis based on the challenges?
  const emojis = ["🎅", "🎄", "⭐", "🎁", "❄️", "☃️", "🧦", "🧝"];
  const emojisLength = emojis.length;
  let areChallengesVisible = false;

  const today = getDate(new Date());
  const totalChallenges = today;
  const completedChallenges = CHALLENGES.filter((challenge) => challenge.isDone).length;
  const uncompletedChallenges = today - completedChallenges;

  function showShow({ id }: Challenge) {
    return id <= today;
  }

  onMount(() => {
    areChallengesVisible = true;
  });
</script>

<main class="mt-8">
  <div class="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3">
    <div
      class="px-4 py-2 transition-shadow border border-green-200 rounded-lg bg-green-50 hover:shadow-md hover:shadow-green-200"
    >
      <h1><Gift class="inline text-green-500" /> Completed</h1>
      <span class="block mt-2 text-4xl">{completedChallenges}</span>
    </div>

    <div
      class="px-4 py-2 transition-shadow border border-yellow-200 rounded-lg bg-yellow-50 hover:shadow-md hover:shadow-yellow-200"
    >
      <h1><Clock class="inline mr-2 text-yellow-500" />Uncompleted</h1>
      <span class="block mt-2 text-4xl">{uncompletedChallenges}</span>
    </div>

    <div
      class="px-4 py-2 transition-shadow border border-blue-200 rounded-lg bg-blue-50 hover:shadow-md hover:shadow-blue-200"
    >
      <h1><TreePine class="inline text-blue-500 " /> Total</h1>
      <span class="block mt-2 text-4xl">{totalChallenges}</span>
    </div>
  </div>

  <h2 class="mb-4 text-xl font-semibold text-gray-600">Challenges</h2>

  <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12">
    {#each CHALLENGES as challenge, index}
      {#if areChallengesVisible && showShow(challenge)}
        {@const isEven = index % 2 === 0}

        <li
          class="transition-transform hover:scale-[1.03]"
          transition:fade={{ delay: index * 100 }}
        >
          <a
            href={challenge.slug}
            class=" px-4 py-2 block shadow-md border rounded-lg relative {!challenge.isDone &&
              'pointer-events-none blur-sm'}"
          >
            <span
              class="absolute right-4 top-2 text-4xl {isEven ? 'text-green-500' : 'text-red-500'}"
            >
              {challenge.id.toString().padStart(2, "0")}
            </span>

            <span class="absolute left-4 top-2">
              <span class="text-xl">{emojis[index % emojisLength]}</span>
            </span>

            <img class="mt-8" src={challenge.image} alt={challenge.title} />

            <div class="mt-4 h-[100px]">
              <h2 class="text-lg font-semibold text-gray-600">{challenge.title}</h2>
              <p class="text-sm text-gray-400">{challenge.description}</p>
            </div>
          </a>
        </li>
      {/if}
    {/each}
  </ul>
</main>
