import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import CalSumAssured from './CalSumAssured';
import CalPremium from './CalPremium';
import { Provider } from 'react-redux';
import configureStore from './store';
describe('App', () => {
  let store: any;
  beforeEach(() => {
    store = configureStore();
  });

  test('Should renders the Calc SA', () => {
    const component = shallow(<App />);
    expect(component.contains(<CalSumAssured />)).toBe(true);
  });

  test('Should renders the Calc Premium', () => {
    const component = shallow(<App />);
    expect(component.contains(<CalPremium />)).toBe(true);
  });

  test('Should renders Calc SA Tab', () => {
    const component = shallow(<App />);
    expect(component.find('#tab1').exists()).toBe(true);
  });

  test('Should renders Calc Premium Tab', () => {
    const component = shallow(<App />);
    expect(component.find('#tab2').exists()).toBe(true);
  });
});
