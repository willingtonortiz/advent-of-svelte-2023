<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import Confetti from "svelte-confetti";
  import { tick } from "svelte";
  import { firstValueFrom, timer } from "rxjs";

  export let data;
  const { jokes } = data;
  const jokesCount = jokes.length;
  let isShown = false;
  let joke = getRandomJoke();

  async function getNewJoke() {
    joke = getRandomJoke();

    // Speak joke
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(joke);
    await firstValueFrom(timer(100));
    speechSynthesis.speak(utterance);

    // Show confetti
    isShown = false;
    await tick();
    isShown = true;
  }

  function getRandomJoke() {
    return jokes[Math.floor(Math.random() * jokesCount)];
  }
</script>

<main class="my-12 h-[400px] flex flex-col flex-nowrap items-center justify-center gap-16">
  <div class="border bg-gray-100 p-4 mx-4 rounded-xl z-10">
    <p class="text-xl">{joke} 🤣</p>
  </div>

  <Button class="z-10" on:click={getNewJoke}>Get a new Joke</Button>

  {#if isShown}
    <div class="z-0">
      <Confetti
        x={[-3, 3]}
        y={[-3, 2]}
        amount={300}
        duration={3000}
        delay={[0, 100]}
        size={20}
        rounded
      />
      <!--      <Confetti x={[-3, 3]} y={[-3, 2]} amount={300} />-->
    </div>
  {/if}
</main>
