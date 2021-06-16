import React from 'react';
import logo from './logo.png';
import './App.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import * as R from 'ramda';

import axios from 'axios';
var DatePicker = require('reactstrap-date-picker');
interface IModel {
  name: string;
  dob: string;
  planCode: string;
  premiumPerYear: number;
  paymentFrequency: string;
  saPerYear: number;
}
interface IResponse {
  benefitTable: Array<Object>;
  deathBenefitList: Array<Object>;
  dividendBenefitList: Array<Object>;
  modalRatesList: Array<Object>;
  otherBenefitList: Array<Object>;
  quotationProductList: Array<Object>;
  survivalBenefitList: Array<Object>;
}

class App extends React.Component<
  any,
  {
    model: IModel;
    response: IResponse;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      model: {
        name: '',
        dob: new Date().toISOString(),
        planCode: '',
        premiumPerYear: 0,
        paymentFrequency: '',
        saPerYear: 0,
      },
      response: {
        benefitTable: [],
        deathBenefitList: [],
        dividendBenefitList: [],
        modalRatesList: [],
        otherBenefitList: [],
        quotationProductList: [],
        survivalBenefitList: [],
      },
    };
  }

  public submit() {
    axios
      .post('http://localhost:3000/get-product', this.state.model)
      .then((response) => {
        this.setState({ response: response.data });
        console.log('response: ', this.state.response);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  public onValueChanged(value: any) {
    if (value == null) {
      return;
    }
    let model = this.state.model;
    model = R.merge(model, value);
    this.setState({ model });
  }

  public render() {
    const { name, dob, planCode, premiumPerYear, paymentFrequency, saPerYear } =
      this.state.model;
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <Form>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='Your name ...'
                value={name}
                onChange={(e) => this.onValueChanged({ name: e.target.value })}
              />{' '}
            </FormGroup>
            <FormGroup>
              <Label for='dob'>Date of Birth</Label>
              <DatePicker
                id='dob'
                name='dob'
                value={dob}
                onChange={(e: any) => this.onValueChanged({ dob: e })}
              />
            </FormGroup>
            <FormGroup>
              <Label for='planCode'>Plan</Label>
              <Input
                type='select'
                name='planCode'
                id='planCode'
                value={planCode}
                onChange={(e) =>
                  this.onValueChanged({ planCode: e.target.value })
                }
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
                value={premiumPerYear}
                onChange={(e) =>
                  this.onValueChanged({ premiumPerYear: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for='paymentFrequency'>Payment Frequency</Label>
              <Input
                type='select'
                name='paymentFrequency'
                id='paymentFrequency'
                value={paymentFrequency}
                onChange={(e) =>
                  this.onValueChanged({ paymentFrequency: e.target.value })
                }
              >
                <option value=''>-- SELECT PAYMENT FREQUENCY --</option>
                <option value='YEARLY'>YEARLY</option>
                <option value='HALFYEARLY'>HALFYEARLY</option>
                <option value='QUARTERLY'>QUARTERLY</option>
                <option value='MONTHLY'>MONTHLY</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for='saPerYear'>Sa / Year</Label>
              <Input
                type='number'
                name='saPerYear'
                id='saPerYear'
                placeholder='Sa/Year ...'
                value={saPerYear}
                onChange={(e) =>
                  this.onValueChanged({ saPerYear: e.target.value })
                }
              />
            </FormGroup>
            <Button color='success' onClick={() => this.submit()}>
              Submit
            </Button>
          </Form>
        </header>
      </div>
    );
  }
}

export default App;
