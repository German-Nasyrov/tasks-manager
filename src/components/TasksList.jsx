import TaskItem from './TaskItem';

const TasksList = ({
  tasks, checkedTasks, onPerformTask, onDeleteTask, onEditTask, onTextareaKeyDown,
}) => (
  <div>
    {tasks.map((task) => (
      <TaskItem
        key={task.id}
        task={task}
        isChecked={checkedTasks[task.id]}
        onPerformTask={onPerformTask}
        onDeleteTask={onDeleteTask}
        onEditTask={onEditTask}
        onTextareaKeyDown={onTextareaKeyDown}
      />
    ))}
  </div>
);

export default TasksList;
