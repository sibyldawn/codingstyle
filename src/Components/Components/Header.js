import React, { Component } from 'react';
import Lottie from 'react-lottie';
import * as menuIcon from '../../menu.json';
import logo from '../../Assets/cslogo.png';
import style from './Header.css';
import bag from '../../Assets/bag.png';
import { Link } from 'react-router-dom';
import login from '../../Assets/login.png'


export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuIsStopped: true,
            showMenu: false,
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

        const { showMenu } = this.state;

        return (
           
            <div className="menu">
            <nav>
            <div className="icons" onClick={()=> this.setState({showMenu : !showMenu, menuIsStopped: false})}>
             <Lottie options={menuNav}
                     height = {100}
                     width  = {100}
                     isStopped = {this.state.menuIsStopped}/>
              
             </div>
            </nav>
            
            <div className={ showMenu ? "drawer open": "drawer"}>
                <Link to="/Men"> Men's Collection </Link>
                <Link to="/Women">Women's Collection</Link>
            </div>


             <img className="logo" src={ logo }/>
           <div className="icon-wrap">
             <div className="icons">
             <img src={login}/>
             </div>
             <div className="bag" onClick={console.log('go to cart')}>
             <Link to="/ShoppingBag"><img src={bag}/></Link>
             </div>
            </div>
            


            </div>
        );
    }
}