import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { DataResult, State } from '@progress/kendo-data-query';
import { process as applySortFilterPaging } from '@progress/kendo-data-query/dist/npm/array.operators';

function useSortFilterPaging(
  defaultSortFilterPagingState: State = {},
  initialDataItems: any[],
  setDisplayedDataItems: Dispatch<SetStateAction<DataResult | undefined>>
): {
  sortFilterPagingState: State;
  setSortFilterPagingState: Dispatch<SetStateAction<State>>;
} {
  const [sortFilterPagingState, setSortFilterPagingState] = useState<State>(
    defaultSortFilterPagingState
  );

  useEffect(() => {
    setDisplayedDataItems(
      applySortFilterPaging<any>(initialDataItems, sortFilterPagingState)
    );
  }, [initialDataItems, setDisplayedDataItems, sortFilterPagingState]);

  return { sortFilterPagingState, setSortFilterPagingState };
}

export default useSortFilterPaging;
