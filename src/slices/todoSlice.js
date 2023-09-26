import { createSlice } from '@reduxjs/toolkit';
import uniqueId from 'lodash.uniqueid';

const initialState = {
  allTodos: [],
  doneTodos: [],
};

const updateTaskCompletion = (state, taskId, completed) => {
  state.allTodos = state.allTodos.map((task) => {
    if (task.id === taskId) return { ...task, completed };
    return task;
  });
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    createTask(state, action) {
      const { data } = action.payload;
      const existingTask = state.allTodos.find((task) => task.data === data);

      if (!existingTask) {
        state.allTodos.push({
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
      state.allTodos = state.allTodos.filter((task) => task.id !== id);
      state.doneTodos = state.doneTodos.filter((task) => task.id !== id);
    },
    editTask(state, action) {
      const { id, data, isEditing } = action.payload;
      state.allTodos = state.allTodos.map((task) => {
        if (task.id === id) return { ...task, data, isEditing };
        return task;
      });
    },
    performTask(state, action) {
      const { id } = action.payload;
      const performedTaskId = id;
      updateTaskCompletion(state, performedTaskId, true);

      const performedTask = state.allTodos.find((task) => task.id === performedTaskId);
      state.doneTodos.push(performedTask);
    },
    unperformTask(state, action) {
      const { id } = action.payload;
      const unperformedTaskId = id;
      updateTaskCompletion(state, unperformedTaskId, false);

      state.doneTodos = state.doneTodos.filter((task) => task.id !== unperformedTaskId);
    },
  },
});

export const {
  createTask,
  deleteTask,
  editTask,
  performTask,
  unperformTask,
} = todoSlice.actions;

export default todoSlice.reducer;
