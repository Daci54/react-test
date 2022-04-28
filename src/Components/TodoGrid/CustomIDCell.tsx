import React from 'react';
import { GridCellProps, GridRowClickEvent } from '@progress/kendo-react-grid';

interface CustomCellProps {
  gridCellProps: GridCellProps;
  onRowClicked: (event: GridRowClickEvent) => void;
}

function CustomIDCell(props: any): JSX.Element {
  // const someValue: any;
  console.log(props);
  return (
    <td onClick={() => props.onRowClicked(props)}>
      <div>
        <div>bla</div>
        <div>{props.dataItem.id}</div>
      </div>
    </td>
  );
}

export default CustomIDCell;
