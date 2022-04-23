import React, { useEffect, useState } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import TodoGrid from './Components/TodoGrid/TodoGrid';
import { Todo } from './Models/Todo';
import { useFetch } from 'use-http';
import { convertTodosToGridTodos } from './Helper/Helper';
import { GridTodo } from './Models/GridTodo';

function App(): JSX.Element {
  const { data: fetchedTodos } = useFetch<Todo[]>(
    'https://jsonplaceholder.typicode.com/users/1/todos',
    {},
    []
  );
  const [gridTodos, setGridTodos] = useState<GridTodo[]>();

  useEffect(() => {
    setGridTodos(convertTodosToGridTodos(fetchedTodos));
  }, [fetchedTodos]);

  return (
    <div className='app-container'>
      {gridTodos && <TodoGrid gridTodos={gridTodos} />}
    </div>
  );
}

export default App;
