import React, { useState } from 'react';

// interface CounterState {
//   count: number;
//   posts: Post[];
// }

// function   incrementCount(increment: number): void {
//   this.setState((counterState: CounterState) => {
//     return { count: counterState.count + increment };
//   });
// }

export function Counter(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  function doSomething(event: any): void {
    console.log(event);
    setCount(count + 1);
  }

  console.log('counter rendered');

  return (
    <div>
      <button onClick={doSomething}>Increment</button>
      <h2>The count is {count}</h2>
    </div>
  );
}
