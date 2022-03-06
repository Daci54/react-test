import { Post } from '../Models/Post';

export async function fetchSomeData(): Promise<Post[]> {
  return fetch('https://jsonplaceholder.typicode.com/posts').then(
    (response: Response) => response.json()
  );
}
