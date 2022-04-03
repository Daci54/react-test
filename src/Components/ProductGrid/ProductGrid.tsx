import React, { useState } from 'react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import productsJson from '../../DummyData/products.json';
import { Product } from '../../Models/Product';

function ProductGrid(): JSX.Element {
  const [products] = useState<Product[]>(productsJson);

  return (
    <Grid style={{ height: '400px' }} data={products}>
      <GridColumn field='ProductID' title='ID' width='40px' />
      <GridColumn field='ProductName' title='Name' width='250px' />
      <GridColumn field='Category.CategoryName' title='CategoryName' />
      <GridColumn field='UnitPrice' title='Price' />
      <GridColumn field='UnitsInStock' title='In stock' />
    </Grid>
  );
}

export default ProductGrid;
