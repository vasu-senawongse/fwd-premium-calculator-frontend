import React, { useState } from 'react';
import logo from './logo.png';
import './App.css';
import classnames from 'classnames';
import {
  TabContent,
  TabPane,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { addTodo } from './store/calculator/actions';
import * as R from 'ramda';
import axios from 'axios';

var DatePicker = require('reactstrap-date-picker');
const Todo = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const [model, setTodoMessage] = useState({
    name: '',
    genderCd: '',
    dob: new Date().toISOString(),
    planCode: '',
    premiumPerYear: 0,
    paymentFrequency: '',
    saPerYear: 0,
  });

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    const todo = model;
    console.log(model);
    dispatch(addTodo(todo));
  };

  const handeOnChange = (event: any) => {
    setTodoMessage({
      ...model,
      ...event,
    });
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />

        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => {
                toggle('1');
              }}
            >
              Calc SA
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => {
                toggle('2');
              }}
            >
              Calc Premium
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId='1'>
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
                  onChange={(e) =>
                    handeOnChange({ premiumPerYear: e.target.value })
                  }
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

              {/* <FormGroup>
                <Label for='baseAnnualPremium'>Sum Assured</Label>
                <Input
                  type='text'
                  disabled={true}
                  value={model.baseSumAssured}
                />{' '}
              </FormGroup> */}
            </Form>
          </TabPane>
        </TabContent>
      </header>
    </div>
  );
};

export default Todo;
