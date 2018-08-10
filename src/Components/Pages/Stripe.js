import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import logo from '../../Assets/cslogo.png';

export default class TakeMoney extends React.Component {
  onToken = (token) => {
   axios.post('/api/save-stripe-token',JSON.stringify(token))
   .then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  
  
  render() {
    return (
      // ...
      <StripeCheckout
        name="CodingStyle"
        image="http://res.cloudinary.com/djsmw5c9x/image/upload/v1532538581/cslogo.png"
        bitcoin="true"
        token={this.onToken}
        stripeKey="pk_test_FhmaCpKORaHC1ZDPNxyXv4lR"
      />
    )
  }
}