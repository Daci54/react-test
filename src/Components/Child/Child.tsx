import React from 'react';
import './Child.css';
import { Grandchild } from '../Grandchild/Grandchild';

interface ChildProps {
  doStuffInParent: (bla: string) => void;
}

export class Child extends React.Component<ChildProps, any> {
  constructor(props: any) {
    super(props);
  }

  doStuffInChild(e: React.MouseEvent<HTMLButtonElement>): void {
    console.log(e.currentTarget.name);
    this.props.doStuffInParent('bla');
  }

  render(): JSX.Element {
    return (
      <div className='child-wrapper'>
        <h2>This is in child</h2>
        <button
          name={'name_of_button'}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            this.doStuffInChild(e)
          }
        >
          Child Button
        </button>
        <Grandchild />
      </div>
    );
  }
}
