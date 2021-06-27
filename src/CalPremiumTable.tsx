import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPmState } from './store/calPremium/selectors';
import { deleteTodo } from './store/calPremium/actions';
const TodoTable = () => {
  const models = useSelector(getPmState);
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
            <th>Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>planCode</th>
            <th>Sum Assured / Year</th>
            <th>Payment Frequency</th>
            <th>Base Annual Premium</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model, key) => {
            return (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{model.name}</td>
                <td>{model.genderCd}</td>
                <td>{model.dob}</td>
                <td>{model.planCode}</td>
                <td>{model.saPerYear}</td>
                <td>{model.paymentFrequency}</td>
                <td>{model.baseAnnualPremium}</td>
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
