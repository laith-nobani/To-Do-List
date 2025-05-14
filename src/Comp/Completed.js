import { useContext } from 'react';
import ToDoContext from '../context/ToDoContext';
import TaskItem from './TaskItem';

function Completed() {
  const { data } = useContext(ToDoContext);
  const completedTasks = data.filter(task => task.completed);
  
  return (
    <div className="flex flex-col items-center mt-5 gap-3">
      {completedTasks.map((item) => (
        <TaskItem key={item.id} task={item} />
      ))}
    </div>
  );
}

export default Completed;