import React, { useState, useEffect } from 'react';
import { Task, NewTask, BaseTask } from '../types/Task';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid } from '@material-ui/core';

interface TaskFormProps {
  task?: Task;
  onSubmit: (task: BaseTask) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState<Task['status']>(task?.status || 'To Do');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTask: BaseTask = { title, description, status };
    onSubmit(updatedTask);
    setTitle('');
    setDescription('');
    setStatus('To Do');
  };


  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select value={status} onChange={(e) => setStatus(e.target.value as Task['status'])}>
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={2}>
        <Grid item>
          <Button type="submit" variant="contained" color="primary">
            {task ? 'Update Task' : 'Create Task'}
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={onCancel}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TaskForm;