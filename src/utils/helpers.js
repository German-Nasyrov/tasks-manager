const calculateStatistics = (allTasks, doneTasks) => ({
  completedCount: doneTasks.length,
  notCompletedCount: allTasks.length - doneTasks.length,
});

export default calculateStatistics;
