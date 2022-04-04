import React, { useEffect, useState } from 'react';
import {
  Grid,
  GridColumn,
  GridDataStateChangeEvent,
  GridRowClickEvent,
} from '@progress/kendo-react-grid';
import todosJson from '../../DummyData/todos.json';
import { DataResult, process, State } from '@progress/kendo-data-query';
import { Todo } from '../../Models/Todo';
import { GridTodo } from '../../Models/GridTodo';
import { generateDate } from '../../Helper/Helper';

function TodoGrid(): JSX.Element {
  const [gridTodos, setGridTodos] = useState<GridTodo[]>([]);
  const [dataState, setDataState] = useState<State>({});
  const [result, setResult] = useState<DataResult>(
    process<GridTodo>(gridTodos, dataState)
  );
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setGridTodos(parseTodos());
  }, []);

  useEffect(() => {
    setResult(process<GridTodo>(gridTodos, dataState));
  }, [gridTodos]);

  function onDataStateChange(event: GridDataStateChangeEvent): void {
    setDataState(event.dataState);
    setResult(process<GridTodo>(gridTodos, event.dataState));
  }

  function onRowSelection(event: GridRowClickEvent): void {
    const gridTodo: GridTodo = event.dataItem;
    console.log(gridTodo.id);
    setVisible(true);
  }

  function parseTodos(): GridTodo[] {
    const todos: Todo[] = todosJson;
    return todos.map((todo: Todo) => {
      return {
        ...todo,
        created: todo.created ? generateDate(todo.created) : undefined,
      };
    });
  }

  console.log(result);

  return (
    <>
      <Grid
        style={{ height: '400px' }}
        filterable={true}
        sortable={true}
        data={result}
        {...dataState}
        onDataStateChange={(e: GridDataStateChangeEvent) =>
          onDataStateChange(e)
        }
        onRowClick={(event: GridRowClickEvent) => onRowSelection(event)}
      >
        <GridColumn field={'id'} />
        <GridColumn field={'title'} />
        <GridColumn field={'completed'} />
        <GridColumn field={'created'} filter={'date'} format='{0:d}' />
      </Grid>
      <pre>{String(visible)}</pre>
    </>
  );
}

export default TodoGrid;
