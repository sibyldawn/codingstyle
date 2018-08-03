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
            <div className="top">
                <img className="large" src={ main }/>
            </div>
            <div className="body">
               
             </div>
            </div>
        );
    }
}