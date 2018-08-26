import React, { Component } from 'react';
import Lottie from 'react-lottie';
import * as menuIcon from '../../../Assets/menu.json';
import logo from '../../../Assets/cslogo.png';
import style from './Header.css';
import bag from '../../../Assets/bag.png';
import { Link } from 'react-router-dom';
import login from '../../../Assets/login.png';
import axios from 'axios';
import ShoppingBag from '../../Pages/ShoppingBag/ShoppingBag';
import {connect} from 'react-redux';
import admin from '../../../Assets/gearIcon.png';
import {updateNotAdmin, updateAdmin, setCart, updateUser, updateLogin, updateUserImage} from '../../../ducks/reducer';



class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuIsStopped: false,
            showMenu: false,
            showBag: false,
            isAdmin:'',
            user_img:'',
        };
        this.login = this.login.bind(this);
       
    }

    componentDidMount(){
        axios.get('/api/user/session').then(user => {
            this.setState({
                isAdmin: user.data.admin
            })
            console.log("++++LOG IN USER++++",user.data)
            console.log("Is Admin?",this.state.isAdmin)
            localStorage.setItem('user', JSON.stringify(user.data))}
            
        )}



    login(){
        localStorage.setItem('location', window.location.pathname)
        const local = localStorage.getItem('location')
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
   
        window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
      
    }

   

   

    render() {

        const menuNav = {
            loop: true,
            autoplay: true,
            animationData: menuIcon,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        }

        const { showMenu } = this.state;
        const { showBag } = this.state;
        console.log(showBag)
        return (
           <div className="header-wrap">
            <div className="menu">
            <nav>
            <div className="menu-nav" onClick={()=> this.setState({showMenu : !showMenu, menuIsStopped: true})}>
             <Lottie options={menuNav}
                     height = {50}
                     width  = {50}
                     isStopped = {false}/>
              
             </div>
            </nav>
            
            <div className={ showMenu ? "drawer open": "drawer"}>
                <br/>
                <Link to="/Men"> Men's Collection </Link>
                <br/>
                <Link to="/Women">Women's Collection</Link>
                
            </div>
            

             <div className="adminIcon" id="adminOnly">
                 {this.state.isAdmin === true ?
                    <Link to="/Dashboard"><img src={ admin } id="headerAdmin"/></Link> 
                    :
                    ''
                }
             </div>   


            <div className="logo">
            <Link to='/'><img src={ logo } id="headerLogo"/></Link>
            <Link to='/'><h2>coding style</h2></Link>
            </div>
             
           <div className="icon-wrap">
             <div>
                <img src={login} onClick={this.login} id="headerLogin"/>
               
             </div>
             <div className="bag">
            <img src={bag} id="headerBag" onClick={()=> this.setState({showBag : !showBag})} className="dropdown"/> 
             <div className={ showBag ? "dropdown-content hide" : "dropdown-content show" }>
               <ShoppingBag />
            </div>
             </div>
            </div>
          </div>
        </div>
        );
    }
}

function mapStateToProps(state){
    return {
        state,
    }
}
export default connect(mapStateToProps,{updateNotAdmin, updateAdmin, updateUser, updateLogin, updateUserImage})(Header);