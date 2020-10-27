<template>
  <label :for="input.id" class="text label">
    <span class="">{{ input.label }}</span>
    <textarea
      v-if="input.inputType === 'textarea'"
      v-model="inputValue"
      :id="input.id"
      class="input shadow textarea"
      :placeholder="input.placeholder"
      required
    />
    <input
      v-else
      :type="input.type"
      v-model="inputValue"
      :id="input.id"
      class="input shadow"
      :placeholder="input.placeholder"
      required
    />
  </label>
</template>

<script>
import { computed } from "vue";
import { useStore } from "../store";

export default {
  setup(props) {
    const store = useStore();
    const inputValue = computed({
      get: () => store.formData[props.input.name],
      set: value => store.updateFormData(props.input.name, value)
    });
    return {
      inputValue
    };
  },
  props: {
    input: {
      type: Object,
      required: true
    }
  }
};
</script>
