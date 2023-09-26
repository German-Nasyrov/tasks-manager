import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import TaskItem from './TaskItem';

const TasksList = ({ tasks }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedTasks = tasks.slice(startIndex, endIndex);

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
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="active"
          forcePage={currentPage}
        />
      )}
    </div>
  );
};

export default TasksList;
