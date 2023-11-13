import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import TaskItem from './TaskItem';
import { PageChangeHandler } from '../handlers/handlers';

const TasksList = ({ tasks, currentPage, itemsPerPage }) => {
  const [currentPageState, setCurrentPageState] = useState(currentPage);
  const startIndex = currentPageState * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedTasks = tasks.slice(startIndex, endIndex);

  useEffect(() => {
    const lastPageIndex = Math.ceil(tasks.length / itemsPerPage) - 1;
    const pageCount = Math.ceil(tasks.length / itemsPerPage);
    if (tasks.length > itemsPerPage && currentPageState < lastPageIndex) {
      setCurrentPageState(lastPageIndex);
    }
    if (currentPageState >= pageCount) setCurrentPageState(Math.max(0, currentPageState - 1));
  }, [tasks, currentPageState, itemsPerPage]);

  return (
    <div>
      {displayedTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      {tasks.length > itemsPerPage && (
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel="..."
          pageCount={Math.ceil(tasks.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={({ selected }) => {
            PageChangeHandler(selected, setCurrentPageState);
          }}
          containerClassName="pagination"
          activeClassName="active"
          forcePage={currentPageState}
        />
      )}
    </div>
  );
};

export default TasksList;
