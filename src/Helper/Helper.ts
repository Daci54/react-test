import { GridTodo } from '../Models/GridTodo';
import { Todo } from '../Models/Todo';

export function generateDate(dateString: string): Date {
  const [year, month, day]: string[] = dateString.split('-');
  return new Date(+year, +month, +day);
}

export function convertTodosToGridTodos(
  fetchedTodos?: Todo[]
): GridTodo[] | undefined {
  return fetchedTodos?.map((todo: Todo) => {
    return {
      ...todo,
      created: todo.created ? new Date(todo.created) : null,
      selected: false,
    };
  });
}
