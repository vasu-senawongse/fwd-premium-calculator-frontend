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
          <Label for='SA-name'>Name</Label>
          <Input
            type='text'
            name='SA-name'
            id='SA-name'
            placeholder='Your name ...'
            value={model.name}
            required
            onChange={(e) => handeOnChange({ name: e.target.value })}
          />{' '}
        </FormGroup>
        <FormGroup>
          <Label for='SA-genderCd'>Gender</Label>
          <Input
            type='select'
            name='SA-genderCd'
            id='SA-genderCd'
            required
            value={model.genderCd}
            onChange={(e) => handeOnChange({ genderCd: e.target.value })}
          >
            <option value=''>-- SELECT GENDER --</option>
            <option id='SA-genderCd-Male' value='MALE'>
              MALE
            </option>
            <option id='SA-genderCd-Female' value='FEMALE'>
              FEMALE
            </option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for='dob'>Date of Birth</Label>
          <DatePicker
            id='SA-dob'
            name='SA-dob'
            value={model.dob}
            required
            dateFormat='DD/MM/YYYY'
            onChange={(e: any) => handeOnChange({ dob: e })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='SA-planCode'>Plan</Label>
          <Input
            type='select'
            name='SA-planCode'
            id='SA-planCode'
            required
            value={model.planCode}
            onChange={(e) => handeOnChange({ planCode: e.target.value })}
          >
            <option value=''>-- SELECT PLAN --</option>
            <option id='SA-T11A20' value='T11A20'>
              package 1 (benefit 200k)
            </option>
            <option id='SA-T11A50' value='T11A50'>
              package 2 (benefit 500k)
            </option>
            <option id='SA-T11AM1' value='T11AM1'>
              package 3 (benefit 1M)
            </option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for='SA-premiumPerYear'>Premium / Year</Label>
          <Input
            type='number'
            name='SA-premiumPerYear'
            id='SA-premiumPerYear'
            required
            placeholder='Premium/Year ...'
            value={model.premiumPerYear}
            onChange={(e) => handeOnChange({ premiumPerYear: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='SA-paymentFrequency'>Payment Frequency</Label>
          <Input
            type='select'
            name='SA-paymentFrequency'
            id='SA-paymentFrequency'
            value={model.paymentFrequency}
            required
            onChange={(e) =>
              handeOnChange({ paymentFrequency: e.target.value })
            }
          >
            <option value=''>-- SELECT PAYMENT FREQUENCY --</option>
            <option id='SA-paymentFrequency-YEARLY' value='YEARLY'>
              YEARLY
            </option>
            <option id='SA-paymentFrequency-HALFYEARLY' value='HALFYEARLY'>
              HALFYEARLY
            </option>
            <option id='SA-paymentFrequency-QUARTERLY' value='QUARTERLY'>
              QUARTERLY
            </option>
            <option id='SA-paymentFrequency-MONTHLY' value='MONTHLY'>
              MONTHLY
            </option>
          </Input>
        </FormGroup>

        <Button
          id='SA-submit'
          color='success'
          disabled={
            model.name == '' ||
            model.genderCd == '' ||
            model.dob == null ||
            model.premiumPerYear == 0 ||
            model.planCode == '' ||
            model.paymentFrequency == ''
          }
          onClick={() => handleButtonClick()}
        >
          Submit
        </Button>

        <FormGroup>
          <Label for='SA-baseSumAssured'>Sum Assured</Label>
          <Input
            id='SA-baseSumAssured'
            name='SA-baseSumAssured'
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
