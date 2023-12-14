<script lang="ts">
  import { page } from "$app/stores";
  import ChallengeBackButton from "$lib/components/molecules/ChallengeBackButton.svelte";
  import ChallengeTitle from "$lib/components/molecules/ChallengeTitle.svelte";
  import { getChallengeBySlug } from "$lib/data/levels";

  $: challenge = getChallengeBySlug($page.url.pathname.substring(1));
  $: id = challenge.id;
  $: title = challenge.title;
</script>

<main class="mt-4">
  <div class="flex flex-nowrap gap-4 items-center">
    <ChallengeBackButton />

    <ChallengeTitle>Day {id} - {title}</ChallengeTitle>
  </div>

  <slot />
</main>
