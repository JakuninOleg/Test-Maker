<template>
  <div class="">
    <div class="card mb-10">
      <div class="card__content card__content_task">
        <h3 class="h3">{{ task.question }}</h3>
      </div>
    </div>
    <div class="card__buttons">
      <button
        class="card__button button button_danger button_borderless"
        @click="deleteTask"
      >
        Delete
      </button>
      <router-link
        :to="`/tests/${testId}/tasks/${task.id}/edit`"
        class="card__button link button button_info button_borderless"
        >Edit</router-link
      >
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "../store";

export default {
  props: {
    testId: {
      type: String,
      required: true
    },
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const testId = router.currentRoute.value.params.id;
    const deleteTask = () => store.deleteTask(testId, props.task.id);
    return {
      deleteTask
    };
  }
};
</script>
