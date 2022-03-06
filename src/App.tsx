import React from 'react';
import './App.css';
import { Counter } from './Components/Counter/Counter';

function App(): JSX.Element {
  return (
    <div className='app-container'>
      <Counter />
    </div>
  );
}

export default App;
