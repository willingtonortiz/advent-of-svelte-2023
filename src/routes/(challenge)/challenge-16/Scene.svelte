<script lang="ts">
  import { T } from "@threlte/core";
  import { OrbitControls, Grid } from "@threlte/extras";
  import type { Present } from "./types";
  import { getRandomColor } from "$lib/data/colors";

  export let presents: Present[];
  export let selectedId: string | null = null;
  $: isSomethingSelected = selectedId !== null;
</script>

<T.PerspectiveCamera makeDefault position={[15, 15, 15]}>
  <OrbitControls />
</T.PerspectiveCamera>

<T.DirectionalLight position={[10, 10, 10]} intensity={2.5} />

{#each presents as { id, x, y, z }}
  {@const isSelected = id === selectedId}

  <T.Mesh position.x={10 - x} position.z={10 - y} position.y={z}>
    <T.BoxGeometry args={[1, 1, 1]} />

    <T.MeshStandardMaterial
      color={getRandomColor()}
      transparent
      opacity={isSomethingSelected ? (isSelected ? 1 : 0.1) : 1}
    />
  </T.Mesh>
{/each}

<Grid
  sectionColor={"gray"}
  sectionThickness={1}
  cellSize={1}
  cellColor={"#cccccc"}
  gridSize={30}
  position.y={-0.5}
/>
