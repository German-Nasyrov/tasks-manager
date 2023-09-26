import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import TasksStatistics from './TasksStatistics';
import TasksList from './TasksList';
import {
  createTask, deleteTask, editTask, performTask, unperformTask,
} from '../slices/todoSlice';
import logo from '../logo.svg';

const App = () => {
  const { allTodos } = useSelector((state) => state.todos);
  const initialCheckedTasks = allTodos.reduce((acc, task) => {
    acc[task.id] = false;
    return acc;
  }, {});
  const [inputValue, setInputValue] = useState('');
  const [checkedTasks, setCheckedTasks] = useState(initialCheckedTasks);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [activePage, setActivePage] = useState(0);
  const itemsPerPage = 5;
  const dispatch = useDispatch();
  const maxLength = 40;

  useEffect(() => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = allTodos.slice(startIndex, endIndex);
    setCurrentTasks(itemsToDisplay);
  }, [currentPage, allTodos]);

  const handleCreateTask = () => {
    if (inputValue) {
      dispatch(createTask({ data: inputValue }));
      setInputValue('');
      const updatedPageCount = Math.ceil((allTodos.length + 1) / itemsPerPage);
      setActivePage(updatedPageCount - 1);
      setCurrentPage(updatedPageCount - 1);
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    if (value.length <= maxLength) setInputValue(value);
  };

  const handleDeleteTask = (task) => {
    dispatch(deleteTask(task));
    const updatedPageCount = Math.ceil((allTodos.length - 1) / itemsPerPage);

    if (updatedPageCount <= currentPage) {
      setActivePage(updatedPageCount - 1);
      setCurrentPage(updatedPageCount - 1);
    }
  };

  const handlePerformTask = (task) => {
    const itemId = task.id;
    const newCheckedTasks = {
      ...checkedTasks,
      [itemId]: !checkedTasks[itemId],
    };

    dispatch(newCheckedTasks[itemId] ? performTask(task) : unperformTask(task));
    setCheckedTasks(newCheckedTasks);
  };

  const handlePageChange = ({ selected }) => {
    setActivePage(selected);
    setCurrentPage(selected);
  };

  const handleTextareaKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleEditTask = (taskId, data, isEditing) => {
    dispatch(editTask({ id: taskId, data, isEditing }));
  };

  return (
    <Card className="card-height">
      <Card.Header>
        <Card.Img className="logo" variant="top" src={logo} />
        <span className="header-font-size">Tasks manager</span>
      </Card.Header>
      <div className="row">
        <Col md={6}>
          <Card.Body>
            <Card.Title>
              <h5 className="ps-3">Add your task</h5>
            </Card.Title>
            <InputGroup className="p-3 input-element">
              <InputGroup.Text id="basic-addon1" />
              <Form.Control
                placeholder="Type the text"
                aria-label="text"
                value={inputValue}
                maxLength={maxLength}
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
            <TasksList
              tasks={currentTasks}
              checkedTasks={checkedTasks}
              onPerformTask={handlePerformTask}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
              onTextareaKeyDown={handleTextareaKeyDown}
            />
            {allTodos.length > itemsPerPage && (
              <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                breakLabel="..."
                pageCount={Math.ceil(allTodos.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                activeClassName="active"
                forcePage={activePage}
              />
            )}
          </Card.Body>
        </Col>
        <Col md={6}>
          <TasksStatistics />
        </Col>
      </div>
      <Card.Footer className="footer-to-bottom">2023, made by German Nasyrov</Card.Footer>
    </Card>
  );
};

export default App;
