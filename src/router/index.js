import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Test from "../pages/Test.vue";
import NewTest from "../pages/NewTest.vue";
import Passage from "../pages/Passage.vue";
import EditTest from "../pages/EditTest.vue";
import NewTask from "../pages/NewTask.vue";
import EditTask from "../pages/EditTask.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/tests/new",
    name: "New Test",
    component: NewTest
  },
  {
    path: "/tests/:id",
    name: "Test",
    component: Test
  },
  {
    path: "/tests/:id/passage",
    name: "Test Passage",
    component: Passage
  },
  {
    path: "/tests/:id/edit",
    name: "Test Edit",
    component: EditTest
  },
  {
    path: "/tests/:id/tasks/new",
    name: "New Task",
    component: NewTask
  },
  {
    path: "/tests/:id/tasks/:taskId/edit",
    name: "Edit Task",
    component: EditTask
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Transition effects

router.afterEach((to, from) => {
  if (to.path == "/") {
    to.meta.transitionName = "slide-right";
    to.meta.transitionMode = "";
    return;
  }

  const toDepth = to.path.split("/").length;
  const fromDepth = from.path.split("/").length;
  to.meta.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
  to.meta.transitionMode = toDepth < fromDepth ? "" : "in-out";
});

export default router;
