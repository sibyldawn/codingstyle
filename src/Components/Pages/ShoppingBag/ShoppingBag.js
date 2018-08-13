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
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router-dom'; 
import TextField from '@material-ui/core/TextField';
import {updateNotAdmin, updateAdmin, setCart, updateUser, updateLogin, updateTotal} from '../../../ducks/reducer';


const styles = theme => ({
    root: {
      flexGrow: 1,
      maxWidth: 500,
      maxHeight: 200,
      padding: theme.spacing.unit * 2,
    },
    image: {
      width: 120,
      height: 120,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    }, 
    button: {
      margin: theme.spacing.unit,
    },
  });
  
class ShoppingBag extends Component {
    constructor(props){
        
        super();
        this.state = {
            user: JSON.parse(localStorage.getItem('user')) || [],
            cart: JSON.parse(localStorage.getItem('cart')),
            total: 0,
            size: '',
            isAuthenticated: false,
        };
        this.redirectToCheckOut = this.redirectToCheckOut.bind(this)
       
      
    } 
    componentDidMount(){
        this.setState({
            cart:JSON.parse(localStorage.getItem('cart')),
            user:JSON.parse(localStorage.getItem('user'))
          })
     }
    

    redirectToCheckOut(){
      console.log('hit')
      if(this.state.user != null){
        console.log('redirect');
        return window.location = '/CheckoutForm'
      }else{
      console.log('login')
      const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
      window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
      }
   }



    getTotal = () => {
        console.log("this.state.cart",this.state.cart);
        const {cart} = this.state;
        let sum = 0;
        if (cart){
         for(let i=0;i<cart.length;i++){
             console.log("cart[i] itemTotal", +cart[i].itemTotal);
             sum += +cart[i].itemTotal
          }
         localStorage.setItem('total', JSON.stringify((sum.toFixed(2))))
         return JSON.parse(localStorage.getItem('total'))
         
        }
      }


   

    changeQty = (value,id,qty,itemTotal) => {
            let currentCart = JSON.parse(localStorage.getItem('cart'))
            console.log("currentCart",currentCart)
            let index = currentCart.findIndex( e => e.id === id)
            console.log("index",index)
            currentCart[index].qty = value;
            console.log("currentCart.qty", currentCart.qty)

             if(value == 0){ 
              let newCart = JSON.parse(localStorage.getItem('cart'))
              
              newCart.splice(index,1)
              console.log(newCart)
              this.setState(() => {
                localStorage.setItem('cart' ,JSON.stringify(newCart));
                return {
                  cart: newCart
                }
              })
              this.render();

             }else{
                currentCart[index].itemTotal = currentCart[index].qty * currentCart[index].price
                console.log("curretCart item total", currentCart[index].itemTotal)
                this.setState({
                  cart: currentCart
            })

            
          }
        }
 
   
    render() {
        console.log("TOTAL======>",this.state.total)
        console.log("CART",this.state.cart);
        const {showCart} = this.state;
        const {classes} = this.props;
        const cartDisplay = this.state.cart ? this.state.cart.map(item => {
            if(item === null ){
              return ''
            }else {
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
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subheading">${item.itemTotal}</Typography>
                      <TextField
                        id="number"
                        label="QTY"
                        defaultValue={item.qty}
                        onChange={(e)=>this.changeQty(e.target.value,item.id,item.qty,item.itemTotal)}
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                      />
                     <Typography style={{ cursor: 'pointer' }} onClick={(e)=>this.changeQty(0,item.id,item.qty,item.itemTotal)}>Remove</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
              </div>
            )}
          
          }): 'Your Cart is Empty';
        console.log(this.state);
        return (
            <div className="shopping-window">
             <div><h3>CART SUMMARY:</h3></div>
             <div className="cart-gallery">
                { cartDisplay}
                
             </div>
             <Paper style={{ width: '500px' }}>
             <div className="total-price">
                <h1>Total: $ {this.getTotal()}</h1>
             </div>
             </Paper>
             <div>
             <Button variant="contained" size="large" color="primary" className={classes.button} onClick={this.redirectToCheckOut}>CHECKOUT</Button>
                
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
        total: state.total,
    }
}

export default connect(mapStateToProps,{updateNotAdmin, updateAdmin, setCart, updateUser, updateLogin,updateTotal})(withStyles(styles)(ShoppingBag));

