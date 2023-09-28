import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { createTaskHandler, formInputChangeHandler } from '../handlers/handlers';

const TasksForm = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <InputGroup className="p-3 input-element">
        <InputGroup.Text id="basic-addon1" />
        <Form.Control
          placeholder="Type the text"
          aria-label="text"
          maxLength={40}
          value={inputValue}
          onChange={(event) => formInputChangeHandler(event, setInputValue)}
        />
        <Button
          variant="primary"
          aria-label="Create task"
          onClick={() => createTaskHandler(dispatch, inputValue, setInputValue)}
        >
          Add
        </Button>
      </InputGroup>
    </div>
  );
};

export default TasksForm;
