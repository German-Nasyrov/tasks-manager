import {
  performTask, unperformTask, editTask,
} from '../slices/todoSlice';

export const toggleTaskHandler = (dispatch, task, isTaskChecked, setIsTaskChecked) => {
  const updatedIsTaskChecked = !isTaskChecked;
  setIsTaskChecked(updatedIsTaskChecked);
  dispatch(
    updatedIsTaskChecked ? performTask(task) : unperformTask(task),
  );
};

export const saveTaskHandler = (dispatch, task, editedText, setIsEditing) => {
  dispatch(editTask({ id: task.id, data: editedText, isEditing: false }));
  setIsEditing(false);
};

export const inputChangeHandler = (dispatch, task, newText) => {
  dispatch(editTask({ id: task.id, data: newText, isEditing: true }));
};

export const enterKeyPressHandler = (event, saveTask) => {
  if (event.key === 'Enter') {
    saveTask();
  }
};

export const startEditingHandler = (setIsEditing) => setIsEditing(true);
