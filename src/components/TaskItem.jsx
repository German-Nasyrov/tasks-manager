import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import {
  performTask, unperformTask, deleteTask, editTask,
} from '../slices/todoSlice';

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.data);
  const [isTaskChecked, setIsTaskChecked] = useState(task.completed);
  const dispatch = useDispatch();

  const handlePerformClick = () => {
    const updatedIsTaskChecked = !isTaskChecked;
    setIsTaskChecked(updatedIsTaskChecked);
    dispatch(updatedIsTaskChecked ? performTask(task) : unperformTask(task));
  };

  const handleSaveClick = () => {
    dispatch(editTask({ id: task.id, data: editedText, isEditing: false }));
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    dispatch(editTask({ id: task.id, data: e.target.value, isEditing: true }));
    setEditedText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSaveClick();
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <div className="list-element" id={`task-${task.id}`}>
      <input
        className="form-check-input m-0 ms-2 me-2"
        type="checkbox"
        id={`flexCheckIndeterminate-${task.id}`}
        onClick={handlePerformClick}
        defaultChecked={isTaskChecked}
      />
      <textarea
        className={`ms-2 me-auto task-edit
          ${isEditing ? 'editing' : ''}
          ${isTaskChecked ? 'completed disabled' : ''}`}
        rows={1}
        value={editedText}
        onChange={handleInputChange}
        onBlur={handleSaveClick}
        onKeyDown={handleKeyDown}
        onClick={handleEditClick}
        disabled={!!isTaskChecked}
      />
      <Button
        type="button"
        className="btn-close ms-1 me-1"
        aria-label="Close"
        onClick={() => dispatch(deleteTask(task))}
      />
    </div>
  );
};

export default TaskItem;
