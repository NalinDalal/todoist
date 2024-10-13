import React, { useEffect, useState } from 'react';
import { fetchTasks, addTask, updateTask, deleteTask } from '../api';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TaskList: React.FC<{ token: string }> = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const tasksData = await fetchTasks(token);
      setTasks(tasksData);
    };
    getTasks();
  }, [token, refresh]);

  //@ts-ignore
  const handleAddTask = async (task) => {
    await addTask(task, token);
    setRefresh(!refresh);
  };

  //@ts-ignore
  const handleUpdateTask = async (id, updatedTask) => {
    await updateTask(id, updatedTask, token);
    setRefresh(!refresh);
  };

  //@ts-ignore
  const handleDeleteTask = async (id) => {
    await deleteTask(id, token);
    setRefresh(!refresh);
  };

  return (
    <div>
      <h1>Tasks</h1>
      <TaskForm onAddTask={handleAddTask} />
      <div>
        {tasks.map((task) => (
          //@ts-ignore
          <TaskItem key={task.id} task={task} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;

