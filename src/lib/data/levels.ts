import challenge_01 from "$lib/assets/challenges/challenge-01.webp";
import challenge_02 from "$lib/assets/challenges/challenge-02.webp";

export type Challenge = {
  id: number;
  title: string;
  image: string;
  slug: string;
  description: string;
  isDone: boolean;
};

export const CHALLENGES: Challenge[] = [
  {
    id: 1,
    slug: "challenge-01",
    title: "Naughty or Nice",
    description: "Help the elves to keep track of children's behavior",
    isDone: true,
    image: challenge_01,
  },
  {
    id: 2,
    slug: "challenge-02",
    title: "Cookies for Santa",
    description: "Click on the colorful cookies to give them to Santa",
    isDone: true,
    image: challenge_02,
  },
  {
    id: 3,
    slug: "challenge-03",
    title: "Sled Load Balancer",
    description: "Sled Load Balancer",
    isDone: true,
    image: challenge_01,
  },
  {
    id: 4,
    slug: "challenge-04",
    title: "Santa's Heart Rate Monitor",
    description: "Santa's Heart Rate Monitor",
    isDone: true,
    image: challenge_02,
  },
  {
    id: 5,
    slug: "challenge-05",
    title: "Elf Productivity Dashboard",
    description: "Elf Productivity Dashboard",
    isDone: true,
    image: challenge_01,
  },
  {
    id: 6,
    slug: "challenge-06",
    title: "challenge-06",
    description: "challange-06",
    isDone: false,
    image: challenge_02,
  },
  {
    id: 7,
    slug: "challenge-07",
    title: "Morse Code Translator",
    description: "Morse Code Translator",
    isDone: true,
    image: challenge_01,
  },
  {
    id: 8,
    slug: "challenge-08",
    title: "Santa's Memory Game",
    description: "Santa's Memory Game",
    isDone: true,
    image: challenge_02,
  },
  {
    id: 9,
    slug: "challenge-09",
    title: "Santa's Final Countdown",
    description: "Santa's Final Countdown",
    isDone: true,
    image: challenge_01,
  },
  {
    id: 10,
    slug: "challenge-10",
    title: "Pop-up! Spreading the holiday cheer",
    description: "Pop-up! Spreading the holiday cheer",
    isDone: true,
    image: challenge_02,
  },
  {
    id: 11,
    slug: "challenge-11",
    title: "Tinsel Transformers",
    description: "Tinsel Transformers",
    isDone: true,
    image: challenge_01,
  },
  {
    id: 12,
    slug: "challenge-12",
    title: "Greetings and salutations",
    description: "Greetings and salutations",
    isDone: true,
    image: challenge_02,
  },
  {
    id: 13,
    slug: "challenge-13",
    title: "Jingle Bell Balancer 2.0",
    description: "Jingle Bell Balancer 2.0",
    isDone: true,
    image: challenge_01,
  },
  {
    id: 14,
    slug: "challenge-14",
    title: "Snowfall",
    description: "Configurable snowfall component",
    isDone: false,
    image: challenge_02,
  },
  {
    id: 15,
    slug: "challenge-15",
    title: "challenge-15",
    description: "challange-15",
    isDone: false,
    image: challenge_01,
  },
  {
    id: 16,
    slug: "challenge-16",
    title: "challenge-16",
    description: "challange-16",
    isDone: false,
    image: challenge_02,
  },
  {
    id: 17,
    slug: "challenge-17",
    title: "challenge-17",
    description: "challange-17",
    isDone: false,
    image: challenge_01,
  },
  {
    id: 18,
    slug: "challenge-18",
    title: "challenge-18",
    description: "challange-18",
    isDone: false,
    image: challenge_02,
  },
  {
    id: 19,
    slug: "challenge-19",
    title: "challenge-19",
    description: "challange-19",
    isDone: false,
    image: challenge_01,
  },
  {
    id: 20,
    slug: "challenge-20",
    title: "challenge-20",
    description: "challange-20",
    isDone: false,
    image: challenge_01,
  },
  {
    id: 21,
    slug: "challenge-21",
    title: "challenge-21",
    description: "challange-21",
    isDone: false,
    image: challenge_01,
  },
  {
    id: 22,
    slug: "challenge-22",
    title: "challenge-22",
    description: "challange-22",
    isDone: false,
    image: challenge_01,
  },
  {
    id: 23,
    slug: "challenge-23",
    title: "challenge-23",
    description: "challange-23",
    isDone: false,
    image: challenge_01,
  },
  {
    id: 24,
    slug: "challenge-24",
    title: "challenge-24",
    description: "challange-24",
    isDone: false,
    image: challenge_01,
  },
];

export function getChallengeBySlug(slug: string): Challenge {
  return CHALLENGES.find((challenge) => challenge.slug === slug)!;
}