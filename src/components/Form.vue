<template>
  <form class="form" @submit.prevent="createEntity">
    <Input v-for="input in inputs" :key="input.name" :input="input" />
    <button class="button button_blue">Create {{ entity }}</button>
  </form>
</template>

<script>
import { useStore } from "../store";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import Input from "../components/Input.vue";

export default {
  components: {
    Input
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();

    const storeActions = {
      test: store.addTest,
      task: store.addTask
    };

    const createEntity = () => {
      storeActions[props.entity](store.formData);

      props.inputs.forEach(input => {
        store.clearFormData(input.name);
      });

      if (props.entity === "test") router.push(`/`);
      else if (props.entity === "task") {
        router.push(`/tests/${props.testId}/edit`);
      }
    };

    onBeforeMount(() => {
      if (props.testId) store.updateFormData("testId", props.testId);
    });

    return {
      createEntity
    };
  },
  props: {
    inputs: {
      type: Array,
      required: true
    },
    entity: {
      type: String,
      required: true
    },
    testId: {
      type: String,
      required: false
    }
  }
};
</script>
