<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { intervalToDuration, differenceInSeconds } from "date-fns";

  const christmas = new Date("December 25, 2023 00:00:00");
  let intervalId: number | undefined = undefined;
  let duration = intervalToDuration({ start: new Date(), end: christmas });
  $: days = duration.days ?? 0;
  $: hours = duration.hours ?? 0;
  $: minutes = duration.minutes ?? 0;
  $: seconds = duration.seconds ?? 0;

  onMount(() => {
    intervalId = setInterval(() => {
      const now = new Date();
      duration = intervalToDuration({ start: now, end: christmas });

      if (differenceInSeconds(christmas, now) <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);
  });
</script>

<!-- TODO: Fix countdown -->

<div class="mb-12">
  <div class="grid grid-cols-4 gap-2">
    <div class="flex flex-col flex-nowrap items-center text-green-500">
      <div class="inline-grid">
        {#key days}
          <span class="columns-1 text-[48px] font-semibold" in:fly={{ y: -20 }} out:fly={{ y: 20 }}>
            {days}
          </span>
        {/key}
      </div>

      <span class="text-sm font-mono uppercase">Days</span>
    </div>

    <div class="flex flex-col flex-nowrap items-center text-red-500">
      <div class="inline-grid">
        {#key hours}
          <span class="columns-1 text-[48px] font-semibold" in:fly={{ y: -20 }} out:fly={{ y: 20 }}>
            {hours}
          </span>
        {/key}
      </div>

      <span class="text-sm font-mono uppercase">Hours</span>
    </div>

    <div class="flex flex-col flex-nowrap items-center text-green-500">
      <div class="inline-grid">
        {#key minutes}
          <span class="columns-1 text-[48px] font-semibold" in:fly={{ y: -20 }} out:fly={{ y: 20 }}>
            {minutes}
          </span>
        {/key}
      </div>

      <span class="text-sm font-mono uppercase">Minutes</span>
    </div>

    <div class="flex flex-col flex-nowrap items-center text-red-500">
      <div class="inline-grid">
        {#key seconds}
          <span class="columns-1 text-[48px] font-semibold" in:fly={{ y: -20 }} out:fly={{ y: 20 }}>
            {seconds}
          </span>
        {/key}
      </div>

      <span class="text-sm font-mono uppercase">Seconds</span>
    </div>
  </div>
</div>

<!--- Show days, hours, minutes and seconds remaining-->
