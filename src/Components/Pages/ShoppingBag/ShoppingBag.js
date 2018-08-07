import React, { Component } from 'react';
import CheckoutForm from '../CheckoutForm';
import './ShoppingBag.css';


export default class ShoppingBag extends Component {
    constructor(){
        super();
        this.state = {
            user: '',
            showBag: false,
            cart: [],
            total: 0,
            size: '',
            qty: 0,
        };
      this.login = this.login.bind(this);
    } 

    componentDidMount(){
        this.setState({
            cart: JSON.parse(localStorage.getItem('cart'))
        })
    }

    login(){
     const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);

     window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
    }
 
    render() {
        const {showCart} = this.state;
        // const cartDisplay = this.state.cart ? this.state.cart.map(item => {
        //     return( <div key={item.id}>
        //         <div>
        //            <div>
        //             <div>
        //                 <img width={100}
        //                      height={100}
        //                      src={item.picture} alt="shirt"/>
        //            </div>
        //            <div>
        //                <p>{item.name}</p>
        //                <div className="show-grid">
        //                  <div md={6}>{item.size}</div>
        //                  <br/>
        //                  <div md={6}>{item.category}</div>
        //                </div>
        //                <div className="show-grid">
        //                  <div md={6}>Price:{item.price}</div>
        //                  <br/>
        //                  <div md={6}>Qty: {item.qty}</div>
        //                </div>
        //                <div>
        //                  <div md={6}>Item Total:{item.itemTotal}</div>
        //                </div>
        //            </div>
        //            </div>
        //         </div>
        //     </div>
        //     )}): 'Your Cart is Empty';

        return (
            <div className="shopping-window">
             <div className="cart-gallery">
                {/* { cartDisplay} */}
                
             </div>
             <div><h3>THIS IS THE SHOPPING BAG PAGE!</h3></div>
             <div>
                 {this.state.user
                    ? <CheckoutForm/>
                    : <div>
                        <p>Please Login</p>
                        <button onClick={this.login}>CHECKOUT</button>
                    </div>
                 }
             
             </div>
            </div>

        )
    }
}

