import { z } from "zod";
import { superValidate } from "sveltekit-superforms/server";
import { type Actions, fail } from "@sveltejs/kit";

const API_URL = "https://advent.sveltesociety.dev/data/2023/day-eleven.json";

interface NamesList {
  firstNames: string[];
  lastNames: string[];
}

const schema = z.object({
  firstName: z.string().min(1).max(15),
  lastName: z.string().min(1).max(15),
});

export async function load() {
  const form = await superValidate(schema);

  return { form };
}

export const actions: Actions = {
  default: async ({ request, fetch }) => {
    const form = await superValidate(request, schema);
    if (!form.valid) {
      return fail(400, { form });
    }

    const firstName = form.data.firstName;
    const lastName = form.data.lastName;

    const { firstNames: firstNameList, lastNames: lastNameList }: NamesList = await fetch(
      API_URL,
    ).then((r) => r.json());
    const groupedFirstName = groupByLength(firstNameList);
    const groupedLastName = groupByLength(lastNameList);

    const possibleFirstNames = groupedFirstName[firstName.length];
    const possibleLastNames = groupedLastName[lastName.length];

    let customerFirstName = "";
    let customerLastName = "";

    if (!possibleFirstNames) {
      customerFirstName = firstNameList[Math.floor(Math.random() * firstNameList.length)];
    } else {
      customerFirstName = possibleFirstNames[Math.floor(Math.random() * possibleFirstNames.length)];
    }

    if (!possibleLastNames) {
      customerLastName = lastNameList[Math.floor(Math.random() * lastNameList.length)];
    } else {
      customerLastName = possibleLastNames[Math.floor(Math.random() * possibleLastNames.length)];
    }

    return {
      form,
      name: {
        firstName: customerFirstName,
        lastName: customerLastName,
      },
    };
  },
};

function groupByLength(names: string[]) {
  return names.reduce(
    (acc, name) => {
      const length = name.length;
      acc[length] = acc[length] || [];
      acc[length].push(name);
      return acc;
    },
    {} as Record<number, string[]>,
  );
}
