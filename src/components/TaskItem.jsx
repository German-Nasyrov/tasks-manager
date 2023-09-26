import Button from 'react-bootstrap/Button';

const TaskItem = ({
  task, isChecked, onPerformTask, onDeleteTask, onEditTask, onTextareaKeyDown,
}) => {
  const isCompleted = isChecked && task.completed;
  const isTextareaDisabled = isChecked;
  const maxLength = 40;

  return (
    <div className="list-element" id={`task-${task.id}`}>
      <input
        className="form-check-input m-0 ms-2 me-2"
        type="checkbox"
        id={`flexCheckIndeterminate-${task.id}`}
        onClick={() => onPerformTask(task)}
        defaultChecked={isChecked}
      />
      <textarea
        className={`ms-2 me-auto task-edit ${task.isEditing ? 'editing' : ''} ${isCompleted ? 'completed' : ''}`}
        rows={1}
        value={task.data}
        maxLength={maxLength}
        onChange={(e) => onEditTask(task.id, e.target.value, true)}
        onBlur={(e) => onEditTask(task.id, e.target.value, false)}
        onKeyDown={onTextareaKeyDown}
        disabled={isTextareaDisabled}
      />
      <Button
        type="button"
        className="btn-close ms-1 me-1"
        aria-label="Close"
        onClick={() => onDeleteTask(task)}
      />
    </div>
  );
};

export default TaskItem;
