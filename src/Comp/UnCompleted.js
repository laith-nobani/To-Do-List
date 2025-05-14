import { useContext } from 'react';
import ToDoContext from '../context/ToDoContext';
import TaskItem from './TaskItem';

function UnCompleted() {
  const { data } = useContext(ToDoContext);
  const uncompletedTasks = data.filter(task => !task.completed);
  return (
    <div className="flex flex-col items-center mt-5 gap-3">
      {uncompletedTasks.map((item) => (
        <TaskItem key={item.id} task={item} />
      ))}
    </div>
  );
}

export default UnCompleted;