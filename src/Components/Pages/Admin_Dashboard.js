import React, { Component } from 'react';
import {Tabs,Tab} from 'react-bootstrap';
import './Admin_Dashboard.css';
import Products from '../Components/Products';
import Orders from '../Components/Orders';
import Add_Form from '../Components/Add_Form';

export default class AdminDashboard extends Component {
    render() {
        return (
        <div className="dashboard">    
        <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
        <Tab eventKey={1} title="Tab 1">
          <Products/>
        </Tab>
        <Tab eventKey={2} title="Tab 2">
          <Orders/>
        </Tab>
        <Tab eventKey={3} title="Tab 3" >
          <Add_Form/>
        </Tab>
      </Tabs>
      </div>
        )
    }
}