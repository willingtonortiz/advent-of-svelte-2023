<script lang="ts">
  const API_URL = "https://advent.sveltesociety.dev/data/2023/day-thirteen.json";

  interface Present {
    name: string;
    weight: number;
  }

  type ResponseData = Present[];
</script>
