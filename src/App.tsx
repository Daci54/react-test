import React from 'react';
import './App.css';
import { TodoList } from './Components/TodoList/TodoList';

function App(): JSX.Element {
  return (
    <div className='app-container'>
      <h1>In App</h1>
      <TodoList />
    </div>
  );
}

export default App;
