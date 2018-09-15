import React, { Component } from 'react';
import './Pages.css';

import HomeCategory from '../Components/HomeCategory';
import gif from '../../Assets/coder.gif';


export default class Home extends Component {
   
    
    render() {
        
        return (
            <div className="wrap"> 
            <div className="top">
            <div className="gif">
            <img src={gif} id="img-gif" alt="Girl"/>
            </div>
            </div>
            <div className="body">
               <HomeCategory/>
             </div>
            </div>
        );
    }
}