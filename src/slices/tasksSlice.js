import { createSlice } from '@reduxjs/toolkit';
import uniqueId from 'lodash.uniqueid';

const initialState = {
  allTasks: [],
  doneTasks: [],
};

const updateTaskCompletion = (state, taskId, completed) => {
  state.allTasks = state.allTasks.map((task) => {
    if (task.id === taskId) return { ...task, completed };
    return task;
  });
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    createTask(state, action) {
      const { data } = action.payload;
      const existingTask = state.allTasks.find((task) => task.data === data);

      if (!existingTask) {
        state.allTasks.push({
          id: uniqueId(),
          data,
          completed: false,
          isEditing: false,
        });
      } else {
        console.error('This task already exists');
      }
    },
    deleteTask(state, action) {
      const { id } = action.payload;
      state.allTasks = state.allTasks.filter((task) => task.id !== id);
      state.doneTasks = state.doneTasks.filter((task) => task.id !== id);
    },
    editTask(state, action) {
      const { id, data, isEditing } = action.payload;
      state.allTasks = state.allTasks.map((task) => {
        if (task.id === id) return { ...task, data, isEditing };
        return task;
      });
    },
    performTask(state, action) {
      const { id } = action.payload;
      const performedTaskId = id;
      updateTaskCompletion(state, performedTaskId, true);

      const performedTask = state.allTasks.find((task) => task.id === performedTaskId);
      state.doneTasks.push(performedTask);
    },
    unperformTask(state, action) {
      const { id } = action.payload;
      const unperformedTaskId = id;
      updateTaskCompletion(state, unperformedTaskId, false);

      state.doneTasks = state.doneTasks.filter((task) => task.id !== unperformedTaskId);
    },
  },
});

export const {
  createTask,
  deleteTask,
  editTask,
  performTask,
  unperformTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
