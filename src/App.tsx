import React, { useState } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import ProductGrid from './Components/ProductGrid/ProductGrid';

function App(): JSX.Element {
  const [count, setCounter] = useState(0);

  return (
    <div className='app-container'>
      <h1>In App</h1>
      <button onClick={() => setCounter((prevCount) => prevCount + 1)}>
        Increase counter
      </button>
      <h2>{count}</h2>
      <ProductGrid />
    </div>
  );
}

export default App;
