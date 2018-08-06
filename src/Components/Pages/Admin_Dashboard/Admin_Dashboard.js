import React, { Component } from 'react';
import './Admin_Dashboard.css';
import { Link, Switch, Route } from 'react-router-dom';
import Products from '../../Components/Products';
import Orders from '../../Components/Orders';
import Add_Form from '../../Components/Add_Form'; 


export default class AdminDashboard extends Component {
    constructor(){
        super();

        this.openPage=this.openPage.bind(this);
    }
    
   

    render() {
        return (
        <div className="dashboard">  
         <Add_Form/>
         <Products/>
         <Orders/>
        
        </div>
        )
    }
}