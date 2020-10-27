<template>
  <main>
    <router-view v-slot="{ Component }">
      <transition
        :name="$route.meta.transitionName"
        :mode="$route.meta.transitionMode"
      >
        <component :is="Component" class="page" />
      </transition>
    </router-view>
  </main>
</template>
