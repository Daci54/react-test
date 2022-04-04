import React from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import TodoGrid from './Components/TodoGrid/TodoGrid';

function App(): JSX.Element {
  return (
    <div className='app-container'>
      <TodoGrid />
    </div>
  );
}

export default App;
