import React, { useState } from 'react';
import { Todo } from '../../Models/Todo';
import TodoComp from '../Todo/TodoComp';
import useFetch from '../../Hooks/useFetch';

export function TodoList(): JSX.Element {
  const [count, setCounter] = useState(0);
  const [requestUrl, setRequestUrl] = useState<string>(
    'https://jsonplaceholder.typicode.com/users/1/todos'
  );
  const {
    loading,
    error,
    fetchedData: todos,
    setFetchedData: setTodos,
  } = useFetch<Todo[]>(requestUrl);

  function changeCompleteState(todoId: number): void {
    if (todos) {
      const newTodos: Todo[] = todos.map((todo: Todo) => {
        if (todo.id === todoId) {
          return { ...todo, completed: !todo.completed };
        } else {
          return { ...todo };
        }
      });
      setTodos(newTodos);
    }
  }

  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  return (
    <>
      <button onClick={() => setCounter((prevCount) => prevCount + 1)}>
        Fetch Todo
      </button>
      <h2>{count}</h2>
      <h2>Todos</h2>
      {todos &&
        todos.map((todo: Todo) => (
          <TodoComp
            key={todo.id}
            todo={todo}
            onCheckedChange={(todoId: number) => changeCompleteState(todoId)}
          />
        ))}
    </>
  );
}
