const apiUrl = "https://advent.sveltesociety.dev/data/2023/day-three.json";

export type Present = {
  id: string;
  name: string;
  weight: number;
};

export async function load({ fetch }) {
  const children: Omit<Present, "id">[] = await fetch(apiUrl).then((res) => res.json());
  const childrenWithIds = children.map((child) => ({ ...child, id: crypto.randomUUID() }));
  childrenWithIds.sort((a, b) => b.weight - a.weight);

  return { presents: childrenWithIds };
}
