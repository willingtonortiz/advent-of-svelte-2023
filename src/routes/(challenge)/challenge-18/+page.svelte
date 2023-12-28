<script lang="ts">
  import { Map } from "immutable";
  import * as Card from "$lib/components/ui/card";
  import * as RadioGroup from "$lib/components/ui/radio-group";
  import { Label } from "$lib/components/ui/label";
  import { Button } from "$lib/components/ui/button";
  import { cn, shuffle } from "$lib/utils";
  import { Check } from "lucide-svelte";
  export let data;
  let questions = data.questions.map(({ question, answers }) => {
    const correctAnswer = answers.find((answer) => answer.correct)!.text;
    const shuffleAnswers = shuffle(answers);
    return {
      question,
      answers: shuffleAnswers,
      correctAnswer,
      status: "UNANSWERED",
    };
  });
  const questionsMap = Map(questions.map((question, i) => [`question-${i}`, question]));

  console.log(questions);

  function handleSubmit({ target }: SubmitEvent) {
    const formData = new FormData(target as HTMLFormElement);
    const answers = Object.fromEntries(formData.entries()) as Record<string, string>;

    // Calculating score
    let score = 0;
    for (const [key, value] of Object.entries(answers)) {
      const question = questionsMap.get(key);
      if (!question) continue;

      if (question.correctAnswer === value) {
        score++;
      }
    }

    // Updating questions
    questions = questions.map((question, i) => {
      const answer = answers[`question-${i}`];

      return {
        ...question,
        status: question.correctAnswer === answer ? "CORRECT" : "INCORRECT",
      };
    });

    // alert(`You scored ${score} out of ${questions.length}`);
  }
</script>

<main class="mt-4 mb-12">
  <h1>Quiz</h1>

  <form on:submit|preventDefault={handleSubmit}>
    <ul class="grid grid-cols-1 md:grid-cols-2 flex-nowrap gap-4">
      {#each questions as question, i (question.question)}
        <li>
          <Card.Root
            class={cn(
              question.status === "CORRECT" && "bg-green-100",
              question.status === "INCORRECT" && "bg-red-100",
            )}
          >
            <Card.Header>
              <Card.Title class="flex flex-nowrap gap-2">
                <span>{i + 1}.</span>
                <span>{question.question}</span>
              </Card.Title>
            </Card.Header>

            <Card.Content>
              <RadioGroup.Root required>
                <RadioGroup.Input name={`question-${i}`} />

                {#each question.answers as answer, j (answer.text)}
                  {@const index = `${i}-${j}`}
                  <div class="flex items-center space-x-2">
                    <RadioGroup.Item id={index} value={answer.text} />
                    <Label for={index}>{answer.text}</Label>

                    {#if question.status !== "UNANSWERED" && question.correctAnswer === answer.text}
                      <Check />
                    {/if}
                  </div>
                {/each}
              </RadioGroup.Root>
            </Card.Content>
          </Card.Root>
        </li>
      {/each}
    </ul>

    <Button type="submit" class="mt-4 w-[200px] mx-auto block">Submit</Button>
  </form>
</main>
