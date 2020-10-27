<template>
  <div class="">
    <h1 class="h1 text-center mb-20">
      Create a task for your {{ test.title }} test
    </h1>
    <Form :inputs="inputs" :testId="testId" entity="task" />
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "../store";
import Form from "@/components/Form";

export default {
  components: {
    Form
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const testId = router.currentRoute.value.params.id;
    const test = store.getTest(testId);
    const tasks = test.tasks;
    const inputs = [
      {
        name: "question",
        label: "Question",
        inputType: "textarea",
        type: "text",
        id: "name",
        placeholder: "Task question"
      },
      {
        name: "answer",
        label: "Answer",
        type: "text",
        id: "asnwer",
        placeholder: "Right answer"
      },
      {
        name: "titleId",
        type: "hidden",
        id: "titleId",
        value: testId
      }
    ];
    return {
      test,
      tasks,
      inputs,
      testId
    };
  }
};
</script>
