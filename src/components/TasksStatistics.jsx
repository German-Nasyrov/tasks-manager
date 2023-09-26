import { useSelector } from 'react-redux';
import React, { useEffect, useMemo } from 'react';
import Chart from 'chart.js/auto';

const TasksStatistics = () => {
  const { allTodos, doneTodos } = useSelector((state) => state.todos);
  const completedCount = doneTodos.length;
  const notCompletedCount = allTodos.length - completedCount;

  const data = useMemo(() => ({
    labels: ['Completed', 'Not Completed'],
    datasets: [
      {
        label: 'Task Status',
        data: [completedCount, notCompletedCount],
        backgroundColor: ['green', 'red'],
      },
    ],
  }), [completedCount, notCompletedCount]);

  const options = useMemo(() => ({
    plugins: {
      legend: {
        display: true,
      },
    },
  }), []);

  useEffect(() => {
    const chartCanvas = document.getElementById('myChart');
    if (chartCanvas) {
      const chartInstance = new Chart(chartCanvas, {
        type: 'doughnut',
        data,
        options,
      });
      return () => {
        chartInstance.destroy();
      };
    }

    return null;
  }, [data, options]);

  return (
    <div className="items-statistics">
      <h5>Tasks Statistics</h5>
      <canvas id="myChart" />
    </div>
  );
};

export default TasksStatistics;
