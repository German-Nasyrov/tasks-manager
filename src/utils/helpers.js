const calculateStatistics = (allTodos, doneTodos) => ({
  completedCount: doneTodos.length,
  notCompletedCount: allTodos.length - doneTodos.length,
});

export default calculateStatistics;
