import React, { Component } from 'react';
import CheckoutForm from '../CheckoutForm';
import './ShoppingBag.css';
import { Button,Well,Media,Row,Col } from 'react-bootstrap';

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
        const cartDisplay = this.state.cart ? this.state.cart.map(item => {
            return( <div key={item.id}>
                <Well>
                   <Media>
                    <Media.Left>
                        <img width={100}
                             height={100}
                             src={item.picture} alt="shirt"/>
                   </Media.Left>
                   <Media.Body>
                       <p>{item.name}</p>
                       <Row className="show-grid">
                         <Col md={6}>{item.size}</Col>
                         <br/>
                         <Col md={6}>{item.category}</Col>
                       </Row>
                       <Row className="show-grid">
                         <Col md={6}>Price:{item.price}</Col>
                         <br/>
                         <Col md={6}>Qty: {item.qty}</Col>
                       </Row>
                       <Row>
                         <Col md={6}>Item Total:{item.itemTotal}</Col>
                       </Row>
                   </Media.Body>
                   </Media>
                </Well>
            </div>
            )}): 'Your Cart is Empty';

        return (
            <div className={"shopping-window"}>
             <div className={"cart-gallery"}>
                { cartDisplay}
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

