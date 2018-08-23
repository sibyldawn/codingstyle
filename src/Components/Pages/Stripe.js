import React, {Component} from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from 'axios';
import OrderConfirm from './OrderConfirm';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateOrderId } from '../../ducks/reducer';



const CURRENCY = "USD"
const CONVERT = total => +total * 100;

class TakeMoney extends Component {
  constructor(){
    super()

    this.state = {
      orderComplete: false,
      orderId: 0,
      orderDate:'',
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
  .then(token => {
    console.log("PAYMENT SUCCESSFUL",token)
  }).catch(console.log("STRIPE ERROR"));
  this.sendCartToSession();
}


sendCartToSession=()=>{
 let cart = JSON.parse(localStorage.getItem('cart'))
 let total = JSON.parse(localStorage.getItem('total'))
 let obj = {
    cart: cart,
    total: total
  }
 axios.post('/api/user/cartSession',obj).then( response => {
   console.log("response",response)
   this.setState({
    orderId: response.data[0].id,
    orderComplete: true,
    orderDate: response.data[0].date
   })
  }).then(()=>{
    let total = JSON.parse(localStorage.getItem('total'))
    let address = JSON.parse(localStorage.getItem('address'))
    let user = JSON.parse(localStorage.getItem('user'))
        let userAddress = {
          email: user.email,
          first_name: user.first_name,
          date: this.state.orderDate,
          total: this.state.total,
          orderId: this.state.orderId,
          address: address[0].address,
          city: address[0].city,
          state: address[0].state,
          zipcode: address[0].zipcode
          }
        console.log("userAddress",userAddress);
        axios.post('/api/email',userAddress).then(res => {
          console.log("sendMail",res);
        }).catch(err => console.log("sendMail error",err));
      })
   }
 


  render() {
    if(this.state.orderComplete){
      return <Redirect to={`/OrderConfirm/${this.state.orderId}`}/>
    }


    const amount = CONVERT(this.state.total)
    
  
    return (
      <div>
        <StripeCheckout
          name="CodingStyleShop"
          image="https://res.cloudinary.com/djsmw5c9x/image/upload/v1532538581/cslogo.png"
          amount={amount}
          token={this.onToken(amount)}
          currency={CURRENCY}
          stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
        />
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    orderId: state.orderId
  }
}


export default connect(mapStateToProps,{ updateOrderId})(TakeMoney);



