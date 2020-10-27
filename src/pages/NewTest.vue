<template>
  <div>
    <h1 class="h1 text-center mb-20">Let's create a test!</h1>
    <Form :inputs="inputs" entity="test" />
  </div>
</template>

<script>
import Form from "@/components/Form";

export default {
  components: {
    Form
  },
  setup() {
    const inputs = [
      {
        name: "title",
        label: "Title",
        type: "text",
        id: "title",
        placeholder: "Name your test"
      }
    ];
    return {
      inputs
    };
  }
};
</script>
