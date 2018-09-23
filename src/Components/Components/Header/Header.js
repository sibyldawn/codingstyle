import React, { Component } from 'react';
import Lottie from 'react-lottie';
import * as menuIcon from '../../../Assets/menu.json';
import logo from '../../../Assets/cslogo.png';
import './Header.css';
import bag from '../../../Assets/bag.png';
import { Link } from 'react-router-dom';
import login from '../../../Assets/login.png';
import axios from 'axios';
import ShoppingBag from '../../Pages/ShoppingBag/ShoppingBag';
import admin from '../../../Assets/gearIcon.png';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Drawer from '@material-ui/core/Drawer';
import Menu from '@material-ui/core/Menu';
import Aside from './Aside';


const styles = {
    root: {
      flexGrow: 1,
      position:'fixed',
      top: 0,
      width: '100vw',
    },
    grow: {
      flexGrow: 1,
    },
    accountCircle:{
     position: 'fixed',
     top: 20,
     right: 50,
    },
   
  };

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuIsStopped: false,
            showMenu: false,
            showBag: false,
            isAdmin:'',
            user_img:'',
            auth: true,
            anchorEl: null,
            left: false,
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

     toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };


      handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };
   

    render() {

        const { showMenu } = this.state;
        const { showBag } = this.state;
          console.log(showBag)

          const { classes } = this.props;
          const { auth, anchorEl } = this.state;
          const open = Boolean(anchorEl);
          return (
            <div className={classes.root}>
              
              <AppBar position="static">
                <Toolbar >
                  <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon onClick={this.toggleDrawer('left', true)}/>
                  </IconButton>
                  <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                              <div
                                  tabIndex={0}
                                  role="button"
                                  onClick={this.toggleDrawer('left', false)}
                                  onKeyDown={this.toggleDrawer('left', false)}
                              >
                                  <Aside/>
                              </div>
                              </Drawer>
                        
                          <Link to='/'>
                            <figure style={{ 
                                          margin: 0, 
                                          padding: 0, 
                                          height: 45, 
                                          position: 'fixed',
                                          top:'1%',
                                          left: 60,
                                          overflow: 'hidden'
                                           }}>
                           <img src={logo} alt="finder logo" style={{ 
                                              display: 'inline',
                                              height: '100%',
                                              width: 'auto', 
                                              margin: 0, 
                                              padding: 0,
                                               }}   />
                          </figure>
                          </Link>
                          <div className="logo">
                          <Link to='/'><h2 style={{position: 'fixed',
                                          left: 110}}>coding style</h2></Link>
                         </div>
                      
                          <div className="adminIcon" id="adminOnly">
                           {this.state.isAdmin === true ?
                          <Link to="/Dashboard"><img src={ admin } id="headerAdmin" alt="Settings Icon"/></Link> 
                          :
                          ''
                      }
                   </div> 
                  {auth && (
                    <div>
                      <IconButton
                        aria-owns={open ? 'menu-appbar' : null}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit"
                      >
                        <AccountCircle className={classes.accountCircle} onClick={()=> this.login()}/>
                      </IconButton>
                      
                    </div>
                  )}
                <div className="bag">
                  <img src={bag} id="headerBag" onClick={()=> this.setState({showBag : !showBag})} className="dropdown" alt="Bag Icon"/> 
                   <div className={ showBag ? "dropdown-content hide" : "dropdown-content show" }>
                     <ShoppingBag />
                  </div>
                 </div>
                </Toolbar>
              </AppBar>
            </div>
          );
        }
      }
      
      Header.propTypes = {
        classes: PropTypes.object.isRequired,
      };
      
      export default withStyles(styles)(Header);







   

    