import React, { Component } from 'react';
import main from '../../Assets/Main.png';
import style from './Pages.css';




export default class Home extends Component {
    render() {
        return (
            <div className="wrap"> 
             <h1>THIS IS HOME!</h1>
            <div className="top">
                <img classname="large" src={ main }/>
            </div>
            <div className="body">
             <div className="men">MEN'S COLLECTION
             </div>
             <div className="women">
             WOMEN'S COLLECTION
             </div>
            </div>
            </div>
        );
    }
}