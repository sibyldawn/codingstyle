import React, { Component } from 'react';
import CheckoutForm from '../CheckoutForm';
import './ShoppingBag.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import {updateNotAdmin, updateAdmin, setCart, updateUser, updateLogin, updateTotal} from '../../../ducks/reducer';


const styles = theme => ({
    root: {
      flexGrow: 1,
      maxWidth: 800,
      padding: theme.spacing.unit * 2,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  });
  
class ShoppingBag extends Component {
    constructor(props){
        
        super();
        this.state = {
            user: {},
            showBag: false,
            cart: [],
            total: 0,
            size: '',
            qty: 0,
        };
        this.login = this.login.bind(this)
    } 
    componentDidMount(){
        this.setState({
            cart:JSON.parse(localStorage.getItem('cart'))})
        
    
    }

    login(){
      const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
 
      window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
      
   }

    getTotal = () => {
        console.log("this.state.cart",this.state.cart);
        const {cart} = this.state;
        let sum = 0;
        if (cart){
         for(let i=0;i<cart.length;i++){
             console.log("cart[i] itemTotal", +cart[i].itemTotal);
             sum += +cart[i].itemTotal
             console.log("totalPrice", sum)
         }
         return sum;
    console.log("totalPrice",sum);
        }
    }
 
   
    render() {
        console.log("TOTAL======>",this.state.total)
        console.log("CART",this.state.cart);
        const {showCart} = this.state;
        const {classes} = this.props;
        const cartDisplay = this.state.cart ? this.state.cart.map(item => {
            return( <div key = {item.id}>
            <Paper className={classes.root}>
                <Grid container spacing={16}>
                  <Grid item>
                    <ButtonBase className={classes.image}>
                      <img className={classes.img} alt="complex" src={item.picture} />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={16}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subheading">
                          {item.name}
                        </Typography>
                        <Typography gutterBottom>{item.category}</Typography>
                        <Typography gutterBottom>Size: {item.size}</Typography>
                        <Typography color="textSecondary">QTY: {item.qty}</Typography>
                      </Grid>
                      <Grid item>
                        <Typography style={{ cursor: 'pointer' }}>Remove</Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subheading">${item.itemTotal}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
              </div>
            )}): 'Your Cart is Empty';
        console.log(this.state);
        return (
            <div className="shopping-window">
             <div><h3>CART SUMMARY:</h3></div>
             <div className="cart-gallery">
                { cartDisplay}
                
             </div>
             <Paper style={{ width: '400px' }}>
             <div className="total-price">
                <h3>Est. Total: $ {this.getTotal()}</h3>
             </div>
             </Paper>
             <div>
             <Link to='//CheckoutForm'> <button onClick={this.login}>CHECKOUT</button></Link>
                
             </div>
            </div>

        )
    }
}

ShoppingBag.propTypes = {
    classes: PropTypes.object.isRequired,
  };

function mapStateToProps(state){
    return {
        state,
    }
}

export default connect(mapStateToProps,{updateNotAdmin, updateAdmin, setCart, updateUser, updateLogin,updateTotal})(withStyles(styles)(ShoppingBag));

