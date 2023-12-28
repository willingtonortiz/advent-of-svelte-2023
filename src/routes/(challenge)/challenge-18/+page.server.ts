import type { Question } from "./types";

const API_URL = "https://advent.sveltesociety.dev/data/2023/day-eighteen.json";

export async function load({ fetch }) {
  const res = await fetch(API_URL);
  const questions: Question[] = await res.json();

  return { questions };
}
