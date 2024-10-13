import React from 'react';

const TaskItem: React.FC<{ task: any; onUpdateTask: (id: number, updatedTask: any) => void; onDeleteTask: (id: number) => void }> = ({ task, onUpdateTask, onDeleteTask }) => {
  const handleUpdate = () => {
    const updatedTask = { ...task, status: task.status === 'completed' ? 'pending' : 'completed' };
    onUpdateTask(task.id, updatedTask);
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
      <button onClick={handleUpdate}>Toggle Status</button>
      <button onClick={() => onDeleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;

