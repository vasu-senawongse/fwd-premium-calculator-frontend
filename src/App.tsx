import React from 'react';
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
import * as R from 'ramda';

import axios from 'axios';
var DatePicker = require('reactstrap-date-picker');
interface IModel {
  name: string;
  genderCd: string;
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
  quotationProductList: Array<any>;
  survivalBenefitList: Array<Object>;
}

class App extends React.Component<
  any,
  {
    model: IModel;
    response: IResponse;
    activeTab: string;
    baseAnnualPremium: any;
    baseSumAssured: any;
  }
> {
  constructor(props: any) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
      baseAnnualPremium: 0,
      baseSumAssured: 0,
      model: {
        name: '',
        genderCd: '',
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
  toggle(tab: string) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        baseAnnualPremium: 0,
        baseSumAssured: 0,
        model: {
          name: '',
          genderCd: '',
          dob: new Date().toISOString(),
          planCode: '',
          premiumPerYear: 0,
          paymentFrequency: '',
          saPerYear: 0,
        },
      });
    }
  }
  public submit() {
    axios
      .post('http://localhost:5000/get-product', this.state.model)
      .then((response) => {
        this.setState({ response: response.data });
        const temp = this.state.response.quotationProductList
          ? this.state.response.quotationProductList[0]
          : null;
        this.setState({ baseAnnualPremium: temp.baseAnnualPremium });
        this.setState({ baseSumAssured: temp.baseSumAssured });
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
    const {
      name,
      genderCd,
      dob,
      planCode,
      premiumPerYear,
      paymentFrequency,
      saPerYear,
    } = this.state.model;
    const { activeTab, baseAnnualPremium, baseSumAssured } = this.state;

    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />

          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => {
                  this.toggle('1');
                }}
              >
                Calc SA
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => {
                  this.toggle('2');
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
                    value={name}
                    onChange={(e) =>
                      this.onValueChanged({ name: e.target.value })
                    }
                  />{' '}
                </FormGroup>
                <FormGroup>
                  <Label for='genderCd'>Gender</Label>
                  <Input
                    type='select'
                    name='genderCd'
                    id='genderCd'
                    value={genderCd}
                    onChange={(e) =>
                      this.onValueChanged({ genderCd: e.target.value })
                    }
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

                <Button color='success' onClick={() => this.submit()}>
                  Submit
                </Button>

                <FormGroup>
                  <Label for='baseAnnualPremium'>Sum Assured</Label>
                  <Input
                    type='text'
                    disabled={true}
                    value={baseSumAssured}
                  />{' '}
                </FormGroup>
              </Form>
            </TabPane>
            <TabPane tabId='2'>
              <Form>
                <FormGroup>
                  <Label for='name'>Name</Label>
                  <Input
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Your name ...'
                    value={name}
                    onChange={(e) =>
                      this.onValueChanged({ name: e.target.value })
                    }
                  />{' '}
                </FormGroup>
                <FormGroup>
                  <Label for='genderCd'>Gender</Label>
                  <Input
                    type='select'
                    name='genderCd'
                    id='genderCd'
                    value={genderCd}
                    onChange={(e) =>
                      this.onValueChanged({ genderCd: e.target.value })
                    }
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

                <FormGroup>
                  <Label for='baseAnnualPremium'>
                    Premium Per {paymentFrequency}
                  </Label>
                  <Input
                    type='text'
                    disabled={true}
                    value={baseAnnualPremium}
                  />{' '}
                </FormGroup>
              </Form>
            </TabPane>
          </TabContent>
        </header>
      </div>
    );
  }
}

export default App;
