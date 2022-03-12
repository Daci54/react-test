import React, { useState } from 'react';
import './App.css';
import TodoList from './Components/TodoList/TodoList';

function App(): JSX.Element {
  const [count, setCounter] = useState(0);

  return (
    <div className='app-container'>
      <h1>In App</h1>
      <button onClick={() => setCounter((prevCount) => prevCount + 1)}>
        Increase counter
      </button>
      <h2>{count}</h2>
      <TodoList />
    </div>
  );
}

export default App;
