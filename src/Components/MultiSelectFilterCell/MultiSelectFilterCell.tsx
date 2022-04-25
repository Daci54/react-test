import React from 'react';
import { GridFilterCellProps } from '@progress/kendo-react-grid';
import {
  MultiSelect,
  MultiSelectChangeEvent,
} from '@progress/kendo-react-dropdowns';

interface MultiSelectStatusProps extends GridFilterCellProps {
  multiSelectData?: any[];
}

function selectedValuesFilter(
  currentValue: any,
  selectedValues: any[]
): boolean {
  return selectedValues.includes(currentValue);
}

function MultiSelectFilterCell({
  multiSelectData,
  value,
  onChange,
}: MultiSelectStatusProps): JSX.Element {
  function onMultiSelectChange(event: MultiSelectChangeEvent): void {
    const selectedValues: any[] = event.value;
    onChange({
      value: selectedValues.length > 0 ? selectedValues : '',
      operator: selectedValues.length > 0 ? selectedValuesFilter : '',
      syntheticEvent: event.syntheticEvent,
    });
  }

  return (
    <MultiSelect
      data={multiSelectData}
      onChange={onMultiSelectChange}
      value={Array.isArray(value) ? value : []}
    />
  );
}

export default MultiSelectFilterCell;
