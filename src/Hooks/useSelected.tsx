import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { GridTodo } from '../Models/GridTodo';
import {
  getSelectedState,
  GridHeaderSelectionChangeEvent,
  GridRowClickEvent,
  GridSelectionChangeEvent,
} from '@progress/kendo-react-grid';
import { getter } from '@progress/kendo-data-query';

interface SelectedState {
  [id: string]: boolean | number[];
}

interface UseSelectedResponse {
  dataItemKey: string;
  selectedField: string;
  onSelectionChange: (event: GridSelectionChangeEvent) => void;
  onHeaderSelectionChange: (event: GridHeaderSelectionChangeEvent) => void;
  onRowClick: (event: GridRowClickEvent) => void;
}

function useSelected(
  setInitialDataItems: Dispatch<SetStateAction<GridTodo[]>>,
  dataItemKey: string,
  selectedField: string
): UseSelectedResponse {
  const [selectedState, setSelectedState] = useState<SelectedState>({});
  const idGetter = getter(dataItemKey);

  function onSelectionChange(event: GridSelectionChangeEvent): void {
    if (event.dataItem !== null) {
      const newSelectedState = getSelectedState({
        event,
        selectedState: selectedState,
        dataItemKey: dataItemKey,
      });
      setSelectedState(newSelectedState);
    }
  }

  function onHeaderSelectionChange(
    event: GridHeaderSelectionChangeEvent
  ): void {
    const checkboxElement: HTMLInputElement = event.syntheticEvent
      .target as HTMLInputElement;
    const checked = checkboxElement.checked;
    const newSelectedState: SelectedState = {};

    for (const item of event.dataItems) {
      newSelectedState[idGetter(item)] = checked;
    }
    setSelectedState(newSelectedState);
  }

  function onRowClick(event: GridRowClickEvent): void {
    console.log('row was clicked');
  }

  useEffect(() => {
    setInitialDataItems((initialDataItems: any[]) => {
      return initialDataItems.map((initialDataItem: any) => {
        return {
          ...initialDataItem,
          [selectedField]: selectedState[idGetter(initialDataItem)],
        };
      });
    });
  }, [idGetter, selectedField, selectedState, setInitialDataItems]);

  return {
    dataItemKey,
    selectedField,
    onSelectionChange,
    onHeaderSelectionChange,
    onRowClick,
  };
}

export default useSelected;
