import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  Grid,
  GridColumn,
  GridDataStateChangeEvent,
  GridFilterCellProps,
} from '@progress/kendo-react-grid';
import {
  CompositeFilterDescriptor,
  DataResult,
  FilterDescriptor,
  State,
} from '@progress/kendo-data-query';
import { GridTodo } from '../../Models/GridTodo';
import useSelected from '../../Hooks/useSelected';
import useSortFilterPaging from '../../Hooks/useSortFilterPaging';
import MultiSelectFilterCell from '../MultiSelectFilterCell/MultiSelectFilterCell';

interface TodoGridProps {
  fetchedGridTodos: GridTodo[];
  activeFilters?: FilterDescriptor[];
  setActiveFilters: Dispatch<SetStateAction<FilterDescriptor[] | undefined>>;
}

function TodoGrid({
  fetchedGridTodos,
  activeFilters,
  setActiveFilters,
}: TodoGridProps): JSX.Element {
  const [initialGridTodos, setInitialGridTodos] =
    useState<GridTodo[]>(fetchedGridTodos);
  const [displayedGridTodos, setDisplayedGridTodos] = useState<DataResult>();
  const {
    dataItemKey,
    selectedField,
    onSelectionChange,
    onHeaderSelectionChange,
    onRowClick,
  } = useSelected(setInitialGridTodos, 'id', 'selected');
  const { sortFilterPagingState, setSortFilterPagingState } =
    useSortFilterPaging(
      {
        sort: [{ field: 'status.priority', dir: 'asc' }],
        skip: 0,
        take: 20,
      },
      initialGridTodos,
      setDisplayedGridTodos
    );

  function onDataStateChange(event: GridDataStateChangeEvent): void {
    setSortFilterPagingState(event.dataState);
    setActiveFilters(event.dataState.filter?.filters as FilterDescriptor[]);
  }

  useEffect(() => {
    if (
      activeFilters &&
      sortFilterPagingState.filter?.filters &&
      activeFilters.length < sortFilterPagingState.filter.filters.length
    ) {
      setSortFilterPagingState((currentSortFilterPagingState: State) => {
        return {
          ...currentSortFilterPagingState,
          filter: {
            ...(currentSortFilterPagingState.filter as CompositeFilterDescriptor),
            filters: activeFilters,
          },
        };
      });
    }
  }, [
    activeFilters,
    setSortFilterPagingState,
    sortFilterPagingState.filter?.filters,
  ]);

  const statusNames: string[] = Array.from(
    new Set(
      initialGridTodos.map(
        (initialGridTodo: GridTodo) => initialGridTodo.status?.name as string
      )
    )
  );

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
        onRowClick={onRowClick}
        onSelectionChange={onSelectionChange}
        onHeaderSelectionChange={onHeaderSelectionChange}
        dataItemKey={dataItemKey}
        selectedField={selectedField}
      >
        <GridColumn field={'selected'} />
        <GridColumn field={'id'} />
        <GridColumn field={'title'} />
        <GridColumn field={'completed'} />
        <GridColumn
          field={'status.name'}
          title={'status'}
          filterCell={(gridFilterCellProps: GridFilterCellProps) => (
            <MultiSelectFilterCell
              {...gridFilterCellProps}
              multiSelectData={statusNames}
            />
          )}
        />
        <GridColumn field={'created'} filter={'date'} format='{0:d}' />
      </Grid>
    </div>
  );
}

export default TodoGrid;
