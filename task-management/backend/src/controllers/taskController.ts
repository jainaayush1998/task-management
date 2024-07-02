import { Request, Response } from 'express';
import Task, { ITask } from '../models/Task';
import { io } from '../app';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = new Task(req.body);
    await task.save();
    io.emit('taskCreated', task);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    io.emit('taskUpdated', task);
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error updating task' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    io.emit('taskDeleted', req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting task' });
  }
};