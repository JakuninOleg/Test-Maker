<template>
  <div class="grid">
    <h1 class="h1 text-center">Edit {{ test.title }}</h1>
    <label class="label text" for="test-title">
      Edit Title
      <input v-model="testTitle" id="test-title" class="input shadow" />
    </label>
    <p v-if="test.tasks.length < 1" class="text">
      There are no tasks for the test. But you can add one!
    </p>
    <h3 v-else class="h3">
      Tasks<span class="text"> (click task to edit)</span>
    </h3>
    <TaskCard
      v-for="(task, id) in tasks"
      :key="id"
      :task="task"
      :testId="test.id"
    />
    <label class="label text" for="test-title">
      Required answers to pass test: {{ test.requiredAnswers }}
      <input
        v-model="testRequiredAnswers"
        id="test-required-answers"
        type="range"
        min="1"
        :max="test.tasks.length"
      />
    </label>
    <router-link
      :to="`/tests/${test.id}/tasks/new`"
      class="link button button_info text-center"
    >
      Add task
    </router-link>
    <button @click="deleteTest" class="button button_danger">
      Delete test
    </button>
    <router-link
      :to="`/tests/${test.id}`"
      class="link button button_borderless text-center"
      >Back to test</router-link
    >
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "../store";
import { computed } from "vue";
import TaskCard from "../components/TaskCard.vue";

export default {
  components: {
    TaskCard
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const testId = router.currentRoute.value.params.id;
    const test = store.getTest(testId);
    const tasks = test.tasks;
    const testTitle = computed({
      get: () => test.title,
      set: value => store.updateTest(testId, "title", value)
    });
    const testRequiredAnswers = computed({
      get: () => test.requiredAnswers,
      set: value => store.updateTest(testId, "requiredAnswers", Number(value))
    });
    const deleteTest = () => {
      store.deleteTest(testId);
      router.push("/");
    };
    return {
      test,
      tasks,
      testId,
      testTitle,
      testRequiredAnswers,
      deleteTest
    };
  }
};
</script>
