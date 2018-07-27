import React, { Component } from 'react';
import CheckoutForm from '../CheckoutForm';
import './ShoppingBag.css';

export default class ShoppingBag extends Component {
    constructor(){
        super();
        this.state = {
            user: '',
            showBag: false
        };
      this.login = this.login.bind(this);
    } 

    login(){
     const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);

     window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
    }
 
    render() {
        const {showBag} = this.state;
        
        return (
            <div className={"shopping-window"}>
             <div>
                 <h1>THIS IS THE SHOPPING BAG</h1>
                 </div>
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

