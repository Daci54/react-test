import React, { useEffect, useState } from 'react';
import {
  Grid,
  GridColumn,
  GridDataStateChangeEvent,
  GridSelectionChangeEvent,
} from '@progress/kendo-react-grid';
import todosJson from '../../DummyData/todos.json';
import { DataResult, process, State } from '@progress/kendo-data-query';
import { Todo } from '../../Models/Todo';
import { GridTodo } from '../../Models/GridTodo';
import { generateDate } from '../../Helper/Helper';

function TodoGrid(): JSX.Element {
  const [gridTodos, setGridTodos] = useState<GridTodo[]>([]);
  const [dataState, setDataState] = useState<State>({
    sort: [{ field: 'status.priority', dir: 'asc' }],
  });
  const [result, setResult] = useState<DataResult>(
    process<GridTodo>(gridTodos, dataState)
  );
  const [selectedGridTodoId, setSelectedGridTodoId] = useState<number>();

  useEffect(() => {
    setGridTodos(parseTodos());
  }, []);

  useEffect(() => {
    setResult(process<GridTodo>(gridTodos, dataState));
  }, [gridTodos]);

  useEffect(() => {
    setGridTodoSelection();
  }, [selectedGridTodoId]);

  function setGridTodoSelection(): void {
    setGridTodos((gridTodos: GridTodo[]) =>
      gridTodos.map((gridTodo: GridTodo) =>
        gridTodo.id === selectedGridTodoId
          ? { ...gridTodo, selected: true }
          : { ...gridTodo, selected: false }
      )
    );
  }

  function onDataStateChange(event: GridDataStateChangeEvent): void {
    setDataState(event.dataState);
    setResult(process<GridTodo>(gridTodos, event.dataState));
  }

  function onRowSelection(event: GridSelectionChangeEvent): void {
    const gridTodo: GridTodo = event.dataItem as GridTodo;
    if (gridTodo) {
      setSelectedGridTodoId(gridTodo.id);
    }
  }

  function parseTodos(): GridTodo[] {
    const todos: Todo[] = todosJson;
    return todos.map((todo: Todo) => {
      return {
        ...todo,
        created: todo.created ? generateDate(todo.created) : undefined,
        selected: false,
      };
    });
  }

  return (
    <div>
      <Grid
        filterable={true}
        sortable={true}
        data={result}
        {...dataState}
        onDataStateChange={(e: GridDataStateChangeEvent) =>
          onDataStateChange(e)
        }
        onSelectionChange={(e: GridSelectionChangeEvent) => onRowSelection(e)}
        selectable={{ mode: 'single' }}
        selectedField={'selected'}
      >
        <GridColumn field={'selected'} />
        <GridColumn field={'id'} />
        <GridColumn field={'title'} />
        <GridColumn field={'completed'} />
        <GridColumn field={'status.name'} title={'status'} />
        <GridColumn field={'created'} filter={'date'} format='{0:d}' />
      </Grid>
      <pre>{selectedGridTodoId && JSON.stringify(selectedGridTodoId)}</pre>
    </div>
  );
}

export default TodoGrid;
