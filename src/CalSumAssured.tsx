import React, { useState } from 'react';
import './App.css';
import CalSumAssuredTable from './CalSumAssuredTable';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { addTodo } from './store/calSumAssured/actions';
import axios from 'axios';

var DatePicker = require('reactstrap-date-picker');
const Todo = () => {
  const [model, setTodoMessage] = useState({
    name: '',
    genderCd: '',
    dob: new Date().toISOString(),
    planCode: '',
    premiumPerYear: 0,
    paymentFrequency: '',
    baseSumAssured: 0,
  });

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    var todo = model;
    axios
      .post('http://localhost:5000/get-product', model)
      .then((response) => {
        const temp = response.data.quotationProductList
          ? response.data.quotationProductList[0]
          : null;
        todo.baseSumAssured = temp.baseSumAssured;
        handeOnChange({ baseSumAssured: temp.baseSumAssured });
        dispatch(addTodo(todo));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handeOnChange = (event: any) => {
    setTodoMessage({
      ...model,
      ...event,
    });
  };

  return (
    <div>
      <Form>
        <FormGroup>
          <Label for='name'>Name</Label>
          <Input
            type='text'
            name='name'
            id='name'
            placeholder='Your name ...'
            value={model.name}
            onChange={(e) => handeOnChange({ name: e.target.value })}
          />{' '}
        </FormGroup>
        <FormGroup>
          <Label for='genderCd'>Gender</Label>
          <Input
            type='select'
            name='genderCd'
            id='genderCd'
            value={model.genderCd}
            onChange={(e) => handeOnChange({ genderCd: e.target.value })}
          >
            <option value=''>-- SELECT GENDER --</option>
            <option value='MALE'>MALE</option>
            <option value='FEMALE'>FEMALE</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for='dob'>Date of Birth</Label>
          <DatePicker
            id='dob'
            name='dob'
            value={model.dob}
            dateFormat='DD/MM/YYYY'
            onChange={(e: any) => handeOnChange({ dob: e })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='planCode'>Plan</Label>
          <Input
            type='select'
            name='planCode'
            id='planCode'
            value={model.planCode}
            onChange={(e) => handeOnChange({ planCode: e.target.value })}
          >
            <option value=''>-- SELECT PLAN --</option>
            <option value='T11A20'>package 1 (benefit 200k)</option>
            <option value='T11A50'>package 2 (benefit 500k)</option>
            <option value='T11AM1'>package 3 (benefit 1M)</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for='premiumPerYear'>Premium / Year</Label>
          <Input
            type='number'
            name='premiumPerYear'
            id='premiumPerYear'
            placeholder='Premium/Year ...'
            value={model.premiumPerYear}
            onChange={(e) => handeOnChange({ premiumPerYear: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='paymentFrequency'>Payment Frequency</Label>
          <Input
            type='select'
            name='paymentFrequency'
            id='paymentFrequency'
            value={model.paymentFrequency}
            onChange={(e) =>
              handeOnChange({ paymentFrequency: e.target.value })
            }
          >
            <option value=''>-- SELECT PAYMENT FREQUENCY --</option>
            <option value='YEARLY'>YEARLY</option>
            <option value='HALFYEARLY'>HALFYEARLY</option>
            <option value='QUARTERLY'>QUARTERLY</option>
            <option value='MONTHLY'>MONTHLY</option>
          </Input>
        </FormGroup>

        <Button color='success' onClick={() => handleButtonClick()}>
          Submit
        </Button>

        <FormGroup>
          <Label for='baseSumAssured'>Sum Assured</Label>
          <Input
            type='text'
            disabled={true}
            value={model.baseSumAssured}
          />{' '}
        </FormGroup>
      </Form>
      <CalSumAssuredTable />
    </div>
  );
};

export default Todo;
