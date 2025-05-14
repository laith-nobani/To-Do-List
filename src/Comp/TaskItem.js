import { useContext,useState } from 'react';
import ToDoContext from '../context/ToDoContext';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

function TaskItem({ task }) {
  const { data, setData } = useContext(ToDoContext);
  const [open, setOpen] = useState(false);
  const [valueToEdit, setValue] = useState({ title: task.title, details: task.details });

  const onComplete = () => {
    const updatedData = data.map((item) =>
      item.id === task.id ? { ...item, completed: !item.completed } : item
    );
    setData(updatedData);
    localStorage.setItem("todo", JSON.stringify(updatedData));
  };

  const onDelete = () => {
    const updatedData = data.filter((item) => item.id !== task.id);
    setData(updatedData);
    localStorage.setItem("todo", JSON.stringify(updatedData));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditTitle = (e) => {
    setValue({ ...valueToEdit, title: e.target.value });
  };

  const handleEditDetails = (e) => {
    setValue({ ...valueToEdit, details: e.target.value });
  };

  const handleEdit = () => {
    const updatedData = data.map((item) =>
      item.id === task.id ? { ...item, title: valueToEdit.title, details: valueToEdit.details } : item
    );
    setData(updatedData);
    localStorage.setItem("todo", JSON.stringify(updatedData));
    handleClose();
  };

  return (
    <div className="flex justify-between items-center border border-gray-600 bg-gray-700 w-80 p-4 text-white mb-3 rounded-xl shadow-lg">
      <div className="flex gap-2">
        <IconButton onClick={onDelete}>
          <DeleteIcon className='text-red-400'/>
        </IconButton>
        <IconButton onClick={handleClickOpen}>
          <EditIcon className='text-blue-700'/>
        </IconButton>
        <IconButton onClick={onComplete}>
          <CheckCircleOutlineOutlinedIcon className={task.completed ? 'text-green-400' : 'text-yellow-400'} />
        </IconButton>
      </div>
      <div className="flex flex-col text-right">
        <div className="text-lg font-semibold">{task.title}</div>
        {task.details && <div className="text-sm text-gray-300 mt-1">{task.details}</div>}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField value={valueToEdit.title} onChange={handleEditTitle} fullWidth label="العنوان" />
          <TextField value={valueToEdit.details} onChange={handleEditDetails} fullWidth label="التفاصيل" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>إلغاء</Button>
          <Button onClick={handleEdit}>تعديل</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TaskItem;
