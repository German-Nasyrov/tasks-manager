import {
  createTask, performTask, unperformTask, editTask,
} from '../slices/tasksSlice';

export const createTaskHandler = (dispatch, inputValue, setInputValue) => {
  if (inputValue) {
    dispatch(createTask({ data: inputValue }));
    setInputValue('');
  }
};

export const formInputChangeHandler = (event, setInputValue) => {
  const { value } = event.target;
  setInputValue(value);
};

export const toggleTaskHandler = (dispatch, task, isTaskChecked, setIsTaskChecked) => {
  const updatedIsTaskChecked = !isTaskChecked;
  setIsTaskChecked(updatedIsTaskChecked);
  dispatch(updatedIsTaskChecked ? performTask(task) : unperformTask(task));
};

export const saveTaskHandler = (dispatch, task, editedText, setIsEditing) => {
  dispatch(editTask({ id: task.id, data: editedText, isEditing: false }));
  setIsEditing(false);
};

export const taskInputChangeHandler = (dispatch, task, newText) => {
  dispatch(editTask({ id: task.id, data: newText, isEditing: true }));
};

export const enterKeyPressHandler = (event, saveTask) => {
  if (event.key === 'Enter') saveTask();
};

export const startEditingHandler = (setIsEditing) => setIsEditing(true);

export const PageChangeHandler = (selected, setCurrentPage) => setCurrentPage(selected);
