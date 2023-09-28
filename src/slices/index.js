import { configureStore, combineReducers } from '@reduxjs/toolkit';
import todoReducer from './tasksSlice';

const rootReducer = combineReducers({
  tasks: todoReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
