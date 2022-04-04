import { TodoStatus } from './TodoStatus';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  created: string;
  status: TodoStatus;
}
