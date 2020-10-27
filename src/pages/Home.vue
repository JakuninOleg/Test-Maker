<template>
  <div>
    <h1 class="h1 text-center mb-20">Welcome to the Test Maker</h1>
    <template v-if="tests.length < 1">
      <p class="text-center text">
        You don't have tests right now.
      </p>
      <router-link to="/tests/new" class="text-center text block"
        >Why not make one?</router-link
      >
    </template>
    <div v-if="passedTests.length > 0" class="cards-grid">
      <h2 class="h2">Passed tests</h2>
      <TestCard
        v-for="(test, id) in passedTests"
        :key="id"
        :test="test"
        :cardColor="'card_green'"
      />
    </div>
    <div v-if="failedTests.length > 0" class="cards-grid">
      <h2 class="h2">Failed tests</h2>
      <TestCard
        v-for="(test, id) in failedTests"
        :key="id"
        :test="test"
        :cardColor="'card_red'"
      />
    </div>
    <div v-if="pendingTests.length > 0" class="cards-grid">
      <h2 class="h2">Pending tests</h2>
      <TestCard v-for="(test, id) in pendingTests" :key="id" :test="test" />
    </div>
    <router-link
      v-if="tests.length > 0"
      :to="`/tests/new`"
      class="link button button_blue text-center"
      >Add new test</router-link
    >
  </div>
</template>

<script>
import { useStore } from "@/store.js";
import TestCard from "../components/TestCard.vue";

export default {
  components: {
    TestCard
  },
  setup() {
    const store = useStore();
    const tests = store.tests;
    const pendingTests = tests.filter(test => test.result === "pending");
    const passedTests = tests.filter(
      test => test.requiredAnswers === test.result
    );
    const failedTests = tests.filter(
      test => test.requiredAnswers !== test.result && test.result !== "pending"
    );
    return {
      tests,
      passedTests,
      failedTests,
      pendingTests
    };
  }
};
</script>
