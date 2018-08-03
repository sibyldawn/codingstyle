import React, { Component } from 'react';
import './Admin_Dashboard.css';
import { Link, Switch, Route } from 'react-router-dom';
import Products from '../../Components/Products';
import Orders from '../../Components/Orders';
import Add_Form from '../../Components/Add_Form';
import { Tab, Tabs } from 'react-bootstrap';

export default class AdminDashboard extends Component {
    render() {
        return (
        <div className="dashboard">   
         <div className="nav-flex">
         <div className="add-form"><Add_Form/></div>
         <div className="products-board"><Products/></div>
         <div className="orders-board"><Orders/></div>
         </div>
        </div>
        )
    }
}