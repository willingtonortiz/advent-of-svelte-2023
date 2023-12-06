<script lang="ts">
  import { scale } from "svelte/transition";
  import cookie from "$lib/assets/challenge-02/cookie.png";

  type Color = "default" | "red" | "green" | "blue" | "black";
  const colorToHueRotate: Record<Color, string> = {
    default: "hue-rotate-0",
    red: "hue-rotate-0",
    green: "hue-rotate-90 rotate-45",
    blue: "hue-rotate-180 rotate-90",
    black: "grayscale rotate-90",
  };

  let className = "";
  export let color: Color = "red";

  export { className as class };
</script>

<button
  type="button"
  class="block min-w-10 min-h-10 w-10 h-10 {className} {colorToHueRotate[color]}"
  on:click
  transition:scale
>
  <img
    src={cookie}
    class="w-full h-full transition-transform hover:scale-110 cursor-pointer"
    alt="Santa Happy"
  />
</button>
