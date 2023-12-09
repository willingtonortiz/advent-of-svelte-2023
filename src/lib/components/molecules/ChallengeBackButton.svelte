<script lang="ts">
  import { ArrowLeft } from "lucide-svelte";
  import Button from "$lib/components/ui/button/button.svelte";
</script>

<Button class="mb-4" size={"sm"} variant={"outline"} href="/">
  <ArrowLeft class="inline mr-2" size={16} /> Back
</Button>
