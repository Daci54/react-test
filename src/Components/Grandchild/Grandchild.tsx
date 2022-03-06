import React from 'react';
import './Grandchild.css';

export class Grandchild extends React.Component<any, any> {
  render(): JSX.Element {
    return (
      <div className='grandchild-wrapper'>
        <h3>This is in grandchild</h3>
      </div>
    );
  }
}
