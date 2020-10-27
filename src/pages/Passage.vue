<template>
  <div class="grid">
    <h1 class="h1">This is {{ test.title }} passage</h1>
    <h2 class="h2">Good luck!</h2>
    <label
      v-for="(task, id) in test.tasks"
      :key="id"
      class="label text"
      :for="`question-${id}`"
    >
      Question: {{ task.question }}
      <p>Answer:</p>
      <input class="input" v-model="answers[id]" :id="`question-${id}`" />
    </label>
    <button class="button button_blue" @click="submitTest">
      Submit test
    </button>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const testId = router.currentRoute.value.params.id;
    const test = store.getTest(testId);
    const answers = reactive({});
    let rightAnswers = ref(0);
    const submitTest = () => {
      test.tasks.forEach((task, id) => {
        if (task.answer === answers[id]) rightAnswers.value++;
      });
      store.updateTest(testId, "result", rightAnswers);
      store.updateTest(testId, "passed", true);
      store.ratePassage(testId);
      router.push(`/tests/${testId}`);
    };
    return {
      answers,
      test,
      submitTest,
      rightAnswers
    };
  }
};
</script>
