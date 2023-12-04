<script lang="ts">
  import { Github } from "lucide-svelte";
  import logo from "$lib/assets/logo.webp";
</script>

<header class="h-16 border-b px-12">
  <ul class="mx-auto max-w-screen-lg h-full flex flex-nowrap items-center">
    <li class="h-full py-2">
      <img src={logo} class="max-h-full" alt="Advent Of Svelte 2023" />
    </li>

    <li>
      <h1 class="font-semibold text-2xl ml-2">Advent of Svelte 2023</h1>
    </li>

    <li class="flex-1"></li>

    <li>
      <a
        href="https://github.com/willingtonortiz/advent-of-svelte-2023"
        target="_blank"
        rel="noopener"
      >
        <Github class="bg-black w-8 h-8 p-1.5 text-white rounded-full" />
      </a>
    </li>
  </ul>
</header>
