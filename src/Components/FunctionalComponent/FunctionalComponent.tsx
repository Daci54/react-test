import React, { useState } from 'react';

interface FuncCompProps {
  firstname: string;
  lastname: string;
}

export function FunctionalComponent(props: FuncCompProps): JSX.Element {
  const { firstname, lastname } = props;
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <h1>
        Hi {firstname} {lastname}
      </h1>
      <button
        onClick={() => setCount((previousCount: number) => previousCount + 1)}
      >
        Increment
      </button>
      <h1>{count}</h1>
    </div>
  );
}
