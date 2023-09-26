import React, { useMemo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto';

const calculateStatistics = (allTodos, doneTodos) => {
  const completedCount = doneTodos.length;
  const notCompletedCount = allTodos.length - completedCount;
  return { completedCount, notCompletedCount };
};

const TasksStatistics = () => {
  const { allTodos, doneTodos } = useSelector((state) => state.todos);
  const { completedCount, notCompletedCount } = useMemo(
    () => calculateStatistics(allTodos, doneTodos),
    [allTodos, doneTodos],
  );

  const chartRef = useRef(null);

  useEffect(() => {
    const chartCanvas = document.getElementById('myChart');
    if (chartCanvas) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(chartCanvas, {
        type: 'doughnut',
        data: {
          labels: ['Completed', 'Not Completed'],
          datasets: [
            {
              label: 'Task Status',
              data: [completedCount, notCompletedCount],
              backgroundColor: ['green', 'red'],
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: true,
            },
          },
        },
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [completedCount, notCompletedCount]);

  return (
    <div className="tasks-statistics">
      <h5>Tasks Statistics</h5>
      <canvas id="myChart" />
    </div>
  );
};

export default TasksStatistics;
