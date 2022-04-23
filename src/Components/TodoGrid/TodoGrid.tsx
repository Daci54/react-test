import React, { useEffect, useState } from 'react';
import {
  Grid,
  GridColumn,
  GridDataStateChangeEvent,
  GridRowClickEvent,
} from '@progress/kendo-react-grid';
import {
  DataResult,
  process as applySortFilterPaging,
  State,
} from '@progress/kendo-data-query';
import { GridTodo } from '../../Models/GridTodo';
import useSelected from '../../Hooks/useSelected';

interface TodoGridProps {
  fetchedGridTodos: GridTodo[];
}

function TodoGrid({ fetchedGridTodos }: TodoGridProps): JSX.Element {
  const [sortFilterPagingState, setSortFilterPagingState] = useState<State>({
    sort: [{ field: 'status.priority', dir: 'asc' }],
    skip: 0,
    take: 20,
  });
  const [initialGridTodos, setInitialGridTodos] =
    useState<GridTodo[]>(fetchedGridTodos);
  const [displayedGridTodos, setDisplayedGridTodos] = useState<DataResult>();
  const {
    dataItemKey,
    selectedField,
    onSelectionChange,
    onHeaderSelectionChange,
  } = useSelected(setInitialGridTodos, 'id', 'selected');

  useEffect(() => {
    setDisplayedGridTodos(
      applySortFilterPaging<GridTodo>(initialGridTodos, sortFilterPagingState)
    );
  }, [initialGridTodos]);

  function onDataStateChange(event: GridDataStateChangeEvent): void {
    setSortFilterPagingState(event.dataState);
    setDisplayedGridTodos(
      applySortFilterPaging<GridTodo>(initialGridTodos, event.dataState)
    );
  }

  function onRowSelection(event: GridRowClickEvent): void {
    const gridTodo: GridTodo = event.dataItem as GridTodo;
    console.log(gridTodo);
  }

  return (
    <div>
      <Grid
        filterable={true}
        sortable={true}
        selectable={{ mode: 'multiple' }}
        pageable={true}
        data={displayedGridTodos}
        {...sortFilterPagingState}
        onDataStateChange={onDataStateChange}
        onRowClick={onRowSelection}
        onSelectionChange={onSelectionChange}
        onHeaderSelectionChange={onHeaderSelectionChange}
        dataItemKey={dataItemKey}
        selectedField={selectedField}
      >
        <GridColumn field={'selected'} />
        <GridColumn field={'id'} />
        <GridColumn field={'title'} />
        <GridColumn field={'completed'} />
        <GridColumn field={'status.name'} title={'status'} />
        <GridColumn field={'created'} filter={'date'} format='{0:d}' />
      </Grid>
    </div>
  );
}

export default TodoGrid;
