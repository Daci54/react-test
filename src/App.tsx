import React, { useEffect, useState } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import TodoGrid from './Components/TodoGrid/TodoGrid';
import { convertTodosToGridTodos } from './Helper/Helper';
import { GridTodo } from './Models/GridTodo';
import dummyTodos from './DummyData/todos.json';
import { FilterDescriptor } from '@progress/kendo-data-query';

function App(): JSX.Element {
  const [gridTodos, setGridTodos] = useState<GridTodo[]>();
  const [activeFilters, setActiveFilters] = useState<FilterDescriptor[]>();

  useEffect(() => {
    setGridTodos(convertTodosToGridTodos(dummyTodos));
  }, []);

  function removeFilter(field: string): void {
    console.log('remove filter');
    const newActiveFilters = activeFilters?.filter(
      (activeFilter: FilterDescriptor) => activeFilter.field !== field
    );
    setActiveFilters(newActiveFilters);
  }

  return (
    <div className='app-container'>
      {activeFilters &&
        activeFilters.map((activeFilter: FilterDescriptor, index: number) => (
          <li
            key={index}
            onClick={() => removeFilter(activeFilter.field as string)}
          >
            {activeFilter.value}
          </li>
        ))}
      {gridTodos && (
        <TodoGrid
          fetchedGridTodos={gridTodos}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
      )}
    </div>
  );
}

export default App;
