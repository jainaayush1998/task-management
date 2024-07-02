import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, AppBar, Toolbar, Button } from '@material-ui/core';
import { DropResult } from 'react-beautiful-dnd';
import Board from './components/Board';
import TaskForm from './components/TaskForm';
import { Task, NewTask, BaseTask } from './types/Task';
import { fetchTasks, createTask, updateTask, deleteTask } from './api/tasks';
import socket from './sockets';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks();

    // Socket event listeners
    socket.on('taskCreated', (task: Task) => {
      setTasks((prevTasks) => [...prevTasks, task]);
    });

    socket.on('taskUpdated', (updatedTask: Task) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      );
    });

    socket.on('taskDeleted', (taskId: string) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    });

    return () => {
      socket.off('taskCreated');
      socket.off('taskUpdated');
      socket.off('taskDeleted');
    };
  }, []);

  const loadTasks = async () => {
    const fetchedTasks = await fetchTasks();
    setTasks(fetchedTasks);
  };

  const handleCreateTask = async (newTask: NewTask) => {
    await createTask(newTask);
    setIsFormOpen(false);
  };

  const handleUpdateTask = async (taskToUpdate: BaseTask) => {
    if (editingTask) {
      await updateTask({ ...taskToUpdate, _id: editingTask._id });
      setEditingTask(null);
      setIsFormOpen(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const task = tasks.find((t) => t._id === draggableId);
    if (task && destination.droppableId !== task.status) {
      const updatedTask: Task = { ...task, status: destination.droppableId as Task['status'] };
      
      try {
        await updateTask(updatedTask);
      } catch (error) {
        console.error('Failed to update task status:', error);
      }
    }
  };


  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Task Management
          </Typography>
          <Button color="inherit" onClick={() => setIsFormOpen(true)}>
            Create Task
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ marginTop: '24px' }}>
        {isFormOpen && (
          <Box mb={4}>
            <TaskForm
              task={editingTask || undefined}
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingTask(null);
              }}
            />
          </Box>
        )}
        <Board
          tasks={tasks}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onDragEnd={handleDragEnd}
        />
      </Container>
    </>
  );
};

export default App;