import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CreateModel from './CreateModel';
import Table from './Table';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import configureStore from './store';
const store = configureStore();
const Root = () => (
  <Provider store={store}>
    <CreateModel />
    <Table />
  </Provider>
);
ReactDOM.render(<Root />, document.getElementById('root') as HTMLElement);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
