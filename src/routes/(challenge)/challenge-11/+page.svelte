<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Button } from "$lib/components/ui/button";
  import { Loader } from "lucide-svelte";

  export let data;
  export let form;

  const { form: sform, errors, enhance, submitting } = superForm(data.form);
</script>

<div class="mt-12">
  <p class={"mb-4"}>Write your first and last name to know your elf name</p>

  <form method={"POST"} use:enhance>
    <div class="flex flex-col sm:flex-row flex-nowrap gap-4">
      <div class={"w-full"}>
        <Label for={"firstName"}>First Name</Label>

        <Input
          id={"firstName"}
          name={"firstName"}
          type={"text"}
          placeholder={"Type your first name..."}
          bind:value={$sform.firstName}
        />

        {#if $errors.firstName}
          <span class={"text-red-500"}>{$errors.firstName}</span>
        {/if}
      </div>

      <div class={"w-full"}>
        <Label for={"lastName"}>Last Name</Label>

        <Input
          id={"lastName"}
          name={"lastName"}
          type={"text"}
          placeholder={"Type your last name..."}
          bind:value={$sform.lastName}
        />

        {#if $errors.lastName}
          <span class={"text-red-500"}>{$errors.lastName}</span>
        {/if}
      </div>
    </div>

    <Button type={"submit"} class={"mx-auto block mt-8"}>Find my elf name</Button>
  </form>

  <div class="mt-8 mx-auto">
    {#if $submitting}
      <Loader class={"animate-spin mx-auto"} />
    {/if}

    {#if !$submitting && form?.name}
      <p class={"mb-4"}>Your elf name is:</p>
      <p class={"text-2xl font-bold"}>{form.name.firstName} {form.name.lastName}</p>
    {/if}
  </div>
</div>
