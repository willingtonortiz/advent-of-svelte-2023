<script lang="ts">
  import { Set } from "immutable";
  import { intervalToDuration } from "date-fns";
  import { cn } from "$lib/utils";
  import { Button } from "$lib/components/ui/button";

  const cards = Array.from({ length: 24 }).map((_, index) => ({
    id: index + 1,
    url: `https://advent.sveltesociety.dev/data/2023/day-eight/${index + 1}.png`,
  }));

  type GameCard = {
    id: number;
    url: string;
    type: "A" | "B";
  };

  function shuffle<T>(list: T[]): T[] {
    for (let i = 0; i < list.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }

    return list;
  }

  const zeroPad = (num?: number) => {
    if (num === undefined) return "00";
    return String(num).padStart(2, "0");
  };

  function createGameCards(): GameCard[] {
    return shuffle(
      cards.flatMap((card) => [
        { ...card, type: "A" },
        { ...card, type: "B" },
      ]),
    );
  }

  function isSameCard(a: GameCard | null, b: GameCard | null) {
    if (!a || !b) return false;
    return a.id === b.id && a.type === b.type;
  }

  let gameCards: GameCard[] = createGameCards();
  let selectedCard: GameCard | null = null;
  let secondCard: GameCard | null = null;
  let matchedIds = Set<number>();
  $: score = matchedIds.size;
  let highestScore = 0;
  let intervalId: number | undefined = undefined;
  let time = 0;
  $: duration = intervalToDuration({ start: 0, end: time * 1000 });

  function toggleCard(card: GameCard) {
    if (!intervalId) {
      intervalId = setInterval(() => time++, 1000);
    }

    // If no card selected or card already matched, do nothing
    if (!selectedCard || matchedIds.has(card.id)) {
      selectedCard = card;
      return;
    }

    // If card already selected, unselect it
    if (isSameCard(card, selectedCard)) {
      selectedCard = null;
      return;
    }

    // If it's a match, add to matchedIds and unselect
    if (card.id === selectedCard.id && card.type !== selectedCard.type) {
      matchedIds = matchedIds.add(card.id);
      selectedCard = null;
      score++;

      if (matchedIds.size === 24) {
        clearInterval(intervalId);

        if (score > highestScore) {
          highestScore = score;
        }

        alert(
          `You won! Your score is ${score}. Your time is ${zeroPad(duration.hours)}:${zeroPad(
            duration.minutes,
          )}:${zeroPad(duration.seconds)}. Your highest score is ${highestScore}.`,
        );
      }

      return;
    }

    // If it's not a match, unselect
    if (card.id !== selectedCard.id) {
      secondCard = card;

      setTimeout(() => {
        selectedCard = null;
        secondCard = null;
      }, 1000);
    }
  }

  function restartGame() {
    clearInterval(intervalId);
    gameCards = createGameCards();
    selectedCard = null;
    secondCard = null;
    matchedIds = Set<number>();
    score = 0;
    time = 0;
    intervalId = undefined;
  }
</script>

<div class="mb-12">
  <div class="flex flex-nowrap justify-between mb-4 items-center">
    <div class="text-xl font-semibold flex flex-col flex-nowrap gap-2">
      <span>Score: {score}</span>
      <span>Highest Score: {highestScore}</span>
      <span>
        Time: {zeroPad(duration.hours)}:{zeroPad(duration.minutes)}:{zeroPad(duration.seconds)}
      </span>
    </div>

    <div>
      <Button on:click={restartGame}>Restart</Button>
    </div>
  </div>

  <ul class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
    {#each gameCards as card}
      {@const isShown =
        matchedIds.has(card.id) || isSameCard(card, selectedCard) || isSameCard(card, secondCard)}

      <button
        class={cn(
          "aspect-portrait bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200",
          secondCard && "pointer-events-none",
        )}
        on:click={() => toggleCard(card)}
      >
        {#if isShown}
          <img class="aspect-portrait" src={card.url} alt="Card {card.id}" />
        {:else}
          <span class="block font-semibold text-xl px-4 text-center">Santa Card</span>
        {/if}
      </button>
    {/each}
  </ul>
</div>
