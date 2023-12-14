const apiUrl = "https://advent.sveltesociety.dev/data/2023/day-one.json";

type Child = {
  id: string;
  name: string;
  tally: number;
};

export async function load({ fetch }) {
  const children: Omit<Child, "id">[] = await fetch(apiUrl).then((res) => res.json());
  const childrenWithIds = children.map((child) => ({ ...child, id: crypto.randomUUID() }));
  childrenWithIds.sort((a, b) => b.tally - a.tally);

  return { children: childrenWithIds };
}
