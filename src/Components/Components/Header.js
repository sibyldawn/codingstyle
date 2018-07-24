import React, { Component } from 'react';
import Lottie from 'react-lottie';
import * as menuIcon from '../../menu.json';
import * as shoppingBag from '../../shopping.json';
import logo from '../../cslogo.png';
import style from './Header.css';


export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuIsStopped: true,
            bagIsStopped: true
        };
    }

    render() {

        const menuNav = {
            loop: false,
            autoplay: false,
            animationData: menuIcon,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        }

        const shop = {
            loop: false,
            autoplay: false,
            animationData: shoppingBag,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        }

        return (
            <div className="menu">
            <div className="icons" onClick={()=> this.setState({menuIsStopped: false })}>
             <Lottie options={menuNav}
                     height = {100}
                     width  = {100}
                     isStopped = {this.state.menuIsStopped}/>
             </div>

             <img src={ logo }/>
            
             <div className="icons" onClick={()=> this.setState({bagIsStopped: false })}>
             <Lottie options={shop}
                     height = {100}
                     width  = {100}
                     isStopped = {this.state.bagIsStopped}/>
             </div>


            </div>
        );
    }
}