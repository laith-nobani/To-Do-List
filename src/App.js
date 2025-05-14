import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToDoContext from './context/ToDoContext';
import ToDoList from './Comp/ToDoList';
import ToDo from './Comp/ToDo';
import Completed from './Comp/Completed';
import UnCompleted from './Comp/UnCompleted';
function App() {
  const [data, setData] = useState([]);
  
  return (
    <ToDoContext.Provider value={{ data, setData }}>
      <Router>
        <Routes>
          <Route path="/" element={<ToDoList />}>
           <Route index element={<ToDo/>} />
            <Route path="completed" element={<Completed />} />
            <Route path="uncompleted" element={<UnCompleted />} />
          </Route>
        </Routes>
      </Router>
    </ToDoContext.Provider>
  );
}

export default App;