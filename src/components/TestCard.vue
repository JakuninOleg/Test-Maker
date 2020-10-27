<template>
  <router-link :to="`/tests/${test.id}`" class="link">
    <div :class="cardColor" class="card shadow">
      <div class="card__content">
        <div class="card__title">
          <h3 class="h3">{{ test.title }}</h3>
          <span v-if="test.result === 'pending'" class="text"
            >Result: {{ test.result }}</span
          >
          <div v-else class="card__stars">
            <Star
              v-for="(star, id) in 5"
              :key="star"
              class="star"
              :class="test.rating > id * 2 ? 'star_filled' : ''"
            />
          </div>
        </div>
        <p v-if="test.tasks" class="text">
          Number of tasks: {{ test.tasks.length }}
        </p>
        <p v-else class="text">Add tasks</p>
      </div>
    </div>
  </router-link>
</template>

<script>
import Star from "@/components/Star";

export default {
  components: {
    Star
  },
  props: {
    test: {
      type: Object,
      required: true
    },
    cardColor: {
      type: String,
      required: false
    }
  }
};
</script>
