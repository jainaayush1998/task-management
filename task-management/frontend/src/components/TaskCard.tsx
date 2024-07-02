import React from 'react';
import { Card, CardContent, Typography, CardActions, IconButton } from '@material-ui/core';
import { Edit, Delete, DragIndicator } from '@material-ui/icons';
import { Task } from '../types/Task';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  return (
    <Card style={{ marginBottom: '16px' }}>
      <CardContent>
        <Typography variant="h6" style={{ display: 'flex', alignItems: 'center' }}>
          <DragIndicator style={{ marginRight: '8px', cursor: 'move' }} />
          {task.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {task.description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton size="small" onClick={onEdit}>
          <Edit />
        </IconButton>
        <IconButton size="small" onClick={onDelete}>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default TaskCard;