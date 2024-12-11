import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  addTask,
  deleteTask,
  editTask,
  setModalState,
  setShareTask,
  setEditTaskId,
  saveTasksToLocalStorage,
  reorderTasks,
} from './features/tasksSlice';
import Header from './component/Header';
import Tasks from './component/Tasks';
import Modal from './component/Modal';

const App = () => {
  const dispatch = useDispatch();
  const tasksState = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(saveTasksToLocalStorage());
  }, [tasksState.tasks, dispatch]);

  const addNewTask = (task) => {
    dispatch(addTask(task));
  };

  const deleteTaskById = (id) => {
    dispatch(deleteTask(id));
    closeModal();
  };

  const editTaskById = (task) => {
    dispatch(editTask(task));
  };

  const openModalDelete = (taskId) => {
    dispatch(
      setModalState({
        onView: true,
        onDelete: true,
        onShare: false,
        onEdit: false,
      })
    );
    dispatch(setEditTaskId(taskId));
  };

  const openModalShare = (task) => {
    dispatch(
      setModalState({
        onView: true,
        onDelete: false,
        onShare: true,
        onEdit: false,
      })
    );
    dispatch(setShareTask(task));
  };

  const openModalEdit = (taskId) => {
    dispatch(
      setModalState({
        onView: true,
        onDelete: false,
        onShare: false,
        onEdit: true,
      })
    );
    dispatch(setEditTaskId(taskId));
  };

  const closeModal = () => {
    dispatch(
      setModalState({
        onView: false,
        onDelete: false,
        onShare: false,
        onEdit: false,
      })
    );
    dispatch(setEditTaskId(''));
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (destination.index === source.index) return;

    dispatch(reorderTasks({ startIndex: source.index, endIndex: destination.index }));
  };

  return (
    <div className="wrapper-body">
      {tasksState.onModal.onView && (
        <Modal
          onDelete={tasksState.onModal.onDelete}
          onShare={tasksState.onModal.onShare}
          onEdit={tasksState.onModal.onEdit}
          onCloseModal={closeModal}
          onDeleteTask={deleteTaskById}
          onShareTask={tasksState.shareTask}
          onEditTask={editTaskById}
          onEditTaskId={tasksState.editTaskId}
        />
      )}
      <Header onAddTask={addNewTask} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Tasks
          tasks={tasksState.tasks}
          onModalDelete={openModalDelete}
          onModalShare={openModalShare}
          onModalEdit={openModalEdit}
        />
      </DragDropContext>
    </div>
  );
};

export default App;
