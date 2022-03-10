import { Post } from '../Models/Post';
import { Todo } from '../Models/Todo';

export async function fetchSomeData(): Promise<Post[]> {
  return fetch('https://jsonplaceholder.typicode.com/posts').then(
    (response: Response) => response.json()
  );
}

export async function fetchTodos(): Promise<Todo[]> {
  return fetch('https://jsonplaceholder.typicode.com/users/1/todos').then(
    (response: Response) => response.json()
  );
}
