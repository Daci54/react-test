import React from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import ProductGrid from './Components/ProductGrid/ProductGrid';

function App(): JSX.Element {
  return (
    <div className='app-container'>
      <ProductGrid />
    </div>
  );
}

export default App;
