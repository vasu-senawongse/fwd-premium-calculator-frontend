import React, { useState } from 'react';
import './App.css';
import CalPremiumTable from './CalPremiumTable';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { addTodo } from './store/calPremium/actions';
import axios from 'axios';

var DatePicker = require('reactstrap-date-picker');
const Todo = () => {
  const [model, setTodoMessage] = useState({
    name: '',
    genderCd: '',
    dob: new Date().toISOString(),
    planCode: '',
    saPerYear: 0,
    paymentFrequency: '',
    baseAnnualPremium: 0,
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
        todo.baseAnnualPremium = temp.baseAnnualPremium;
        handeOnChange({ baseAnnualPremium: temp.baseAnnualPremium });
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
          <Label for='PM-name'>Name</Label>
          <Input
            type='text'
            name='PM-name'
            id='PM-name'
            placeholder='Your name ...'
            value={model.name}
            onChange={(e) => handeOnChange({ name: e.target.value })}
            required
          />{' '}
        </FormGroup>
        <FormGroup>
          <Label for='PM-genderCd'>Gender</Label>
          <Input
            type='select'
            name='PM-genderCd'
            id='PM-genderCd'
            value={model.genderCd}
            required
            onChange={(e) => handeOnChange({ genderCd: e.target.value })}
          >
            <option id='PM-genderCd-dafault' value=''>
              -- SELECT GENDER --
            </option>
            <option id='PM-genderCd-Male' value='MALE'>
              MALE
            </option>
            <option id='PM-genderCd-Female' value='FEMALE'>
              FEMALE
            </option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for='PM-dob'>Date of Birth</Label>
          <DatePicker
            id='PM-dob'
            name='PM-dob'
            value={model.dob}
            dateFormat='DD/MM/YYYY'
            required
            onChange={(e: any) => handeOnChange({ dob: e })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='PM-planCode'>Plan</Label>
          <Input
            type='select'
            name='PM-planCode'
            id='PM-planCode'
            value={model.planCode}
            required
            onChange={(e) => handeOnChange({ planCode: e.target.value })}
          >
            <option value=''>-- SELECT PLAN --</option>
            <option id='PM-T11A20' value='T11A20'>
              package 1 (benefit 200k)
            </option>
            <option id='PM-T11A50' value='T11A50'>
              package 2 (benefit 500k)
            </option>
            <option id='PM-T11AM1' value='T11AM1'>
              package 3 (benefit 1M)
            </option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for='PM-saPerYear'>Sa / Year</Label>
          <Input
            type='number'
            name='PM-saPerYear'
            id='PM-saPerYear'
            placeholder='Sum Assured/Year ...'
            value={model.saPerYear}
            required
            onChange={(e) => handeOnChange({ saPerYear: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Label for='PM-paymentFrequency'>Payment Frequency</Label>
          <Input
            type='select'
            name='PM-paymentFrequency'
            id='PM-paymentFrequency'
            value={model.paymentFrequency}
            required
            onChange={(e) =>
              handeOnChange({ paymentFrequency: e.target.value })
            }
          >
            <option id='PM-paymentFrequency-default' value=''>
              -- SELECT PAYMENT FREQUENCY --
            </option>
            <option id='PM-paymentFrequency-YEARLY' value='YEARLY'>
              YEARLY
            </option>
            <option id='PM-paymentFrequency-HALFYEARLY' value='HALFYEARLY'>
              HALFYEARLY
            </option>
            <option id='PM-paymentFrequency-QUARTERLY' value='QUARTERLY'>
              QUARTERLY
            </option>
            <option id='PM-paymentFrequency-MONTHLY' value='MONTHLY'>
              MONTHLY
            </option>
          </Input>
        </FormGroup>

        <Button
          id='PM-submit'
          color='success'
          disabled={
            model.name == '' ||
            model.genderCd == '' ||
            model.dob == null ||
            model.saPerYear == 0 ||
            model.planCode == '' ||
            model.paymentFrequency == ''
          }
          onClick={() => handleButtonClick()}
        >
          Submit
        </Button>

        <FormGroup>
          <Label for='PM-baseAnnualPremium'>Annual Premium</Label>
          <Input
            type='text'
            id='PM-baseAnnualPremium'
            name='PM-baseAnnualPremium'
            disabled={true}
            value={model.baseAnnualPremium}
          />{' '}
        </FormGroup>
      </Form>
      <CalPremiumTable />
    </div>
  );
};

export default Todo;
