import React, { Component } from 'react';
import main from '../../Assets/Main.png';
import './Pages.css';
import axios from 'axios';
import Men from './Men';
import Women from './Women';


export default class Home extends Component {
    constructor(){
        super();


        }
    


    render() {
        
        return (
            <div className="wrap"> 
             <h1>THIS IS HOME!</h1>
            <div className="top">
                <img className="large" src={ main }/>
            </div>
            <div className="body">
             <div className="home">
             <h3>MEN'S COLLECTION</h3>
             <Men path={window.location.pathname}/>
             </div>
             <div className="home">
             <h3>WOMEN'S COLLECTION</h3>
             <Women/>
             </div>
            </div>
            </div>
        );
    }
}