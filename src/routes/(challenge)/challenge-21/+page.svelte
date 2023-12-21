<script lang="ts">
  import { onMount } from "svelte";
  import { format } from "date-fns";
  import { Button } from "$lib/components/ui/button";
  import TemperatureChart from "./TemperatureChart.svelte";

  const API_URL = "https://api.open-meteo.com/v1/forecast";

  type Coordinates = {
    latitude: number;
    longitude: number;
  };

  type Temperature = {
    timestamp: Date;
    temperature: number;
  };

  type Response = {
    current: {
      time: string;
      temperature_2m: number;
    };
    hourly: {
      time: string[];
      temperature_2m: number[];
    };
  };

  let coords: Coordinates | null = null;
  let weather: Response | null = null;
  $: weatherGroupedByDay = weather
    ? weather.hourly.temperature_2m.reduce(
        (acc, curr, index) => {
          const date = new Date(weather!.hourly.time[index]);
          const day = format(date, "dd-MM-yyyy");
          const item: Temperature = {
            timestamp: date,
            temperature: curr,
          };

          if (acc[day]) {
            acc[day].push(item);
          } else {
            acc[day] = [item];
          }

          return acc;
        },
        {} as Record<string, Temperature[]>,
      )
    : [];
  $: if (coords !== null) {
    getWeatherData(coords).then((response) => (weather = response));
  }

  async function fetchWeatherData({ latitude, longitude }: Coordinates) {
    const url = new URL(API_URL);
    url.searchParams.append("latitude", `${latitude}`);
    url.searchParams.append("longitude", `${longitude}`);
    url.searchParams.append("current", "temperature_2m");
    url.searchParams.append("hourly", "temperature_2m");

    const response: Response = await fetch(url.toString()).then((response) => response.json());
    return response;
  }

  async function getWeatherData({ latitude, longitude }: { latitude: number; longitude: number }) {
    return await fetchWeatherData({ latitude, longitude });
  }

  function getUserLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => (coords = position.coords),
      () => (coords = null),
    );
  }

  onMount(() => {
    getUserLocation();
  });
</script>

<main class="mt-4 mb-12">
  {#if coords !== null && weather !== null}
    <div class="rounded-lg border shadow-sm flex flex-col items-center gap-4 py-4">
      <h3 class="text-lg font-semibold">Current Weather</h3>

      <div class="text-3xl font-bold">{weather.current.temperature_2m}°C</div>
    </div>

    <div class="rounded-lg border shadow-sm mt-4">
      <div class="flex flex-col p-4">
        <h3 class="text-lg font-semibold">Daily Forecast</h3>
      </div>

      <div class="px-6 py-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {#each Object.entries(weatherGroupedByDay) as [day, items]}
          <div class="border p-4 rounded-lg bg-gray-50 space-y-4">
            <p class="text-lg font-semibold text-center">
              {#if day.split("-")[0] === "25"}
                🎅🎄
              {/if}
              {day}
            </p>

            <TemperatureChart data={items} />
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <div
      class="mt-8 py-4 px-8 bg-gray-100 flex flex-col items-center gap-8 mx-auto w-fit rounded-xl"
    >
      <p class="text-lg">Could not access your location, please go to settings and give access</p>

      <Button on:click={getUserLocation}>Access location</Button>
    </div>
  {/if}
</main>
