import React, { Component } from 'react';
import main from '../../Assets/Main.png';
import './Pages.css';
import axios from 'axios';
import HomeCategory from '../Components/HomeCategory';
import gif from '../../Assets/coder.gif';


export default class Home extends Component {
    constructor(){
        super();


        }
    
    render() {
        const style = {
            background: 'black',
            width:'100%',
            height:0,
            paddingBottom:'62%',
            position:'relative',
            overflow: 'hidden',
        }
        
        return (
            <div className="wrap"> 
            <div className="top">
            <div className="gif">
            <img src={gif} id="img-gif"/>
            {/* <iframe src="https://giphy.com/embed/BWnTWj5IBdRQOWVsAN" width="1000" height="850" frameBorder="0" margin="auto"></iframe> */}
            </div>
            </div>
            <div className="body">
               <HomeCategory/>
             </div>
            </div>
        );
    }
}