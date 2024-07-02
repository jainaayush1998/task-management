import React from 'react';
import { Task } from '../types/Task';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (_id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task._id}>
          <ListItemText primary={task.title} secondary={`Status: ${task.status}`} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit" onClick={() => onEdit(task)}>
              <Edit />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => onDelete(task._id)}>
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;