import axios from 'axios';
import { Task, NewTask } from '../types/Task';

const API_URL = 'http://localhost:4000/api/tasks';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTask = async (task: NewTask): Promise<Task> => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const updateTask = async (task: Task): Promise<Task> => {
  const response = await axios.put(`${API_URL}/${task._id}`, task);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};