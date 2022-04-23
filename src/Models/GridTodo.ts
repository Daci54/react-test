import { TodoStatus } from './TodoStatus';

export interface GridTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  created: Date | null;
  selected: boolean;
  status: TodoStatus | null;
}
