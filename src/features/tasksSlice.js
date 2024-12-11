import { createSlice } from '@reduxjs/toolkit';

const loadTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

const initialState = {
  tasks: loadTasksFromLocalStorage(),
  onModal: {
    onView: false,
    onDelete: false,
    onShare: false,
    onEdit: false,
  },
  shareTask: null,
  editTaskId: '',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const task = action.payload;
      if (!task.id) {
        console.error('Task id is missing:', task);
        return;
      }
      state.tasks.push(task);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    setModalState: (state, action) => {
      state.onModal = action.payload;
    },
    setShareTask: (state, action) => {
      state.shareTask = action.payload;
    },
    setEditTaskId: (state, action) => {
      state.editTaskId = action.payload;
    },
    reorderTasks: (state, action) => {
      const { startIndex, endIndex } = action.payload;
      const reorderedTasks = Array.from(state.tasks);
      const [removed] = reorderedTasks.splice(startIndex, 1);
      reorderedTasks.splice(endIndex, 0, removed);
      state.tasks = reorderedTasks;
    },
    saveTasksToLocalStorage: (state) => {
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
  },
});

export const saveTasksEffect = () => (dispatch, getState) => {
  const tasks = getState().tasks.tasks;
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const {
  addTask,
  deleteTask,
  editTask,
  setModalState,
  setShareTask,
  setEditTaskId,
  saveTasksToLocalStorage,
  reorderTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
