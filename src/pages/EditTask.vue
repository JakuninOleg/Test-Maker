<template>
  <div class="grid">
    <h1 class="h1">Task</h1>
    <label class="label text" for="task-question">
      Edit Question
      <input v-model="taskQuestion" id="task-question" class="input shadow" />
    </label>
    <label class="label text" for="task-answer">
      Edit Answer
      <input v-model="taskAnswer" id="task-answer" class="input shadow" />
    </label>
    <router-link
      :to="`/tests/${testId}/edit`"
      class="link button button_borderless text-center"
      >Back to test</router-link
    >
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "../store";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const testId = router.currentRoute.value.params.id;
    const taskId = router.currentRoute.value.params.taskId;

    const task = store.getTask(testId, taskId);

    const taskQuestion = computed({
      get: () => task.question,
      set: value => store.updateTask(testId, taskId, "question", value)
    });
    const taskAnswer = computed({
      get: () => task.answer,
      set: value => store.updateTask(testId, taskId, "answer", value)
    });
    return {
      taskQuestion,
      taskAnswer,
      task,
      testId
    };
  }
};
</script>
