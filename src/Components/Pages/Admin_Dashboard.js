import React, { Component } from 'react';
import main from '../../Assets/Main.png';
import './Pages.css';
import axios from 'axios';



export default class Home extends Component {
    constructor(){
        super();


        }
    


    render() {
       
        return (
            <div className="wrap"> 
             <h1>ADMIN PAGE!</h1>
            <div className="top">
                <img classname="large" src={ main }/>
            </div>
            <div className="body">
             <div className="products-board">PRODUCTS
          
             </div>
             <div className="orders-board">
             ORDERS
             
             </div>
            </div>
            </div>
        );
    }
}