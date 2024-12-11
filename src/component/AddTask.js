import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasksSlice';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (title && text) {
      const newTask = {
        id: Date.now(),
        title,
        text,
      };
      dispatch(addTask(newTask));
    }
    setTitle('');
    setText('');
  };

  return (
    <form>
      <div className="header-inputs">
        <input type="text" placeholder="Title..." value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="About..." value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="header-buttons">
        <button type="button" onClick={handleAddTask}>
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </form>
  );
};

export default AddTask;
