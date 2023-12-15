<script lang="ts">
  import { Snowflake } from "lucide-svelte";
  import Snowfall from "$lib/components/molecules/Snowfall.svelte";
  import { COLORS } from "$lib/data/colors";
  import { Label } from "$lib/components/ui/label";
  import { Button } from "$lib/components/ui/button";
  import { Slider } from "$lib/components/ui/slider";
  import { cn } from "$lib/utils";
  import { Input } from "$lib/components/ui/input";

  type Sticker = {
    id: number;
    url: string;
  };

  const STICKERS = Array.from({ length: 11 }).map((_, index) => ({
    id: index + 1,
    url: `https://advent.sveltesociety.dev/data/2023/day-twelve/${index + 1}.png`,
  }));

  // Adding default snowflake
  const snowflakeSticker: Sticker = { id: 0, url: "" };

  let quantity = [100];
  let speed = [10];
  let selectedColor = COLORS[0];
  let selectedStickers: Sticker[] = [snowflakeSticker];
  let backgroundUrl =
    "https://t4.ftcdn.net/jpg/02/94/71/81/360_F_294718149_aIizeIOQuJAK2K79oJ7C0Ck0xTaDTxOu.jpg";

  function selectColor(color: string) {
    selectedColor = color;
  }

  function toggleSticker(id: number) {
    const isSelected = selectedStickers.find((sticker) => sticker.id === id);

    if (isSelected) {
      selectedStickers = selectedStickers.filter((sticker) => sticker.id !== id);
    } else {
      const sticker = STICKERS.find((sticker) => sticker.id === id)!;
      selectedStickers = [...selectedStickers, sticker];
    }
  }
</script>

<div class="mt-4 mb-24">
  <h1 class="mt-4 mb-2">Configure the Snow Globe</h1>

  <!--  Background url -->
  <div style="background-image: url({backgroundUrl});" class="bg-cover bg-center bg-no-repeat">
    <Snowfall {quantity} {speed}>
      {@const randSticker = selectedStickers[Math.floor(Math.random() * selectedStickers.length)]}

      {#if randSticker.id === 0}
        <Snowflake class="text-{selectedColor} animate-spin-slow w-full h-full" />
      {:else}
        <img src={randSticker.url} alt={`Image ${randSticker.id}`} class="w-full h-full" />
      {/if}
    </Snowfall>
  </div>

  <h2 class="mt-6 mb-2 text-lg font-semibold">Controls</h2>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
    <div class="space-y-2">
      <Label>Quantity ({quantity[0]}) [1 - 150]</Label>

      <Slider bind:value={quantity} min={1} max={150} step={1} class="pb-4" />
    </div>

    <div class="space-y-2">
      <Label>Speed ({speed[0]}) [1 - 100]</Label>

      <Slider bind:value={speed} min={1} max={100} step={1} class="pb-4" />
    </div>

    <div class="space-y-2">
      <Label>Snowflake color</Label>

      <ul class="flex flex-wrap gap-2">
        {#each COLORS as color}
          <Button
            variant={"outline"}
            class="w-[40px] h-[40px] bg-{color} hover:bg-{color} hover:scale-105"
            on:click={() => selectColor(color)}
          />
        {/each}
      </ul>
    </div>

    <div class="space-y-2">
      <Label>Snowflake stickers</Label>

      <ul class="grid grid-cols-6 gap-2">
        {#each STICKERS as { id, url }}
          <li>
            <Button
              class={cn(
                "w-[60px] h-[60px] p-3",
                selectedStickers.find((sticker) => sticker.id === id) && "bg-gray-200",
              )}
              variant={"outline"}
              on:click={() => toggleSticker(id)}
            >
              <img src={url} alt={`Image ${id}`} />
            </Button>
          </li>
        {/each}
      </ul>
    </div>

    <div class="space-y-2">
      <Label>Background url</Label>

      <Input bind:value={backgroundUrl} placeholder="Add your custom background" />
    </div>
  </div>
</div>
