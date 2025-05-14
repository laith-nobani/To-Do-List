import { useContext } from 'react';
import ToDoContext from '../context/ToDoContext';
import TaskItem from './TaskItem';

function ToDo() {
  const { data } = useContext(ToDoContext);
  return (
    <div className="flex flex-col items-center mt-5 gap-3">
      {data.map((item) => (
        <TaskItem key={item.id} task={item} />
      ))}
    </div>
  );
}

export default ToDo;
