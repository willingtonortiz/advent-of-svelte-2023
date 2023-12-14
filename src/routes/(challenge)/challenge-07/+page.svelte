<script lang="ts">
  import { onMount } from "svelte";
  import { Play } from "lucide-svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import Input from "$lib/components/ui/input/input.svelte";

  type MorseCode = {
    [key: string]: string;
  };

  const LETTER_TO_MORSE_MAP: MorseCode = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
    1: ".----",
    2: "..---",
    3: "...--",
    4: "....-",
    5: ".....",
    6: "-....",
    7: "--...",
    8: "---..",
    9: "----.",
    0: "-----",
    " ": " ",
  };

  const MORSE_TO_LETTER_MAP: MorseCode = Object.keys(LETTER_TO_MORSE_MAP).reduce((acc, key) => {
    const value = LETTER_TO_MORSE_MAP[key];
    acc[value] = key;
    return acc;
  }, {} as MorseCode);

  const textToMorse = (text: string): string => {
    const decodedWords = text
      .trim()
      .toUpperCase()
      .split(" ")
      .map((word) => {
        const letters = word.split("");
        const decodedLetters = letters.map((letter) => LETTER_TO_MORSE_MAP[letter]);
        return decodedLetters.join(" ");
      });

    return decodedWords.join(" / ");
  };

  const morseToText = (morseCode: string): string => {
    const decodedWords = morseCode
      .trim()
      .split(" / ")
      .map((word) => {
        const letters = word.split(" ");
        const decodedLetters = letters.map((letter) => MORSE_TO_LETTER_MAP[letter]);
        return decodedLetters.join("");
      });

    return decodedWords.join(" ");
  };

  let context: AudioContext;
  let oscillator: OscillatorNode;
  let gain: GainNode;

  const DOT_DURATION = 0.1;
  const LINE_DURATION = DOT_DURATION * 3;
  const DELAY_DURATION = 0.15;
  const SPACE_DURATION = DOT_DURATION * 3;

  let textInput = "";
  $: morseResult = textToMorse(textInput);

  let morseInput = "";
  $: textResult = morseToText(morseInput);

  function playMorse(morseCode: string) {
    context.resume();
    let timeLine = context.currentTime;

    const letters = morseCode.split("");

    letters.forEach((letter) => {
      timeLine += DELAY_DURATION;

      if (letter === ".") {
        gain.gain.setValueAtTime(1, timeLine);
        timeLine += DOT_DURATION;
        gain.gain.setValueAtTime(0, timeLine);
      } else if (letter === "-") {
        gain.gain.setValueAtTime(1, timeLine);
        timeLine += LINE_DURATION;
        gain.gain.setValueAtTime(0, timeLine);
      } else {
        timeLine += SPACE_DURATION;
      }
    });
  }

  onMount(() => {
    context = new AudioContext();
    oscillator = context.createOscillator();
    gain = context.createGain();
    gain.gain.value = 0;
    oscillator.frequency.value = 800;
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(0);
  });
</script>

<div>
  <h2 class="mb-1 text-lg font-semibold">Text to morse</h2>

  <div class="grid grid-cols-1 gap-4 p-4 bg-gray-100 rounded-lg sm:grid-cols-2">
    <div class="space-y-1">
      <Label>Normal text</Label>

      <Input
        class={"bg-white"}
        type="text"
        placeholder={"Type your text..."}
        bind:value={textInput}
      />
    </div>

    <div class="space-y-1">
      <Label>Morse result</Label>

      <div class="flex gap-2 flex-nowrap">
        <Input class={"bg-white"} type="text" readonly bind:value={morseResult} />

        <Button on:click={() => playMorse(morseResult)}>
          <Play size={20} />
        </Button>
      </div>
    </div>
  </div>
</div>

<h2 class="mt-8 mb-1 text-lg font-semibold">Morse to text</h2>

<div class="grid grid-cols-1 gap-4 p-4 bg-gray-100 rounded-lg sm:grid-cols-2">
  <div class="space-y-1">
    <Label>Morse text</Label>

    <div class="flex gap-2 flex-nowrap">
      <Input class={"bg-white"} type="text" bind:value={morseInput} />

      <Button on:click={() => playMorse(morseInput)}>
        <Play size={20} />
      </Button>
    </div>
  </div>

  <div class="space-y-1">
    <Label>Text result</Label>

    <Input
      class={"bg-white"}
      type="text"
      placeholder={"Type your text..."}
      readonly
      bind:value={textResult}
    />
  </div>
</div>
