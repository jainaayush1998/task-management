export interface BaseTask {
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
}

export interface Task extends BaseTask {
  _id: string;
}

export type NewTask = BaseTask;