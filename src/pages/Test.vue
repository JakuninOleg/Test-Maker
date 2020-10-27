<template>
  <div>
    <h1 class="h1 text-center mb-20">{{ test.title }}</h1>
    <div class="test-page__content">
      <h3 class="h3">Number of tasks in this test: {{ tasks.length }}</h3>
      <h3 v-if="test.result === 'pending' && test.tasks.length > 0" class="h3">
        Pass test to get your rating
      </h3>
      <h3
        v-if="test.result === 'pending' && test.tasks.length === 0"
        class="h3"
      >
        Add tasks to be able to pass test
      </h3>
      <div v-else class="card__stars">
        <h3 class="h3 mb-10">Your rating:</h3>
        <Star
          v-for="(star, id) in 5"
          :key="star"
          class="star"
          :class="test.rating > id * 2 ? 'star_filled' : ''"
        />
      </div>
      <router-link
        v-if="test.tasks.length > 0"
        :to="`/tests/${test.id}/passage`"
        class="link button button_blue text-center"
      >
        Pass
      </router-link>
      <router-link
        :to="`/tests/${test.id}/edit`"
        class="link button button_info text-center"
      >
        Edit
      </router-link>
      <router-link to="/" class="link button button_borderless text-center"
        >Show all tests</router-link
      >
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "../store";
import Star from "@/components/Star";

export default {
  components: {
    Star
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const testId = router.currentRoute.value.params.id;
    const test = store.getTest(testId);
    const tasks = test.tasks;
    return {
      test,
      tasks,
      testId
    };
  }
};
</script>
