import React, { memo, useCallback, useEffect, useState } from 'react';
import { Todo } from '../../Models/Todo';
import TodoComp from '../Todo/TodoComp';
import { useFetch } from 'use-http';

function TodoList(): JSX.Element {
  const BASE_URL = 'https://jsonplaceholder.typicode.com';
  const [endpoint] = useState<string>('/users/1/todos');
  const [todos, setTodos] = useState<Todo[]>();
  const { loading, error, get, response, data } = useFetch<Todo[]>(BASE_URL);

  console.log(data);

  useEffect(() => {
    void loadInitialTodos();
  }, []);

  async function loadInitialTodos(): Promise<void> {
    const initialTodos = await get(endpoint);
    if (response.ok) setTodos(initialTodos);
  }

  function changeCompleteState(todoId: number): void {
    setTodos((prevTodos: Todo[] | undefined) => {
      return prevTodos?.map((todo: Todo) => {
        if (todo.id === todoId) {
          return { ...todo, completed: !todo.completed };
        } else {
          return { ...todo };
        }
      });
    });
  }

  const memoChangeCompleteState = useCallback(changeCompleteState, []);

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  return (
    <>
      <h2>Todos</h2>
      {todos &&
        todos.map((todo: Todo) => (
          <TodoComp
            key={todo.id}
            todo={todo}
            onCheckedChange={memoChangeCompleteState}
          />
        ))}
    </>
  );
}

export default memo(TodoList);
