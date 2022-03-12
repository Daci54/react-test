import { DependencyList, useEffect, useState } from 'react';
import { RequestState } from '../Models/RequestState';

export default function useFetchCustom<T = unknown>(
  url?: string,
  deps: DependencyList = []
): RequestState<T> {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | undefined>();
  const [fetchedData, setFetchedData] = useState<T | undefined>();
  const requestInit: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
    console.log('MOUNTED');
    const fetchData = async (): Promise<any> => {
      if (!url) {
        setLoading(false);
        return;
      }

      try {
        const response: Response = await fetch(url, requestInit);
        if (!response.ok) {
          const error: Error = new Error(response.statusText);
          const errorCause: string = await response.json();
          error.cause = new Error(errorCause);
          throw error;
        }
        const json = (await response.json()) as T;
        setFetchedData(json);
      } catch (err) {
        const error: Error = err as Error;
        console.error(error.message);
        console.error(error.cause);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
    return () => {
      console.log('UNMOUNTED');
    };
  }, deps);

  return { loading, error, fetchedData, setFetchedData };
}
