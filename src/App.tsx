import React from 'react';
import './App.css';
import { Counter } from './Components/Counter/Counter';

function App(): JSX.Element {
  return (
    <div className='App'>
      <div>this is in app</div>
      <Counter />
    </div>
  );
}

export default App;
