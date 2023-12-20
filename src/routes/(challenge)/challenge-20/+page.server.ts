const API_URL = "https://advent.sveltesociety.dev/data/2023/day-twenty.json";

export async function load({ fetch }) {
  const jokes: string[] = await fetch(API_URL).then((r) => r.json());

  return { jokes };
}
