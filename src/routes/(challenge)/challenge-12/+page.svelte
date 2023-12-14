<script lang="ts">
  import { draggable } from "@neodrag/svelte";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Button } from "$lib/components/ui/button";
  import { Trash } from "lucide-svelte";

  type Sticker = {
    id: number;
    url: string;
  };

  type StickerInstance = Sticker & {
    instance: string;
    defaultPosition: {
      x: number;
      y: number;
    };
  };

  const STICKERS = Array.from({ length: 11 }).map((_, index) => ({
    id: index + 1,
    url: `https://advent.sveltesociety.dev/data/2023/day-twelve/${index + 1}.png`,
  }));

  const colors = [
    "bg-gray-100 border-gray-200",
    "bg-red-100 border-red-200",
    "bg-yellow-100 border-yellow-200",
    "bg-green-100 border-green-200",
    "bg-blue-100 border-blue-200",
    "bg-indigo-100 border-indigo-200",
    "bg-purple-100 border-purple-200",
    "bg-pink-100 border-pink-200",
  ];

  let title = "Your title";
  let message = "Your message";
  let selectedColor = colors[0];
  let stickers: StickerInstance[] = [];

  function setColor(color: string) {
    selectedColor = color;
  }

  function addSticker(id: number) {
    const foundSticker = STICKERS.find((sticker) => sticker.id === id)!;
    stickers = [
      ...stickers,
      {
        ...foundSticker,
        instance: crypto.randomUUID(),
        defaultPosition: {
          x: Math.floor(Math.random() * 600),
          y: Math.floor(Math.random() * 400),
        },
      },
    ];
  }

  function removeInstance(instance: string) {
    stickers = stickers.filter((sticker) => sticker.instance !== instance);
  }
</script>

<div class="mt-4 mb-12">
  <div class="h-[500px] border rounded-xl mb-12 relative {selectedColor}">
    <div class={"absolute w-[400px] left-1/2 -translate-x-1/2 top-1/3 flex flex-col items-center"}>
      <h1 class="font-bold text-3xl text-center">{title}</h1>

      <p class="text-center mt-4">{message}</p>
    </div>

    {#each stickers as sticker (sticker.instance)}
      <div
        class="w-[100px] h-[100px] absolute group"
        use:draggable={{ bounds: "parent", defaultPosition: sticker.defaultPosition }}
      >
        <button class="h-[100px] hover:bg-transparent bg-transparent">
          <img class="w-full h-full" src={sticker.url} alt={`Image ${sticker.id}`} />
        </button>

        <div class="absolute -right-4 -top-4 hidden group-hover:block">
          <Button
            size={"icon"}
            variant={"outline"}
            on:click={() => removeInstance(sticker.instance)}
          >
            <Trash />
          </Button>
        </div>
      </div>
    {/each}
  </div>

  <h2 class="mb-2 font-semibold text-xl">Text</h2>

  <div class="grid grid-cols-2 gap-4 mb-8">
    <div>
      <Label>Title</Label>
      <Input bind:value={title} placeholder={"Type your title"} />
    </div>

    <div>
      <Label>Message</Label>
      <Input bind:value={message} placeholder={"Type your message"} />
    </div>
  </div>

  <h2 class="font-semibold text-xl">Colors</h2>
  <p class="mb-2">Select a color</p>

  <ul class="flex gap-4 mb-8">
    {#each colors as color}
      <Button
        class="w-16 h-10  rounded-lg {color} hover:{color} border"
        on:click={() => setColor(color)}
      />
    {/each}
  </ul>

  <h2 class="font-semibold text-xl">Stickers</h2>
  <p class="mb-2">Click one to add it</p>

  <ul class="grid grid-cols-6 gap-4">
    {#each STICKERS as { id, url }}
      <li>
        <Button class="h-full w-full" variant={"outline"} on:click={() => addSticker(id)}>
          <img src={url} alt={`Image ${id}`} />
        </Button>
      </li>
    {/each}
  </ul>
</div>
