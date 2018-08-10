import React, {Component} from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios';
import { Redirect } from "react-router-dom";

const CURRENCY = "USD"
const CONVERT = total => +total * 100;

export default  class TakeMoney extends Component {
  constructor(){
    super()

    this.state = {
      orderComplete: false,
      orderId: 0,
      lineItem: [],
      total: JSON.parse(localStorage.getItem('total'))
    };
  }

onToken = (amount) => token => {
axios.post("/api/payment", {
    source: token.id,
    currency: CURRENCY,
    email: token.email,
    amount: amount
  })
  .then(console.log("PAYMENT SUCCESSFUL",token))
  .catch(console.log("STRIPE ERROR"));
  this.sendCartToSession();
}


sendCartToSession(){
 let cart = JSON.parse(localStorage.getItem('cart'))
 let total = JSON.parse(localStorage.getItem('total'))
let obj = {
  cart: cart,
  total: total
}
 axios.post('/api/user/cartSession',obj).then( response => {
  //  axios.post('/api/user/totalSession',total).then( response =>{
     console.log(response)
  //   }
 }).catch(error => console.log(error));
}




  render() {
    const amount = CONVERT(this.state.total)
    if (this.state.orderComplete) {
      return <Redirect to={'/OrderConfirm'} />;
    }

  
    return (
      <div>
        <StripeCheckout
          name="CodingStyleShop"
          image="https://res.cloudinary.com/djsmw5c9x/image/upload/v1532538581/cslogo.png"
          amount={amount}
          token={this.onToken(amount)}
          currency={CURRENCY}
          stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
          bitcoin="true"
        />
      </div>
    );
  }
}


