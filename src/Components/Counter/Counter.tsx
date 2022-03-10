import React, { useEffect, useState } from 'react';

export function Counter(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  function doSomething(): void {
    setCount(count + 1);
  }

  useEffect(() => {
    console.log('in useEffect');
    // console.log(count);
  });

  return (
    <div>
      <button onClick={doSomething}>Increment</button>
      <h2>The count is {count}</h2>
    </div>
  );
}
