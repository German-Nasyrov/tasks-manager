import { configureStore, combineReducers } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
