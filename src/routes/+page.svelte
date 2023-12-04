<script lang="ts">
  import { Check, Gift, TreePine, Hourglass, Clock } from "lucide-svelte";
  import { fade } from "svelte/transition";
  import { getDate } from "date-fns";
  import { onMount } from "svelte";

  type Challenge = {
    id: number;
    title: string;
    slug: string;
    description: string;
    isDone: boolean;
  };

  const challenges: Challenge[] = [
    {
      id: 1,
      slug: "challenge-01",
      title: "Naughty or Nice",
      description: "complete...",
      isDone: true,
    },
    {
      id: 2,
      slug: "challenge-02",
      title: "Hungry Santa",
      description: "complete...",
      isDone: false,
    },
    {
      id: 3,
      slug: "challenge-03",
      title: "Sled Load Balancer",
      description: "complete...",
      isDone: false,
    },
    {
      id: 4,
      slug: "challenge-04",
      title: "challenge-04",
      description: "challange-04",
      isDone: false,
    },
    {
      id: 5,
      slug: "challenge-05",
      title: "challenge-05",
      description: "challange-05",
      isDone: false,
    },
    {
      id: 6,
      slug: "challenge-06",
      title: "challenge-06",
      description: "challange-06",
      isDone: false,
    },
    {
      id: 7,
      slug: "challenge-07",
      title: "challenge-07",
      description: "challange-07",
      isDone: false,
    },
    {
      id: 8,
      slug: "challenge-08",
      title: "challenge-08",
      description: "challange-08",
      isDone: false,
    },
    {
      id: 9,
      slug: "challenge-09",
      title: "challenge-09",
      description: "challange-09",
      isDone: false,
    },
    {
      id: 10,
      slug: "challenge-10",
      title: "challenge-10",
      description: "challange-10",
      isDone: false,
    },
    {
      id: 11,
      slug: "challenge-11",
      title: "challenge-11",
      description: "challange-11",
      isDone: false,
    },
    {
      id: 12,
      slug: "challenge-12",
      title: "challenge-12",
      description: "challange-12",
      isDone: false,
    },
    {
      id: 13,
      slug: "challenge-13",
      title: "challenge-13",
      description: "challange-13",
      isDone: false,
    },
    {
      id: 14,
      slug: "challenge-14",
      title: "challenge-14",
      description: "challange-14",
      isDone: false,
    },
    {
      id: 15,
      slug: "challenge-15",
      title: "challenge-15",
      description: "challange-15",
      isDone: false,
    },
    {
      id: 16,
      slug: "challenge-16",
      title: "challenge-16",
      description: "challange-16",
      isDone: false,
    },
    {
      id: 17,
      slug: "challenge-17",
      title: "challenge-17",
      description: "challange-17",
      isDone: false,
    },
    {
      id: 18,
      slug: "challenge-18",
      title: "challenge-18",
      description: "challange-18",
      isDone: false,
    },
    {
      id: 19,
      slug: "challenge-19",
      title: "challenge-19",
      description: "challange-19",
      isDone: false,
    },
    {
      id: 20,
      slug: "challenge-20",
      title: "challenge-20",
      description: "challange-20",
      isDone: false,
    },
    {
      id: 21,
      slug: "challenge-21",
      title: "challenge-21",
      description: "challange-21",
      isDone: false,
    },
    {
      id: 22,
      slug: "challenge-22",
      title: "challenge-22",
      description: "challange-22",
      isDone: false,
    },
    {
      id: 23,
      slug: "challenge-23",
      title: "challenge-23",
      description: "challange-23",
      isDone: false,
    },
    {
      id: 24,
      slug: "challenge-24",
      title: "challenge-24",
      description: "challange-24",
      isDone: false,
    },
  ];

  // Add emojis based on the challenges?
  const emojis = ["🎅", "🎄", "⭐", "🎁", "❄️", "☃️", "🧦", "🧝"];
  const emojisLength = emojis.length;
  let areChallengesVisible = false;

  const today = getDate(new Date());
  const totalChallenges = today;
  const completedChallenges = challenges.filter((challenge) => challenge.isDone).length;
  const uncompletedChallenges = today - completedChallenges;

  function showShow({ id }: Challenge) {
    return id <= today;
  }

  onMount(() => {
    areChallengesVisible = true;
  });
</script>

<main class="mt-8">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <div
      class="border border-green-200 px-4 py-2 rounded-lg bg-green-50 transition-shadow hover:shadow-md hover:shadow-green-200"
    >
      <h1><Gift class="inline text-green-500" /> Completed</h1>
      <span class="text-4xl block mt-2">{completedChallenges}</span>
    </div>

    <div
      class="border border-yellow-200 px-4 py-2 rounded-lg bg-yellow-50 transition-shadow hover:shadow-md hover:shadow-yellow-200"
    >
      <h1><Hourglass class="inline text-yellow-500 mr-2" />Uncompleted</h1>
      <span class="text-4xl block mt-2">{uncompletedChallenges}</span>
    </div>

    <div
      class="border px-4 py-2 rounded-lg border-blue-200 bg-blue-50 transition-shadow hover:shadow-md hover:shadow-blue-200"
    >
      <h1><TreePine class="inline text-blue-500 " /> Total</h1>
      <span class="text-4xl block mt-2">{totalChallenges}</span>
    </div>
  </div>

  <h2 class="mb-4 text-xl font-semibold">Challenges</h2>

  <ul class="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-8">
    {#each challenges as challenge, index}
      {#if areChallengesVisible && showShow(challenge)}
        {@const isEven = index % 2 === 0}

        <li class="transition-transform hover:scale-105" transition:fade={{ delay: index * 100 }}>
          <a
            href={challenge.slug}
            class="h-28 px-4 py-2 block border rounded-lg relative {!challenge.isDone &&
              'pointer-events-none bg-gray-200'}"
          >
            <h2 class="text-lg font-semibold">
              <span class="text-xl">{emojis[index % emojisLength]}</span>
              {challenge.title}
            </h2>
            <p>{challenge.description}</p>
            <span
              class="absolute right-4 bottom-2 text-2xl font-bold {isEven
                ? 'text-green-500'
                : 'text-red-500'}">{challenge.id.toString().padStart(2, "0")}</span
            >
            <span class="absolute left-4 bottom-2">
              {#if challenge.isDone}
                <Check class="text-green-500" />
              {:else}
                <Clock class="text-yellow-500" />
              {/if}
            </span>
          </a>
        </li>
      {/if}
    {/each}
  </ul>
</main>
