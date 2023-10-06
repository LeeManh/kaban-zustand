import { create } from "zustand";
import { STATE } from "./constants";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { produce } from "immer";

const store = (set) => ({
  tasks: [
    { title: "Task 1", state: STATE.DONE },
    { title: "Task 2", state: STATE.ONGOING },
  ],
  draggedTask: null,
  numberTasksOnGoing: 0,
  addTask: (title, state) =>
    set(
      produce((store) => {
        store.tasks.push({ title, state });
      })
    ),
  deleteTask: (title) =>
    set((store) => {
      // tasks after remove
      const newTasks = store.tasks.filter((task) => task.title !== title);

      return { tasks: newTasks };
    }),
  setDraggedTask: (title) => set(() => ({ draggedTask: title })),
  moveTask: (title, state) =>
    set((store) => {
      return {
        tasks: store.tasks.map((task) =>
          task.title === title ? { title, state } : task
        ),
      };
    }),
});

// custom middleware to log every action
const log = (config) => (set, get, api) =>
  config(
    (...args) => {
      const currentState = get();
      if (!currentState) {
        // get state from external storage
      }

      console.log("numberTasksOnGoing", currentState.numberTasksOnGoing);
      set(...args);
    },
    get,
    api
  );

export const useStore = create(
  log(
    subscribeWithSelector(
      persist(store, {
        name: "store",
      })
    )
  )
);

useStore.subscribe(
  (store) => store.tasks,
  (tasks, preTasks) => {
    const numberTasksOnGoing =
      tasks.filter((task) => task.state === STATE.ONGOING)?.length || 0;

    useStore.setState({ numberTasksOnGoing });
  }
);
