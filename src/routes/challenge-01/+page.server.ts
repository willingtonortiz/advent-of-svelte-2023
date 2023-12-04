const apiUrl = "https://advent.sveltesociety.dev/data/2023/day-one.json";

type Child = {
  name: string;
  tally: number;
};

export async function load({ fetch }) {
  const children: Child[] = await fetch(apiUrl).then((res) => res.json());
  children.sort((a, b) => b.tally - a.tally);

  return { children };
}
