import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodoState } from './store/calculator/selectors';
import { deleteTodo } from './store/calculator/actions';
const TodoTable = () => {
  const todos = useSelector(getTodoState);
  const dispatch = useDispatch();
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const index = +event.currentTarget.value;
    dispatch(deleteTodo(index));
  };
  return (
    <div className='container'>
      <table className='table is-fullwidth is-hoverable'>
        <thead>
          <tr>
            <th>#</th>
            <th>Todo</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, key) => {
            return (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{todo.name}</td>
                <td>
                  <button
                    className='button is-danger'
                    value={key}
                    onClick={handleClick}
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TodoTable;
