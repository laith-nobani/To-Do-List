import { useContext, useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ToDoContext from '../context/ToDoContext';
import { v4 as uuidv4 } from 'uuid';

function ToDoList() {
  const { data, setData } = useContext(ToDoContext);
  const [valueToADD, setValue] = useState("");

  useEffect(() => {
    const todoData = JSON.parse(localStorage.getItem("todo"));
    setData(todoData || []);
  }, []);

  const handleAdd = () => {
    if (valueToADD.trim() === "") return;
    const item = {
      id: uuidv4(),
      title: valueToADD,
      details: "",
      completed: false,
    };
    const updatedData = [...data, item];
    setData(updatedData);
    setValue("");
    localStorage.setItem("todo", JSON.stringify(updatedData));
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-700 p-4">
      <div className="bg-gray-800 w-full sm:w-3/4 md:w-2/3 lg:w-1/3 min-h-[75vh] max-h-[85vh] flex items-center flex-col p-6 rounded-2xl shadow-2xl gap-6">
        <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-white mb-4">مهامي</h1>
        <div className="flex gap-2 sm:gap-3 mb-5 flex-wrap justify-center">
          <Link 
            to="/uncompleted" 
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-all duration-300"
          >
            غير المنجز
          </Link>
          <Link 
            to="/completed" 
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-all duration-300"
          >
            المنجز
          </Link>
          <Link 
            to="/" 
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition-all duration-300"
          >
            الكل
          </Link>
        </div>
        <div className="w-full p-3 border border-gray-700 rounded-xl bg-gray-700 min-h-[30vh] max-h-[60vh] overflow-y-auto">
          <Outlet />
        </div>
        <div className="flex gap-2 sm:gap-3 w-full mt-4">
          <input
            type="text"
            placeholder="عنوان المهمة"
            className="border border-gray-500 p-2 sm:p-3 rounded-lg w-full focus:outline-none focus:border-blue-500 transition-all duration-300"
            value={valueToADD}
            onChange={handleChange}
          />
          <button 
            className="bg-blue-600 text-white px-5 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-500 transition-all duration-300" 
            onClick={handleAdd}
          >
            اضافة
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
