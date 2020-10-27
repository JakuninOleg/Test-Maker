import { reactive, watch } from "vue";

// Creating store name
const storeName = "main-store";

// Randomize id approach for small collections
const id = () =>
  "_" +
  Math.random()
    .toString(36)
    .substr(2, 9);

// Get store object from localStorage or create a new one
const state = reactive(
  localStorage.getItem(storeName)
    ? JSON.parse(localStorage.getItem(storeName))
    : { tests: [], formData: {} }
);

// Adding item to localStorage once state was mutated
watch(state, value => localStorage.setItem(storeName, JSON.stringify(value)));

// Main store implementation
export const useStore = () => ({
  tests: state.tests,
  getTest: id => state.tests.find(test => test.id === id),
  getTask: (testId, taskId) => {
    const test = state.tests.find(test => test.id === testId);
    const task = test.tasks.find(task => task.id === taskId);
    return task;
  },
  formData: reactive(state.formData),
  addTest: ({
    title,
    tasks = [],
    requiredAnswers = 1,
    passed = false,
    result = "pending",
    rating = 0
  }) => {
    state.tests.push({
      id: id(),
      title,
      requiredAnswers,
      tasks,
      passed,
      result,
      rating
    });
  },
  updateTest: (testId, key, value) => {
    const test = state.tests.find(test => test.id === testId);
    test[key] = value;
  },
  deleteTest: testId => {
    const test = state.tests.find(test => test.id === testId);
    state.tests.splice(state.tests.indexOf(test), 1);
  },
  ratePassage: testId => {
    const test = state.tests.find(test => test.id === testId);
    test.rating = Math.floor((test.result / test.tasks.length) * 10);
  },
  addTask: ({ testId, question, answer }) => {
    const test = state.tests.find(test => test.id === testId);
    test.tasks.push({ id: id(), question, answer });
    test.passed = false;
    test.result = "pending";
  },
  deleteTask: (testId, taskId) => {
    const test = state.tests.find(test => test.id === testId);
    test.tasks.splice(taskId, 1);
    test.passed = false;
    if (test.requiredAnswers > 1) test.requiredAnswers--;
    test.result = "pending";
  },
  updateTask: (testId, taskId, key, value) => {
    const test = state.tests.find(test => test.id === testId);
    const task = test.tasks.find(task => task.id === taskId);
    task[key] = value;
  },
  updateFormData: (formInputName, payload) => {
    state.formData[formInputName] = payload;
  },
  clearFormData: formInputName => {
    state.formData[formInputName] = "";
  }
});
