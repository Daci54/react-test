import { TodoStatus } from './TodoStatus';

export interface GridTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  created?: Date;
  selected: boolean;
  status: TodoStatus;
}
