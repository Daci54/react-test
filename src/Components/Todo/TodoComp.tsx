import React, { memo } from 'react';
import { Todo } from '../../Models/Todo';
import './TodoComp.css';

interface TodoProps {
  todo: Todo;
  onCheckedChange: (todoId: number) => void;
}

function TodoComp({ todo, onCheckedChange }: TodoProps): JSX.Element {
  console.log('todo rendered');

  return (
    <label>
      <div className={`todo-container ${todo.completed ? 'checked' : ''}`}>
        <div className={'todo-id'}>{todo.id}</div>
        <div className={'todo-other-container'}>
          <div>Title:</div>
          <div>{todo.title}</div>
          <div>Completed:</div>
          <input
            type='checkbox'
            hidden={true}
            checked={todo.completed}
            onChange={() => {
              onCheckedChange(todo.id);
            }}
          />
        </div>
      </div>
    </label>
  );
}

export default memo(TodoComp);
