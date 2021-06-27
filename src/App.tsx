import React, { useState } from 'react';
import './App.css';
import CalSumAssured from './CalSumAssured';
import CalPremium from './CalPremium';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import logo from './logo.png';
import classnames from 'classnames';

const App = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab: string) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />

        <Nav tabs>
          <NavItem>
            <NavLink
              id='tab1'
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
              id='tab2'
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
            <CalSumAssured />
          </TabPane>
          <TabPane tabId='2'>
            <CalPremium />
          </TabPane>
        </TabContent>
      </header>
    </div>
  );
};

export default App;
