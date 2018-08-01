import React, { Component } from 'react';
import Lottie from 'react-lottie';
import * as menuIcon from '../../menu.json';
import logo from '../../Assets/cslogo.png';
import style from './Header.css';
import bag from '../../Assets/bag.png';
import { Link } from 'react-router-dom';
import login from '../../Assets/login.png'
import ShoppingBag from '../Pages/ShoppingBag/ShoppingBag';


export default class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuIsStopped: true,
            showMenu: false,
        };
        this.login = this.login.bind(this);
    }

    login(){
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
   
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
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
        const { showBag } = this.state;

        return (
           <div className="header-wrap">
            <div className="menu">
            <nav>
            <div className="menu-nav" onClick={()=> this.setState({showMenu : !showMenu, menuIsStopped: false})}>
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

            <div className="logo">
            <Link to='/'><img src={ logo }/></Link>
            <Link to='/'><h2>coding style</h2></Link>
            </div>
             
           <div className="icon-wrap">
             <div className="login">
             <img src={login} onClick={this.login}/>
             </div>
             <div className="bag">
              <img src={bag}/>
             
             </div>
            </div>
          </div>
        </div>
        );
    }
}