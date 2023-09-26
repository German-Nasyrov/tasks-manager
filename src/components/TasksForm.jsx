import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { createTask } from '../slices/todoSlice';

const TasksForm = ({ onTaskCreated }) => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handleCreateTask = () => {
    if (inputValue) {
      dispatch(createTask({ data: inputValue }));
      setInputValue('');
      onTaskCreated();
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  return (
    <div>
      <InputGroup className="p-3 input-element">
        <InputGroup.Text id="basic-addon1" />
        <Form.Control
          placeholder="Type the text"
          aria-label="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
        />
        <Button
          variant="primary"
          aria-label="Create task"
          onClick={handleCreateTask}
        >
          Add
        </Button>
      </InputGroup>
    </div>
  );
};

export default TasksForm;
