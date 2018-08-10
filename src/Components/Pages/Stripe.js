import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

class Stripe extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};

    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    let response = await fetch("/charge", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: token.id
    });
  
    if (response.ok)this.setState({complete: true})
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(Stripe);

























// // import StripeCheckout from 'react-stripe-checkout';
// import axios from 'axios';
// import logo from '../../Assets/cslogo.png';
// // import stripePackage from 'stripe';

// // const stripe = stripePackage('sk_test_y57ensIPZu6sek1eogUAA5qw');


//  {
//   // onToken = (token) => {
//   //  axios.post('/api/save-stripe-token',JSON.stringify(token))
//   //  .then(response => {
//   //    console.log("STRIPE RESPONSE". response)
//   //     response.json().then(data => {
//   //       alert(`We are in business, ${data.email}`);
//   //     });
//   //   });
//   // }

  
  
//   render() {
//     return (
//       // ...
//       // <StripeCheckout
//       //   name="CodingStyle"
//       //   image="http://res.cloudinary.com/djsmw5c9x/image/upload/v1532538581/cslogo.png"
//       //   // bitcoin="true"
//       //   amount= {9999999}
//       //   currency= 'USD'
//       //   receipt_email= 'jenny.rosen@example.com'
//       //   token={this.onToken}
//       //   stripeKey="pk_test_FhmaCpKORaHC1ZDPNxyXv4lR"
//       // />
//     )
//   }
// }