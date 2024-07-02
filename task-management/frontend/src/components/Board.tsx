import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Task } from '../types/Task';
import TaskCard from './TaskCard';

interface BoardProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onDragEnd: (result: DropResult) => void;
}

const Board: React.FC<BoardProps> = ({ tasks, onEditTask, onDeleteTask, onDragEnd }) => {
  const columns = ['To Do', 'In Progress', 'Done'];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid container spacing={3}>
        {columns.map((column) => (
          <Grid item xs={12} sm={4} key={column}>
            <Paper style={{ padding: '16px', minHeight: '300px' }}>
              <Typography variant="h6" gutterBottom>
                {column}
              </Typography>
              <Droppable droppableId={column}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {tasks
                      .filter((task) => task.status === column)
                      .map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard
                                task={task}
                                onEdit={() => onEditTask(task)}
                                onDelete={() => onDeleteTask(task._id)}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </DragDropContext>
  );
};

export default Board;