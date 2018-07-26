import React, { Component } from 'react';
import CheckoutForm from '../CheckoutForm';

export default class ShoppingBag extends Component {
    constructor(){
        super();
        this.state = {
            user: '',
        };
      this.login = this.login.bind(this);
    } 

    login(){
     const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);

     window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
    }
 
    render() {
        return (
            <div className="shopping-window">
             <h1>THIS IS THE SHOPPING BAG WINDOW!</h1>
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