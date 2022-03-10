import { Dispatch, SetStateAction } from 'react';

export interface RequestState<T> {
  loading: boolean;
  error?: Error;
  fetchedData?: T;
  setFetchedData: Dispatch<SetStateAction<T | undefined>>;
}
