import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { deleteTask } from '../slices/todoSlice';
import {
  toggleTaskHandler, saveTaskHandler, inputChangeHandler, enterKeyPressHandler, startEditingHandler,
} from '../handlers/handlers';

const TaskItem = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.data);
  const [isTaskChecked, setIsTaskChecked] = useState(task.completed);
  const dispatch = useDispatch();

  return (
    <div className={`list-element ${isTaskChecked ? 'completed' : ''}`}>
      <input
        className="form-check-input m-0 ms-2 me-2"
        type="checkbox"
        id={`flexCheckIndeterminate-${task.id}`}
        onClick={() => toggleTaskHandler(dispatch, task, isTaskChecked, setIsTaskChecked)}
        defaultChecked={isTaskChecked}
      />
      <textarea
        className={`ms-2 me-auto task-edit ${isEditing ? 'editing' : ''}`}
        rows={1}
        value={editedText}
        onChange={(event) => {
          inputChangeHandler(dispatch, task, event.target.value);
          setEditedText(event.target.value);
        }}
        onBlur={() => saveTaskHandler(dispatch, task, editedText, setIsEditing)}
        onKeyDown={(event) => enterKeyPressHandler(
          event,
          () => saveTaskHandler(dispatch, task, editedText, setIsEditing),
        )}
        onClick={() => startEditingHandler(setIsEditing)}
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
